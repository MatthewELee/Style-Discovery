import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "volt-rush-cyber",
  product: "Energy drink",
  brand: "VOLT RUSH",
  style: "Cyber Neon",
  description:
    "Cyber Neon uses glowing saturated colors on black, huge condensed type and aggressive angles. Scroll becomes the main control, turning the page into a short, cinematic sequence.",
  visualTags: ["Vibrant", "High-contrast", "Modern"],
  uxTags: ["Engaging", "Visual hierarchy", "Call to action"],
  howItsBuilt: [
    "Pure black background so neon acid, cyan and hot pink glow (text-shadow and drop-shadow blur).",
    "Anton, a tall condensed face, at enormous sizes; Chakra Petch's squared letters for body text.",
    "A pinned scroll scene: the section sticks while you scroll, and the can spins through three claims.",
    "Diagonal cuts (clip-path) instead of rectangles give every panel forward motion.",
  ],
  palette: [
    { name: "Black", hex: "#050505" },
    { name: "Acid", hex: "#B6FF00" },
    { name: "Cyan", hex: "#00F0FF" },
    { name: "Hot", hex: "#FF2E63" },
    { name: "Graphite", hex: "#1A1A1A" },
  ],
  fonts: ["Anton", "Chakra Petch"],
  motion:
    "Scroll-driven: useScroll on a tall section with a sticky stage, and useTransform chains that spin, scale and light up the can and swap the headline. Headings glitch on hover.",
  rulesBroken: [
    "Scrolling drives the story instead of plain reading. Every claim is also repeated as normal text below, so nothing is lost if you skip it.",
  ],
  axes: {
    density: "medium",
    color: "vibrant",
    value: "dark",
    type: "condensed",
    layout: "pinned-scenes",
    motion: "scroll",
  },
};
