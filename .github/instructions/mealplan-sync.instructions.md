---
description: "Use when editing mealplan markdown files in meals/plan*/. Enforces mandatory cross-file synchronization to dagtotalen, boodschappen, docs/data/meals.json and UI checks. Keywords: sync, consistency, meals plan, dagtotalen, boodschappen, meals.json, index macros shopping."
applyTo: "meals/plan*/**/*.md"
---

# Mealplan Sync Workflow (verplicht)

Bij elke inhoudelijke wijziging in een mealplanbestand in `meals/plan*/`:

1. Werk de gewijzigde maaltijdinhoud bij in het betreffende bestand.
2. Herbereken en update `Macros_Dagtotalen.md` binnen hetzelfde plan.
3. Herbereken en update `Boodschappenlijst.md` binnen hetzelfde plan.
4. Synchroniseer dezelfde wijzigingen naar `docs/data/meals.json` voor hetzelfde plan:
- `weekplans.planX.totals`
- `meals.[meal-id].variants`
- `shopping.planX`
5. Valideer daarna de website-output op:
- `docs/index.html`
- `docs/macros.html`
- `docs/shopping.html`

## Source-of-truth

- De UI leest uit `docs/data/meals.json`; gebruik die output als eindcontrole.
- Plan-markdown en website-data moeten exact overeenkomen op macro's, ingredienthoeveelheden en boodschappen-totalen.

## Rapportageverplichting

Rapporteer na wijzigingen altijd:
- Bijgewerkte dagtotalen (training + rust)
- Grenscheck voor kcal/vet/koolhydraten
- Bevestiging dat index/macros/shopping UI consistent is
