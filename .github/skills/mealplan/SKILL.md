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
| `src/Ingredienten.md` | Beschikbare ingrediënten | Lijst met producten |
| `src/voedingswaardetabel_referentie.md` | Voedingswaarden bron 1 | Macro's per 100g |
| `src/voedingswaarde_handmatig.md` | Voedingswaarden bron 2 | Aanvullende waarden |
| `src/ontbrekende_macros_lijst.md` | Cache voor opgehaalde waarden | Leeg starten |

## Procedure

### 1. Lees configuratie

```
promp.md → dagmacro's en constraints
src/Ingredienten.md → beschikbare producten
```

### 2. Bereken macro-ruimte

Shake-blok is vast (zie [macro-regels.md](./references/macro-regels.md)):
- Trek shake-macros af van dagtotaal
- Restant verdelen over 4 maaltijden

### 3. Ontwerp maaltijden

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

### 4. Bereken macro's per ingredient

Voedingswaarden opzoeken in volgorde:
1. `src/voedingswaardetabel_referentie.md`
2. `src/voedingswaarde_handmatig.md`
3. https://www.voedingswaardetabel.nl/ → opslaan in `src/ontbrekende_macros_lijst.md`

### 5. Valideer dagtotalen

- Dagmacro's zijn **strikte bovengrenzen**
- Benader target zo dicht mogelijk; kleine afwijking is toegestaan
- Eiwit iets boven target is acceptabel, maar vermijd structureel grote overschrijding
- Valideer ook evenredige macroverdeling over maaltijden
- Corrigeer porties indien nodig
- Geen overschrijdingen publiceren

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
