---
name: mealplan
description: "Generate meal prep plans for strength training with macro tracking. Creates meal files, shopping lists, and day totals. Use when: creating meal plan, mealprep for fitness, macro calculation, weekly food schedule. Keywords: mealplan, mealprep, macro's, krachtsport, voedingsschema, weekplanning, boodschappenlijst."
argument-hint: "Optional: specific ingredients, foods to avoid, or focus (e.g., 'more chicken' or 'avoid avocado')"
---

# Mealplan Skill

Genereer volledige mealprep-plannen voor krachtsport met macro-tracking.

## When to Use

- Nieuw weekschema of dagschema maken
- Maaltijden met macro-berekeningen
- Boodschappenlijst genereren
- Voedingswaarden opzoeken en valideren

## Required Project Files

Deze skill verwacht de volgende bestanden in je project:

| Bestand | Doel | Template |
|---------|------|----------|
| `promp.md` | Dagmacro's, shake-definitie, eettijden | [config-template.md](./assets/config-template.md) |
| `src/Ingredienten.md` | Voorkeursingrediënten | Lijst met producten (niet exclusief) |
| `src/ingredients.json` | Geconsolideerde voedingswaarden | Macro's per 100g + aanvullingen |

## Procedure

### 1. Lees configuratie

```
promp.md → dagmacro's en constraints
src/Ingredienten.md → voorkeursproducten (niet exclusief)
```

### 2. Bereken macro-ruimte

Shake-blok is vast (zie [macro-regels.md](./references/macro-regels.md)):
- Trek shake-macros af van dagtotaal
- Restant verdelen over 4 maaltijden

### 3. Hard-limit realisme checks (Verbetering 5)

Voordat recepten finaal worden, valideer:
- **Geen symbolische porties**: Hoeveelheden < 50g per ingredient (behalve kruiden/oliën) alleen als micro-impact onderbouwd. Voorbeeld: 3g rijst in rijstdis → vervang door 70g+ of verwijder.
- **Hele eenheden**: Werk met hele eieren (~50g M-ei), hele boterhammen (35g), hele bonen-maten. Fractie alleen gerechtvaardigd.
- **User-caps permanent**: Zodra gebruiker zegt "max 100g champignons", dit handhaven in alle toekomstige varianten tenzij expliciet opgeheven.
- **Macrogrenzen nul-tolerantie**: kcal, vet, KH mogen dagmax niet overschrijden; corrigeer altijd.

### 4. Ontwerp maaltijden

| Maaltijd | Tijdstip | Type |
|----------|----------|------|
| Ontbijt | 10:15 | Vast recept |
| Lunch | 13:00 | Vast recept |
| Mealprep 1 | 15:45 | Training + rust variant |
| Mealprep 2 | 18:30 | Training + rust variant |

Verplichte ontwerpregels:
- Verdeel macro's evenredig over de dag; voorkom grote uitschieters per maaltijd.
- Rustdagmaaltijden prioriteren volume en verzadiging.
- 10:15 bevat verplicht: kwark of skyr (niet beide), halfvolle yoghurt, diepvries bosvruchten (Jumbo), banaan, kaneelpoeder, optioneel 100% pindakaas naturel, optioneel honing.
- 13:00 moet ultra-eenvoudig zijn en binnen 30 minuten totaal (voorbereiden + bereiden + eten).
- Per week maximaal 2 mealprep-gerechten, beide eenpansgerechten met sauscomponent en met training/rust-variant.
- Gebruik bij voorkeur geen bloemkoolrijst; maximaal in 1 mealprep-gerecht als alternatief met lage koolhydraten.
- Mealprep-smaakprofielen: oosters, Mexicaans of Arabisch, met duidelijke kruiding.

Kwaliteitsfocus tijdens ontwerp:
- Maximaliseer praktische uitvoerbaarheid en verzadiging zonder macrogrenzen te schenden.
- Gebruik gecontroleerde flexibiliteit in gramhoeveelheden wanneer dit smaak, textuur of mealprep-kwaliteit verbetert.
- Vermijd onnodige rigiditeit die plannen theoretisch correct maar praktisch zwakker maakt.
- Conflictregel: bij botsing tussen oude voorbeeldhoeveelheden en praktische receptkwaliteit, volg de praktisch betere variant zolang kcal, vet en koolhydraten onder de dagmaxima blijven.

### 4. Bereken macro's per ingredient

Voedingswaarden opzoeken in volgorde:
1. `src/ingredients.json`
2. https://www.voedingswaardetabel.nl/ → opslaan in `src/ingredients.json`

Ingrediëntenbeleid:
- Ingrediënten buiten `src/Ingredienten.md` zijn toegestaan als dit receptkwaliteit of macrobalans verbetert.
- Gebruik altijd de officiële productnaam uit de gebruikte macrobron.
- Staat een nieuw ingrediënt niet in `src/ingredients.json`, voeg het eerst toe aan `src/ingredients.json` en gebruik het daarna in recepten.
- Houd `src/ingredients.json` altijd netjes: up-to-date, alfabetisch gesorteerd op `name`, en met bijgewerkte metadata (`last_updated`, `total_ingredients`).
- Valideer na elke wijziging aan `src/ingredients.json` met: `pwsh -NoProfile -File .github/scripts/validate-ingredients-json.ps1`.

### 5. Valideer dagtotalen

- Dagmacro's zijn **strikte bovengrenzen**
- Benader target zo dicht mogelijk; kleine afwijking is toegestaan
- Eiwit iets boven target is acceptabel als dit functioneel is voor verzadiging/uitvoerbaarheid, maar vermijd structureel grote overschrijding
- Valideer ook evenredige macroverdeling over maaltijden
- Valideer consistentie tussen ingrediëntenlijst en tekst: alles in Voorbereiding/Bereiding staat ook in ingrediënten met gramhoeveelheid, behalve expliciet optionele toevoegingen
- Bij gebruikersfeedback op een bestaande maaltijd: werk verplicht in volgorde receptaanpassing -> maaltijdmacro's -> `Macros_Dagtotalen.md` -> `Boodschappenlijst.md` -> korte validatiesamenvatting
- Corrigeer porties indien nodig
- Geen overschrijdingen publiceren

### 5b. Kwaliteitsscore (verplicht voor eindoutput)

Voer een interne check uit op 5 assen en optimaliseer tot een gebalanceerd resultaat:
1. Macro-nauwkeurigheid en grensbewaking
2. Praktische bereidingstijd en workflow
3. Verzadiging en volume (met nadruk op rustdag)
4. Smaakbehoud en textuur na opwarming
5. Inkoop-efficiëntie en ingredient-hergebruik

Doel: niet alleen “macro-correct”, maar ook aantoonbaar praktisch en volhoudbaar in de week.

### 6. Genereer output

Gebruik templates uit [./assets/](./assets/):
- [ontbijt-template.md](./assets/ontbijt-template.md)
- [mealprep-template.md](./assets/mealprep-template.md)
- [dagtotalen-template.md](./assets/dagtotalen-template.md)
- [boodschappenlijst-template.md](./assets/boodschappenlijst-template.md)

## Output Files

| Bestand | Beschrijving |
|---------|--------------|
| `Ontbijt_1015_[Naam].md` | Ontbijtrecept met macro's |
| `Lunch_1300_[Naam].md` | Lunchrecept met macro's |
| `Mealprep1_1545_[Naam].md` | Eerste mealprep-gerecht |
| `Mealprep2_1830_[Naam].md` | Tweede mealprep-gerecht |
| `Macros_Dagtotalen.md` | Samenvatting dagmacro's |
| `Boodschappenlijst.md` | Weekinkopen per winkel |

## Constraints

Zie [macro-regels.md](./references/macro-regels.md) voor complete regelset:

- **Exacte gramhoeveelheden** voor alle ingrediënten
- **Officiële productnamen** uit bronbestanden
- **Geen vis, zeevruchten, orgaanvlees, omelet**
- **Max 2 mealprep-gerechten**, beide eenpansgerechten met saus
- **Training + rust varianten** per mealprep-gerecht
- **Per maaltijd aparte secties voor Voorbereiding en Bereiding**
- **Rustdag: hoge verzadiging en volume als prioriteit**

## Customization

Pas `promp.md` aan voor andere doelgroepen:
- Wijzig dagmacro's (kcal, eiwit, vet, koolhydraten)
- Pas shake-definitie aan of verwijder
- Wijzig eettijden
