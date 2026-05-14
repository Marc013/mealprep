---
name: ingredient-toevoegen
description: "Voeg een nieuw ingredient toe aan src/ingredients.json met correcte macro's, sourcing en metadata. Keywords: ingredient toevoegen, voedingswaarde opzoeken, ingredients.json bijwerken, nieuw product toevoegen."
agent: "MealplanAgent"
argument-hint: "Geef de productnaam (bijv. 'Griekse yoghurt 0% Lidl') en optioneel de winkel of een voedingswaardelink"
---

Voeg het opgegeven ingredient toe aan `src/ingredients.json` conform de onderhoudsregels.

## Procedure

### 1. Check op duplicaten
- Zoek in `src/ingredients.json` op naam (case-insensitief, zonder leestekens)
- Controleer ook naamvarianten (bijv. "100% Pindakaas" vs "100% pindakaas naturel")
- Als het ingredient al bestaat: meld dit en stop; stel eventueel een naamsverificatie voor

### 2. Voedingswaarden ophalen
**Opzoekingsvolgorde:**
1. `src/ingredients.json` (intern — duplicaatcheck)
2. https://www.voedingswaardetabel.nl/ (primaire externe bron)

Noteer: kcal, eiwit (g), vet (g), koolhydraten (g) — **per 100g**

### 3. Record aanmaken
Gebruik exact dit formaat en deze veldvolgorde:

```json
{
  "id": "<kebab-case-slug>",
  "name": "<officiële productnaam>",
  "category": "<categorie>",
  "unit": "g",
  "macros_per_100g": {
    "kcal": <getal>,
    "protein": <getal>,
    "fat": <getal>,
    "carbs": <getal>
  },
  "sourcing": {
    "store": "<Jumbo|Lidl|XXL Nutrition|overig>",
    "availability": true
  }
}
```

### 4. Invoegen op alfabetische positie
- Voeg het nieuwe record in op de correcte alfabetische positie op `name`
- Gebruik een unieke, stabiele slug-id in kebab-case op basis van productnaam

### 5. Metadata bijwerken
- Verhoog `total_ingredients` met 1
- Zet `last_updated` op de huidige datum (ISO 8601: YYYY-MM-DD)

### 6. Valideren
Draai verplicht:
```
pwsh -NoProfile -File .github/scripts/validate-ingredients-json.ps1
```
Rapporteer de uitkomst.

## Outputformaat

Toon het toegevoegde record ter bevestiging:
```json
{ ... }
```
Gevolgd door: "✅ Toegevoegd. Total: X ingrediënten. Validatie: ✅ geslaagd."

$args
