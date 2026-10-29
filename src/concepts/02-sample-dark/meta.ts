import type { ConceptMeta } from "../types";

// Placeholder used to test the shell. Replaced by the real concepts in batch A.
export const meta: ConceptMeta = {
  slug: "sample-dark",
  product: "Placeholder",
  brand: "Sample Co.",
  style: "Sample · Dark",
  description:
    "A second placeholder in the opposite direction: dark, monospaced and tighter. It proves that each concept's fonts and colors stay inside its own page.",
  visualTags: ["High-contrast", "Dense"],
  uxTags: ["Visual hierarchy", "Call to action"],
  howItsBuilt: [
    "Space Mono is imported inside this page only, so it loads only when you visit.",
    "Light text on a near-black background.",
    "A two-column grid keeps details compact.",
  ],
  palette: [
    { name: "Void", hex: "#0E0F11" },
    { name: "Text", hex: "#ECECEC" },
    { name: "Signal", hex: "#C6FF00" },
    { name: "Line", hex: "#2A2C30" },
  ],
  fonts: ["Space Mono"],
  motion: "None beyond the shell's page transition.",
  rulesBroken: ["Uses no motion at all, to show the page still reads with motion off."],
  axes: {
    density: "dense",
    color: "vibrant",
    value: "dark",
    type: "mono",
    layout: "two-column",
    motion: "none",
  },
};
