#!/usr/bin/env python3
"""
Macro Calculation Engine for Mealplan Validation
Derives macros from ingredient_id + amount_g, validates against targets.
"""

import json
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, asdict


@dataclass
class MacroValues:
    """Macro values in grams/calories"""
    kcal: float
    protein: float
    fat: float
    carbs: float

    def __add__(self, other: 'MacroValues') -> 'MacroValues':
        return MacroValues(
            kcal=self.kcal + other.kcal,
            protein=self.protein + other.protein,
            fat=self.fat + other.fat,
            carbs=self.carbs + other.carbs
        )

    def __str__(self) -> str:
        return f"{self.kcal:.0f} kcal | {self.protein:.1f}g P | {self.fat:.1f}g F | {self.carbs:.1f}g C"

    def to_dict(self) -> Dict[str, float]:
        return asdict(self)


class MacroEngine:
    def __init__(self, ingredients_path: str = "src/ingredients.json"):
        """Initialize macro engine with ingredient database"""
        with open(ingredients_path) as f:
            self.ingredients_db = json.load(f)

        self.ingredients_by_id = {
            ing["id"]: ing for ing in self.ingredients_db["ingredients"]
        }

        # Day targets from promp.md
        self.day_targets = {
            "training": {
                "kcal": 2900,
                "protein": 190,
                "fat": 60,
                "carbs": 400
            },
            "rest": {
                "kcal": 1880,
                "protein": 190,
                "fat": 80,
                "carbs": 100
            }
        }

    def calculate_meal_macros(self, ingredients: List[Dict]) -> Tuple[MacroValues, List[Dict]]:
        """Calculate total macros for a meal from ingredient list."""
        total = MacroValues(kcal=0, protein=0, fat=0, carbs=0)
        contributions = []

        for ingredient in ingredients:
            ingredient_id = ingredient["ingredient_id"]
            amount_g = ingredient["amount_g"]

            ing_def = self.ingredients_by_id.get(ingredient_id)
            if not ing_def:
                raise ValueError(f"Unknown ingredient_id: {ingredient_id}")

            macros_per_100 = MacroValues(**ing_def["macros_per_100g"])

            # Scale to actual amount
            contribution = MacroValues(
                kcal=macros_per_100.kcal * amount_g / 100,
                protein=macros_per_100.protein * amount_g / 100,
                fat=macros_per_100.fat * amount_g / 100,
                carbs=macros_per_100.carbs * amount_g / 100
            )

            total = total + contribution

        return total, contributions

    def validate_day_macros(self, total_macros: MacroValues, day_type: str = "training") -> Dict:
        """Validate macros against day targets."""
        targets = self.day_targets[day_type]
        errors = []
        warnings = []

        if total_macros.kcal > targets["kcal"]:
            errors.append(f"kcal {total_macros.kcal:.0f} exceeds target {targets['kcal']}")

        if total_macros.fat > targets["fat"]:
            errors.append(f"fat {total_macros.fat:.1f}g exceeds target {targets['fat']}g")

        if total_macros.carbs > targets["carbs"]:
            errors.append(f"carbs {total_macros.carbs:.1f}g exceeds target {targets['carbs']}g")

        protein_overage = total_macros.protein - targets["protein"]
        if protein_overage > 0:
            pct = protein_overage / targets["protein"] * 100
            warnings.append(f"protein {total_macros.protein:.1f}g is +{pct:.0f}% (acceptable for satiety)")

        if total_macros.protein < targets["protein"] * 0.8:
            pct = 100 - (total_macros.protein / targets["protein"] * 100)
            warnings.append(f"protein {total_macros.protein:.1f}g is {pct:.0f}% below target")

        # Compliance score
        constraints_met = sum([
            total_macros.kcal <= targets["kcal"],
            total_macros.protein >= targets["protein"] * 0.8,
            total_macros.fat <= targets["fat"],
            total_macros.carbs <= targets["carbs"]
        ])

        compliance_score = (constraints_met / 4) * 100
        status = "error" if errors else ("warning" if warnings else "valid")

        return {
            "status": status,
            "errors": errors,
            "warnings": warnings,
            "compliance_score": f"{compliance_score:.1f}%"
        }

    def validate_day_plan(self, meals_json_path: str, plan_name: str = "plan4") -> Dict:
        """Validate a complete day plan against targets."""
        with open(meals_json_path) as f:
            meals_data = json.load(f)

        # Auto-detect available meals for this plan
        available_meals = sorted([
            k for k in meals_data.get("meals", {}).keys()
            if f"-{plan_name}" in k
        ])

        results = {
            "plan": plan_name,
            "available_meals": available_meals,
            "training": {
                "meals": {},
                "total_macros": None,
                "validation": None
            },
            "rest": {
                "meals": {},
                "total_macros": None,
                "validation": None
            }
        }

        for day_type in ["training", "rest"]:
            total_macros = MacroValues(kcal=0, protein=0, fat=0, carbs=0)

            for meal_id in available_meals:
                meal_def = meals_data["meals"][meal_id]

                if day_type in meal_def.get("variants", {}):
                    variant = meal_def["variants"][day_type]

                    try:
                        meal_macros, _ = self.calculate_meal_macros(
                            variant.get("ingredients", [])
                        )
                        total_macros = total_macros + meal_macros

                        results[day_type]["meals"][meal_id] = {
                            "macros": meal_macros.to_dict(),
                            "status": "calculated"
                        }
                    except Exception as e:
                        results[day_type]["meals"][meal_id] = {
                            "error": str(e),
                            "status": "error"
                        }

            # Validate day total
            validation = self.validate_day_macros(total_macros, day_type)
            results[day_type]["total_macros"] = total_macros.to_dict()
            results[day_type]["validation"] = validation

        return results


if __name__ == "__main__":
    engine = MacroEngine()

    print("=== FULL DAY PLAN VALIDATION (PLAN4) ===")
    try:
        day_report = engine.validate_day_plan("docs/data/meals.json", "plan4")
        print(f"\nAvailable meals: {', '.join(day_report['available_meals'])}")

        print("\nTRAINING DAY:")
        t = day_report['training']['total_macros']
        print(f"  Total: {t['kcal']:.0f} kcal | {t['protein']:.1f}g P | {t['fat']:.1f}g F | {t['carbs']:.1f}g C")
        print(f"  Status: {day_report['training']['validation']['status'].upper()}")
        for e in day_report['training']['validation']['errors']:
            print(f"    [ERROR] {e}")
        for w in day_report['training']['validation']['warnings']:
            print(f"    [WARNING] {w}")

        print("\nREST DAY:")
        t = day_report['rest']['total_macros']
        print(f"  Total: {t['kcal']:.0f} kcal | {t['protein']:.1f}g P | {t['fat']:.1f}g F | {t['carbs']:.1f}g C")
        print(f"  Status: {day_report['rest']['validation']['status'].upper()}")
        for e in day_report['rest']['validation']['errors']:
            print(f"    [ERROR] {e}")
        for w in day_report['rest']['validation']['warnings']:
            print(f"    [WARNING] {w}")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
