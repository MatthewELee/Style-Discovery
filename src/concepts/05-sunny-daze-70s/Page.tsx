import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/dm-sans";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import styles from "./page.module.css";

const stripes = ["var(--orange)", "var(--mustard)", "var(--rust)", "var(--avocado)"];

/** A wavy divider whose path gently ripples between two shapes, forever. */
function Wave({ color, flip = false }: { color: string; flip?: boolean }) {
  const a = "M0 30 C 160 0, 320 60, 480 30 S 800 0, 960 30 S 1280 60, 1440 30 V 60 H 0 Z";
  const b = "M0 30 C 160 60, 320 0, 480 30 S 800 60, 960 30 S 1280 0, 1440 30 V 60 H 0 Z";
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={styles.wave}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden="true"
    >
      <motion.path
        fill={color}
        initial={{ d: a }}
        animate={{ d: [a, b, a] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Sunburst() {
  const rays = Array.from({ length: 16 }, (_, i) => i);
  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      className={styles.sunburst}
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      {rays.map((i) => (
        <path
          key={i}
          d="M0 0 L -9 -100 L 9 -100 Z"
          fill={i % 2 ? "var(--mustard)" : "var(--orange)"}
          transform={`rotate(${(i * 360) / rays.length})`}
        />
      ))}
      <circle r="38" fill="var(--rust)" />
    </motion.svg>
  );
}

function Jar() {
  return (
    <svg
      viewBox="0 0 160 200"
      className={styles.jar}
      role="img"
      aria-label="A glass jar of golden granola with a rust lid and a cream label reading Sunny Daze"
    >
      <rect x="30" y="8" width="100" height="26" rx="8" fill="#b5462e" />
      <rect x="30" y="26" width="100" height="6" fill="#8a3322" />
      <path
        d="M22 44 Q22 34 34 34 L126 34 Q138 34 138 44 L138 176 Q138 192 122 192 L38 192 Q22 192 22 176 Z"
        fill="#d9a21b"
      />
      {Array.from({ length: 26 }, (_, i) => (
        <ellipse
          key={i}
          cx={34 + ((i * 37) % 92)}
          cy={52 + ((i * 53) % 130)}
          rx="5"
          ry="3"
          fill={i % 3 ? "#b5772a" : "#f2e3c6"}
          transform={`rotate(${(i * 47) % 180} ${34 + ((i * 37) % 92)} ${52 + ((i * 53) % 130)})`}
        />
      ))}
      <rect x="34" y="92" width="92" height="56" rx="28" fill="#f2e3c6" />
      <text
        x="80"
        y="118"
        textAnchor="middle"
        fontFamily="Fraunces Variable"
        fontStyle="italic"
        fontWeight="800"
        fontSize="17"
        fill="#3b2418"
      >
        Sunny
      </text>
      <text
        x="80"
        y="137"
        textAnchor="middle"
        fontFamily="Fraunces Variable"
        fontStyle="italic"
        fontWeight="800"
        fontSize="17"
        fill="#b5462e"
      >
        Daze
      </text>
      <path
        d="M30 50 Q 34 120 30 176"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Oat({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.span
      className={styles.oat}
      style={{ left: x, top: y }}
      animate={{ y: [0, -14, 0], rotate: [0, 20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    />
  );
}

export default function Page() {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const stretch = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.6, 0.6]);
  const skew = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <span className={styles.logo}>Sunny Daze</span>
        <span className={styles.est}>Est. 1974 · Good vibes granola</span>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroArt}>
            <Sunburst />
            <motion.div
              className={styles.jarWrap}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
            >
              <Jar />
            </motion.div>
            <Oat x="8%" y="20%" delay={0} />
            <Oat x="86%" y="12%" delay={1.2} />
            <Oat x="78%" y="78%" delay={0.6} />
            <Oat x="12%" y="74%" delay={1.8} />
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.h1}>
              Good morning,
              <br />
              sunshine.
            </h1>
            <p className={styles.lede}>
              Slow-toasted oat clusters with honey, toasted coconut and a whole lot of
              warmth. Breakfast, but make it groovy.
            </p>
            <a className={styles.cta} href="#buy">
              Get groovy
            </a>
          </div>
        </section>

        <motion.div
          ref={bandRef}
          className={styles.band}
          style={{ skewY: skew }}
          aria-hidden="true"
        >
          {stripes.map((c) => (
            <motion.span key={c} style={{ background: c, scaleY: stretch }} />
          ))}
        </motion.div>

        <section className={styles.features} aria-labelledby="why">
          <h2 id="why" className={styles.h2}>
            Far-out flavor
          </h2>
          <ul className={styles.badges}>
            {[
              [
                "Slow-toasted",
                "Baked low and slow for 3 hours until every cluster is golden.",
              ],
              [
                "Honey-kissed",
                "Sweetened only with wildflower honey from down the road.",
              ],
              ["Big clusters", "Chunky, snackable clusters that stay crunchy in milk."],
            ].map(([title, body], i) => (
              <motion.li
                key={title}
                className={styles.badge}
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  delay: i * 0.12,
                }}
              >
                <h3 className={styles.h3}>{title}</h3>
                <p>{body}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        <Wave color="var(--cream)" />
        <section className={styles.details} aria-labelledby="inside">
          <h2 id="inside" className={styles.h2Dark}>
            What&apos;s in the jar
          </h2>
          <ul className={styles.ingredients}>
            {[
              "Rolled oats",
              "Wildflower honey",
              "Toasted coconut",
              "Pecans",
              "Sunflower seeds",
              "Sea salt",
              "Cinnamon",
            ].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className={styles.note}>
            400 g jar · no refined sugar · baked in small batches
          </p>
        </section>
        <Wave color="var(--cream)" flip />

        <section className={styles.proof} aria-label="What people say">
          <blockquote className={styles.quote}>
            <p>“Tastes like Saturday morning cartoons and my grandma&apos;s kitchen.”</p>
            <footer>— Dana R., granola convert</footer>
          </blockquote>
        </section>

        <section id="buy" className={styles.buy} aria-labelledby="buy-h">
          <h2 id="buy-h" className={styles.buyH}>
            Let the sunshine in
          </h2>
          <p className={styles.lede}>$9 a jar, or $24 for a groovy three-pack.</p>
          <a className={styles.cta} href="#buy">
            Get groovy
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footStripes} aria-hidden="true">
          {stripes.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </div>
        <p>Sunny Daze is a fictional brand. Peace, love and oats.</p>
      </footer>
    </div>
  );
}
