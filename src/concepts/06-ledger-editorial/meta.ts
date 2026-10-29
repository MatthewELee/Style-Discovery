import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "ledger-editorial",
  product: "Coffee",
  brand: "Ledger Roasters",
  style: "Editorial Magazine",
  description:
    "Editorial design borrows from print magazines: serif type, columns, rules, captions and pull quotes. It can hold a lot of text and stay readable because every element has a clear typographic role.",
  visualTags: ["Dense", "Muted", "Consistent"],
  uxTags: ["Scannable", "Information architecture", "Visual hierarchy"],
  howItsBuilt: [
    "Three typefaces, each with one job: Playfair Display for headlines, Source Serif 4 for reading, IBM Plex Sans Condensed for labels and captions.",
    "CSS multi-column layout for the article, with a drop cap and a pull quote that spans the columns.",
    "Hairline rules separate everything instead of boxes or backgrounds.",
    "A contents list with page-style numbers makes the long page scannable.",
    "One accent, coffee brown, for kickers and the drop cap.",
  ],
  palette: [
    { name: "Newsprint", hex: "#FBF8F3" },
    { name: "Ink", hex: "#1A1A1A" },
    { name: "Roast", hex: "#7A3E1D" },
    { name: "Rule", hex: "#D8CFC2" },
  ],
  fonts: [
    "Playfair Display Variable",
    "Source Serif 4 Variable",
    "IBM Plex Sans Condensed",
  ],
  motion:
    "Precise text reveals: headline words rise out of a mask one by one, and paragraphs settle in as you reach them (variants with staggerChildren, whileInView).",
  axes: {
    density: "dense",
    color: "muted",
    value: "light",
    type: "serif",
    layout: "editorial",
    motion: "precise",
  },
};
