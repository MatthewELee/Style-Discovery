import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/jost";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import styles from "./page.module.css";

const slow = { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } as const;

function Fade({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ ...slow, delay }}
    >
      {children}
    </motion.div>
  );
}

function Bottle() {
  return (
    <svg
      viewBox="0 0 140 360"
      className={styles.bottle}
      role="img"
      aria-label="A tall bone-colored shampoo bottle with a taupe cap and a small sage label"
    >
      <defs>
        <linearGradient id="ml-body" x1="0" x2="1">
          <stop offset="0" stopColor="#e6dfd4" />
          <stop offset="0.35" stopColor="#f8f4ee" />
          <stop offset="1" stopColor="#d4ccbe" />
        </linearGradient>
        <linearGradient id="ml-cap" x1="0" x2="1">
          <stop offset="0" stopColor="#5d5146" />
          <stop offset="0.4" stopColor="#85776a" />
          <stop offset="1" stopColor="#4e443b" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="352" rx="56" ry="6" fill="#2b2622" opacity="0.08" />
      <rect x="44" y="8" width="52" height="62" rx="6" fill="url(#ml-cap)" />
      <path
        d="M22 96 Q22 72 46 70 L94 70 Q118 72 118 96 L118 340 Q118 350 108 350 L32 350 Q22 350 22 340 Z"
        fill="url(#ml-body)"
      />
      <rect x="40" y="190" width="60" height="96" fill="#a3ae9a" opacity="0.9" />
      <text
        x="70"
        y="226"
        textAnchor="middle"
        fontFamily="Jost Variable"
        fontSize="7"
        letterSpacing="2.4"
        fill="#2b2622"
      >
        MAISON
      </text>
      <text
        x="70"
        y="238"
        textAnchor="middle"
        fontFamily="Jost Variable"
        fontSize="7"
        letterSpacing="2.4"
        fill="#2b2622"
      >
        LUNE
      </text>
      <line x1="58" y1="252" x2="82" y2="252" stroke="#2b2622" strokeWidth="0.6" />
      <text
        x="70"
        y="268"
        textAnchor="middle"
        fontFamily="Cormorant Garamond Variable"
        fontStyle="italic"
        fontSize="10"
        fill="#2b2622"
      >
        shampoo
      </text>
    </svg>
  );
}

const ritual = [
  {
    name: "Cleanse",
    text: "Warm water, a single measure in the palm. Work slowly from the roots; the oat milk lathers softly, never squeaks.",
  },
  {
    name: "Nourish",
    text: "Leave it for one long breath, or three. Sage and lunar mallow settle into the lengths while you do nothing at all.",
  },
  {
    name: "Rest",
    text: "Rinse cool. Towel gently. Let it dry on its own, ideally while you sleep. Hair that has been left alone looks it.",
  },
];

function Ritual() {
  const [step, setStep] = useState(0);
  const done = step === ritual.length - 1;

  return (
    <div className={styles.ritual}>
      <ol className={styles.steps}>
        {ritual.map((r, i) => (
          <li key={r.name}>
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step ? "step" : undefined}
              className={styles.stepButton}
            >
              <span className={styles.stepN}>0{i + 1}</span> {r.name}
            </button>
          </li>
        ))}
      </ol>

      <div className={styles.stepBody} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className={styles.stepTitle}>{ritual[step].name}</h3>
            <p className={styles.stepText}>{ritual[step].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {done ? (
        <a className={styles.cta} href="#acquire">
          Begin the ritual
        </a>
      ) : (
        <button type="button" className={styles.next} onClick={() => setStep(step + 1)}>
          Continue to {ritual[step + 1].name.toLowerCase()} →
        </button>
      )}
    </div>
  );
}

export default function Page() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bottleY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span className={styles.logo}>Maison Lune</span>
      </header>

      <main>
        <section ref={heroRef} className={styles.hero}>
          <motion.div
            className={styles.heroBottle}
            style={{ y: bottleY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Bottle />
          </motion.div>
          <motion.div
            className={styles.heroText}
            style={{ y: textY }}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ ...slow, delay: 0.5 }}
          >
            <p className={styles.kicker}>Shampoo · Nº 3 · 250 ml</p>
            <h1 className={styles.h1}>
              Quiet hair, <em>rested mind.</em>
            </h1>
            <a className={styles.cta} href="#ritual">
              Begin the ritual
            </a>
          </motion.div>
        </section>

        <section className={styles.section} aria-labelledby="formula">
          <Fade>
            <h2 id="formula" className={styles.kicker}>
              The formula
            </h2>
          </Fade>
          {[
            [
              "Cold-pressed oat milk",
              "A gentle cleanser that lifts the day without stripping the night.",
            ],
            [
              "Sage & lunar mallow",
              "Botanicals steeped for a full moon cycle, for softness and slow shine.",
            ],
            [
              "Nothing else",
              "No sulphates, no silicones, no synthetic fragrance. Nothing to rinse away twice.",
            ],
          ].map(([title, body], i) => (
            <Fade key={title} className={styles.feature} delay={i * 0.1}>
              <h3 className={styles.h3}>{title}</h3>
              <p>{body}</p>
            </Fade>
          ))}
        </section>

        <section id="ritual" className={styles.sectionTint} aria-labelledby="ritual-h">
          <Fade>
            <h2 id="ritual-h" className={styles.kicker}>
              The ritual
            </h2>
          </Fade>
          <Fade>
            <Ritual />
          </Fade>
        </section>

        <section className={styles.section} aria-labelledby="details">
          <Fade>
            <h2 id="details" className={styles.kicker}>
              In the bottle
            </h2>
            <p className={styles.ingredients}>
              Aqua · Avena sativa (oat) milk · Salvia officinalis (sage) extract · Althaea
              (mallow) root · Coco-glucoside · Glycerin · Citric acid
            </p>
            <dl className={styles.facts}>
              <div>
                <dt>Volume</dt>
                <dd>250 ml</dd>
              </div>
              <div>
                <dt>Lasts</dt>
                <dd>Ten weeks</dd>
              </div>
              <div>
                <dt>Bottle</dt>
                <dd>Refillable glass</dd>
              </div>
            </dl>
          </Fade>
        </section>

        <section className={styles.section} aria-label="What clients say">
          <Fade>
            <blockquote className={styles.quote}>
              <p>“It is the only part of my evening that asks nothing of me.”</p>
              <footer>Aurélie M., Lyon</footer>
            </blockquote>
          </Fade>
        </section>

        <section id="acquire" className={styles.closing} aria-labelledby="acquire-h">
          <Fade>
            <h2 id="acquire-h" className={styles.closingH}>
              Shampoo Nº 3
            </h2>
            <p className={styles.price}>
              €48 · complimentary refill after your third bottle
            </p>
            <a className={styles.cta} href="#acquire">
              Begin the ritual
            </a>
          </Fade>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Maison Lune</span>
        <span>A fictional house, made for Style Discovery.</span>
      </footer>
    </div>
  );
}
