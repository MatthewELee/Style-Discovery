# Style Discovery

A growing gallery of single-page product websites, each built for a fictional product
and each in a deliberately different visual style. It is a design reference and a way
to learn web design: every page carries a small **style card** that names the style,
tags it with design and UX vocabulary, and explains how the look is achieved.

Click through the concepts one after another, or jump to any of them from the gallery.

## Running it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build to dist/
npm run lint
```

Requires Node 22.12+ (see `.nvmrc`).

## Status

The gallery shell is built, and the 12 concepts in [CONCEPTS.md](docs/CONCEPTS.md) are
being added in batches of four. The plan lives in [`docs/`](docs):

| Doc | What's in it |
| --- | --- |
| [PLAN.md](docs/PLAN.md) | Goals, roadmap and phases, architecture, tech decisions |
| [CONCEPTS.md](docs/CONCEPTS.md) | The first 12 concept briefs, the variety matrix, and a backlog of future styles |
| [STYLE-CARD.md](docs/STYLE-CARD.md) | What the "about this style" panel shows on every page, and the `meta.ts` format behind it |
| [GLOSSARY.md](docs/GLOSSARY.md) | The visual and UX vocabulary used to tag every concept |
| [ADDING-A-CONCEPT.md](docs/ADDING-A-CONCEPT.md) | Checklist for adding concept #13 and onward |

## Stack

Vite, React, TypeScript and [Motion](https://motion.dev) (the library formerly called
Framer Motion; same API, imported from `motion/react`). Deployed with Cloudflare Pages.
