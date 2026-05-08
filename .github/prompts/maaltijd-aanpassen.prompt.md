---
name: maaltijd-aanpassen
description: "Pas een bestaande maaltijd aan op basis van feedback of wens. Herberekent macro's, update Macros_Dagtotalen.md en Boodschappenlijst.md. Keywords: maaltijd wijzigen, recept aanpassen, ingredient veranderen, portie aanpassen, feedback verwerken."
agent: "MealplanAgent"
argument-hint: "Beschrijf de gewenste wijziging: welke maaltijd en wat er moet veranderen (bijv. 'Mealprep1 — minder rijst, meer groente' of 'Lunch — vervang ham door kip')"
---

Pas de opgegeven maaltijd aan op basis van de feedback en voer daarna de verplichte updateketen uit.

## Verplichte updateketen (in deze exacte volgorde)

1. **Receptaanpassing** — Pas het maaltijdbestand aan conform de feedback
   - Houd alle regels uit `.github/instructions/maaltijdplan-regels.instructions.md` strikt aan
   - Controleer: zijn alle gebruiker-gespecificeerde caps (bijv. "max 100g champignons") gehonoreerd?
   - Geen symbolische porties; hele eenheden prioriteit

2. **Herberekening maaltijdmacro's** — Bereken kcal, eiwit, vet en KH opnieuw per ingredient per portie

3. **Update `Macros_Dagtotalen.md`** — Vervang de getallen voor de betreffende maaltijd

4. **Update `Boodschappenlijst.md`** — Pas hoeveelheden aan voor gewijzigde of vervangen ingrediënten

5. **Validatiesamenvatting** — Geef een korte tabel met de nieuwe dagtotalen en een grenscheck:
   - ✅ of ❌ per macro ten opzichte van het dagmaximum
   - Meld expliciet als een grens dreigt te worden overschreden

## Instructies

- Lees het actieve plan (`meals/planX/`) op basis van context of vraag welk plan actief is
- Pas **alleen** de gevraagde maaltijd aan; raak andere maaltijden niet aan
- Als een ingredient ontbreekt in `src/ingredients.json`: voeg het toe vóór berekening, valideer met `pwsh -NoProfile -File .github/scripts/validate-ingredients-json.ps1`
- Bij conflict tussen smaak/uitvoerbaarheid en macrogrenzen: smaak mag, maar kcal/vet/KH nooit overschrijden

## Configuratie

Zie [promp.md](../../promp.md) voor dagmacro's en constraints.

$args
