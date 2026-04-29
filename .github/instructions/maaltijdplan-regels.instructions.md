---
description: "Use when creating, editing or validating meal plan markdown files. Hard constraints for macro limits, nutrition source lookup, ingredient naming, macro validation and mealprep requirements. Keywords: maaltijdplan, mealprep, macro's berekenen, ingredienten, voedingswaarden, weekschema."
---

# Maaltijdplan — kwaliteitsregels met strikte macrogrenzen

> Volledige documentatie: [.github/skills/mealplan/references/macro-regels.md](../.github/skills/mealplan/references/macro-regels.md)

## Voedingswaarde-opzoekingsvolgorde (verplicht, exacte volgorde)

1. Zoek het ingredient in `src/voedingswaardetabel_referentie.md`
2. Zoek het ingredient in `src/voedingswaarde_handmatig.md`
3. Pas de ingredientnaam aan naar de **officiële naam** uit dat bronbestand
4. **Alleen als het ingredient in beide bestanden ontbreekt**: ophalen via https://www.voedingswaardetabel.nl/ en opslaan in `src/ontbrekende_macros_lijst.md` (alfabetisch gesorteerd, geen dubbelen)

## Ingrediëntregels

- Elke ingredient heeft een **exacte gramhoeveelheid** — ook smaakmakers, olie en gedroogde kruiden
- Gebruik altijd de **officiële productnaam** zoals die voorkomt in de `src/` bronbestanden
- Ingrediënten buiten `src/Ingredienten.md` zijn toegestaan; `src/Ingredienten.md` is een voorkeurslijst en geen exclusieve beperking
- Voor nieuwe ingrediënten geldt: eerst macrobron bepalen via de vaste bronvolgorde; ontbreekt het ingrediënt in beide bronbestanden, voeg het toe aan `src/ontbrekende_macros_lijst.md` vóór gebruik in recepten
- Bereken de macrobijdrage van kruiden en smaakmakers altijd expliciet mee (bijv. 2 g Italiaanse kruiden = 5,1 kcal / 0,3 g P / 0,1 g V / 0,3 g KH)
- Zout en peper mogen als "naar smaak" vermeld worden — macrobijdrage verwaarloosbaar

## Macro-limieten (strikte bovengrenzen — nooit overschrijden)

De dagmacro's zijn **strikte maxima**.
Daarnaast geldt: benader targets zo dicht mogelijk; kleine afwijkingen van enkele grammen zijn toegestaan, maar grote afwijkingen niet.
Eiwit mag beperkt boven target uitkomen als dit de praktische uitvoerbaarheid en verzadiging duidelijk verbetert, maar voorkom structurele grote overschrijdingen.

Shakeblok (vast, beide shakes + fruit samen): **535 kcal / 79 g eiwit / 6 g vet / 38 g KH**

| Dag          |  Kcal | Eiwit | Vet  | Koolhydraten |
| :----------- | ----: | ----: | ---: | -----------: |
| Trainingsdag | 2900  | 190 g | 60 g |        400 g |
| Rustdag      | 1880  | 190 g | 80 g |        100 g |

## Verboden (niet toegestaan)

- Geen vis, zeevruchten of orgaanvlees
- Geen omelet
- Geen losse salade als hoofdcomponent; een warme of geïntegreerde groentecomponent in een pan-gerecht is wel toegestaan
- Maximaal 2 mealprep-gerechten per dagschema

## Verplichte maaltijdopbouw per tijdstip

- 10:15 maaltijd bevat verplicht:
	- Kwark **of** Skyr (niet beide)
	- Halfvolle yoghurt
	- Diepvries bosvruchten (Jumbo)
	- Banaan
	- Kaneelpoeder
	- Optioneel: 100% pindakaas naturel
	- Optioneel: honing
- 13:00 maaltijd moet eenvoudig zijn en binnen **30 minuten totaal** (voorbereiden + bereiden + eten) haalbaar zijn.
- Per maaltijd moet zowel **Voorbereiding** als **Bereiding** expliciet beschreven zijn.

## Mealprep-vereisten

- Beide mealprep-gerechten zijn **eenpansgerechten**
- Beide bevatten een **sauscomponent** (onderdeel van het gerecht of apart toegevoegd na opwarming)
- Elk mealprep-gerecht heeft een **trainingsdag-variant** (hogere KH) én een **rustdag-variant** (lagere KH)
- Gebruik maximaal **2 verschillende** mealprep-gerechten per week
- Koolhydraatwissel moet trainingsdag en rustdag bedienen via alternatieven met lage KH voor rustdagen
- **Bij voorkeur geen bloemkoolrijst**; als gebruikt, dan in maximaal **1** mealprep-gerecht
- Gerechten moeten geschikt zijn voor meerdere porties vooruit koken en opwarmen zonder droog te worden
- Smaakprofiel: duidelijk gekruid met oosterse, Mexicaanse of Arabische invloeden
- Hongercontrole prioriteren via volume, vezels, eiwit en hoge verzadiging

## Macro-validatie (verplicht na elke berekening)

1. Controleer dat ingredient-niveau optelt naar het macroblok boven aan het maaltijdbestand
2. Controleer dat alle maaltijden samen optellen naar de dagdoelen in `promp.md` (en, indien aanwezig, de actieve `weekplans`-totalen in `docs/data/meals.json`)
3. Als een dagdoel dreigt te worden overschreden: **corrigeer porties en herbereken** — publiceer nooit een overschrijding van kcal, vet of koolhydraten
4. Controleer macro-evenredigheid per maaltijd: geen extreme pieken tenzij expliciet functioneel onderbouwd
5. Controleer tekstconsistentie: alle ingrediënten genoemd in Voorbereiding/Bereiding staan in de ingrediëntenlijst met gramhoeveelheid, behalve expliciet als optioneel gemarkeerde toevoegingen
6. Bij feedback op bestaande recepten geldt verplichte volgorde: eerst receptaanpassing, daarna herberekening maaltijdmacro's, vervolgens update van `Macros_Dagtotalen.md`, daarna `Boodschappenlijst.md`, en afsluitend een korte validatiesamenvatting

## Kwaliteitscriteria

- Concreet en praktisch — geen vage hoeveelheden
- Porties realistisch voor mealprep (meerdere porties per sessie)
- Smaken die ook na opwarming goed blijven
- Efficiënte ingredientcombinaties voor inkoop bij Jumbo of Lidl
- Bij conflict tussen oude voorbeeldhoeveelheden en praktische uitvoerbaarheid/smaak, gaat de praktische variant voor zolang dagmaxima voor kcal, vet en koolhydraten niet worden overschreden

## Hard-limit realisme checks (Verbetering 5)

### Geen symbolische porties
Als een ingredient in een recept voorkomt, moet de portie realistisch en meetbaar zijn:
- **Minimaal werkzaam**: Rijstdis bevat minimaal 50g droge rijst (gekookt ~150g), niet 3g
- **Uitzondering**: Smaakmakers en kruiden (bijv. 2g komijnpoeder, 1g chilipepper) zijn okay, ook in kleine hoeveelheden
- **Regel**: Bij twijfel: vervang onrealistische hoeveelheid door praktische portie of verwijder ingredient geheel

### Hele eenheden prioriteit
- **Eieren**: 1 hele ei (M) = ~50g zonder schaal; geen fractie tenzij recept expliciet schrijft "½ ei"
- **Brood**: 1 boterham = 35g, geen snijden. Meer brood → meer hele boterhammen
- **Overige**: Hele porties ingrediënten. Fractional cutting (bijv. halve paprika) alleen gerechtvaardigd bij bereiding

### Gebruiker-gespecificeerde ingredient-caps
Zodra gebruiker een maximumvoorschrift geeft (bijv. "max 100g champignons", "max 125g passata"):
- Dit wordt permanent constraint voor alle recepten in huida en volgende plannen
- Exceptions alleen na expliciet herverzoek door gebruiker
- Caps minimaliseren micro-impact op macroverdeling; prioriteer realismetisch gebruik

### Macrogrenzen: nul-tolerantie
- **Dagmax kcal, vet, KH zijn absolute bovengrenzen**
- Nooit een overschrijding publiceren; corrigeer recepten/porties tot macro's passen
- Controleer na elke receptaanpassing tegen dagmaxima

## Outputoptimalisatie (maximale kwaliteit met gecontroleerde flexibiliteit)

- Optimaliseer op praktische uitvoerbaarheid, smaakbehoud na opwarming, verzadiging en macro-nauwkeurigheid tegelijk
- Houd de macrogrenzen strikt, maar laat ruimte voor kleine receptmatige finetuning in gramhoeveelheden voor betere textuur/smaak
- Vermijd overmatige rigiditeit in formulering; focus op doelbereik en praktische planning in plaats van kunstmatige precisie zonder culinair nut
- Als meerdere opties macro-technisch gelijkwaardig zijn, kies de optie met hoogste mealprep-robustheid (heropwarmkwaliteit, eenvoud, beschikbaarheid ingrediënten)
