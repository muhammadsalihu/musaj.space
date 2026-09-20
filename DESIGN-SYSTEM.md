# DESIGN-SYSTEM.md — Junior-inspired dark theme

## Overview
Full re-skin of musaj.space to match the Junior (Sentry) aesthetic: dark backgrounds, cream text, playful-but-bold copy, chat-style UI elements, and massive display typography.

## Color Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `bg-primary` | `#0A0A0F` | rgb(10,10,15) | Main background |
| `bg-secondary` | `#0D0D14` | rgb(13,13,20) | Section backgrounds |
| `bg-tertiary` | `#141419` | rgb(20,20,25) | Card surfaces |
| `bg-elevated` | `#1A1A22` | rgb(26,26,34) | Elevated surfaces, borders |
| `text-primary` | `#FFF7DF` | rgb(255,247,223) | Headings, body text (cream) |
| `text-secondary` | `#B8B8B8` | rgb(184,184,184) | Secondary text, labels |
| `text-muted` | `#9299A1` | rgb(146,153,161) | Muted/placeholder text |
| `accent-pink` | `#FF3CAC` | rgb(255,60,172) | Primary accent, CTAs |
| `accent-blue` | `#0033FF` | rgb(0,51,255) | Secondary accent, links |
| `accent-lime` | `#CCFF00` | rgb(204,255,0) | Highlight, success, badges |
| `accent-lavender` | `#9E9EFF` | rgb(158,158,255) | Tertiary accent, tags |
| `accent-purple` | `#695CFF` | rgb(105,92,255) | Hover states, integration cards |
| `border-default` | `rgba(255,255,255,0.08)` | — | Default borders |
| `border-hover` | `rgba(255,255,255,0.15)` | — | Hover borders |

## Typography

| Role | Font | Weight | Size | Line Height |
|------|------|--------|------|-------------|
| Display (H1) | Arial Black / Impact | 900 | 96-144px | 0.9 |
| H2 | Arial Black / Impact | 900 | 64-88px | 0.9 |
| H3 | Rubik Variable | 600 | 24-32px | 1.2 |
| Body | Rubik Variable | 400 | 16-18px | 1.6 |
| Mono | IBM Plex Mono | 400 | 14px | 1.5 |

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
```

## Component Patterns

### Hero Section
- Full-screen dark background
- Centered headline (Arial Black, 80-120px)
- Subheadline in cream, smaller
- CTA buttons: solid pink (`#FF3CAC`) primary, outlined cream secondary
- Chat bubble element showing a conversation snippet

### Cards
- `bg-tertiary` (#141419) background
- 1px `border-default` border
- Rounded corners (16-24px)
- Hover: `border-hover` + subtle lift
- Inner padding: 24-32px

### Buttons
- Primary: `bg-accent-pink text-white rounded-full px-8 py-4 font-semibold`
- Secondary: `border border-text-primary text-text-primary rounded-full px-8 py-4`
- Hover: scale(1.02) + brightness increase

### Navigation
- Fixed top bar, `bg-primary/80 backdrop-blur-md`
- Logo left (cream text, brand accent dot)
- Links center/right in `text-secondary`, hover `text-primary`
- CTA button rightmost

### Tags / Badges
- `bg-accent-lime/10 text-accent-lime rounded-full px-3 py-1 text-xs`
- Used for tech stacks, categories, in-progress indicators

### Integration/Logo Grid
- Grayscale logos, opacity 60%, hover 100%
- 3-5 columns on desktop

## Non-Negotiables
1. **Dark-only** — no light mode toggle, no white backgrounds
2. **Cream text** (`#FFF7DF`) — NOT pure white for body text
3. **Pink primary accent** (`#FF3AAC`) — replaces old red (#E8262D)
4. **Arial Black display type** — massive, bold headlines
5. **Rubik for body** — friendly, geometric sans-serif
6. **IBM Plex Mono** — for code snippets, technical labels
7. **Rounded-full buttons** — pill-shaped CTAs everywhere
8. **16-24px border radius** on all cards — no sharp corners

## Legacy Tokens to Remove
- `#E8262D` (old brand red) → replace with `#FF3CAC`
- `#FEE2E2` (old brand light) → replace with accent-lime/10 or lavender/10
- `#0F1522` (old dark) → replace with `#0A0A0F`
- `#F8F9FA` (old surface) → replace with `#141419`
- All `bg-white` → replace with `bg-tertiary` or `bg-elevated`
- All `text-gray-*` → replace with new text tokens
