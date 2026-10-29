import "@fontsource/anton";
import "@fontsource/chakra-petch/400.css";
import "@fontsource/chakra-petch/600.css";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import styles from "./page.module.css";

const scenes = [
  {
    word: "ZERO SUGAR.",
    color: "var(--acid)",
    body: "All the voltage, none of the crash. Sweetened with nothing you need to look up.",
  },
  {
    word: "200 MG CAFFEINE.",
    color: "var(--cyan)",
    body: "Natural caffeine from green coffee beans, released steady over four hours.",
  },
  {
    word: "MAX FOCUS.",
    color: "var(--hot)",
    body: "L-theanine and B-vitamins keep the edge sharp, not jittery.",
  },
];

function Can({ glow }: { glow: MotionValue<string> }) {
  return (
    <motion.svg
      viewBox="0 0 120 240"
      className={styles.can}
      style={{ filter: glow }}
      role="img"
      aria-label="A black VOLT RUSH can with an acid-green lightning bolt"
    >
      <defs>
        <linearGradient id="vr-metal" x1="0" x2="1">
          <stop offset="0" stopColor="#0b0b0b" />
          <stop offset="0.3" stopColor="#2b2b2b" />
          <stop offset="0.55" stopColor="#0d0d0d" />
          <stop offset="1" stopColor="#1c1c1c" />
        </linearGradient>
        <linearGradient id="vr-top" x1="0" x2="1">
          <stop offset="0" stopColor="#6b6b6b" />
          <stop offset="0.5" stopColor="#d9d9d9" />
          <stop offset="1" stopColor="#6b6b6b" />
        </linearGradient>
      </defs>
      <rect x="14" y="6" width="92" height="16" rx="6" fill="url(#vr-top)" />
      <rect
        x="10"
        y="18"
        width="100"
        height="214"
        rx="14"
        fill="url(#vr-metal)"
        stroke="#b6ff00"
        strokeWidth="1.5"
      />
      <path d="M68 46 L40 124 L62 124 L50 194 L84 104 L62 104 L74 46 Z" fill="#b6ff00" />
      <text
        x="60"
        y="222"
        textAnchor="middle"
        fontFamily="Anton"
        fontSize="20"
        letterSpacing="2"
        fill="#00f0ff"
      >
        VOLT RUSH
      </text>
      <rect x="18" y="26" width="6" height="196" rx="3" fill="#fff" opacity="0.12" />
    </motion.svg>
  );
}

function Scene({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const start = i / scenes.length;
  const end = (i + 1) / scenes.length;
  const mid = (start + end) / 2;
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, i === scenes.length - 1 ? 1 : 0],
  );
  const scale = useTransform(progress, [start, start + 0.06, mid], [2.2, 1, 0.96]);
  return (
    <motion.p
      className={styles.sceneWord}
      style={{ opacity, scale, color: scenes[i].color }}
      aria-hidden="true"
    >
      {scenes[i].word}
    </motion.p>
  );
}

export default function Page() {
  const pinRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // One full spin across the three scenes, faked in 2D by squashing the can's width.
  // abs() so the can turns edge-on and back without ever showing a mirrored label.
  const spin = useTransform(scrollYProgress, (p) =>
    Math.max(0.12, Math.abs(Math.cos(p * Math.PI * 2))),
  );
  const tilt = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const canScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 1]);
  const glow = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      "drop-shadow(0 0 10px #b6ff00)",
      "drop-shadow(0 0 28px #b6ff00)",
      "drop-shadow(0 0 28px #00f0ff)",
      "drop-shadow(0 0 36px #ff2e63)",
    ],
  );
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span className={styles.logo}>VOLT//RUSH</span>
        <a className={styles.headerCta} href="#power">
          POWER UP
        </a>
      </header>

      <main>
        <section className={styles.hero}>
          <motion.h1
            className={styles.h1}
            initial={{ y: 80, opacity: 0, skewY: 6 }}
            animate={{ y: 0, opacity: 1, skewY: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.glitch} data-text="CHARGE">
              CHARGE
            </span>
            <span className={styles.h1Line2}>EVERYTHING.</span>
          </motion.h1>
          <p className={styles.lede}>
            VOLT RUSH is a zero-sugar energy drink built for late nights, early starts and
            the final boss. Scroll to power up.
          </p>
          <span className={styles.scrollHint} aria-hidden="true">
            ▼ SCROLL
          </span>
        </section>

        {/* Pinned scroll scene: the section is tall, the stage inside it sticks. */}
        <section
          ref={pinRef}
          className={styles.pin}
          aria-label="Three reasons, revealed as you scroll"
        >
          <div className={styles.stage}>
            <div className={styles.scenes}>
              {scenes.map((_, i) => (
                <Scene key={i} i={i} progress={scrollYProgress} />
              ))}
            </div>
            <motion.div
              className={styles.canWrap}
              style={{ scaleX: spin, rotate: tilt, scale: canScale }}
            >
              <Can glow={glow} />
            </motion.div>
            <div className={styles.meter} aria-hidden="true">
              <span>CHARGE</span>
              <div className={styles.meterTrack}>
                <motion.div className={styles.meterFill} style={{ width: barWidth }} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features} aria-labelledby="specs">
          <h2 id="specs" className={styles.h2}>
            <span className={styles.glitch} data-text="THE LOADOUT">
              THE LOADOUT
            </span>
          </h2>
          <ul className={styles.cards}>
            {scenes.map((s) => (
              <li key={s.word} className={styles.card} style={{ borderColor: s.color }}>
                <h3 className={styles.h3} style={{ color: s.color }}>
                  {s.word}
                </h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.details} aria-labelledby="facts">
          <h2 id="facts" className={styles.h2}>
            PER 500 ML CAN
          </h2>
          <dl className={styles.facts}>
            {[
              ["CAFFEINE", "200 mg"],
              ["SUGAR", "0 g"],
              ["CALORIES", "10"],
              ["FLAVOR", "Acid lime"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.warning}>
            Not for children, pregnant people or anyone sensitive to caffeine. Max 2 cans
            a day.
          </p>
        </section>

        <section className={styles.proof} aria-label="What players say">
          {[
            ["“Clutched a 1v4 at 3am. Coincidence? No.”", "@nightcore_vex"],
            [
              "“Finally an energy drink that doesn't taste like a battery.”",
              "@lena.codes",
            ],
          ].map(([q, who]) => (
            <blockquote key={who} className={styles.quote}>
              <p>{q}</p>
              <footer>{who}</footer>
            </blockquote>
          ))}
        </section>

        <section id="power" className={styles.buy} aria-labelledby="buy-h">
          <h2 id="buy-h" className={styles.buyH}>
            <span className={styles.glitch} data-text="POWER UP">
              POWER UP
            </span>
          </h2>
          <a className={styles.cta} href="#power">
            12-PACK — $29 →
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        VOLT RUSH IS A FICTIONAL BRAND // DRINK WATER TOO
      </footer>
    </div>
  );
}
