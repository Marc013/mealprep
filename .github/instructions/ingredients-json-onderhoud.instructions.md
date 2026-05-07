---
description: "Use when reading, updating, validating or extending src/ingredients.json. Enforces upkeep rules: up-to-date content, alphabetical sorting, stable field order, and metadata sync. Keywords: ingredients.json, sorteren, alfabetisch, macrobron, onderhoud, metadata."
applyTo: "src/ingredients.json"
---

# Onderhoudschecklist voor src/ingredients.json

Gebruik deze checklist bij elke wijziging van src/ingredients.json.

## Verplicht onderhoud

1. Houd de inhoud up-to-date
- Voeg nieuwe ingredienten direct toe zodra ze in recepten of berekeningen worden gebruikt.
- Corrigeer bestaande macro's zodra een betrouwbaardere bron beschikbaar is.

2. Voorkom duplicaten
- Controleer op dubbele ingredienten op basis van naam.
- Hergebruik bestaande records waar mogelijk in plaats van nieuwe varianten aan te maken.
- Gebruik ook een strikte variant-check op naamnormalisatie (lowercase, zonder haakjes, zonder winkel-suffix, zonder leestekens/spaties).
- Behandel naamvarianten als potentieel duplicaat, bijvoorbeeld: `100% Pindakaas` en `100% pindakaas naturel`.
- Als twee records semantisch hetzelfde ingredient beschrijven, behoud 1 record als canonical en verwijder/merge de andere.

3. Sorteer alfabetisch
- Sorteer de array ingredients alfabetisch op name (A-Z).
- Behoud stabiele sortering zodat diffs klein en leesbaar blijven.

4. Houd recordstructuur consistent
- Gebruik per ingredient exact deze veldvolgorde:
  id, name, category, unit, macros_per_100g, sourcing
- Houd binnen macros_per_100g de veldvolgorde: kcal, protein, fat, carbs.
- Gebruik binnen sourcing de veldvolgorde: store, availability.

5. Synchroniseer metadata
- Werk last_updated bij op elke inhoudelijke wijziging.
- Zet total_ingredients gelijk aan het actuele aantal records in ingredients.

## Bron- en naamregels

- Gebruik officiele productnamen zoals vastgelegd in src/ingredients.json.
- Ontbreekt een ingredient: haal voedingswaarde op en voeg het direct toe aan src/ingredients.json.
- Leg alleen waarden vast per 100g in macros_per_100g.

## Validatie voor afronding

- Draai altijd dit script na wijzigingen in `src/ingredients.json`:
  `pwsh -NoProfile -File .github/scripts/validate-ingredients-json.ps1`
- JSON moet parsebaar zijn.
- ingredients is alfabetisch gesorteerd op name.
- Er zijn geen semantische duplicaten op basis van naamnormalisatie.
- total_ingredients klopt met het aantal records.
- last_updated is bijgewerkt.
- Er zijn geen verwijzingen naar losse macrobronbestanden buiten src/ingredients.json nodig voor runtime-gebruik.
