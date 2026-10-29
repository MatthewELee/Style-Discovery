import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "maison-lune-luxury",
  product: "Shampoo",
  brand: "Maison Lune",
  style: "Quiet Luxury",
  description:
    "Quiet luxury signals quality through restraint: muted natural colors, a refined serif, slow movement and generous space. Showing less makes each element feel more deliberate and more expensive.",
  visualTags: ["Premium", "Muted", "Airy", "Cohesive"],
  uxTags: ["User flow", "Call to action"],
  howItsBuilt: [
    "A single centered column with one idea per screen; empty space does the selling.",
    "Cormorant Garamond at large, light sizes, paired with tiny, widely tracked Jost capitals.",
    "Five low-saturation, warm neutrals drawn from stone, sage and skin.",
    "The CTA is a quiet underlined link, not a loud button: confidence instead of urgency.",
    "A three-step ritual guides the visitor through the product before asking for the sale.",
  ],
  palette: [
    { name: "Bone", hex: "#F3EEE7" },
    { name: "Sand", hex: "#D9D2C5" },
    { name: "Sage", hex: "#A3AE9A" },
    { name: "Taupe", hex: "#6B5E52" },
    { name: "Ink", hex: "#2B2622" },
  ],
  fonts: ["Cormorant Garamond Variable", "Jost Variable"],
  motion:
    "Slow (0.9–1.4 s) fades that go from soft blur to sharp, and gentle parallax on the bottle (whileInView, useScroll + useTransform). Nothing bounces.",
  axes: {
    density: "airy",
    color: "muted",
    value: "light",
    type: "serif",
    layout: "single-column",
    motion: "slow",
  },
};
