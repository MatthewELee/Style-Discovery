import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { ConceptMeta } from "./types";

// Every folder in src/concepts with a meta.ts and a Page.tsx is a concept.
// Metas load eagerly (the gallery needs them); pages are code-split and load on demand.
// Order comes from the number prefix on the folder name, e.g. "01-orchard-swiss".
const metas = import.meta.glob<{ meta: ConceptMeta }>("./*/meta.ts", { eager: true });
const pages = import.meta.glob<{ default: ComponentType }>("./*/Page.tsx");

export type Concept = ConceptMeta & {
  folder: string;
  /** Zero-padded position, e.g. "03". */
  number: string;
  Page: LazyExoticComponent<ComponentType>;
};

export const concepts: Concept[] = Object.entries(metas)
  .map(([path, { meta }]) => {
    const folder = path.split("/")[1];
    const loadPage = pages[`./${folder}/Page.tsx`];
    if (!loadPage) throw new Error(`Concept "${folder}" is missing Page.tsx`);
    return { ...meta, folder, number: "", Page: lazy(loadPage) };
  })
  .sort((a, b) => a.folder.localeCompare(b.folder))
  .map((concept, i) => ({ ...concept, number: String(i + 1).padStart(2, "0") }));

const slugs = new Set<string>();
for (const { slug, folder } of concepts) {
  if (slugs.has(slug)) throw new Error(`Duplicate concept slug "${slug}" in ${folder}`);
  slugs.add(slug);
}

export function conceptIndex(slug: string | undefined): number {
  return concepts.findIndex((c) => c.slug === slug);
}

/** The concept `step` places away from `index`, wrapping around at both ends. */
export function neighbour(index: number, step: 1 | -1): Concept {
  return concepts[(index + step + concepts.length) % concepts.length];
}
