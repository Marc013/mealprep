---
description: "Use when editing files in the docs/ folder (GitHub Pages website). Enforces design system constraints, static site best practices, and no-framework rules. Keywords: docs folder, github pages, static site, website files, html css js."
applyTo: "docs/**"
---

# GitHub Pages — docs/ folder regels

## Technische constraints

- **Geen frameworks** — alleen vanilla HTML, CSS, JavaScript
- **Geen CDN's** — geen externe fonts, libraries of stylesheets
- **Geen build step** — bestanden moeten direct bruikbaar zijn
- **Mobile-first** — responsive design met touch-friendly controls

## Design system

Gebruik het Strongman design system uit `.github/skills/github-pages/references/design-system.md`:

- Dark mode only (geen light mode toggle)
- CSS custom properties voor theming
- Monospace fonts voor data/code
- Impact/condensed fonts voor headings

## Bestandsstructuur

```
docs/
├── index.html          # Landing page
├── styles.css          # Enige CSS file
├── app.js              # Enige JS file
├── data/
│   └── *.json          # Gestructureerde content
└── pages/              # Extra HTML pagina's
```

## LocalStorage

- Gebruik `App.storageKey` (`app-state`) voor alle persistentie
- Checklist status wordt per-item opgeslagen
- Geen gevoelige data in LocalStorage

## Validatie checklist

Bij elke wijziging:
- [ ] HTML is valide (geen unclosed tags)
- [ ] CSS gebruikt alleen custom properties uit :root
- [ ] JS bevat geen `import` of `require` statements
- [ ] Alle links zijn relatief (geen absolute URLs)
- [ ] JSON bestanden zijn valide
