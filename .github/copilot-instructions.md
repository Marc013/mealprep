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
- Eiwit mag beperkt boven target uitkomen wanneer dit praktisch nut heeft (verzadiging/uitvoerbaarheid), maar niet structureel extreem boven target.
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

## Outputkwaliteit en flexibiliteit

- Stuur op maximale outputkwaliteit: macro-correctheid, praktische uitvoerbaarheid, smaakbehoud na opwarming en heldere instructies.
- Gebruik gecontroleerde flexibiliteit: strikt op macrogrenzen, flexibel in kleine gram-finetuning voor betere maaltijdkwaliteit.
- Vermijd over-rigide plannen die theoretisch kloppen maar in de praktijk minder haalbaar of minder smakelijk zijn.
- Conflictregel: bij botsing tussen receptkwaliteit/realistische porties en oude voorbeeldhoeveelheden, kies de praktisch uitvoerbare optie zolang kcal, vet en koolhydraten de dagmaxima niet overschrijden.
- Consistentieregel: alles wat in Voorbereiding/Bereiding wordt genoemd, moet in de ingrediëntenlijst staan met gramhoeveelheid, tenzij expliciet als "optioneel" gemarkeerd.

Wijzigingslogica bij gebruikersfeedback (verplicht):
- 1) Pas eerst de gevraagde receptbeperking of ingrediëntwijziging toe.
- 2) Herbereken direct de macro's per aangepaste maaltijd.
- 3) Update daarna `Macros_Dagtotalen.md`.
- 4) Synchroniseer daarna `Boodschappenlijst.md`.
- 5) Geef afsluitend een korte validatiesamenvatting met dagtotalen en grenscheck.

## Hard-limit realisme checks (Verbetering 5)

- **Geen symbolische porties**: Als een ingredient in een recept opgenomen is, gebruik alleen realistische hoeveelheden. Voorbeeld: 3g rijst in een rijstgerecht is onmogelijk; vervang door minimale werkzame portie (min. 50g droge rijst voor rijstdis) of vervang ingredient geheel.
- **Hele eenheden prioriteit**: Werk standaard met hele eenheden (hele eieren, hele boterhammen à 35g, hele bananen, hele porties ingrediënten). Fractionale hoeveelheden alleen als praktisch gerechtvaardigd (bijv. halve paprika na snijden).
- **Gebruiker-gespecificeerde ingredient-caps worden permanent**: Caps als "max 100g champignons", "max 125g passata", "max 35g pindakaas" gelden voor alle toekomstige recepten in dezelfde en volgende plannen tenzij expliciet aangepast door gebruiker.
- **Nul-tolerantie op macrogrenzen**: Dagmaxima voor kcal, vet en koolhydraten zijn absolute bovengrenzen. Hard-limit checks voorkomen symbolische/onrealistische porties die micro-impact hebben maar nutteloos zijn.

## Bronbestanden

| Bestand                                  | Doel                                   |
| :--------------------------------------- | :------------------------------------- |
| `promp.md`                               | Dagmacro's, shake-definitie, eettijden |
| `src/Ingredienten.md`                    | Voorkeursingrediënten (niet exclusief) |
| `src/voedingswaardetabel_referentie.md`  | Voedingswaarden bron 1                 |
| `src/voedingswaarde_handmatig.md`        | Voedingswaarden bron 2                 |
| `src/ontbrekende_macros_lijst.md`        | Nieuw opgehaalde waarden (persistent)  |
| `src/Bloemkoolrijst_Jumbo.md`            | Productwaarden bloemkoolrijst          |

Toelichting ingredientgebruik:
- Ingredienten buiten `src/Ingredienten.md` zijn toegestaan.
- Voorwaarde: gebruik officiële productnaam + macrobron volgens de vaste bronvolgorde.
- Als een ingredient nog ontbreekt in beide bronbestanden, voeg het eerst toe aan `src/ontbrekende_macros_lijst.md` en gebruik het daarna.
