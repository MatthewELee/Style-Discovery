import "@fontsource/press-start-2p";
import "@fontsource/vt323";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./page.module.css";

// Hard frames, no easing.
const frames = (n: number) => (t: number) => Math.floor(t * n) / n;

const MASCOT = [
  "....XXXX....",
  "..XXXXXXXX..",
  ".XXXXXXXXXX.",
  ".XXWWXXWWXX.",
  "XXXWKXXWKXXX",
  "XXXXXXXXXXXX",
  "XHXXXXXXXXHX",
  "XXXXKKKKXXXX",
  ".XXXXKKXXXX.",
  ".XXXXXXXXXX.",
  "..XXXXXXXX..",
  "....XXXX....",
];

function Sprite({
  map,
  colors,
  className,
  label,
}: {
  map: string[];
  colors: Record<string, string>;
  className?: string;
  label?: string;
}) {
  const w = map[0].length;
  return (
    <svg
      viewBox={`0 0 ${w} ${map.length}`}
      className={className}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {map.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[c]} />
          ),
        ),
      )}
    </svg>
  );
}

const flavors = [
  {
    name: "STRAWBURST",
    body: "#FF004D",
    stats: { flavor: 9, bubble: 7, chew: 6 },
    line: "Sweet strawberry with a sour finish.",
  },
  {
    name: "BLUE BLITZ",
    body: "#29ADFF",
    stats: { flavor: 7, bubble: 10, chew: 7 },
    line: "Blue raspberry. Biggest bubbles in the game.",
  },
  {
    name: "MINT MACHINE",
    body: "#00E436",
    stats: { flavor: 6, bubble: 6, chew: 10 },
    line: "Cool mint that lasts and lasts.",
  },
];

function Mascot({ body, label }: { body: string; label?: string }) {
  return (
    <Sprite
      map={MASCOT}
      colors={{ X: body, W: "#FFF1E8", K: "#1D2B53", H: "#FF77A8" }}
      className={styles.mascot}
      label={label}
    />
  );
}

function Bar({ value, label, play }: { value: number; label: string; play: number }) {
  return (
    <div className={styles.bar}>
      <span className={styles.barLabel}>{label}</span>
      <span
        className={styles.blocks}
        aria-label={`${label} ${value} out of 10`}
        role="img"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <motion.span
            key={`${play}-${i}`}
            className={i < value ? styles.blockOn : styles.blockOff}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0, delay: i < value ? i * 0.06 : 0 }}
          />
        ))}
      </span>
    </div>
  );
}

function Countdown() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [n, setN] = useState(9);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setN((v) => (v === 0 ? 9 : v - 1)), 1000);
    return () => clearInterval(id);
  }, [inView, reduce]);
  return (
    <span ref={ref} className={styles.count} aria-hidden="true">
      {n}
    </span>
  );
}

export default function Page() {
  const [pick, setPick] = useState(0);
  const [blows, setBlows] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);
  const flavor = flavors[pick];

  function choose(i: number) {
    setPick(i);
    setBlows((b) => b + 1);
  }

  function onSelectKey(e: KeyboardEvent<HTMLDivElement>) {
    // Arrow keys move the cursor here, so stop the gallery from changing page.
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const next =
        (pick + (e.key === "ArrowRight" ? 1 : -1) + flavors.length) % flavors.length;
      choose(next);
      const buttons = selectRef.current?.querySelectorAll("button");
      buttons?.[next]?.focus();
    }
  }

  function start() {
    document.getElementById("pp-select")?.scrollIntoView({ behavior: "smooth" });
    selectRef.current?.querySelectorAll("button")[pick]?.focus({ preventScroll: true });
  }

  return (
    <div className={styles.root}>
      <main>
        {/* SCREEN 1: title */}
        <section
          className={`${styles.screen} ${styles.title}`}
          aria-labelledby="pp-title"
        >
          <p className={styles.credit}>1UP 000000 &nbsp; HI 999990</p>
          <h1 id="pp-title" className={styles.logo}>
            <span>PIXEL</span>
            <span>POP</span>
          </h1>
          <p className={styles.sub}>BUBBLE GUM · 3 FLAVORS · 1 PLAYER</p>
          <div className={styles.titleCast} aria-hidden="true">
            {flavors.map((f) => (
              <Mascot key={f.name} body={f.body} />
            ))}
          </div>
          <button type="button" className={styles.start} onClick={start}>
            PRESS START
          </button>
          <p className={styles.small}>
            © 1987 PIXEL POP CONFECTIONERY (NOT A REAL COMPANY)
          </p>
        </section>

        {/* SCREEN 2: character select */}
        <section id="pp-select" className={styles.screen} aria-labelledby="pp-select-h">
          <h2 id="pp-select-h" className={styles.h2}>
            SELECT YOUR FLAVOR
          </h2>
          <p className={styles.hint}>USE ← → OR CLICK. EACH PICK BLOWS A BUBBLE.</p>
          <div
            ref={selectRef}
            className={styles.select}
            role="group"
            aria-label="Flavors"
            onKeyDown={onSelectKey}
          >
            {flavors.map((f, i) => (
              <button
                key={f.name}
                type="button"
                className={styles.card}
                aria-pressed={pick === i}
                onClick={() => choose(i)}
              >
                {pick === i && (
                  <span className={styles.cursor} aria-hidden="true">
                    ▶
                  </span>
                )}
                <span className={styles.cardArt}>
                  <Mascot body={f.body} />
                  {pick === i && blows > 0 && (
                    <motion.span
                      key={blows}
                      className={styles.bubble}
                      aria-hidden="true"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 0.4, 0.7, 1, 1.25, 0],
                        opacity: [1, 1, 1, 1, 1, 0],
                      }}
                      transition={{ duration: 1.2, ease: frames(6) }}
                    />
                  )}
                </span>
                <span className={styles.cardName}>{f.name}</span>
              </button>
            ))}
          </div>
          <p className={styles.flavorLine} aria-live="polite">
            {flavor.name}: {flavor.line}
          </p>
        </section>

        {/* SCREEN 3: stats */}
        <section className={styles.screen} aria-labelledby="pp-stats">
          <h2 id="pp-stats" className={styles.h2}>
            STATS: <span style={{ color: flavor.body }}>{flavor.name}</span>
          </h2>
          <div className={styles.stats}>
            <Bar label="FLAVOR" value={flavor.stats.flavor} play={blows} />
            <Bar label="BUBBLE" value={flavor.stats.bubble} play={blows} />
            <Bar label="CHEW TIME" value={flavor.stats.chew} play={blows} />
          </div>
          <ul className={styles.perks}>
            <li>★ SUGAR-FREE (XYLITOL POWER-UP)</li>
            <li>★ 10 PIECES PER PACK</li>
            <li>★ COLLECT ALL 3 STICKERS INSIDE</li>
          </ul>
        </section>

        {/* SCREEN 4: high scores (reviews) */}
        <section className={styles.screen} aria-labelledby="pp-scores">
          <h2 id="pp-scores" className={styles.h2}>
            HIGH SCORES
          </h2>
          <table className={styles.scores}>
            <thead>
              <tr>
                <th scope="col">RANK</th>
                <th scope="col">NAME</th>
                <th scope="col">BUBBLE</th>
                <th scope="col">SAYS</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1ST", "ZOE", "31 CM", "BLUE BLITZ IS UNBEATABLE"],
                ["2ND", "KAI", "28 CM", "TASTE LASTS 2 WHOLE LEVELS"],
                ["3RD", "MOM", "12 CM", "BETTER THAN THE GUM I HAD"],
              ].map(([rank, name, score, says]) => (
                <tr key={rank}>
                  <td>{rank}</td>
                  <td>{name}</td>
                  <td>{score}</td>
                  <td>{says}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* SCREEN 5: continue (the CTA) */}
        <section
          id="pp-buy"
          className={`${styles.screen} ${styles.continue}`}
          aria-labelledby="pp-continue"
        >
          <h2 id="pp-continue" className={styles.continueH}>
            CONTINUE? <Countdown />
          </h2>
          <a className={styles.insert} href="#pp-buy">
            INSERT COIN — BUY NOW
          </a>
          <p className={styles.hint}>5 PACKS · $6 · FREE SHIPPING ON 3+ CREDITS</p>
        </section>
      </main>

      <footer className={styles.footer}>
        GAME OVER? NEVER. · PIXEL POP IS A FICTIONAL BRAND
      </footer>
    </div>
  );
}
