import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "tidal-bento",
  product: "Water bottle",
  brand: "Tidal",
  style: "Bento Modern",
  description:
    "Bento layouts split content into neat rounded tiles of different sizes, like a lunch box. Each tile holds one idea, so visitors can scan the whole product at a glance and open only what interests them.",
  visualTags: ["Clean", "Modern", "Consistent"],
  uxTags: ["Scannable", "Discoverable", "Frictionless"],
  howItsBuilt: [
    "CSS grid with named areas: tiles span different rows and columns but share one gap and one corner radius.",
    "Manrope on a strict four-step type scale: tile label, body, tile headline, hero.",
    "White tiles on a cool grey page, with a single teal for interactive things.",
    "Detail is hidden until asked for: tap a tile with a + to expand it in place.",
    "Colour and size pickers live inside tiles, so choosing is part of browsing.",
  ],
  palette: [
    { name: "Mist", hex: "#F5F7FA" },
    { name: "Card", hex: "#FFFFFF" },
    { name: "Ink", hex: "#0F172A" },
    { name: "Tide", hex: "#0EA5A4" },
    { name: "Tint", hex: "#CDEFF0" },
    { name: "Slate", hex: "#64748B" },
  ],
  fonts: ["Manrope Variable"],
  motion:
    "Tiles stagger in and lift on hover; expandable tiles grow into a detail view with a shared-element transition (layoutId), and ice cubes bob in the temperature tile.",
  axes: {
    density: "medium",
    color: "mid",
    value: "light",
    type: "grotesk",
    layout: "bento",
    motion: "springy",
  },
};
