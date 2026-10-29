import "@fontsource-variable/manrope";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./page.module.css";

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;

const colors = [
  { name: "Tide", hex: "#0ea5a4" },
  { name: "Slate", hex: "#475569" },
  { name: "Coral", hex: "#f87171" },
  { name: "Sand", hex: "#d6c7a1" },
];

const sizes = [500, 750, 1000];

const details: Record<string, { title: string; body: string[] }> = {
  temp: {
    title: "Cold for 24 hours",
    body: [
      "Double-walled 18/8 stainless steel with a vacuum between the walls stops heat moving in or out.",
      "Tested at 22°C room temperature: water starts at 4°C, is still 6°C after 12 hours and 9°C after 24.",
      "Works the other way too: hot drinks stay above 60°C for 12 hours.",
    ],
  },
  lid: {
    title: "One-hand lid",
    body: [
      "Flip the spout with your thumb, drink, click it shut. No unscrewing on the move.",
      "Silicone seal is leak-proof upside down in a bag.",
      "The whole lid comes apart in three pieces for the dishwasher.",
    ],
  },
  specs: {
    title: "Specifications",
    body: [
      "Body: 18/8 stainless steel, powder-coated finish",
      "Lid: BPA-free Tritan with silicone seal",
      "Weight: 340 g (750 ml)",
      "Fits most car cup holders (500 ml and 750 ml)",
      "Lifetime warranty on the vacuum seal",
    ],
  },
};

type DetailId = keyof typeof details;

function Bottle({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 120 300"
      className={styles.bottle}
      role="img"
      aria-label="A tall insulated water bottle with a flip lid"
    >
      <rect x="40" y="10" width="40" height="18" rx="6" fill="#0f172a" />
      <rect x="34" y="24" width="52" height="30" rx="10" fill="#1e293b" />
      <path
        d="M30 56 Q30 48 40 48 L80 48 Q90 48 90 56 L94 82 Q98 92 98 108 L98 278 Q98 292 84 292 L36 292 Q22 292 22 278 L22 108 Q22 92 26 82 Z"
        fill={color}
      />
      <rect x="30" y="110" width="8" height="160" rx="4" fill="#fff" opacity="0.25" />
      <text
        x="60"
        y="200"
        textAnchor="middle"
        fontFamily="Manrope Variable"
        fontWeight="800"
        fontSize="13"
        letterSpacing="2"
        fill="#fff"
        transform="rotate(-90 60 200)"
      >
        TIDAL
      </text>
    </svg>
  );
}

function Ice() {
  return (
    <div className={styles.iceGlass} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={styles.cube}
          style={{ left: `${18 + i * 26}%` }}
          animate={{ y: [0, -6, 0], rotate: [i * 8, i * 8 + 6, i * 8] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <span className={styles.water} />
    </div>
  );
}

function Tile({
  area,
  label,
  children,
  className = "",
  expand,
  onExpand,
}: {
  area: string;
  label: string;
  children: ReactNode;
  className?: string;
  expand?: DetailId;
  onExpand?: (id: DetailId) => void;
}) {
  const content = (
    <>
      <span className={styles.tileLabel}>
        {label}
        {expand && (
          <span className={styles.plus} aria-hidden="true">
            +
          </span>
        )}
      </span>
      {children}
    </>
  );
  const common = {
    className: `${styles.tile} ${className}`,
    style: { gridArea: area },
    variants: {
      hidden: { opacity: 0, y: 24 },
      shown: { opacity: 1, y: 0, transition: spring },
    },
    whileHover: { y: -4 },
  };
  return expand && onExpand ? (
    <motion.button
      type="button"
      {...common}
      layoutId={`tidal-${expand}`}
      onClick={() => onExpand(expand)}
      aria-label={`${label}: show details`}
    >
      {content}
    </motion.button>
  ) : (
    <motion.div {...common}>{content}</motion.div>
  );
}

export default function Page() {
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(750);
  const [open, setOpen] = useState<DetailId | null>(null);

  // Esc closes the expanded tile (and stops the shell from leaving the page).
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(null);
      }
    }
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [open]);

  const price = size === 500 ? 32 : size === 750 ? 38 : 44;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span className={styles.logo}>tidal</span>
        <a className={styles.headerCta} href="#buy">
          Shop
        </a>
      </header>

      <motion.main
        className={styles.bento}
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.06 } } }}
      >
        <Tile area="hero" label="Tidal Bottle" className={styles.heroTile}>
          <h1 className={styles.h1}>Ice-cold water, all day, in one hand.</h1>
          <p className={styles.body}>
            An insulated steel bottle that keeps drinks cold for 24 hours, opens with your
            thumb and never leaks in your bag.
          </p>
          <a className={styles.cta} href="#buy">
            Choose your color
          </a>
        </Tile>

        <Tile
          area="bottle"
          label={`${color.name} · ${size} ml`}
          className={styles.bottleTile}
        >
          <motion.div
            key={color.name}
            initial={{ scale: 0.92, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={spring}
          >
            <Bottle color={color.hex} />
          </motion.div>
        </Tile>

        <Tile
          area="temp"
          label="Temperature"
          expand="temp"
          onExpand={setOpen}
          className={styles.tintTile}
        >
          <Ice />
          <p className={styles.big}>
            6°C <span className={styles.small}>12 hours later</span>
          </p>
        </Tile>

        <Tile area="cap" label="Capacity (ml)">
          <div
            className={styles.segmented}
            role="group"
            aria-label="Capacity in millilitres"
          >
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </Tile>

        <Tile area="colors" label="Colors">
          <div className={styles.swatches} role="group" aria-label="Color">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                className={styles.swatch}
                style={{ background: c.hex }}
                aria-pressed={color.name === c.name}
                aria-label={c.name}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <p className={styles.body}>{color.name}</p>
        </Tile>

        <Tile area="lid" label="Lid" expand="lid" onExpand={setOpen}>
          <p className={styles.tileH}>One-hand flip. Zero leaks.</p>
        </Tile>

        <Tile area="reviews" label="Reviews">
          <p className={styles.big}>
            4.9 <span className={styles.small}>from 2,341 reviews</span>
          </p>
          <p className={styles.body}>
            “Still has ice in it when I get home from work.” — Aisha
          </p>
        </Tile>

        <Tile area="specs" label="Specs" expand="specs" onExpand={setOpen}>
          <ul className={styles.specList}>
            <li>18/8 stainless steel</li>
            <li>340 g</li>
            <li>Dishwasher-safe lid</li>
            <li>Lifetime warranty</li>
          </ul>
        </Tile>

        <Tile area="cta" label="Buy" className={styles.ctaTile}>
          <div id="buy" className={styles.buyRow}>
            <p className={styles.tileH}>
              {color.name}, {size} ml
            </p>
            <a className={styles.ctaLight} href="#buy">
              Add to cart · ${price}
            </a>
          </div>
        </Tile>
      </motion.main>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.scrim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(null)}
            />
            <motion.div
              className={styles.expanded}
              layoutId={`tidal-${open}`}
              transition={spring}
              role="dialog"
              aria-modal="true"
              aria-labelledby="tidal-detail-h"
            >
              <span className={styles.tileLabel}>Details</span>
              <h2 id="tidal-detail-h" className={styles.h2}>
                {details[open].title}
              </h2>
              <ul className={styles.detailList}>
                {details[open].body.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.close}
                onClick={() => setOpen(null)}
                autoFocus
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className={styles.footer}>
        Tidal is a fictional brand made for Style Discovery.
      </footer>
    </div>
  );
}
