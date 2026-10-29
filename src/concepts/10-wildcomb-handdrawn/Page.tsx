import "@fontsource-variable/caveat";
import "@fontsource-variable/lora";
import "@fontsource-variable/lora/wght-italic.css";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import styles from "./page.module.css";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.4, ease: "easeInOut", delay: i * 0.15 },
      opacity: { duration: 0.01, delay: i * 0.15 },
    },
  }),
};

/** A line drawing that draws itself in when it scrolls into view. */
function Sketch({
  paths,
  viewBox,
  className,
  label,
}: {
  paths: string[];
  viewBox: string;
  className: string;
  /** Empty for purely decorative doodles. */
  label: string;
}) {
  return (
    <motion.svg
      viewBox={viewBox}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      {paths.map((d, i) => (
        <motion.path key={i} d={d} custom={i} variants={draw} />
      ))}
    </motion.svg>
  );
}

const jar = [
  "M58 40 C 57 30, 143 29, 142 41 C 143 50, 58 52, 58 40 Z",
  "M60 48 C 46 60, 40 80, 41 110 C 39 160, 42 200, 52 226 C 80 236, 122 236, 149 225 C 160 200, 162 160, 159 110 C 160 80, 154 60, 141 49",
  "M70 120 C 92 116, 112 118, 132 121 C 134 140, 133 158, 131 172 C 110 175, 90 174, 69 171 C 67 156, 68 138, 70 120 Z",
  "M84 140 C 92 136, 100 152, 108 146 C 114 141, 118 150, 120 148",
  "M52 180 C 70 186, 128 187, 150 180",
];

const flower = [
  "M50 95 C 52 75, 48 60, 50 45",
  "M50 45 C 38 40, 36 26, 50 28 C 64 26, 62 40, 50 45 Z",
  "M50 45 C 40 52, 28 46, 34 36",
  "M50 45 C 60 52, 72 46, 66 36",
  "M50 72 C 40 66, 32 70, 30 64",
];

const hex = [
  "M50 14 L 80 31 L 80 66 L 50 84 L 20 66 L 21 31 Z",
  "M50 32 L 63 40 L 63 56 L 50 64 L 37 56 L 37 40 Z",
];

const leaf = [
  "M20 80 C 22 46, 50 20, 84 18 C 82 52, 58 80, 20 80 Z",
  "M20 80 C 40 60, 58 42, 76 26",
];

const hive = [
  "M60 70 C 90 40, 210 40, 240 70",
  "M48 100 C 90 82, 210 82, 252 100 C 256 104, 256 116, 252 120 C 210 104, 90 104, 48 120 C 44 116, 44 104, 48 100 Z",
  "M40 150 C 90 132, 210 132, 260 150 C 264 156, 264 168, 260 172 C 210 156, 90 156, 40 172 C 36 166, 36 156, 40 150 Z",
  "M38 204 C 90 186, 210 186, 262 204 C 266 210, 266 222, 262 226 C 210 210, 90 210, 38 226 C 34 220, 34 210, 38 204 Z",
  "M44 258 C 90 242, 210 242, 256 258 C 258 268, 256 276, 250 282 C 200 270, 100 270, 50 282 C 44 276, 42 268, 44 258 Z",
  "M134 262 C 136 252, 164 252, 166 262 C 166 270, 134 270, 134 262 Z",
  "M30 300 C 100 296, 200 296, 270 300",
];

function ScrollHive() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const length = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref}>
      <svg
        viewBox="0 0 300 320"
        className={styles.hive}
        role="img"
        aria-label="A sketch of a traditional straw beehive, drawn stroke by stroke as you scroll"
      >
        {hive.map((d, i) => (
          <motion.path key={i} d={d} style={{ pathLength: length }} />
        ))}
      </svg>
    </div>
  );
}

function Flower({ x, delay }: { x: string; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={styles.swayFlower}
      style={{ left: x, originX: "50%", originY: "95%" }}
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      {flower.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </motion.svg>
  );
}

export default function Page() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span className={styles.logo}>Wildcomb</span>
        <span className={styles.tag}>raw honey from the hedgerows</span>
      </header>

      <main>
        <section className={styles.hero}>
          {/* The bee loops along a CSS offset-path. */}
          <span className={styles.bee} aria-hidden="true">
            <svg viewBox="0 0 40 30">
              <ellipse cx="20" cy="18" rx="11" ry="8" className={styles.beeBody} />
              <path d="M17 11 C 17 16, 17 21, 17 25 M 23 11 C 23 16, 23 21, 23 25" />
              <path d="M14 11 C 6 0, 2 8, 13 13 M 24 11 C 30 0, 38 6, 26 13" />
            </svg>
          </span>

          <div className={styles.heroArt}>
            <Sketch
              paths={jar}
              viewBox="0 0 200 250"
              className={styles.jar}
              label="A hand-drawn jar of honey with a simple label"
            />
            <p className={styles.noteJar}>
              <span aria-hidden="true">↙</span> raw, never heated
            </p>
          </div>

          <div className={styles.heroText}>
            <h1 className={styles.h1}>Honey that tastes like where it&apos;s from.</h1>
            <p className={styles.lede}>
              We keep forty hives along old hedgerows and wildflower meadows. Each jar is
              spun from a single hive, so every batch tastes a little different, and we
              write on the lid which one it came from.
            </p>
            <a className={styles.cta} href="#order">
              Order a jar from the hive
            </a>
          </div>
        </section>

        <div className={styles.meadow} aria-hidden="true">
          {[6, 18, 31, 52, 67, 80, 92].map((x, i) => (
            <Flower key={x} x={`${x}%`} delay={i * 0.4} />
          ))}
        </div>

        <section className={styles.features} aria-labelledby="why">
          <h2 id="why" className={styles.h2}>
            Why it&apos;s different
          </h2>
          <ul className={styles.notes}>
            <li>
              <Sketch
                paths={flower}
                viewBox="0 0 100 100"
                className={styles.doodle}
                label=""
              />
              <h3 className={styles.h3}>Wildflower only</h3>
              <p>
                No crop fields nearby. Bees forage bramble, clover, lime and whatever is
                in bloom.
              </p>
            </li>
            <li>
              <Sketch
                paths={hex}
                viewBox="0 0 100 100"
                className={styles.doodle}
                label=""
              />
              <h3 className={styles.h3}>One hive, one jar</h3>
              <p>Never blended. The hive number is hand-written on every lid.</p>
            </li>
            <li>
              <Sketch
                paths={leaf}
                viewBox="0 0 100 100"
                className={styles.doodle}
                label=""
              />
              <h3 className={styles.h3}>Bees first</h3>
              <p>
                We only take the surplus and leave plenty for winter. Some years that
                means less honey.
              </p>
            </li>
          </ul>
        </section>

        <section className={styles.hiveSection} aria-labelledby="how">
          <div className={styles.hiveArt}>
            <ScrollHive />
          </div>
          <div className={styles.notebook}>
            <h2 id="how" className={styles.h2}>
              From hive to jar
            </h2>
            <ol className={styles.steps}>
              <li>Frames lifted by hand in late summer, only when capped.</li>
              <li>Cold-spun in our shed, then strained once through cloth.</li>
              <li>Poured straight into jars. Nothing heated, nothing added.</li>
              <li>Lid labelled with the hive number and the date.</li>
            </ol>
            <p className={styles.margin}>
              <span aria-hidden="true">→</span> it will crystallise in winter. That&apos;s
              a good sign! Stand the jar in warm water.
            </p>
            <dl className={styles.facts}>
              <div>
                <dt>Jar</dt>
                <dd>340 g, glass</dd>
              </div>
              <div>
                <dt>Hives</dt>
                <dd>40</dd>
              </div>
              <div>
                <dt>Season</dt>
                <dd>Aug–Sep</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.proof} aria-label="Kind words">
          {[
            [
              "“Hive 23 tasted like the lane I grew up on. I cried a bit, honestly.”",
              "Maggie, by post",
            ],
            [
              "“The only honey my daughter will eat off the spoon.”",
              "Tom, at the market",
            ],
          ].map(([q, who], i) => (
            <motion.blockquote
              key={who}
              className={styles.sticky}
              initial={{ rotate: 0, y: 20, opacity: 0 }}
              whileInView={{ rotate: i ? 2.5 : -2, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <p>{q}</p>
              <footer>— {who}</footer>
            </motion.blockquote>
          ))}
        </section>

        <section id="order" className={styles.buy} aria-labelledby="buy-h">
          <h2 id="buy-h" className={styles.h2}>
            Take a jar home
          </h2>
          <p>£11 a jar. We post on Mondays, wrapped in paper.</p>
          <a className={styles.cta} href="#order">
            Order a jar from the hive
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        Wildcomb is a made-up apiary · drawn by hand for Style Discovery
      </footer>
    </div>
  );
}
