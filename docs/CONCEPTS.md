# Concepts

Twelve concepts for the first three batches, then a backlog. Every product and brand
name is invented. Fonts are all free (Google Fonts / Fontsource).

Each brief lists the tags its style card will show, using the vocabulary in
[GLOSSARY.md](GLOSSARY.md), and a draft of the short description that appears on the page.

## Variety matrix

Every pair of concepts differs on at least three of these six axes.

| # | Concept | Density | Color | Value | Type voice | Layout | Motion |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | Swiss Minimal apple | Airy | Muted | Light | Grotesk sans | Strict grid | Precise |
| 02 | Y2K Pop juice box | Dense | Vibrant | Light | Bubble display | Sticker collage | Springy |
| 03 | Brutalist skateboard | Dense | Muted | Light | Mono | Broken grid | Abrupt |
| 04 | Quiet Luxury shampoo | Airy | Muted | Light | Serif | Single column | Slow |
| 05 | 70s Groovy granola | Medium | Mid (warm) | Dark | Retro soft serif | Full-bleed bands | Looping |
| 06 | Editorial Magazine coffee | Dense | Muted | Light | Serif | Editorial columns | Precise |
| 07 | Claymorphism sneakers | Airy | Mid (pastel) | Light | Rounded sans | Floating stage | Springy |
| 08 | Technical Dashboard headphones | Dense | Muted | Dark | Mono | Dashboard grid | Precise |
| 09 | Cyber Neon energy drink | Medium | Vibrant | Dark | Condensed display | Pinned scroll scenes | Scroll-driven |
| 10 | Hand-drawn Organic honey | Airy | Mid (warm) | Light | Hand-drawn | Freeform | Drawn |
| 11 | Bento Modern water bottle | Medium | Mid | Light | Grotesk sans | Bento grid | Springy |
| 12 | 8-bit Arcade gum | Medium | Vibrant | Dark | Pixel | Game screens | Abrupt |

Batch A (01–04) covers the widest spread first: strict, loud, raw and quiet.

---

## Batch A

### 01 · Orchard No. 1 (apple) · Swiss Minimal

- **Visual tags:** Clean, Modern, Airy, Consistent
- **UX tags:** Scannable, Visual hierarchy, Call to action
- **Palette:** paper `#F2F0EB` · ink `#111111` · Swiss red `#E3241B` · grey `#8C8C8C`
- **Type:** Inter Tight, from hairline 200 to black 900. Huge numerals, tight tracking.
- **Layout:** Visible 12-column grid. Asymmetric blocks, flush-left text, lots of empty
  columns. One red apple drawn in flat geometric SVG.
- **Motion:** Short, exact tweens (200–300 ms, no bounce). Grid lines draw in, numbers count
  up, sections enter with a staggered slide that snaps to the grid.
- **Signature moment:** The hero apple is built from circles and a single leaf that
  assemble on the grid.
- **CTA:** "Order a crate"
- **Style card draft:** *Swiss (International Typographic) style uses a strict grid,
  one sans-serif family and a single accent color. Hierarchy comes from size and position
  alone, so the page stays calm and easy to scan even with almost nothing on it.*
- **What it teaches:** grids, type scale, restraint with color, Motion `variants` and
  `staggerChildren`.

### 02 · SQUEEZE! (juice box) · Y2K Pop

- **Visual tags:** Vibrant, High-contrast, Dense
- **UX tags:** Engaging, Call to action
- **Palette:** lime `#C6FF00` · hot pink `#FF3DA5` · aqua `#3DD9FF` · violet `#7B2CFF` ·
  chrome gradient `#E8E8F0 → #9AA0B5` · bubblegum background `#FFF6FB`
- **Type:** Rubik Bubbles for headlines, Space Grotesk for body.
- **Layout:** Sticker collage. Tilted cards, starbursts, chrome blobs, a scrolling
  marquee, things overlapping on purpose.
- **Motion:** Springy everything. Stickers wobble on hover and can be dragged around, a
  straw follows the cursor, the juice box bounces when clicked.
- **Signature moment:** Drag the flavor stickers onto the box to "build" your pack.
- **CTA:** "Grab a 6-pack"
- **Style card draft:** *Y2K Pop borrows from late-90s/early-2000s tech and teen
  culture: chrome, bubble letters, saturated candy colors and stickers everywhere. It
  trades calm for energy and invites you to play with the page.*
- **What it teaches:** springs, `whileHover`/`whileTap`, `drag`, `useMotionValue` +
  `useSpring` for cursor following.

### 03 · CONCRETE DECKS (skateboard) · Brutalist

- **Visual tags:** Dense, High-contrast
- **UX tags:** Information architecture, Discoverable
- **Palette:** white `#FFFFFF` · black `#000000` · concrete `#C8C8C8` · safety orange
  `#FF4F00`
- **Type:** Space Mono for everything, plus the browser's default Times for a few
  deliberately "unstyled" headings.
- **Layout:** Broken grid. Thick borders, raw tables, visible underlined links,
  misaligned blocks, a photocopied-texture deck graphic.
- **Motion:** None of it eased. Things appear instantly or in hard steps. Hover inverts
  colors. A ticker of "SPECS / PRICE / STOCK" runs across the top.
- **Signature moment:** The deck spec sheet is a raw HTML table that you sort by clicking
  headers.
- **CTA:** "BUY DECK — $64"
- **Style card draft:** *Brutalism shows the web's raw materials: default fonts,
  borders, tables and plain links. It looks rough on purpose, yet everything is labeled
  and visible, which can make it surprisingly easy to navigate.*
- **What it teaches:** that "ugly" can still be usable, stepped easing, instant state
  changes.

### 04 · Maison Lune (shampoo) · Quiet Luxury

- **Visual tags:** Premium, Muted, Airy, Cohesive
- **UX tags:** User flow, Call to action
- **Palette:** bone `#F3EEE7` · sand `#D9D2C5` · sage `#A3AE9A` · taupe `#6B5E52` · ink
  `#2B2622`
- **Type:** Cormorant Garamond (light, large) with Jost in small, widely tracked caps.
- **Layout:** Single centered column with a lot of space. One idea per screen.
  The bottle is a tall, soft-shaded SVG.
- **Motion:** Slow (800–1200 ms) fades and slight blur-to-sharp reveals, gentle parallax
  on the bottle. Nothing bounces.
- **Signature moment:** A three-step "ritual" (cleanse, nourish, rest) the visitor moves
  through, ending in the CTA.
- **CTA:** "Begin the ritual"
- **Style card draft:** *Quiet luxury signals quality through restraint: muted
  natural colors, a refined serif, slow movement and generous space. Showing less makes
  each element feel more deliberate and more expensive.*
- **What it teaches:** whitespace, serif pairing, `useScroll` + `useTransform` parallax,
  `whileInView`.

---

## Batch B

### 05 · Sunny Daze (granola) · 70s Groovy

- **Visual tags:** Cohesive, High-contrast
- **UX tags:** Engaging, Scannable
- **Palette:** chocolate `#3B2418` · cream `#F2E3C6` · orange `#E8892B` · mustard
  `#D9A21B` · rust `#B5462E` · avocado `#7A8B3A`
- **Type:** Fraunces with its "soft" and "wonky" settings turned up, DM Sans for body.
- **Layout:** Full-bleed horizontal stripe bands, wavy section dividers, a sunburst behind
  the jar.
- **Motion:** Looping. The sunburst slowly rotates, dividers ripple, oats float.
- **Signature moment:** The rainbow stripes stretch and bend as you scroll past.
- **CTA:** "Get groovy"
- **Style card draft:** *70s Groovy uses warm earth tones, rounded chunky serifs and
  wavy stripes to feel nostalgic and friendly. The dark brown base keeps all those warm
  colors cohesive instead of loud.*
- **What it teaches:** variable fonts, SVG path morphing, `repeat: Infinity` keyframes.

### 06 · Ledger Roasters (coffee) · Editorial Magazine

- **Visual tags:** Dense, Muted, Consistent
- **UX tags:** Scannable, Information architecture, Visual hierarchy
- **Palette:** newsprint `#FBF8F3` · ink `#1A1A1A` · roast `#7A3E1D` · rule `#D8CFC2`
- **Type:** Playfair Display headlines, Source Serif 4 body, IBM Plex Sans Condensed for
  kickers and captions.
- **Layout:** Multi-column magazine spread: issue number, drop caps, pull quotes, hairline
  rules, captions, a sidebar of tasting notes.
- **Motion:** Precise text reveals, line by line, as sections enter. Sticky section labels.
- **Signature moment:** A "Field Notes" feature about the farm, laid out like a real
  magazine article.
- **CTA:** "Subscribe to the next issue"
- **Style card draft:** *Editorial design borrows from print magazines: serif type,
  columns, rules, captions and pull quotes. It can hold a lot of text and stay readable
  because every element has a clear typographic role.*
- **What it teaches:** CSS multi-column and grid, typographic roles, text reveal
  animations.

### 07 · Puff Runners (sneakers) · Claymorphism

- **Visual tags:** Modern, Airy, Cohesive
- **UX tags:** Engaging, Frictionless
- **Palette:** lavender `#F7F1FF` · pink `#FFC7DE` · sky `#BDE7FF` · mint `#CFF5D8` ·
  butter `#FFE59A` · ink `#3A2E5C`
- **Type:** Fredoka (rounded) throughout.
- **Layout:** A floating stage. The sneaker sits center screen surrounded by inflated,
  soft-shadowed blobs and pill buttons.
- **Motion:** Squishy. Buttons squash when pressed, the shoe can be dragged and springs
  back, colorway swatches pop in.
- **Signature moment:** Pick a colorway and the whole page's pastel palette shifts to match.
- **CTA:** "Add to bag" (with a one-tap size picker)
- **Style card draft:** *Claymorphism makes UI look like soft, inflated clay: rounded
  shapes, pastel colors and double inner/outer shadows. It feels tactile and playful,
  inviting people to press and drag.*
- **What it teaches:** layered `box-shadow`, CSS variables for theme switching,
  `drag` with `dragConstraints`.

### 08 · KRT-7 (studio headphones) · Technical Dashboard

- **Visual tags:** Dense, High-contrast, Consistent
- **UX tags:** Scannable, Discoverable, Information architecture
- **Palette:** void `#0B0D10` · panel `#14181D` · line `#2A3038` · text `#E6E8EB` · dim
  `#8A939E` · signal `#00E0B8` · warn `#FFB000`
- **Type:** JetBrains Mono for data and labels, Inter at small sizes for prose.
- **Layout:** Dashboard grid of panels: frequency response chart, spec table, driver
  diagram, comparison table, all labeled like instrument readouts.
- **Motion:** Data-driven. A live waveform, numbers that tick, a crosshair that reads values
  off the chart, tabbed specs that slide with a shared underline.
- **Signature moment:** Hover the frequency chart to read exact dB values.
- **CTA:** "Configure & buy"
- **Style card draft:** *A technical dashboard style treats the product like an
  instrument: dark panels, monospace labels, charts and tables. It is dense by design,
  but strict alignment and consistent labels keep it readable.*
- **What it teaches:** density done well, SVG charts, `layoutId` shared transitions.

---

## Batch C

### 09 · VOLT RUSH (energy drink) · Cyber Neon

- **Visual tags:** Vibrant, High-contrast, Modern
- **UX tags:** Engaging, Visual hierarchy, Call to action
- **Palette:** black `#050505` · acid `#B6FF00` · cyan `#00F0FF` · hot `#FF2E63` ·
  graphite `#1A1A1A`
- **Type:** Anton (tall condensed) at enormous sizes, Chakra Petch for body.
- **Layout:** Pinned, full-screen scroll scenes with diagonal cuts and glowing edges.
- **Motion:** Scroll-driven. The can rotates, scales and lights up as you scroll; headline
  words slam in; a short glitch on section change.
- **Signature moment:** The can spins 360° across the first three scroll scenes.
- **CTA:** "Power up"
- **Style card draft:** *Cyber Neon uses glowing saturated colors on black, huge
  condensed type and aggressive angles. Scroll becomes the main control, turning the page
  into a short, cinematic sequence.*
- **What it teaches:** `useScroll` with a target, sticky pinning, `useTransform` chains.

### 10 · Wildcomb (honey) · Hand-drawn Organic

- **Visual tags:** Muted, Cohesive, Airy
- **UX tags:** User-centric, Scannable
- **Palette:** paper `#F6EEDC` · honey `#E3A72F` · comb `#8A5A1F` · leaf `#6E7F4E` · ink
  `#2F2A24`
- **Type:** Caveat for headings and annotations, Lora for body.
- **Layout:** Freeform. Hand-drawn SVG illustrations, wobbly borders, handwritten notes and
  arrows pointing at things, paper texture.
- **Motion:** Lines draw themselves in, a bee follows a looping path, flowers sway.
- **Signature moment:** The hive illustration draws itself stroke by stroke as you scroll.
- **CTA:** "Order a jar from the hive"
- **Style card draft:** *Hand-drawn organic design uses illustrations, handwriting and
  imperfect lines to feel personal and small-batch. It builds trust through warmth rather
  than polish.*
- **What it teaches:** SVG `pathLength` animations, motion paths, texture with CSS.

### 11 · Tidal (water bottle) · Bento Modern

- **Visual tags:** Clean, Modern, Consistent
- **UX tags:** Scannable, Discoverable, Frictionless
- **Palette:** mist `#F5F7FA` · card `#FFFFFF` · ink `#0F172A` · tide `#0EA5A4` · tint
  `#CDEFF0` · slate `#64748B`
- **Type:** Manrope throughout, with a clear four-step type scale.
- **Layout:** Bento grid: rounded tiles of different sizes, each holding one feature
  (temperature, capacity, colors, lid, reviews).
- **Motion:** Tiles stagger in and lift on hover; click a tile to expand it into a
  detailed view with a shared-element transition.
- **Signature moment:** The temperature tile shows a live "12 hours later" ice animation.
- **CTA:** "Choose your color"
- **Style card draft:** *Bento layouts split content into neat rounded tiles of
  different sizes, like a lunch box. Each tile holds one idea, so visitors can scan the
  whole product at a glance and open only what interests them.*
- **What it teaches:** CSS grid areas, `layout` / `layoutId` expand transitions.

### 12 · Pixel Pop (bubble gum) · 8-bit Arcade

- **Visual tags:** Vibrant, High-contrast
- **UX tags:** Engaging, User flow, Call to action
- **Palette:** black `#000000` · navy `#1D2B53` · plum `#7E2553` · red `#FF004D` ·
  yellow `#FFEC27` · blue `#29ADFF` · green `#00E436` · off-white `#FFF1E8`
- **Type:** Press Start 2P for headings, VT323 for body.
- **Layout:** Game screens: a title screen, a "select your flavor" character screen, a
  stats screen, and a "continue?" screen as the CTA.
- **Motion:** Stepped, frame-by-frame animation, blinking "PRESS START", sprite animations,
  arrow-key controls.
- **Signature moment:** Choosing a flavor plays a pixel bubble-blowing sprite.
- **CTA:** "INSERT COIN — BUY NOW"
- **Style card draft:** *8-bit Arcade style recreates early video games: chunky
  pixels, a tiny fixed palette and blinky stepped animation. Framing the page as a game
  turns browsing into a playful user flow.*
- **What it teaches:** pixel-perfect rendering (`image-rendering: pixelated`), stepped
  easing, keyboard-driven flows.

---

## Backlog (concept 13 onward)

Pick from these in any order; check each against the variety matrix before starting.

| Style | Product idea |
| --- | --- |
| Japanese minimalism (Ma) | Matcha tea |
| Art Deco | Perfume |
| Memphis | Sunglasses |
| Bauhaus | Desk lamp |
| Glassmorphism | Smart speaker |
| Scandinavian / Hygge | Candle |
| Kinetic typography | Hot sauce |
| Vaporwave | Soda |
| Victorian apothecary | Bar soap |
| Terminal / CLI | Mechanical keyboard |
| Risograph print | Notebook |
| Neumorphism | Thermostat |
| Mid-century modern | Record player |
| Comic book | Breakfast cereal |
| Clinical / pharmaceutical | Sunscreen |
| Solarpunk | E-bike |
| Dark academia | Fountain pen |
| Anti-design | Streetwear hoodie |
