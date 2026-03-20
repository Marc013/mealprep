# Strongman Design System Reference

CSS design tokens en componenten voor de GitHub Pages skill.

## Color Tokens

| Token                    | Value     | Usage                         |
| ------------------------ | --------- | ----------------------------- |
| `--color-bg-primary`     | `#0a0a0a` | Page background               |
| `--color-bg-secondary`   | `#141414` | Card backgrounds, nav         |
| `--color-bg-tertiary`    | `#1a1a1a` | Subtle containers             |
| `--color-bg-card`        | `#1e1e1e` | Card backgrounds              |
| `--color-text-primary`   | `#e5e5e5` | Main text                     |
| `--color-text-secondary` | `#a0a0a0` | Secondary text                |
| `--color-text-muted`     | `#666666` | Disabled/muted text           |
| `--color-accent`         | `#ff4d00` | Primary accent (orange-red)   |
| `--color-accent-hover`   | `#ff6a2a` | Hover state                   |
| `--color-success`        | `#22c55e` | Protein macro, success states |
| `--color-warning`        | `#f59e0b` | Fat macro, warnings           |
| `--color-error`          | `#ef4444` | Errors                        |

## Typography

### Fonts
- **Headings**: `--font-heading` — Impact, Arial Black, sans-serif (uppercase, bold)
- **Body**: `--font-body` — Segoe UI, system-ui
- **Data/Code**: `--font-mono` — Cascadia Code, Consolas

### Sizes
```css
--text-xs: 0.75rem;   /* Labels, badges */
--text-sm: 0.875rem;  /* Secondary text, nav */
--text-base: 1rem;    /* Body text */
--text-lg: 1.125rem;  /* Emphasized text */
--text-xl: 1.25rem;   /* H4, card titles */
--text-2xl: 1.5rem;   /* H2, section titles */
--text-3xl: 2rem;     /* H1 on mobile */
--text-4xl: 2.5rem;   /* H1 desktop */
--text-5xl: 3.5rem;   /* Hero title */
```

## Components

### Card
```html
<article class="card">
    <header class="card-header">
        <h3 class="card-title">Title</h3>
        <span class="card-badge">Badge</span>
    </header>
    <div class="card-content">Content</div>
</article>
```

### Macro Grid
```html
<div class="macro-grid">
    <div class="macro-item kcal">
        <span class="macro-value">2500</span>
        <span class="macro-label">Kcal</span>
    </div>
    <div class="macro-item protein">...</div>
    <div class="macro-item fat">...</div>
    <div class="macro-item carbs">...</div>
</div>
```

### Checklist
```html
<ul class="checklist">
    <li class="checklist-item" data-id="item-1">
        <span class="checklist-checkbox"></span>
        <span class="checklist-text">Item text</span>
        <span class="checklist-amount">500g</span>
    </li>
</ul>
```

Checked state: add `.checked` class to `.checklist-item`.

### Buttons
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary</button>
```

### Navigation
```html
<nav class="nav-bar">
    <div class="nav-brand">Brand</div>
    <div class="nav-links">
        <a href="#" class="nav-link active">Link</a>
    </div>
    <button class="nav-toggle">...</button>
</nav>
```

## Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px - base unit */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## Responsive Breakpoints

| Breakpoint | Max width | Usage                              |
| ---------- | --------- | ---------------------------------- |
| Mobile     | `480px`   | Compact padding, single column     |
| Tablet     | `768px`   | Switch to mobile nav, 2-col macros |
| Desktop    | `1200px`  | Full layout, max container         |

## Utility Classes

```css
.text-accent     /* Accent color text */
.text-muted      /* Muted text */
.text-mono       /* Monospace font */
.text-center     /* Center aligned */
.text-right      /* Right aligned */
.mt-4, .mt-8     /* Margin top */
.mb-4, .mb-8     /* Margin bottom */
.hidden          /* Display none */
.fade-in         /* Fade in animation */
.pulse           /* Pulse animation */
```

## Customization

Override CSS custom properties in `:root` to adapt the design:

```css
:root {
    /* Change accent to blue */
    --color-accent: #3b82f6;
    --color-accent-hover: #60a5fa;
    
    /* Use different fonts */
    --font-heading: 'Oswald', sans-serif;
}
```
