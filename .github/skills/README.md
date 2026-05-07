# Copilot Skills — Gebruikershandleiding

Deze repository bevat herbruikbare Copilot skills voor specifieke workflows.

## Overzicht Skills

| Skill                           | Doel                                     | Slash Command            |
| ------------------------------- | ---------------------------------------- | ------------------------ |
| [github-pages](./github-pages/) | Statische websites met industrial design | `/github-pages-scaffold` |
| [mealplan](./mealplan/)         | Mealprep-plannen met macro-tracking      | `/mealplan-genereren`    |

---

## Skill: github-pages

Genereert een complete statische GitHub Pages website met brutalist/industrial design.

### Wat wordt gegenereerd

```
docs/
├── index.html          # Landing page
├── styles.css          # Compleet design system
├── app.js              # Vanilla JS utilities
└── data/
    └── content.json    # Site content
```

### Gebruik

**Optie 1: Slash command**
```
/github-pages-scaffold meal prep tracker met weekoverzicht
```

**Optie 2: Vraag direct**
```
Maak een GitHub Pages website voor mijn portfolio
```

### Voorbeelden

#### Voorbeeld 1: Meal prep website
```
/github-pages-scaffold Strongman meal prep tracker met:
- Weekoverzicht van alle maaltijden
- Receptpagina's met macro's
- Boodschappenlijst met afvinken
```

#### Voorbeeld 2: Project documentatie
```
/github-pages-scaffold Documentatie site voor mijn API met:
- Overzicht endpoints
- Code voorbeelden
- Installatie instructies
```

#### Voorbeeld 3: Persoonlijk portfolio
```
/github-pages-scaffold Portfolio website met:
- Project showcase cards
- Contact informatie
- Skills overzicht
```

### Kopiëren naar ander project

```powershell
# Kopieer de skill folder
Copy-Item -Recurse ".github/skills/github-pages" "C:\path\to\other\repo\.github\skills\"
```

Na kopiëren direct beschikbaar via `/github-pages-scaffold`.

---

## Skill: mealplan

Genereert volledige mealprep-plannen voor krachtsport met macro-berekeningen.

### Wat wordt gegenereerd

```
Ontbijt_1015_[Naam].md
Lunch_1300_[Naam].md
Mealprep1_1545_[Naam].md
Mealprep2_1830_[Naam].md
Macros_Dagtotalen.md
Boodschappenlijst.md
```

### Vereiste projectbestanden

Voordat je de skill gebruikt, maak deze bestanden aan:

| Bestand                | Beschrijving                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `promp.md`             | Dagmacro's en configuratie (template: [config-template.md](./mealplan/assets/config-template.md)) |
| `src/Ingredienten.md`  | Lijst beschikbare ingrediënten                                                                    |
| `src/ingredients.json` | Geconsolideerde voedingswaarden (inclusief aanvullingen en cache)                                 |

Onderhoudsregel voor `src/ingredients.json`: houd dit bestand up-to-date, alfabetisch gesorteerd op ingredientnaam (`name`) en met correcte metadata (`last_updated`, `total_ingredients`).
Valideer wijzigingen met: `pwsh -NoProfile -File .github/scripts/validate-ingredients-json.ps1`.

### Gebruik

**Optie 1: Slash command**
```
/mealplan-genereren
```

**Optie 2: Met voorkeuren**
```
/mealplan-genereren gebruik meer kip en vermijd avocado
```

### Voorbeelden

#### Voorbeeld 1: Standaard mealplan
```
/mealplan-genereren
```
Genereert volledig weekschema met standaard configuratie.

#### Voorbeeld 2: Specifieke focus
```
/mealplan-genereren focus op hoge eiwit ontbijt, gebruik cottage cheese
```

#### Voorbeeld 3: Vermijdingen
```
/mealplan-genereren vermijd zuivel en noten
```

### Kopiëren naar ander project

```powershell
# 1. Kopieer de skill
Copy-Item -Recurse ".github/skills/mealplan" "C:\path\to\other\repo\.github\skills\"

# 2. Kopieer ook de prompt en agent
Copy-Item ".github/prompts/mealplan-genereren.prompt.md" "C:\path\to\other\repo\.github\prompts\"
Copy-Item ".github/agents/MealplanAgent.agent.md" "C:\path\to\other\repo\.github\agents\"

# 3. Maak vereiste projectbestanden aan (zie templates in skill/assets/)
```

### Aanpassen voor ander doel

De mealplan skill kan aangepast worden voor andere fitness-doelen:

1. **Afvallen**: Pas macro's aan in `promp.md` (lager kcal)
2. **Bulken**: Verhoog kcal en koolhydraten
3. **Vegetarisch**: Voeg verboden toe in config, pas ingrediënten aan
4. **Andere sport**: Wijzig trainings/rustdag verdeling

---

## Skill Structuur

Elke skill volgt dezelfde structuur:

```
.github/skills/[skill-name]/
├── SKILL.md              # Hoofdinstructies (verplicht)
├── assets/               # Templates en resources
│   └── *.md / *.html     
└── references/           # Documentatie
    └── *.md
```

### SKILL.md vereisten

```yaml
---
name: skill-name           # Moet overeenkomen met folder naam
description: "Beschrijving met keywords voor discovery"
argument-hint: "Hint voor slash command input"
---

# Skill Titel

## When to Use
...

## Procedure
...
```

---

## Troubleshooting

### Skill wordt niet gevonden

1. Controleer of folder naam overeenkomt met `name:` in SKILL.md
2. Controleer op YAML syntax fouten (geen tabs, wel quotes rond colons)
3. Herstart VS Code na toevoegen van skill

### Slash command werkt niet

1. Controleer of `.github/prompts/[command].prompt.md` bestaat
2. Controleer `name:` veld in prompt frontmatter
3. Type `/` en wacht op autocomplete lijst

### Agent niet beschikbaar

1. Controleer of `.github/agents/[Agent].agent.md` bestaat
2. Controleer `description:` veld bevat keywords
3. Probeer agent expliciet aan te roepen: `@workspace use MealplanAgent`

---

## Nieuwe skill maken

1. Maak folder: `.github/skills/[naam]/`
2. Maak `SKILL.md` met frontmatter
3. Voeg templates toe in `assets/`
4. Voeg documentatie toe in `references/`
5. (Optioneel) Maak prompt in `.github/prompts/`
6. (Optioneel) Maak agent in `.github/agents/`

Zie [agent-customization skill](copilot-skill:/agent-customization/SKILL.md) voor complete documentatie.
