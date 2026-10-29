import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "wildcomb-handdrawn",
  product: "Raw honey",
  brand: "Wildcomb",
  style: "Hand-drawn Organic",
  description:
    "Hand-drawn organic design uses illustrations, handwriting and imperfect lines to feel personal and small-batch. It builds trust through warmth rather than polish.",
  visualTags: ["Muted", "Cohesive", "Airy"],
  uxTags: ["User-centric", "Scannable"],
  howItsBuilt: [
    "Every illustration is a single-color SVG line drawing with slightly wobbly strokes.",
    "Caveat (handwriting) for headings and margin notes; Lora, a warm serif, for reading.",
    "Buttons and boxes use uneven border-radius values so they look drawn by hand.",
    "Margin notes with arrows explain things the way a beekeeper would, next to what they describe.",
    "Warm paper, honey and leaf colors, all slightly desaturated.",
  ],
  palette: [
    { name: "Paper", hex: "#F6EEDC" },
    { name: "Honey", hex: "#E3A72F" },
    { name: "Comb", hex: "#8A5A1F" },
    { name: "Leaf", hex: "#5A6A3D" },
    { name: "Ink", hex: "#2F2A24" },
  ],
  fonts: ["Caveat Variable", "Lora Variable"],
  motion:
    "Drawn: lines draw themselves in (SVG pathLength), the hive sketch follows your scroll, a bee loops along a path (CSS offset-path) and flowers sway.",
  axes: {
    density: "airy",
    color: "mid",
    value: "light",
    type: "hand-drawn",
    layout: "freeform",
    motion: "drawn",
  },
};
