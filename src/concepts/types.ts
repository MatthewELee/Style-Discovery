import type { UxTag, VisualTag } from "../content/glossary";

// The six axes from docs/PLAN.md. Every pair of concepts should differ on at least three.
export type Axes = {
  density: "airy" | "medium" | "dense";
  color: "muted" | "mid" | "vibrant";
  value: "light" | "dark";
  type: string; // e.g. "grotesk", "serif", "mono", "hand-drawn", "pixel"
  layout: string; // e.g. "strict-grid", "editorial", "bento", "freeform"
  motion: string; // e.g. "precise", "springy", "abrupt", "slow", "drawn", "scroll"
};

export type Swatch = { name: string; hex: string };

/** Everything the gallery card and the style card need. See docs/STYLE-CARD.md. */
export type ConceptMeta = {
  /** URL segment: /c/<slug> */
  slug: string;
  product: string;
  brand: string;
  style: string;
  /** Two or three sentences shown on the style card. */
  description: string;
  visualTags: VisualTag[];
  uxTags: UxTag[];
  /** Three to five concrete choices that create the look. */
  howItsBuilt: string[];
  palette: Swatch[];
  fonts: string[];
  motion: string;
  /** Deliberate breaks from the shared outline or accessibility niceties, and why. */
  rulesBroken?: string[];
  axes: Axes;
};
