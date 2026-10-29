import "@fontsource-variable/fredoka";
import { AnimatePresence, motion } from "motion/react";
import { useState, type CSSProperties } from "react";
import styles from "./page.module.css";

const squish = { type: "spring", stiffness: 600, damping: 15 } as const;

const colorways = [
  { name: "Bubblegum", main: "#ffc7de", deep: "#ff8fbd", tint: "#fff0f6" },
  { name: "Sky", main: "#bde7ff", deep: "#7cc8f2", tint: "#eef8ff" },
  { name: "Mint", main: "#cff5d8", deep: "#8fdca3", tint: "#effcf2" },
  { name: "Butter", main: "#ffe59a", deep: "#f5c84a", tint: "#fffaea" },
];

const sizes = [6, 7, 8, 9, 10, 11, 12];

// Simple filled icons for the feature cards.
const cloud = "M7 18a5 5 0 0 1-.6-9.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z";
const heart =
  "M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.5 5c2 0 3.5 1.2 4.5 2.6C12 6.2 13.5 5 15.5 5 19 5 21 8.6 21.6 11.8 19.5 16.4 12 21 12 21z";
const drop = "M12 2.5S5 10.2 5 14.5a7 7 0 0 0 14 0C19 10.2 12 2.5 12 2.5z";

function Sneaker() {
  return (
    <svg
      viewBox="0 0 320 180"
      className={styles.shoe}
      role="img"
      aria-label="A chunky, rounded sneaker in the selected pastel colorway"
    >
      <ellipse cx="160" cy="166" rx="130" ry="10" fill="#3a2e5c" opacity="0.12" />
      {/* sole */}
      <rect x="22" y="122" width="284" height="38" rx="19" fill="#ece4f7" />
      <rect x="22" y="146" width="284" height="14" rx="7" fill="var(--deep)" />
      {/* upper */}
      <path
        d="M40 126 C 40 70, 90 44, 140 44 L 176 44 C 196 44, 206 70, 232 84 C 262 98, 300 100, 300 126 Z"
        fill="var(--main)"
      />
      {/* toe cap & heel tab */}
      <path
        d="M232 84 C 262 98, 300 100, 300 126 L 238 126 C 236 108, 232 96, 222 88 Z"
        fill="var(--deep)"
        opacity="0.6"
      />
      <rect x="34" y="62" width="34" height="58" rx="17" fill="var(--deep)" />
      {/* laces */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={124 + i * 22}
          y={56 + i * 6}
          width="30"
          height="10"
          rx="5"
          fill="#ffffff"
          transform={`rotate(-18 ${139 + i * 22} ${61 + i * 6})`}
        />
      ))}
      {/* puff logo */}
      <circle cx="120" cy="100" r="13" fill="#ffffff" />
      <circle cx="136" cy="96" r="10" fill="#ffffff" />
      <circle cx="104" cy="104" r="8" fill="#ffffff" />
      {/* highlight */}
      <path
        d="M70 76 C 86 60, 110 52, 132 52"
        stroke="#ffffff"
        strokeOpacity="0.7"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Blob({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.span
      className={className}
      aria-hidden="true"
      animate={{ y: [0, -16, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function Page() {
  const [way, setWay] = useState(colorways[0]);
  const [size, setSize] = useState<number | null>(null);
  const [bag, setBag] = useState(0);
  const [nudge, setNudge] = useState(false);

  const theme = {
    "--main": way.main,
    "--deep": way.deep,
    "--tint": way.tint,
  } as CSSProperties;

  function addToBag() {
    if (!size) {
      setNudge(true);
      return;
    }
    setBag((b) => b + 1);
  }

  return (
    <div className={styles.root} style={theme}>
      <header className={styles.header}>
        <span className={styles.logo}>puff runners</span>
        <span className={styles.bag} aria-live="polite">
          Bag · {bag}
        </span>
      </header>

      <main>
        <section className={styles.hero}>
          <Blob className={styles.blobA} delay={0} />
          <Blob className={styles.blobB} delay={1.4} />
          <Blob className={styles.blobC} delay={0.7} />

          <div className={styles.heroCopy}>
            <motion.h1
              className={styles.h1}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={squish}
            >
              Walk on clouds.
            </motion.h1>
            <p className={styles.lede}>
              The Puff One: a sneaker so squishy it feels like it&apos;s inflated. Drag it
              around, it bounces back. So do your feet.
            </p>
          </div>

          <motion.div
            className={styles.stage}
            drag
            dragSnapToOrigin
            dragElastic={0.5}
            whileDrag={{ scale: 1.08, rotate: -6, cursor: "grabbing" }}
            transition={squish}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={way.name}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={squish}
              >
                <Sneaker />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className={styles.picker}>
            <fieldset className={styles.fieldset}>
              <legend>Colorway: {way.name}</legend>
              <div className={styles.swatches}>
                {colorways.map((c) => (
                  <motion.button
                    key={c.name}
                    type="button"
                    className={styles.swatch}
                    style={{ background: c.main }}
                    aria-pressed={way.name === c.name}
                    aria-label={c.name}
                    whileTap={{ scaleY: 0.8, scaleX: 1.1 }}
                    transition={squish}
                    onClick={() => setWay(c)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>Size (US){size ? `: ${size}` : ""}</legend>
              <motion.div
                className={styles.sizes}
                animate={nudge ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                onAnimationComplete={() => setNudge(false)}
              >
                {sizes.map((s) => (
                  <motion.button
                    key={s}
                    type="button"
                    className={styles.size}
                    aria-pressed={size === s}
                    whileTap={{ scaleY: 0.8, scaleX: 1.1 }}
                    transition={squish}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </motion.button>
                ))}
              </motion.div>
            </fieldset>

            <motion.button
              type="button"
              className={styles.cta}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scaleY: 0.82, scaleX: 1.08 }}
              transition={squish}
              onClick={addToBag}
            >
              {size ? `Add to bag · $120` : "Pick a size, then add to bag"}
            </motion.button>
          </div>
        </section>

        <section className={styles.features} aria-labelledby="why">
          <h2 id="why" className={styles.h2}>
            Why it feels so good
          </h2>
          <ul className={styles.cards}>
            {[
              [
                cloud,
                "Air-pocket sole",
                "Twenty-two tiny air pockets compress and spring back with every step.",
              ],
              [
                heart,
                "Plush collar",
                "A pillowy ankle collar that hugs without pinching.",
              ],
              [
                drop,
                "Washable",
                "Pop them in the machine at 30°. They come out puffier.",
              ],
            ].map(([icon, title, body], i) => (
              <motion.li
                key={title}
                className={styles.card}
                initial={{ y: 40, opacity: 0, scale: 0.92 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...squish, delay: i * 0.08 }}
              >
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={icon} fill="currentColor" />
                  </svg>
                </span>
                <h3 className={styles.h3}>{title}</h3>
                <p>{body}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        <section className={styles.details} aria-labelledby="specs">
          <h2 id="specs" className={styles.h2}>
            The squishy specs
          </h2>
          <ul className={styles.chips}>
            {[
              "290 g per shoe",
              "38 mm stack",
              "Recycled knit upper",
              "Vegan",
              "Free returns for 60 days",
            ].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section className={styles.proof} aria-label="Reviews">
          <blockquote className={styles.review}>
            <p>“I bought the Butter ones and now I can&apos;t stop poking them.”</p>
            <footer>Mo, ★★★★★</footer>
          </blockquote>
          <blockquote className={styles.review}>
            <p>“Walked 20k steps at a theme park. Zero complaints from my feet.”</p>
            <footer>Priya, ★★★★★</footer>
          </blockquote>
        </section>

        <section className={styles.buy} aria-labelledby="buy-h">
          <h2 id="buy-h" className={styles.h2}>
            Ready to puff?
          </h2>
          <motion.a
            href="#"
            className={styles.cta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scaleY: 0.82, scaleX: 1.08 }}
            transition={squish}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Choose your colorway
          </motion.a>
        </section>
      </main>

      <footer className={styles.footer}>
        Puff Runners is a fictional brand. Stay squishy.
      </footer>
    </div>
  );
}
