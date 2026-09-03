---
description: "Use when editing mealplan markdown files in meals/plan*/. Enforces mandatory cross-file synchronization to dagtotalen, boodschappen, docs/data/meals.json and UI checks. Keywords: sync, consistency, meals plan, dagtotalen, boodschappen, meals.json, index macros shopping."
applyTo: "meals/plan*/**/*.md"
---

# Mealplan Sync Workflow (verplicht)

Bij elke inhoudelijke wijziging in een mealplanbestand in `meals/plan*/`:

1. Leg vóór het wijzigen de actuele gebruikersconstraints vast: minima, maxima, ingredient-caps en expliciete uitsluitingen.
2. Werk de gewijzigde maaltijdinhoud bij in het betreffende bestand.
3. Herbereken en update `Macros_Dagtotalen.md` binnen hetzelfde plan.
4. Herbereken en update `Boodschappenlijst.md` binnen hetzelfde plan.
5. Synchroniseer dezelfde wijzigingen naar `docs/data/meals.json` voor hetzelfde plan:
- `weekplans.planX.totals`
- `meals.[meal-id].variants`
- `shopping.planX`
6. Valideer daarna brondata en website-output op:
- alle opgegeven minima/maxima/caps en verboden ingrediënten
- `docs/index.html`
- `docs/macros.html`
- `docs/shopping.html`

## Source-of-truth

- De UI leest uit `docs/data/meals.json`; gebruik die output als eindcontrole.
- Plan-markdown en website-data moeten exact overeenkomen op macro's, ingredienthoeveelheden en boodschappen-totalen.
- Synchronisatie en compliance zijn aparte checks: als de gebruiker vraagt om alleen afgeleide bestanden te synchroniseren, mag een bestaande overtreding worden doorgegeven maar moet de eindstatus ❌ blijven met de exacte afwijking.

## Rapportageverplichting

Rapporteer na wijzigingen altijd:
- Bijgewerkte dagtotalen (training + rust)
- Grenscheck voor alle harde maxima én minima/caps uit de gebruikersvraag
- Bevestiging dat index/macros/shopping UI consistent is
- Als iets niet voldoet: ❌ status, exacte afwijking en geen claim dat het plan geslaagd is
