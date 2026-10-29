import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "orchard-swiss",
  product: "Apples",
  brand: "Orchard No. 1",
  style: "Swiss Minimal",
  description:
    "Swiss (International Typographic) style uses a strict grid, one sans-serif family and a single accent color. Hierarchy comes from size and position alone, so the page stays calm and easy to scan even with almost nothing on it.",
  visualTags: ["Clean", "Modern", "Airy", "Consistent"],
  uxTags: ["Scannable", "Visual hierarchy", "Call to action"],
  howItsBuilt: [
    "A visible 12-column grid (4 on phones); every block starts and ends on a column line.",
    "One family, Inter Tight, from weight 300 to 800. Size does all the work.",
    "Red appears only on the apple and the call to action, so the eye goes straight to them.",
    "Text is flush left and ragged right, with numbers used as section markers.",
    "Big empty columns are left on purpose: the space is part of the layout.",
  ],
  palette: [
    { name: "Paper", hex: "#F2F0EB" },
    { name: "Ink", hex: "#111111" },
    { name: "Swiss red", hex: "#E3241B" },
    { name: "Grey", hex: "#8C8C8C" },
  ],
  fonts: ["Inter Tight Variable"],
  motion:
    "Precise 250–400 ms tweens with no bounce: grid lines draw in, the apple assembles from circles, and figures count up (variants, staggerChildren, animate()).",
  axes: {
    density: "airy",
    color: "muted",
    value: "light",
    type: "grotesk",
    layout: "strict-grid",
    motion: "precise",
  },
};
