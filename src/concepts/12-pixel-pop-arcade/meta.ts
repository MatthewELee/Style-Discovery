import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "pixel-pop-arcade",
  product: "Bubble gum",
  brand: "Pixel Pop",
  style: "8-bit Arcade",
  description:
    "8-bit Arcade style recreates early video games: chunky pixels, a tiny fixed palette and blinky stepped animation. Framing the page as a game turns browsing into a playful user flow.",
  visualTags: ["Vibrant", "High-contrast"],
  uxTags: ["Engaging", "User flow", "Call to action"],
  howItsBuilt: [
    "An eight-color palette borrowed from fantasy consoles; nothing outside it.",
    "Sprites are drawn as grids of SVG squares with crisp edges, never smoothed.",
    "Press Start 2P for headings and VT323, a terminal face, for reading.",
    "The page is a sequence of game screens: title, character select, stats, high scores, continue.",
    "Animation moves in hard frames (stepped easing), like an old CRT game.",
  ],
  palette: [
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1D2B53" },
    { name: "Plum", hex: "#7E2553" },
    { name: "Red", hex: "#FF004D" },
    { name: "Yellow", hex: "#FFEC27" },
    { name: "Blue", hex: "#29ADFF" },
    { name: "Green", hex: "#00E436" },
    { name: "Off-white", hex: "#FFF1E8" },
  ],
  fonts: ["Press Start 2P", "VT323"],
  motion:
    "Stepped and frame-by-frame: blinking text, a bubble that inflates in four frames and pops, stat bars that fill block by block, and a countdown. Arrow keys move between flavors.",
  rulesBroken: [
    "Press Start 2P is hard to read at length, so it is kept to short headings; all longer text uses VT323 at a large size.",
  ],
  axes: {
    density: "medium",
    color: "vibrant",
    value: "dark",
    type: "pixel",
    layout: "game-screens",
    motion: "abrupt",
  },
};
