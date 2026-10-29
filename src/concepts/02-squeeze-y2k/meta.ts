import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "squeeze-y2k",
  product: "Juice boxes",
  brand: "SQUEEZE!",
  style: "Y2K Pop",
  description:
    "Y2K Pop borrows from late-90s and early-2000s tech and teen culture: chrome, bubble letters, saturated candy colors and stickers everywhere. It trades calm for energy and invites you to play with the page.",
  visualTags: ["Vibrant", "High-contrast", "Dense"],
  uxTags: ["Engaging", "Call to action"],
  howItsBuilt: [
    "Four candy colors at full saturation, plus a chrome gradient for the shiny bits.",
    "Bubble lettering (Rubik Bubbles) for headlines, a techy grotesk (Space Grotesk) for reading.",
    "Things overlap and tilt on purpose: stickers, starbursts and cards are rotated a few degrees.",
    "Hard black outlines and offset shadows make every element feel like a sticker.",
    "The page is a toy: drag flavor stickers onto the box to build your pack.",
  ],
  palette: [
    { name: "Lime", hex: "#C6FF00" },
    { name: "Hot pink", hex: "#FF3DA5" },
    { name: "Aqua", hex: "#3DD9FF" },
    { name: "Violet", hex: "#7B2CFF" },
    { name: "Chrome", hex: "#C9CCD8" },
    { name: "Bubblegum", hex: "#FFF6FB" },
    { name: "Ink", hex: "#2A0A4A" },
  ],
  fonts: ["Rubik Bubbles", "Space Grotesk Variable"],
  motion:
    "Springy everything: stickers wobble and drag (drag, whileHover, whileTap), the straw follows your cursor (useMotionValue + useSpring), and a marquee loops forever.",
  rulesBroken: [
    "Overlapping, tilted elements break the usual tidy alignment on purpose. Body text stays straight and high-contrast so it remains readable.",
  ],
  axes: {
    density: "dense",
    color: "vibrant",
    value: "light",
    type: "bubble-display",
    layout: "collage",
    motion: "springy",
  },
};
