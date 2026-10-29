import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "sunny-daze-70s",
  product: "Granola",
  brand: "Sunny Daze",
  style: "70s Groovy",
  description:
    "70s Groovy uses warm earth tones, rounded chunky serifs and wavy stripes to feel nostalgic and friendly. The dark brown base keeps all those warm colors cohesive instead of loud.",
  visualTags: ["Cohesive", "High-contrast"],
  uxTags: ["Engaging", "Scannable"],
  howItsBuilt: [
    "A chocolate-brown base with cream text, and only warm accents: orange, mustard, rust, avocado.",
    "Fraunces with its 'soft' and 'wonky' axes turned up, giving rounded, slightly quirky letters.",
    "Stacked text-shadows in orange and rust create the retro 3D lettering.",
    "Full-width stripe bands and wavy dividers replace straight section lines.",
  ],
  palette: [
    { name: "Chocolate", hex: "#3B2418" },
    { name: "Cream", hex: "#F2E3C6" },
    { name: "Orange", hex: "#E8892B" },
    { name: "Mustard", hex: "#D9A21B" },
    { name: "Rust", hex: "#B5462E" },
    { name: "Avocado", hex: "#7A8B3A" },
  ],
  fonts: ["Fraunces Variable", "DM Sans Variable"],
  motion:
    "Looping and lazy: the sunburst turns, dividers ripple (SVG path morphing with repeat: Infinity), oats float, and the rainbow stretches as you scroll (useScroll + useTransform).",
  axes: {
    density: "medium",
    color: "mid",
    value: "dark",
    type: "retro-serif",
    layout: "bands",
    motion: "looping",
  },
};
