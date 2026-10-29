import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "concrete-brutalist",
  product: "Skateboards",
  brand: "CONCRETE DECKS",
  style: "Brutalist",
  description:
    "Brutalism shows the web's raw materials: default fonts, borders, tables and plain links. It looks rough on purpose, yet everything is labeled and visible, which can make it surprisingly easy to navigate.",
  visualTags: ["Dense", "High-contrast"],
  uxTags: ["Information architecture", "Discoverable"],
  howItsBuilt: [
    "Space Mono everywhere, plus the browser's default Times for headings that look 'unstyled'.",
    "Thick black borders on every box; nothing has rounded corners or soft shadows.",
    "A broken grid: blocks are nudged off their columns so the page feels assembled by hand.",
    "Everything is a visible label or a plain underlined link, so nothing is hidden behind icons.",
    "One alarm color, safety orange, marks price and the buy button.",
  ],
  palette: [
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
    { name: "Concrete", hex: "#C8C8C8" },
    { name: "Safety orange", hex: "#FF4F00" },
  ],
  fonts: ["Space Mono", "Times New Roman"],
  motion:
    "Abrupt, never eased: blocks appear in hard steps (a stepped easing function), the ticker jumps instead of gliding, and hover simply inverts colors.",
  rulesBroken: [
    "Deliberately misaligned blocks and default-looking fonts, the opposite of polish. Contrast and labeling stay strict so it remains usable.",
  ],
  axes: {
    density: "dense",
    color: "muted",
    value: "light",
    type: "mono",
    layout: "broken-grid",
    motion: "abrupt",
  },
};
