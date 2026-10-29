# Plan

## Goals

1. **Design reference.** A place to see many visual styles side by side, applied to the
   same kind of page, so the differences are easy to compare.
2. **Learning tool.** Every page explains itself: which style it is, which descriptors
   apply (Clean, Dense, Vibrant…), which UX ideas it leans on (Scannable, strong CTA…),
   and the concrete choices in type, color, layout and motion that create the effect.
3. **Keeps growing.** Start with 12 concepts and make adding the next one a matter of
   adding a folder.

### What "vastly different" means here

Each concept is placed on six axes (see the [variety matrix](CONCEPTS.md#variety-matrix)).
A new concept must differ from every existing one on at least three axes:

| Axis | Range |
| --- | --- |
| Density | Airy ↔ Dense |
| Color energy | Muted ↔ Vibrant |
| Value | Light ↔ Dark |
| Type voice | Grotesk sans · Serif · Display · Mono · Hand-drawn · Pixel |
| Layout system | Strict grid · Editorial columns · Bento · Freeform/collage · Single-axis scroll |
| Motion personality | Precise · Springy · Abrupt · Slow/ambient · Drawn · Scroll-driven |

### Shared content outline

To make comparisons fair, every concept tells the same story in the same order, so the
only thing that changes is the design:

1. **Hero:** product name, one-line promise, primary CTA
2. **Three features or benefits**
3. **Details:** ingredients, specs, materials, or how it's made
4. **Social proof:** quotes, ratings or press
5. **Closing CTA**
6. **Footer**

A concept may break this order on purpose when the style demands it (a zine might
scatter it), and its style card says so.

## Roadmap

Each phase is one pull request for you to review before the next starts.

| Phase | Deliverable | Done when |
| --- | --- | --- |
| **0. Planning** | These docs | You've approved or edited the concept list and the architecture |
| **1. Shell** | Vite app, gallery home, concept viewer with next/prev, style card panel, auto-registry, GitHub Pages deploy, one placeholder concept | The site is live on GitHub Pages and you can click through two placeholder pages |
| **2. Batch A** | Concepts 01–04 | Four live, finished concepts with style cards |
| **3. Batch B** | Concepts 05–08 | Eight live |
| **4. Batch C** | Concepts 09–12 | Twelve live |
| **5+. Ongoing** | New concepts from the backlog, one or a few per PR | Each new one passes the [add-a-concept checklist](ADDING-A-CONCEPT.md) |

Possible extras once the core is done: filter the gallery by tag, a side-by-side compare
view, and a "stripped" toggle that shows the page with the style removed, to make the
contribution of the design obvious.

## Architecture

### Stack

- **Vite + React + TypeScript** (strict mode).
- **Motion** (`motion` package, `import { motion } from "motion/react"`). This is Framer
  Motion under its current name; the API is the same.
- **React Router** with a hash router, so deep links work on GitHub Pages without
  server rewrites.
- **CSS Modules** for styling, so each concept's CSS cannot leak into another.
- **Fontsource** packages for fonts, imported inside each concept so a font only loads
  when its page is viewed.
- **No photos at first.** Products are drawn with SVG and CSS, which keeps the repo
  self-contained, free of licensing questions, and lets motion animate the product
  itself.

### Folder layout

```
src/
  main.tsx
  App.tsx                    routes: "/" gallery, "/c/:slug" concept
  shell/
    Gallery.tsx              grid of concept cards
    ConceptViewer.tsx        loads a concept, page transition, keyboard nav
    NavBar.tsx               prev / next / back to gallery, "3 of 12"
    StyleCard.tsx            the "about this style" panel
    TagChip.tsx              tag with glossary definition on hover/focus
    shell.module.css         neutral UI that sits above every concept
  concepts/
    registry.ts              discovers concepts automatically (see below)
    01-orchard-swiss/
      meta.ts                style card data (see STYLE-CARD.md)
      Page.tsx               the page itself
      page.module.css
      assets/                SVGs etc.
    02-squeeze-y2k/
    ...
  content/
    glossary.ts              visual + UX terms and definitions, typed
```

### Adding a concept = adding a folder

`registry.ts` uses Vite's `import.meta.glob` to find every `concepts/*/meta.ts` eagerly
(small, needed for the gallery) and every `concepts/*/Page.tsx` lazily (each page is its
own code-split chunk). Concepts are ordered by the number prefix on the folder name.
No central list to edit.

### Style isolation

- The shell uses a neutral, quiet style and renders above the concept (fixed nav, style
  card button) so it is the same on every page.
- Each concept's root element gets its own CSS Module class and sets its design tokens as
  CSS custom properties (`--bg`, `--ink`, `--accent`, `--font-display`…) on that root.
- A light global reset only. No global typography or color.

### Navigation

- Gallery home: one card per concept, showing its palette, style name and product.
- Concept page: fixed prev/next buttons and a "3 of 12" counter, `←` / `→` keys to move,
  `Esc` to return to the gallery. Wraps around at the ends.
- Page transitions with `AnimatePresence`, kept short so they never fight the concept's
  own entrance motion.

### Accessibility baseline (every concept)

- `MotionConfig reducedMotion="user"` at the root, plus a check that each concept still
  reads well with motion off.
- Body text meets WCAG AA contrast, even in deliberately rough styles. Decorative text
  can break this; the style card notes where.
- Semantic landmarks (`header`, `main`, `section`, `footer`), one `h1` per page, visible
  focus states, real `button`/`a` elements for CTAs.

### Tooling and deploy

- ESLint + Prettier, `tsc --noEmit` in CI.
- GitHub Actions: build on every PR; deploy `main` to GitHub Pages.
- Vite `base: "./"` so the build works at any Pages path.
