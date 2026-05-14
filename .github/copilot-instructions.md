# Meals workspace — Copilot instructies

Deze workspace bevat mealprep-maaltijdplannen voor krachtsport en training.

## Automatische activatie (geen handmatige AI-instructie nodig)

Gebruik deze regels standaard, ook zonder slash command:

- Bij wijzigingen in `meals/plan*/`:
	- Pas altijd ook `Macros_Dagtotalen.md` en `Boodschappenlijst.md` aan binnen hetzelfde plan.
	- Synchroniseer daarna altijd `docs/data/meals.json` voor hetzelfde plan.
	- Valideer daarna altijd UI op `docs/index.html`, `docs/macros.html` en `docs/shopping.html`.
- Bij wijzigingen in `docs/data/meals.json`:
	- Behandel de actuele plan-data als bron voor UI-weergave.
	- Synchroniseer afgeleide markdownbestanden in `meals/plan*/` zodat alles consistent blijft.
- Bij wijzigingen in `src/ingredients.json`:
	- Volg verplicht de onderhoudsinstructie en draai validatie-script.

Voer deze workflow proactief uit; wacht niet op een extra gebruikersprompt.

## Source-of-truth en synchronisatie

- Voor website-output geldt: `docs/data/meals.json` is leidend voor wat in de UI verschijnt.
- Voor plan-documentatie geldt: mealbestanden + `Macros_Dagtotalen.md` + `Boodschappenlijst.md` moeten numeriek en inhoudelijk overeenkomen met de actieve planblokken in `docs/data/meals.json`.
- Corrigeer inconsistenties direct in alle gekoppelde bestanden binnen dezelfde wijzigingsronde.

## Slash commands

| Command | Beschrijving | Wanneer gebruiken |
|---------|--------------|-------------------|
| `/mealplan-genereren` | Genereer een volledig nieuw weekschema met macro's | Nieuw plan aanmaken |
| `/maaltijd-aanpassen` | Pas een maaltijd aan op basis van feedback | Recept wijzigen, ingredient vervangen, portie aanpassen |
| `/plan-valideren` | Valideer macro's, dagtotalen en consistentie van een plan | Kwaliteitscheck op een bestaand plan |
| `/ingredient-toevoegen` | Voeg een nieuw product toe aan ingredients.json | Nieuw product opzoeken en registreren |
| `/website-bijwerken` | Sync de GitHub Pages website met de nieuwste plandata | Na elke planwijziging de site vernieuwen |
| `/github-pages-scaffold` | Genereer een GitHub Pages website | Eerste opzet van de website |

## Agents

| Agent | Beschrijving |
|-------|--------------|
| `MealplanAgent` | Genereert en beheert mealplannen, berekent macro's, valideert grenzen |
| `GitHubPagesAgent` | Scaffoldt en beheert de statische GitHub Pages website |

## Skills

| Skill | Locatie | Beschrijving |
|-------|---------|--------------|
| `mealplan` | `.github/skills/mealplan/` | Mealprep-plannen met macro-tracking |
| `github-pages` | `.github/skills/github-pages/` | Scaffold statische websites met industrial design |

Zie [.github/skills/README.md](.github/skills/README.md) voor volledige documentatie en voorbeelden.

## Snelgids: welk commando gebruik ik?

```
Nieuw plan nodig?          → /mealplan-genereren
Maaltijd aanpassen?        → /maaltijd-aanpassen  [wat + welke maaltijd]
Plan controleren?          → /plan-valideren
Nieuw product toevoegen?   → /ingredient-toevoegen [productnaam]
Website vernieuwen?        → /website-bijwerken
```

## Vaste regels (altijd van toepassing)

- Dagmacro's zijn **strikte bovengrenzen** — nooit overschrijden. Targets staan in `promp.md`.
- Benader dagtargets zo dicht mogelijk; kleine afwijkingen van enkele grammen zijn toegestaan. Grote afwijkingen vermijden.
- Eiwit mag beperkt boven target uitkomen wanneer dit praktisch nut heeft (verzadiging/uitvoerbaarheid), maar niet structureel extreem boven target.
- Verdeel macro's evenredig over de dag; voorkom dat 1 maaltijd disproportioneel veel van 1 macro bevat.
- Voedingswaarden opzoeken in volgorde: `src/ingredients.json` → https://www.voedingswaardetabel.nl/ (bij ontbreken eerst toevoegen aan `src/ingredients.json`)
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
| `src/ingredients.json`                   | Geconsolideerde voedingswaarden        |
| `src/Bloemkoolrijst_Jumbo.md`            | Productwaarden bloemkoolrijst          |

Toelichting ingredientgebruik:
- Ingredienten buiten `src/Ingredienten.md` zijn toegestaan.
- Voorwaarde: gebruik officiële productnaam + macrobron volgens de vaste bronvolgorde.
- Als een ingredient nog ontbreekt in `src/ingredients.json`, voeg het eerst toe aan `src/ingredients.json` en gebruik het daarna.

Onderhoud `src/ingredients.json` (verplicht):
- Volg aanvullend de checklist in `.github/instructions/ingredients-json-onderhoud.instructions.md`.
- Valideer na elke wijziging met: `pwsh -NoProfile -File .github/scripts/validate-ingredients-json.ps1`.
- Houd het bestand altijd up-to-date bij nieuwe ingrediënten of macro-correcties.
- Houd `ingredients` alfabetisch gesorteerd op `name`.
- Houd records geordend en consistent in veldvolgorde: `id`, `name`, `category`, `unit`, `macros_per_100g`, `sourcing`.
- Werk metadata direct bij: `last_updated` en `total_ingredients` moeten altijd kloppen met de actuele inhoud.
