import "@fontsource/rubik-bubbles";
import "@fontsource-variable/space-grotesk";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, type PointerEvent } from "react";
import styles from "./page.module.css";

const springy = { type: "spring", stiffness: 500, damping: 14 } as const;

const flavors: { name: string; color: string; tilt: number; text?: string }[] = [
  { name: "Lime Zap", color: "var(--lime)", tilt: -8 },
  { name: "Berry Blast", color: "var(--pink)", tilt: 6 },
  { name: "Blue Raz Rush", color: "var(--aqua)", tilt: -4 },
  { name: "Grape Escape", color: "var(--violet)", tilt: 10, text: "#fff" },
  { name: "Tropic Twist", color: "var(--chrome)", tilt: -12 },
];

const PACK_SIZE = 6;

function Star({ className, color }: { className: string; color: string }) {
  // A 12-point starburst.
  const points = Array.from({ length: 24 }, (_, i) => {
    const r = i % 2 ? 38 : 50;
    const a = (i / 24) * Math.PI * 2;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      <polygon points={points} fill={color} stroke="var(--ink)" strokeWidth="2" />
    </motion.svg>
  );
}

function Marquee({ text }: { text: string }) {
  const run = Array.from({ length: 6 }, () => text).join("  ★  ");
  return (
    <div className={styles.marquee} aria-hidden="true">
      <motion.div
        className={styles.marqueeTrack}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <span>★ {run} ★</span>
        <span>★ {run} ★</span>
      </motion.div>
    </div>
  );
}

export default function Page() {
  const [pack, setPack] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxControls = useAnimationControls();
  const dragged = useRef(false);

  // The straw leans toward the cursor.
  const pointerX = useMotionValue(0.5);
  const lean = useSpring(useTransform(pointerX, [0, 1], [-18, 18]), {
    stiffness: 200,
    damping: 12,
  });

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    pointerX.set(e.clientX / window.innerWidth);
  }

  function addToPack(name: string) {
    setPack((p) => (p.length >= PACK_SIZE ? p : [...p, name]));
    boxControls.start({
      scale: [1, 1.12, 0.94, 1],
      rotate: [0, -4, 3, 0],
      transition: { duration: 0.5 },
    });
  }

  function droppedOnBox(point: { x: number; y: number }) {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return false;
    // point is page coordinates; the rect is viewport coordinates.
    const x = point.x - window.scrollX;
    const y = point.y - window.scrollY;
    return x > r.left - 30 && x < r.right + 30 && y > r.top - 30 && y < r.bottom + 30;
  }

  const full = pack.length >= PACK_SIZE;

  return (
    <div className={styles.root} onPointerMove={onPointerMove}>
      <Marquee text="100% JUICE  ★  ZERO BORING  ★  5 FLAVORS  ★  ICE COLD" />

      <header className={styles.top}>
        <span className={styles.logo}>SQUEEZE!</span>
        <span className={styles.badge}>NEW 4 2000!!</span>
      </header>

      <main>
        <section className={styles.hero}>
          <Star className={styles.starA} color="var(--lime)" />
          <Star className={styles.starB} color="var(--aqua)" />

          <div className={styles.heroText}>
            <motion.h1
              className={styles.h1}
              initial={{ scale: 0.6, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: -3, opacity: 1 }}
              transition={springy}
            >
              SQUEEZE!
            </motion.h1>
            <p className={styles.lede}>
              The juice box that slaps. Real fruit, fizzy flavor names, and a straw that
              always finds the hole on the first try.
            </p>
            <motion.a
              href="#buy"
              className={styles.cta}
              whileHover={{ scale: 1.06, rotate: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={springy}
            >
              Grab a 6-pack ✦
            </motion.a>
          </div>

          <motion.div ref={boxRef} className={styles.boxWrap} animate={boxControls}>
            <motion.button
              type="button"
              className={styles.boxButton}
              aria-label="Squeeze the juice box"
              whileTap={{ scaleY: 0.85, scaleX: 1.08 }}
              transition={springy}
            >
              <svg viewBox="0 0 160 240" className={styles.box} aria-hidden="true">
                <defs>
                  <linearGradient id="sq-body" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff3da5" />
                    <stop offset="1" stopColor="#7b2cff" />
                  </linearGradient>
                  <linearGradient id="sq-chrome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="0.5" stopColor="#9aa0b5" />
                    <stop offset="1" stopColor="#e8e8f0" />
                  </linearGradient>
                </defs>
                <rect
                  x="10"
                  y="40"
                  width="140"
                  height="190"
                  rx="14"
                  fill="url(#sq-body)"
                  stroke="#2a0a4a"
                  strokeWidth="5"
                />
                <rect
                  x="24"
                  y="96"
                  width="112"
                  height="70"
                  rx="35"
                  fill="url(#sq-chrome)"
                  stroke="#2a0a4a"
                  strokeWidth="4"
                />
                <text
                  x="80"
                  y="140"
                  textAnchor="middle"
                  fontFamily="Rubik Bubbles"
                  fontSize="26"
                  fill="#2a0a4a"
                >
                  SQZ!
                </text>
                <circle cx="40" cy="70" r="7" fill="#fff" opacity="0.8" />
                <circle cx="56" cy="62" r="4" fill="#fff" opacity="0.8" />
              </svg>
            </motion.button>
            <motion.div
              className={styles.straw}
              style={{ rotate: lean }}
              aria-hidden="true"
            />
            <p className={styles.boxCount} aria-live="polite">
              {pack.length} / {PACK_SIZE} in your pack
            </p>
          </motion.div>
        </section>

        <section className={styles.stickers} aria-labelledby="flavors">
          <h2 id="flavors" className={styles.h2}>
            Build your pack!
          </h2>
          <p className={styles.hint}>
            Drag a flavor onto the box (or tap it) to add it. Six fit in a pack.
          </p>
          <ul className={styles.stickerRow}>
            {flavors.map((f) => (
              <li key={f.name}>
                <motion.button
                  type="button"
                  className={styles.sticker}
                  style={{ background: f.color, color: f.text, rotate: f.tilt }}
                  drag
                  dragSnapToOrigin
                  dragElastic={0.6}
                  whileHover={{
                    scale: 1.1,
                    rotate: [f.tilt, f.tilt - 6, f.tilt + 6, f.tilt],
                    transition: { duration: 0.4 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  whileDrag={{ scale: 1.2, zIndex: 10, cursor: "grabbing" }}
                  transition={springy}
                  onPointerDown={() => (dragged.current = false)}
                  onDragStart={() => (dragged.current = true)}
                  onDragEnd={(_, info) => droppedOnBox(info.point) && addToPack(f.name)}
                  onClick={() => {
                    // A drag also ends in a click; only a plain tap should add here.
                    if (!dragged.current) addToPack(f.name);
                  }}
                  disabled={full}
                  aria-label={`Add ${f.name} to your pack`}
                >
                  {f.name}
                </motion.button>
              </li>
            ))}
          </ul>
          <ul className={styles.pack} aria-label="Your pack">
            <AnimatePresence>
              {pack.map((name, i) => (
                <motion.li
                  key={`${name}-${i}`}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={springy}
                >
                  {name}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {pack.length > 0 && (
            <button type="button" className={styles.reset} onClick={() => setPack([])}>
              Empty the pack
            </button>
          )}
        </section>

        <section className={styles.features} aria-labelledby="why">
          <h2 id="why" className={styles.h2}>
            Why it&apos;s the best
          </h2>
          <div className={styles.cards}>
            {[
              [
                "100% fruit",
                "No syrups, no fake stuff. Just squeezed fruit and a little fizz.",
              ],
              ["Lunchbox legal", "Fits every lunchbox, backpack pocket and cup holder."],
              ["Straw that works", "Pre-angled, pokes through first time. Every time."],
            ].map(([title, body], i) => (
              <motion.article
                key={title}
                className={styles.card}
                initial={{ y: 60, rotate: 0, opacity: 0 }}
                whileInView={{ y: 0, rotate: [-3, 2, -2][i], opacity: 1 }}
                viewport={{ once: true }}
                transition={{ ...springy, delay: i * 0.08 }}
                whileHover={{ y: -8, rotate: 0 }}
              >
                <h3 className={styles.h3}>{title}</h3>
                <p>{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className={styles.details} aria-labelledby="inside">
          <h2 id="inside" className={styles.h2}>
            What&apos;s inside
          </h2>
          <dl className={styles.facts}>
            <div>
              <dt>Size</dt>
              <dd>200 ml</dd>
            </div>
            <div>
              <dt>Fruit</dt>
              <dd>100%</dd>
            </div>
            <div>
              <dt>Added sugar</dt>
              <dd>0 g</dd>
            </div>
            <div>
              <dt>Vibes</dt>
              <dd>Maximum</dd>
            </div>
          </dl>
        </section>

        <section className={styles.proof} aria-label="What people say">
          <blockquote className={styles.bubbleA}>
            “omg the blue one tastes like summer camp”
            <footer>— jess, 14</footer>
          </blockquote>
          <blockquote className={styles.bubbleB}>
            “My kid traded a whole cookie for one. A whole cookie.”
            <footer>— a parent</footer>
          </blockquote>
        </section>

        <section id="buy" className={styles.buy} aria-labelledby="buy-h">
          <h2 id="buy-h" className={styles.buyH}>
            Get squeezin&apos;
          </h2>
          <motion.a
            href="#buy"
            className={styles.cta}
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.92 }}
            transition={springy}
          >
            Grab a 6-pack · $7.99
          </motion.a>
        </section>
      </main>

      <footer className={styles.footer}>
        SQUEEZE! is a fictional brand. Stay juicy.
      </footer>
    </div>
  );
}
