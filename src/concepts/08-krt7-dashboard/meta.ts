import type { ConceptMeta } from "../types";

export const meta: ConceptMeta = {
  slug: "krt7-dashboard",
  product: "Studio headphones",
  brand: "KRT-7",
  style: "Technical Dashboard",
  description:
    "A technical dashboard style treats the product like an instrument: dark panels, monospace labels, charts and tables. It is dense by design, but strict alignment and consistent labels keep it readable.",
  visualTags: ["Dense", "High-contrast", "Consistent"],
  uxTags: ["Scannable", "Discoverable", "Information architecture"],
  howItsBuilt: [
    "Every block is a panel on the same grid, with a small uppercase label in its top-left corner.",
    "JetBrains Mono for labels and numbers (tabular figures line up), Inter at small sizes for sentences.",
    "Near-black panels with light text; one signal teal for data and one amber for warnings.",
    "Real data visualisation: a frequency response chart you can hover to read exact values.",
    "Comparison tables let visitors check claims instead of trusting adjectives.",
  ],
  palette: [
    { name: "Void", hex: "#0B0D10" },
    { name: "Panel", hex: "#14181D" },
    { name: "Line", hex: "#2A3038" },
    { name: "Text", hex: "#E6E8EB" },
    { name: "Dim", hex: "#8A939E" },
    { name: "Signal", hex: "#00E0B8" },
    { name: "Warn", hex: "#FFB000" },
  ],
  fonts: ["JetBrains Mono Variable", "Inter Variable"],
  motion:
    "Data-driven: a live waveform scrolls, readouts tick, a crosshair follows the cursor across the chart, and spec tabs share a sliding underline (layoutId).",
  axes: {
    density: "dense",
    color: "muted",
    value: "dark",
    type: "mono",
    layout: "dashboard",
    motion: "precise",
  },
};
