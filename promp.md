# Maaltijdplan configuratie

> Configuratiebestand — bevat dagmacro's, shake-definitie en eettijden.
> Workflow en regels staan in `.github/agents/MealplanAgent.agent.md` en `.github/instructions/maaltijdplan-regels.instructions.md`.
> Gebruik `/mealplan-genereren` in Copilot Chat om een nieuw plan te genereren.

## Dagmacro's (strikte bovengrenzen — nooit overschrijden)

### Trainingsdag

| Macro        | Maximum |
| :----------- | :------ |
| Kcal         | 2900    |
| Eiwitten     | 190 g   |
| Vetten       | 60 g    |
| Koolhydraten | 400 g   |

### Rustdag

| Macro        | Maximum |
| :----------- | :------ |
| Kcal         | 1880    |
| Eiwitten     | 190 g   |
| Vetten       | 80 g    |
| Koolhydraten | 100 g   |

## Vaste shake-momenten

Beide shakes zijn identiek en staan vast:

- **07:30 uur**: 50 g [Perfect Whey Protein - XXL Nutrition][whey] met water + 1 stuk fruit
- **21:15 uur**: 50 g [Perfect Whey Protein - XXL Nutrition][whey] met water + 1 stuk fruit

Shakeblok totaal (beide shakes + fruit, vast): **535 kcal / 79 g eiwit / 6 g vet / 38 g KH**

**Whey 50 g macro's:**

| Macro        | Per 50 g |
| :----------- | :------- |
| Kcal         | 200      |
| Eiwitten     | 39 g     |
| Vetten       | 3 g      |
| Koolhydraten | 4 g      |

**Fruitkeuze per shake-moment (kies 1):**

- 1 appel
- 1 banaan
- 2 kiwi's
- 2 mandarijnen
- 200 g druiven

## Eettijden

| Tijdstip | Maaltijd             |
| :------- | :------------------- |
| 07:30    | Shake + fruit (vast) |
| 10:15    | Ontbijt              |
| 13:00    | Lunch                |
| 15:45    | Mealprep maaltijd 1  |
| 18:30    | Mealprep maaltijd 2  |
| 21:15    | Shake + fruit (vast) |

## Ingrediëntenbron

Gebruik `src/Ingredienten.md` als primaire ingrediëntenbron.

**Ontbijtsuggesties** (voel je vrij om hiervan af te wijken):

- Skyr
- Yoghurt (vermeld vetgehalte: mager / halfvol / vol)
- Magere kwark
- Havervlokken (Crownfield)
- Diepvries fruit:
  - [Jumbo Bosvruchten 750 g][jb1]
  - [Jumbo Vriesverse Bosvruchten 750 g][jb2]
  - [Jumbo Aardbeien Diepvries 750 g][jb3]
  - [Jumbo Frambozen Diepvries 750 g][jb4]
  - [Jumbo Smoothiemix Mango-Aardbei-Havermout-Framboos 250 g][jb5]
  - [Jumbo Vriesverse Blauwe Bessen 750 g][jb6]
- Vers fruit: appel, banaan, kiwi, mandarijn, druiven
- Gedroogde rozijnen
- Kaneelpoeder
- Honing

[whey]: https://xxlnutrition.com/nl/perfect-whey-protein
[jb1]: https://www.jumbo.com/producten/jumbo-bosvruchten-750g-212955ZK
[jb2]: https://www.jumbo.com/producten/jumbo-vriesverse-bosvruchten-voordeelverpakking-750-g-605582ZK
[jb3]: https://www.jumbo.com/producten/jumbo-aardbeien-diepvries-750g-391149BAK
[jb4]: https://www.jumbo.com/producten/jumbo-frambozen-diepvries-750-g-391150ZK
[jb5]: https://www.jumbo.com/producten/jumbo-smoothiemix-met-mango-aardbei-havermout-framboos-250-g-565054DS
[jb6]: https://www.jumbo.com/producten/jumbo-vriesverse-blauwe-bessen-voordeelverpakking-750-g-605584ZK
