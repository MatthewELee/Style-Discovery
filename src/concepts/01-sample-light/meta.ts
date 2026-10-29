import type { ConceptMeta } from "../types";

// Placeholder used to test the shell. Replaced by the real concepts in batch A.
export const meta: ConceptMeta = {
  slug: "sample-light",
  product: "Placeholder",
  brand: "Sample Co.",
  style: "Sample · Light",
  description:
    "A placeholder that exercises the shell: routing, the style card and next/prev navigation. It follows the shared content outline so later concepts have a reference to compare against.",
  visualTags: ["Clean", "Airy"],
  uxTags: ["Scannable", "Call to action"],
  howItsBuilt: [
    "Design tokens are CSS custom properties on the page's root class.",
    "One family, Inter, at a few weights.",
    "Every section follows the shared outline: hero, features, details, proof, CTA.",
  ],
  palette: [
    { name: "Paper", hex: "#FAFAF7" },
    { name: "Ink", hex: "#1B1B1B" },
    { name: "Accent", hex: "#2F6BFF" },
    { name: "Line", hex: "#E4E4DF" },
  ],
  fonts: ["Inter Variable"],
  motion: "Sections fade up as they scroll into view (whileInView).",
  axes: {
    density: "airy",
    color: "muted",
    value: "light",
    type: "grotesk",
    layout: "single-column",
    motion: "slow",
  },
};
