import type { Concept } from "../concepts/registry";
import type { Axes } from "../concepts/types";

// Gallery filters live in the URL (?tag=Dense&value=dark) so a filtered view can be
// shared or bookmarked. Tags are multi-select and a concept must have every one picked;
// each axis is single-select.

export type FilterGroup = {
  /** URL search param. */
  param: string;
  label: string;
  multi: boolean;
  values: (c: Concept) => readonly string[];
  /** How a value reads on its chip. */
  format?: (value: string) => string;
};

const axisLabels: Record<string, string> = { mid: "Mid", scroll: "Scroll-driven" };

function formatAxis(value: string) {
  if (value in axisLabels) return axisLabels[value];
  const words = value.replace(/-/g, " ");
  return words[0].toUpperCase() + words.slice(1);
}

function axis(key: keyof Axes, label: string): FilterGroup {
  return {
    param: key,
    label,
    multi: false,
    values: (c) => [c.axes[key]],
    format: formatAxis,
  };
}

// Type voice and layout are left out: nearly every concept has its own, so they don't
// narrow anything a visitor couldn't see by scanning the grid.
export const filterGroups: FilterGroup[] = [
  { param: "tag", label: "Visual", multi: true, values: (c) => c.visualTags },
  { param: "ux", label: "UX", multi: true, values: (c) => c.uxTags },
  axis("density", "Density"),
  axis("color", "Color energy"),
  axis("value", "Value"),
  axis("motion", "Motion"),
];

/** Every value that appears in at least one concept, in first-seen order. */
export function optionsFor(group: FilterGroup, concepts: Concept[]): string[] {
  return [...new Set(concepts.flatMap(group.values))];
}

export function matches(concept: Concept, params: URLSearchParams): boolean {
  return filterGroups.every((group) => {
    const have = group.values(concept);
    return params.getAll(group.param).every((v) => have.includes(v));
  });
}

/** The params after clicking a chip: toggles it, and replaces the old pick on an axis. */
export function toggle(params: URLSearchParams, group: FilterGroup, value: string) {
  const next = new URLSearchParams(params);
  const picked = next.getAll(group.param);
  next.delete(group.param);
  if (picked.includes(value)) {
    for (const v of picked) if (v !== value) next.append(group.param, v);
  } else {
    if (group.multi) for (const v of picked) next.append(group.param, v);
    next.append(group.param, value);
  }
  return next;
}

// The gallery's last search string, so "back to gallery" from a concept keeps the filter.
let lastSearch = "";

export function rememberGallerySearch(search: string) {
  lastSearch = search;
}

export function galleryPath() {
  return `/${lastSearch}`;
}
