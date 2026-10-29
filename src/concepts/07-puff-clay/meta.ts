import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "puff-clay",
  product: "Sneakers",
  brand: "Puff Runners",
  style: "Claymorphism",
  description:
    "Claymorphism makes UI look like soft, inflated clay: rounded shapes, pastel colors and double inner and outer shadows. It feels tactile and playful, inviting people to press and drag.",
  visualTags: ["Modern", "Airy", "Cohesive"],
  uxTags: ["Engaging", "Frictionless"],
  howItsBuilt: [
    "Every surface uses the same three-part shadow: a light inner highlight, a dark inner shade and a soft outer drop.",
    "Corners are fully rounded and nothing has a hard edge or a border.",
    "Pastels only, with one deep ink for text so it stays readable.",
    "Picking a colorway re-themes the whole page by changing a few CSS custom properties.",
    "Size and Add to bag sit together in the hero: two taps from landing to buying.",
  ],
  palette: [
    { name: "Lavender", hex: "#F7F1FF" },
    { name: "Pink", hex: "#FFC7DE" },
    { name: "Sky", hex: "#BDE7FF" },
    { name: "Mint", hex: "#CFF5D8" },
    { name: "Butter", hex: "#FFE59A" },
    { name: "Ink", hex: "#3A2E5C" },
  ],
  fonts: ["Fredoka Variable"],
  motion:
    "Squishy springs: buttons squash when pressed (whileTap scaleY), the shoe can be dragged and bounces back (drag, dragSnapToOrigin), and blobs float in slow loops.",
  axes: {
    density: "airy",
    color: "mid",
    value: "light",
    type: "rounded-sans",
    layout: "floating-stage",
    motion: "springy",
  },
};
