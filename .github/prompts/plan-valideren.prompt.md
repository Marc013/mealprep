---
name: plan-valideren
description: "Valideer een bestaand mealplan volledig: check macro's per maaltijd, dagtotalen, consistentie van ingrediënten, boodschappenlijst en Macros_Dagtotalen.md. Keywords: plan valideren, macro check, grenscontrole, dagtotaal controleren, plan controleren."
agent: "MealplanAgent"
argument-hint: "Optioneel: geef het plannummer (bijv. 'plan9') of laat leeg voor het meest recente plan"
---

Voer een volledige validatie uit van het opgegeven mealplan.

## Validatiestappen

### 1. Macro's per maaltijd
Controleer voor elke maaltijd (Ontbijt, Lunch, Mealprep1 trainingsdag, Mealprep1 rustdag, Mealprep2 trainingsdag, Mealprep2 rustdag):
- Kloppen de macro's in de header-tabel met de som van de ingrediëntenlijst?
- Zijn er symbolische porties (< 50g voor niet-kruiden)?
- Worden er hele eenheden gebruikt waar dat verwacht wordt?

### 2. Dagtotalen (trainingsdag en rustdag)
Controleer `Macros_Dagtotalen.md`:
- Shake-blok correct meegeteld? (535 kcal / 79 g eiwit / 6 g vet / 38 g KH)
- Trainingsdag binnen: kcal ≤ 2900, vet ≤ 60 g, KH ≤ 400 g? (eiwit = target 190 g, beperkte overschrijding toegestaan)
- Rustdag binnen: kcal ≤ 1880, vet ≤ 80 g, KH ≤ 100 g? (eiwit = target 190 g, beperkte overschrijding toegestaan)
- Controleer ook alle aanvullende minima, maxima en ingredient-caps uit de gebruikersvraag of plancontext; die zijn harde constraints en moeten expliciet in de rapportage staan.
- Zijn de totalen de som van de losse maaltijden + shakeblok?

### 3. Ingrediëntconsistentie
- Zijn alle ingrediënten uit Voorbereiding/Bereiding ook terug te vinden in de ingrediëntenlijst met gramhoeveelheid?
- Staan alle gebruikte ingrediënten in `src/ingredients.json`?

### 4. Boodschappenlijst
- Klopt de boodschappenlijst met alle ingrediënten uit alle maaltijden?
- Zijn hoeveelheden correct opgeteld over het aantal porties?

### 5. Structuurcontrole
- Zijn de verplichte ingrediënten van 10:15 aanwezig (kwark of skyr, halfvolle yoghurt, bosvruchten, banaan, kaneelpoeder)?
- Is de 13:00-maaltijd realistisch haalbaar in 30 minuten totaal?
- Hebben beide mealprep-gerechten een trainings- én rustdag-variant?

## Outputformaat

Geef een rapportage per categorie:
```
✅ Categorie: Macro's per maaltijd — alle kloppen
❌ Categorie: Dagtotalen — Rustdag vet overschreden (83g vs max 80g)
⚠️ Categorie: Ingrediëntconsistentie — knoflook niet in ingrediëntenlijst Mealprep1
```
Gevolgd door een samenvattingstabel met dagtotalen.

## Instructies

- Lees alle maaltijdbestanden in het aktieve plan
- Gebruik `src/ingredients.json` voor alle voedingswaarden
- Corrigeer gevonden fouten direct als het om kleine discrepanties gaat; rapporteer grotere problemen aan de gebruiker
- Geef alleen een ✅-status als alle harde grenzen, minima, caps en synchronisatiecontroles slagen. Bij een bekende afwijking moet de categorie ❌ blijven, ook wanneer de JSON parsebaar is en de UI rendert.

$args
