# Macro-regels Reference

Harde constraints voor mealplan-generatie.

## Voedingswaarde-opzoekingsvolgorde

**Verplichte volgorde:**

1. Zoek in `src/voedingswaardetabel_referentie.md`
2. Zoek in `src/voedingswaarde_handmatig.md`
3. Pas ingredientnaam aan naar **officiële naam** uit bronbestand
4. **Alleen als ontbrekend**: ophalen via https://www.voedingswaardetabel.nl/ → opslaan in `src/ontbrekende_macros_lijst.md` (alfabetisch, geen dubbelen)

## Ingrediëntregels

| Regel                  | Voorbeeld                                                          |
| ---------------------- | ------------------------------------------------------------------ |
| Exacte gramhoeveelheid | `150 g kipfilet`, `2 g Italiaanse kruiden`                         |
| Officiële productnaam  | Naam uit `src/` bronbestanden                                      |
| Kruiden meerekenen     | `2 g Italiaanse kruiden = 5,1 kcal / 0,3 g P / 0,1 g V / 0,3 g KH` |
| Zout en peper          | "naar smaak" (verwaarloosbaar)                                     |

## Macro-limieten

**Strikte bovengrenzen — nooit overschrijden:**

### Shakeblok (vast)

Beide shakes + fruit samen:
- **535 kcal**
- **79 g eiwit**
- **6 g vet**
- **38 g koolhydraten**

### Dagtotalen

| Dag          | Kcal | Eiwit |  Vet | Koolhydraten |
| ------------ | ---: | ----: | ---: | -----------: |
| Trainingsdag | 2900 | 190 g | 60 g |        400 g |
| Rustdag      | 1880 | 190 g | 80 g |        100 g |

## Harde verboden

- ❌ Vis, zeevruchten, orgaanvlees
- ❌ Omelet
- ❌ Aparte salade
- ❌ Meer dan 2 mealprep-gerechten

## Mealprep-vereisten

| Vereiste            | Beschrijving                               |
| ------------------- | ------------------------------------------ |
| **Eenpansgerecht**  | Alles in één pan bereid                    |
| **Sauscomponent**   | In gerecht of apart na opwarmen            |
| **Twee varianten**  | Trainingsdag (hoge KH) + rustdag (lage KH) |
| **Koolhydraatbron** | Bulgur (training) ↔ bloemkoolrijst (rust)  |
| **Opwarmbaar**      | Niet droog na magnetron                    |

## Validatie checklist

Na elke berekening:

- [ ] Ingredient-macro's optellen naar maaltijd-totaal
- [ ] Maaltijden optellen naar dagtotaal
- [ ] Geen overschrijding van bovengrenzen
- [ ] Porties gecorrigeerd indien nodig
