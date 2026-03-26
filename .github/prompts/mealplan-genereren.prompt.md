---
description: "Genereer een volledig nieuw mealprep weekschema voor krachtsport. Schrijft alle maaltijdbestanden, dagtotalen en boodschappenlijst. Keywords: nieuw maaltijdplan, weekschema maken, mealprep genereren, maaltijden aanmaken."
name: "mealplan-genereren"
agent: "MealplanAgent"
argument-hint: "Optioneel: geef specifieke ingrediënten, te vermijden producten, of afwijkende focus (bijv. 'gebruik meer kip' of 'vermijd avocado')"
---

Genereer een volledig nieuw dagschema met 4 maaltijden en 2 mealprep-gerechten.

## Instructies

1. Lees de skill: `.github/skills/mealplan/SKILL.md`
2. Volg de volledige procedure uit de skill
3. Gebruik templates uit `.github/skills/mealplan/assets/`
4. Pas alle vaste mealprep-regels uit `.github/instructions/maaltijdplan-regels.instructions.md` strikt toe

## Verplichte focuspunten

- Houd dagmacro's onder de maximale bovengrenzen en benader targets zo dicht mogelijk.
- Verdeel macro's evenredig over de hoofdmaaltijden.
- Rustdag: maximaliseer volume/verzadiging.
- 10:15 maaltijd moet exact voldoen aan de verplichte ingrediëntencombinatie (kwark of skyr, niet beide).
- 13:00 maaltijd moet super eenvoudig blijven en binnen 30 minuten totaal haalbaar zijn.
- Beschrijf per maaltijd zowel voorbereiding als bereiding.
- Maximaal 2 mealprep-gerechten per week, beide met training/rust-varianten en sterke kruiding (oosters, Mexicaans of Arabisch).

## Configuratie

Zie [promp.md](../../promp.md) voor dagmacro's en constraints.

$args
