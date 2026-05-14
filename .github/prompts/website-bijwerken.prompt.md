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

### 2. Synchroniseer docs/data/meals.json
Werk de **bestaande** `docs/data/meals.json` bij binnen het huidige repositorieschema:
- Update `weekplans.planX.totals`
- Update `meals.[meal-id-planX]` varianten en ingrediënten
- Update `shopping.planX`
- Behoud alle andere plannen en sleutelstructuren ongewijzigd

Belangrijk:
- **Niet** vervangen door een vereenvoudigd alternatief JSON-schema
- Compatibiliteit met bestaande `docs/app.js` runtime moet behouden blijven

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
