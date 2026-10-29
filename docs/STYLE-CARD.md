# Style card

Every concept page has a small **"About this style"** button in a corner (part of the
shell, so it looks the same everywhere). It opens a panel over the page. The panel is the
learning layer of the site.

## What the panel shows

1. **Style name** and product, e.g. *Swiss Minimal · Orchard No. 1 apples*
2. **Description:** two or three sentences on what the style is and why it works.
3. **Visual tags** and **UX tags** as chips. Tapping or clicking a chip shows its
   definition from the [glossary](GLOSSARY.md).
4. **How it's built:** three to five short bullets of concrete choices, e.g.
   "One accent color, used only for the CTA and the apple."
5. **Palette** swatches with hex codes (click to copy).
6. **Typefaces** with a sample of each.
7. **Motion note:** one line on the motion personality and the Motion features used.
8. **Rules broken on purpose** (optional): where the concept deliberately breaks the
   shared content outline or an accessibility nicety for decoration, and why.

The panel is closed by default so it never covers the design on first view. It closes
with `Esc` or a click outside, and traps focus while open.

## `meta.ts` format

Each concept folder has a `meta.ts` that holds everything the gallery card and the style
card need. Tags are typed against the glossary, so a typo fails the build.

```ts
import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "orchard-swiss",          // URL: /c/orchard-swiss
  product: "Apple",
  brand: "Orchard No. 1",
  style: "Swiss Minimal",
  description:
    "Swiss (International Typographic) style uses a strict grid, one sans-serif family and a single accent color. Hierarchy comes from size and position alone, so the page stays calm and easy to scan even with almost nothing on it.",
  visualTags: ["Clean", "Modern", "Airy", "Consistent"],
  uxTags: ["Scannable", "Visual hierarchy", "Call to action"],
  howItsBuilt: [
    "A visible 12-column grid; every block snaps to it.",
    "One family (Inter Tight) at many weights instead of several fonts.",
    "Red is used only for the apple and the CTA.",
  ],
  palette: [
    { name: "Paper", hex: "#F2F0EB" },
    { name: "Ink", hex: "#111111" },
    { name: "Swiss red", hex: "#E3241B" },
    { name: "Grey", hex: "#8C8C8C" },
  ],
  fonts: ["Inter Tight"],
  motion: "Precise 200–300 ms tweens with staggered entrances (variants, staggerChildren).",
  rulesBroken: [],                // optional
  axes: {                         // used to check variety, and later to filter
    density: "airy",
    color: "muted",
    value: "light",
    type: "grotesk",
    layout: "strict-grid",
    motion: "precise",
  },
};
```

The concept number and order come from the folder name (`01-orchard-swiss`), not from
`meta.ts`.
