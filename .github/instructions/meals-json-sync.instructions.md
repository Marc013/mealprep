---
description: "Use when editing docs/data/meals.json. Enforces bidirectional synchronization back to meals/plan*/ markdown files and mandatory UI validation. Keywords: meals.json, docs data, sync back, dagtotalen, boodschappen, website validation."
applyTo: "docs/data/meals.json"
---

# docs/data/meals.json Sync Regels

Bij wijzigingen in `docs/data/meals.json`:

1. Bepaal het betrokken plan (`planX`) en de gewijzigde blokken:
- `weekplans.planX.totals`
- `meals.*-planX`
- `shopping.planX`
2. Synchroniseer deze wijzigingen terug naar planbestanden in `meals/planX/`:
- maaltijdbestanden
- `Macros_Dagtotalen.md`
- `Boodschappenlijst.md`
3. Corrigeer inconsistenties direct in dezelfde wijzigingsronde.

## Validatie (verplicht)

Na elke inhoudelijke wijziging:
- Controleer `docs/index.html`
- Controleer `docs/macros.html`
- Controleer `docs/shopping.html`

## Bronbeleid

- Gebruik actuele waarden uit `docs/data/meals.json` als bron voor website-gedrag.
- Gebruik markdownbestanden als leesbare projectdocumentatie die exact dezelfde waarden moeten tonen.
