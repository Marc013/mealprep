# Meals workspace — Copilot instructies

Deze workspace bevat mealprep-maaltijdplannen voor krachtsport en training.

## Slash commands

| Command | Beschrijving |
|---------|--------------|
| `/mealplan-genereren` | Genereer een nieuw maaltijdplan met macro's |
| `/github-pages-scaffold` | Genereer een GitHub Pages website |

## Skills

| Skill | Locatie | Beschrijving |
|-------|---------|--------------|
| `github-pages` | `.github/skills/github-pages/` | Scaffold statische websites met industrial design |
| `mealplan` | `.github/skills/mealplan/` | Mealprep-plannen met macro-tracking |

Zie [.github/skills/README.md](.github/skills/README.md) voor volledige documentatie en voorbeelden.

## Vaste regels (altijd van toepassing)

- Dagmacro's zijn **strikte bovengrenzen** — nooit overschrijden. Targets staan in `promp.md`.
- Voedingswaarden opzoeken in volgorde: `src/voedingswaardetabel_referentie.md` → `src/voedingswaarde_handmatig.md` → https://www.voedingswaardetabel.nl/
- Gebruik altijd de **officiële productnaam** uit de bronbestanden.
- Elke ingredient heeft een **exacte gramhoeveelheid** — ook smaakmakers en kruiden.
- Geen vis, zeevruchten, orgaanvlees of omelet.
- Maximaal 2 mealprep-gerechten, beide eenpansgerechten met sauscomponent.

## Bronbestanden

| Bestand                                  | Doel                                   |
| :--------------------------------------- | :------------------------------------- |
| `promp.md`                               | Dagmacro's, shake-definitie, eettijden |
| `Ingredienten.md`                        | Beschikbare ingrediënten               |
| `src/voedingswaardetabel_referentie.md`  | Voedingswaarden bron 1                 |
| `src/voedingswaarde_handmatig.md`        | Voedingswaarden bron 2                 |
| `src/ontbrekende_macros_lijst.md`        | Nieuw opgehaalde waarden (persistent)  |
| `src/Bloemkoolrijst_Jumbo.md`            | Productwaarden bloemkoolrijst          |
