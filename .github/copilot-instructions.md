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
- Benader dagtargets zo dicht mogelijk; kleine afwijkingen van enkele grammen zijn toegestaan. Grote afwijkingen vermijden.
- Eiwit mag beperkt boven target uitkomen, maar niet structureel extreem boven target.
- Verdeel macro's evenredig over de dag; voorkom dat 1 maaltijd disproportioneel veel van 1 macro bevat.
- Voedingswaarden opzoeken in volgorde: `src/voedingswaardetabel_referentie.md` → `src/voedingswaarde_handmatig.md` → https://www.voedingswaardetabel.nl/
- Gebruik altijd de **officiële productnaam** uit de bronbestanden.
- Elke ingredient heeft een **exacte gramhoeveelheid** — ook smaakmakers en kruiden.
- Geen vis, zeevruchten, orgaanvlees of omelet.
- Maximaal 2 mealprep-gerechten, beide eenpansgerechten met sauscomponent.
- Rustdagmaaltijden moeten maximaal volume en verzadiging prioriteren (veel groente/vezels/vocht, lage energiedichtheid).
- De maaltijd van 10:15 bestaat verplicht uit: kwark of skyr (niet beide), halfvolle yoghurt, diepvries bosvruchten (Jumbo), banaan, kaneelpoeder, optioneel 100% pindakaas naturel, optioneel honing.
- De maaltijd van 13:00 moet eenvoudig zijn en volledig te bereiden + eten binnen 30 minuten.
- Beschrijf per maaltijd zowel voorbereiding (snijden, marineren, klaarzetten) als bereiding.
- Per week maximaal 2 verschillende mealprep-gerechten; beide moeten training- en rustdag-varianten hebben met slimme koolhydraatwissel. Vermijd bloemkoolrijst waar mogelijk; maximaal in 1 gerecht toepassen.
- Mealprep-gerechten zijn sterk gekruid en hebben oosterse, Mexicaanse of Arabische invloeden.
- Maaltijden moeten hongergevoel actief bestrijden (volume, vezels, eiwit, vocht, textuur).

## Bronbestanden

| Bestand                                  | Doel                                   |
| :--------------------------------------- | :------------------------------------- |
| `promp.md`                               | Dagmacro's, shake-definitie, eettijden |
| `src/Ingredienten.md`                    | Beschikbare ingrediënten               |
| `src/voedingswaardetabel_referentie.md`  | Voedingswaarden bron 1                 |
| `src/voedingswaarde_handmatig.md`        | Voedingswaarden bron 2                 |
| `src/ontbrekende_macros_lijst.md`        | Nieuw opgehaalde waarden (persistent)  |
| `src/Bloemkoolrijst_Jumbo.md`            | Productwaarden bloemkoolrijst          |
