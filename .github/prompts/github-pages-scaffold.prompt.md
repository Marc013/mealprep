---
name: github-pages-scaffold
description: "Generate a complete GitHub Pages website with industrial design. Creates HTML, CSS, JS files and JSON data structure. Use for: static site creation, GitHub Pages setup, dark mode website."
argument-hint: "Describe the site purpose (e.g., 'meal prep tracker', 'project documentation', 'portfolio')"
agent: "GitHubPagesAgent"
---

Scaffold een complete GitHub Pages website met het brutalist/industrial design system.

## Instructies

1. Lees de skill: `.github/skills/github-pages/SKILL.md`
2. Volg de procedure uit de skill
3. Analyseer bestaande data in de workspace (indien aanwezig)
4. Genereer de volledige site structuur in `docs/`
5. Pas templates aan op basis van het site doel

## Output

```
docs/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── content.json
└── [extra pagina's indien nodig]
```

$args
