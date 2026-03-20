---
name: github-pages
description: "Scaffold a static GitHub Pages website with brutalist/industrial design. Generates complete file structure: HTML templates, CSS design system, vanilla JS utilities, and JSON data loading. Use when: creating static website, GitHub Pages setup, dark mode site, data-driven static site. Keywords: github pages, static site, scaffold website, dark mode, brutalist design, vanilla js."
argument-hint: "Describe the site purpose (e.g., 'meal prep tracker', 'portfolio', 'documentation')"
---

# GitHub Pages Scaffolding Skill

Generate a complete static GitHub Pages website with industrial/brutalist design aesthetic.

## When to Use

- Creating a new GitHub Pages site from scratch
- Setting up a data-driven static website
- Need dark mode, mobile-first design
- Want LocalStorage persistence without backend

## Output Structure

```
docs/                          # GitHub Pages root (configurable)
├── index.html                 # Landing/overview page
├── styles.css                 # Complete design system
├── app.js                     # Navigation, data loading, LocalStorage
├── data/
│   └── content.json           # Site content as JSON
└── pages/                     # Additional pages (optional)
```

## Procedure

### 1. Gather Requirements

Ask the user:
- **Site purpose**: What content will this display?
- **Output folder**: `docs/` (default) or custom path?
- **Pages needed**: Which pages beyond index?
- **Data source**: Existing JSON/markdown files to convert?

### 2. Analyze Existing Data (if applicable)

If the workspace contains data files (`.md`, `.json`):
1. Read and parse the structure
2. Generate appropriate `data/content.json` schema
3. Map fields to UI components

### 3. Generate Files

Use the templates in [./assets/](./assets/) as base:

1. **index.html** — Adapt [template](./assets/index.html) to site purpose
2. **styles.css** — Copy [design system](./assets/styles.css), customize CSS variables if needed
3. **app.js** — Copy [utilities](./assets/app.js), extend for specific features
4. **data/content.json** — Generate from [schema](./assets/data-schema.json) or existing data

### 4. Customize for Project

Reference the [design system docs](./references/design-system.md) for:
- Available CSS components
- Color and typography tokens
- Responsive breakpoints
- Animation utilities

### 5. Validate

- [ ] All files created in correct structure
- [ ] JSON is valid and matches schema
- [ ] No external dependencies (pure HTML/CSS/JS)
- [ ] Mobile-responsive layout
- [ ] LocalStorage functions work

## Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Dark mode only** | No light mode toggle needed |
| **Mobile-first** | Touch-friendly, thumb-reachable controls |
| **No frameworks** | Vanilla HTML/CSS/JS only |
| **Fast loading** | No external fonts, minimal assets |
| **Offline-capable** | LocalStorage for state persistence |

## Common Adaptations

### Meal Prep / Fitness Tracker

Volledige implementatie: zie `prompt-github-pages.md` en `docs/`

**Componenten:**
- Weekplan selector (dropdown met LocalStorage persistentie)
- Training/rust dag toggle met macro-doelen
- Macro grid (kcal/eiwit/vet/kh) met kleurcodering
- Maaltijdkaarten met tijdstip en mini-macro weergave
- Recept modal met ingrediënten en bereiding
- Variant toggle (training vs rust) voor mealprep gerechten
- Checkbox boodschappenlijst per weekplan met LocalStorage
- Progress indicator (X/Y afgevinkt)

**Data structuur (`meals.json`):**
```json
{
  "config": { "title", "trainingDays", "restDays" },
  "targets": { "training": {...}, "rest": {...} },
  "weekplans": {
    "plan1": { "name", "schedule": [...] },
    "plan2": { "name", "schedule": [...] }
  },
  "meals": { "id": { "title", "macros", "variants?", "ingredients", "preparation" }},
  "shopping": {
    "plan1": { "categories": [...] },
    "plan2": { "categories": [...] }
  }
}
```

### Documentation Site
- Sidebar navigation
- Code blocks with copy button
- Search functionality

### Portfolio
- Project cards grid
- Image lazy loading
- Contact form (static, mailto:)

## Files Reference

| Asset | Purpose |
|-------|---------|
| [index.html](./assets/index.html) | Base HTML structure |
| [styles.css](./assets/styles.css) | Complete CSS design system |
| [app.js](./assets/app.js) | JS utilities and data loading |
| [data-schema.json](./assets/data-schema.json) | Example JSON structure |
| [design-system.md](./references/design-system.md) | CSS documentation |
