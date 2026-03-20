# GitHub Pages Website — Mealprep Tracker

> **Skill:** Gebruik `.github/skills/github-pages/` voor templates en design system.
> **Command:** `/github-pages-scaffold`

---

## STATUS: GEÏMPLEMENTEERD

De GitHub Pages website is volledig gebouwd en beschikbaar in `docs/`.

### Gegenereerde bestanden

| Bestand                | Beschrijving                                     |
| ---------------------- | ------------------------------------------------ |
| `docs/index.html`      | Dagplanning met weekplan + training/rust toggle  |
| `docs/shopping.html`   | Boodschappenlijst per weekplan + LocalStorage    |
| `docs/styles.css`      | Industrial design system (dark mode only)        |
| `docs/app.js`          | MealApp + ShoppingApp met weekplan-ondersteuning |
| `docs/data/meals.json` | Geconsolideerde data met 2 weekplannen           |

### Weekplannen

| ID      | Naam                   | Bron                         |
| ------- | ---------------------- | ---------------------------- |
| `plan1` | Kip Ketjap & Stoofpot  | `meals/plan1/`, `src/plan1/` |
| `plan2` | Teriyaki & Tomaat-Mozz | `meals/plan2/`, `src/`       |

De weekplan-selector is beschikbaar in `index.html` en `shopping.html`. Keuze wordt opgeslagen in LocalStorage.

### Directory structuur

```text
C:\Temp\Meals\
├── docs/                    # GitHub Pages output
│   ├── index.html
│   ├── shopping.html
│   ├── styles.css
│   ├── app.js
│   └── data/meals.json
├── meals/                   # Maaltijdrecepten (markdown)
│   ├── plan1/               # Kip Ketjap & Stoofpot (gekopieerd uit mealprep repo)
│   │   ├── maaltijd-1-whey-shake-ochtend.md
│   │   ├── maaltijd-2-trainingsdag-power-oats.md
│   │   ├── maaltijd-3-trainingsdag-scramble-brood.md
│   │   ├── maaltijd-4-trainingsdag-kip-ketjap-rijst.md
│   │   ├── maaltijd-5-trainingsdag-stoofpot-zoete-aardappel.md
│   │   └── ... (18 maaltijdbestanden)
│   └── plan2/               # Teriyaki & Tomaat-Mozzarella
│       ├── Ontbijt_1015_Skyr_Kwark_Bowl.md
│       ├── Lunch_1300_Ei_Ham_Skillet.md
│       ├── Mealprep1_1545_Teriyaki_Gehaktpan.md
│       └── Mealprep2_1830_Tomaat_Mozzarella_Pan.md
└── src/                     # Bronbestanden & referenties
    ├── plan1/               # Plan1 bronbestanden (gekopieerd uit mealprep repo)
    │   ├── boodschappen.md
    │   ├── macros.md
    │   ├── weekplan-1-week.md
    │   ├── Ingredienten.md
    │   └── Prompt.md
    ├── Boodschappenlijst.md # Plan2 boodschappen
    ├── Ingredienten.md
    ├── Macros_Dagtotalen.md
    └── voedingswaardetabel_referentie.md
```

### Data consolidatie

Bronbestanden → `docs/data/meals.json`:

- `src/Macros_Dagtotalen.md` → `targets` (training/rust)
- `src/Boodschappenlijst.md` → `shopping.plan2.categories[]`
- `meals/plan2/*.md` → `meals{}` object (Teriyaki, Tomaat-Mozzarella)
- `meals/plan1/*.md` → `meals{}` object (Kip Ketjap, Stoofpot)
- `src/plan1/boodschappen.md` → `shopping.plan1.categories[]`

---

## CONTEXT

Je bent een **CSS Award-winnende frontend developer** gespecialiseerd in brutalist/industrial design. Je maakt een statische GitHub Pages website voor persoonlijke meal prep tracking.

---

## BRONDATA

Brondata locaties:

| Locatie  | Inhoud                                      |
| -------- | ------------------------------------------- |
| `meals/` | Maaltijdrecepten (markdown)                 |
| `src/`   | Voedingswaarden, boodschappenlijst, macro's |

**Let op:** Neem GEEN visuele elementen over uit externe docs. Data-structuur mag aangepast worden.

---

## DESIGN BRIEFING: STRONGMAN AESTHETIC

### Kernwaarden

- **Ruw & industrieel** — staal, beton, ijzer texturen
- **Geen franje** — functioneel, direct, no-nonsense
- **Kracht** — zware typografie, bold contrasten
- **Doorzettingsvermogen** — visuele hints naar deadlifts, atlas stones, farmer's walks

### Visuele richting

- Dark mode only (geen light mode toggle nodig)
- Kleurenpalet: zwart, donkergrijs, accent in rood/oranje (waarschuwingskleuren)
- Typography: condensed/compressed fonts voor headers, monospace voor data
- Subtiele texturen (staal, beton, grip patterns)
- Minimale maar impactvolle animaties (geen bouncy/playful effects)

---

## FUNCTIONELE EISEN

| Feature               | Beschrijving                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **Weekplanning**      | Overzicht van alle maaltijden per dag + tijdstip. Duidelijk scanbaar op één scherm             |
| **Receptpagina's**    | Individuele recepten met: ingrediënten, macro's (kcal/eiwit/koolhydraten/vet), bereidingswijze |
| **Boodschappenlijst** | Geaggregeerde ingrediënten met checkbox-functionaliteit. LocalStorage voor persistentie        |
| **Navigatie**         | Snelle toegang tussen weekoverzicht ↔ recepten ↔ boodschappenlijst                             |

### Extra pagina's

- `shopping.html` — boodschappenlijst
- Receptpagina's (dynamisch of per recept)

---

## TECHNISCHE SPECIFICATIES

- **Stack:** HTML5, CSS3, Vanilla JavaScript (geen frameworks)
- **Hosting:** GitHub Pages compatible (statisch, geen server-side)
- **Responsive:** Mobile-first, optimaal bruikbaar tijdens boodschappen doen (smartphone) én koken (tablet/laptop)
- **Performance:** Geen externe dependencies, snelle laadtijd
- **Data opslag:** JSON voor maaltijddata, LocalStorage voor afvinken

---

## DELIVERABLES

1. Volledige mapstructuur voor GitHub Pages
2. `index.html` — weekoverzicht/landing
3. Receptpagina's (per recept of dynamisch geladen)
4. `shopping.html` — boodschappenlijst
5. `styles.css` — complete styling
6. `app.js` — interactiviteit (navigatie, afvinken, data loading)
7. `data/meals.json` — gestructureerde maaltijddata

---

## KWALITEITSCRITERIA

- [ ] Voelt aan als een tool voor een serieuze atleet, niet als een lifestyle blog
- [ ] Scanbaar in <3 seconden: "Wat eet ik vandaag?"
- [ ] Boodschappenlijst bruikbaar met één hand (duim-reikbaar op mobiel)
- [ ] Macro's prominent zichtbaar bij elk gerecht
- [ ] Geen scrolling nodig voor dagplanning op desktop
