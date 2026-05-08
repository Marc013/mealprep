---
name: website-bijwerken
description: "Synchroniseer de GitHub Pages website (docs/) met de nieuwste plandata en ingrediënten. Hergenereert docs/data/meals.json vanuit de mealplan-bestanden. Keywords: website updaten, docs bijwerken, meals.json regenereren, GitHub Pages synchroniseren, site data vernieuwen."
agent: "GitHubPagesAgent"
argument-hint: "Optioneel: geef aan welk plan je wilt tonen, of laat leeg voor automatisch meest recente plan"
---

Synchroniseer de GitHub Pages website met de meest recente plandata.

## Procedure

### 1. Bepaal het actieve plan
- Kijk welk plan de meest recente map is in `meals/` (hoogste plannummer)
- Lees de maaltijdbestanden uit dat plan

### 2. Genereer docs/data/meals.json
Maak een nieuw `meals.json` op basis van de maaltijdbestanden:
- Parseer macro's uit de header-tabellen van elk maaltijdbestand
- Onderscheid trainingsdag en rustdag varianten
- Voeg shakeblok toe als vast element (535 kcal / 79g eiwit / 6g vet / 38g KH)
- Bereken en voeg dagtotalen toe per dagtype

Verwacht JSON-schema:
```json
{
  "plan": "planX",
  "generated": "YYYY-MM-DD",
  "days": {
    "trainingsdag": { "totals": {...}, "meals": [...] },
    "rustdag": { "totals": {...}, "meals": [...] }
  }
}
```

### 3. Valideer de website
- Controleer dat `docs/index.html`, `docs/macros.html` en `docs/shopping.html` de nieuwe data correct laden
- Controleer of de dagtotalen in de UI matchen met de berekende totalen
- Controleer dat de boodschappenlijst-pagina overeenkomt met `Boodschappenlijst.md`

### 4. Rapporteer
Meld welke bestanden zijn bijgewerkt en een samenvatting van de nieuwe dagtotalen.

## Constraints

- Geen externe dependencies toevoegen aan de website
- Behoud het dark mode / industrial design
- Gebruik dezelfde CSS-variabelen en structuur als bestaande pagina's in `docs/`

$args
