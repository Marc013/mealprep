# Recepten validatie-status

Laatst bijgewerkt: 2026-03-19
Brondata: src/voedingswaardetabel_referentie.md

## Doel
Overzicht van welke ingredienten in de huidige recepten al expliciet zijn gevalideerd met opgehaalde Voedingswaardetabel-data.

## Status per recept

### Ontbijt_1015_Skyr_Kwark_Bowl.md
- Bevestigd uit Voedingswaardetabel-ophaalset: geen directe product-ID vastgelegd voor skyr en kwark.
- Huidige aanpak: macro's op productgroepniveau, met notitie in recept.
- Actie voor volledige hard-validatie: product-ID's van skyr en magere kwark toevoegen aan referentie.

### Lunch_1300_Ei_Ham_Skillet.md
- Bevestigd uit Voedingswaardetabel-ophaalset: tomaat, ui (gebakken), mozzarella.
- Aanvulling via etiket/praktische bron: tostiham, passata.
- Opmerking: recept is aangepast zodat er geen omeletcomponent meer in zit.

### Mealprep1_1545_Teriyaki_Gehaktpan.md
- Bevestigd uit Voedingswaardetabel-ophaalset: ui (gebakken) als benadering, tomaat (rauw) als basisgroente-referentie.
- Bevestigd uit lokale bron: bloemkoolrijst (Jumbo) via src/Bloemkoolrijst_Jumbo.md.
- Nog niet direct bevestigd via opgehaalde product-ID: rundergehakt, bulgur.
- Aanvulling via etiket/praktische bron: teriyaki saus, mayolijn.

### Mealprep2_1830_Tomaat_Mozzarella_Pan.md
- Bevestigd uit Voedingswaardetabel-ophaalset: tomaat, ui (gebakken), avocado, mozzarella.
- Bevestigd uit lokale bron: bloemkoolrijst (Jumbo) via src/Bloemkoolrijst_Jumbo.md.
- Bevestigd via etiketdata src/voedingswaarde_handmatig.md: Macaroni Vlugkokend - Jumbo (346 kcal, 11,4 g P, 1,5 g V, 70,0 g KH per 100 g).
- Aanvulling via etiket/praktische bron: sojasaus, passata, tostiham.

## Conclusie
- Voedingswaardetabel-data is blijvend opgeslagen in src en actief hergebruikt.
- Voor een volledige 100% hard-validatie van alle gebruikte ingredienten zijn nog extra product-ID-ophalingen nodig voor kwark, skyr, rundergehakt en bulgur.
- Macaroni Vlugkokend is bevestigd via src/voedingswaarde_handmatig.md (Jumbo etiket).