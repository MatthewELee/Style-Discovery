# Adding a concept

For concept #13 and onward. One concept per branch and PR.

## 1. Pick and check

- [ ] Choose a style and an invented product/brand (see the backlog in
      [CONCEPTS.md](CONCEPTS.md#backlog-concept-13-onward)).
- [ ] Place it on the six axes. It must differ from **every** existing concept on at
      least three; add its row to the variety matrix.
- [ ] Write the brief in CONCEPTS.md: tags, palette, type, layout, motion, signature
      moment, CTA, style card draft.

## 2. Build

- [ ] Create `src/concepts/NN-slug/` with `meta.ts`, `Page.tsx`, `page.module.css`, and
      `assets/` if needed. The registry picks it up automatically.
- [ ] Set design tokens as CSS custom properties on the page's root class. No global CSS.
- [ ] Import its fonts inside `Page.tsx` (Fontsource), not globally.
- [ ] Follow the shared content outline (hero, three features, details, social proof,
      closing CTA, footer), or list the deliberate break under `rulesBroken`.
- [ ] Draw the product in SVG/CSS (or add a properly licensed image).

## 3. Check

- [ ] Style card filled in: description, tags, 3–5 "How it's built" bullets, palette,
      fonts, motion note.
- [ ] Body text passes WCAG AA contrast; one `h1`; landmarks; visible focus; CTAs are real
      buttons or links.
- [ ] Looks right with reduced motion turned on.
- [ ] Works at phone width (375 px) and desktop.
- [ ] Prev/next from the neighbours lands on it; the gallery card shows it.
- [ ] `npm run build` and lint pass, and the Cloudflare preview for the PR looks right.
