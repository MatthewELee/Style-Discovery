import "@fontsource-variable/inter-tight";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./page.module.css";

// Precise, short, no overshoot: the Swiss motion personality.
const ease = [0.2, 0, 0, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const stagger: Variants = {
  shown: { transition: { staggerChildren: 0.08 } },
};

function InView({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      {children}
    </motion.div>
  );
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 0.9,
      ease,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{n}</span>;
}

/** The apple, built from plain geometry so it sits on the grid like everything else. */
function Apple() {
  const part = (delay: number): Variants => ({
    hidden: { scale: 0, opacity: 0 },
    shown: { scale: 1, opacity: 1, transition: { duration: 0.4, ease, delay } },
  });
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={styles.apple}
      initial="hidden"
      animate="shown"
      role="img"
      aria-label="A red apple drawn from two circles, with a black stem and grey leaf"
    >
      <motion.circle cx="78" cy="118" r="62" fill="var(--red)" variants={part(0.3)} />
      <motion.circle cx="122" cy="118" r="62" fill="var(--red)" variants={part(0.4)} />
      <motion.rect
        x="97"
        y="28"
        width="6"
        height="34"
        fill="var(--ink)"
        variants={part(0.55)}
      />
      <motion.path
        d="M104 50 C 112 26, 140 22, 152 30 C 144 50, 120 56, 104 50 Z"
        fill="var(--grey)"
        variants={part(0.65)}
        style={{ originX: "104px", originY: "50px" }}
      />
    </motion.svg>
  );
}

const features = [
  {
    n: "01",
    title: "Picked ripe",
    body: "Every apple is hand-picked the week it peaks, never stored for months.",
  },
  {
    n: "02",
    title: "Grown in rows",
    body: "Forty-eight hectares of trees planted on a grid, pruned for sun on every branch.",
  },
  {
    n: "03",
    title: "Nothing added",
    body: "No wax, no coating, no sorting by shine. Just washed, packed and sent.",
  },
];

const varieties = [
  ["Crimson Line", "Sharp, very crisp", "Sep–Oct"],
  ["Paper White", "Mild, floral", "Oct"],
  ["Number Nine", "Sweet, dense", "Oct–Nov"],
  ["Late Grid", "Tart, keeps well", "Nov–Jan"],
];

export default function Page() {
  return (
    <div className={styles.root}>
      {/* The grid itself, drawn in on load and kept visible as a design element. */}
      <div className={styles.gridLines} aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease, delay: i * 0.03 }}
          />
        ))}
      </div>

      <header className={`${styles.grid} ${styles.top}`}>
        <span className={styles.logo}>Orchard No. 1</span>
        <nav className={styles.topNav} aria-label="Orchard No. 1">
          <a href="#varieties">Varieties</a>
          <a href="#orchard">Orchard</a>
          <a href="#order">Order</a>
        </nav>
      </header>

      <main>
        <motion.section
          className={`${styles.grid} ${styles.hero}`}
          variants={stagger}
          initial="hidden"
          animate="shown"
        >
          <motion.p className={styles.heroIndex} variants={rise}>
            01
          </motion.p>
          <motion.h1 className={styles.h1} variants={rise}>
            Apple.
          </motion.h1>
          <motion.div className={styles.heroApple} variants={rise}>
            <Apple />
          </motion.div>
          <motion.p className={styles.heroLede} variants={rise}>
            Crisp, sweet apples from a single orchard, picked the week they ripen and
            delivered by the crate.
          </motion.p>
          <motion.div className={styles.heroCta} variants={rise}>
            <a className={styles.cta} href="#order">
              Order a crate <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </motion.section>

        <section id="orchard" className={styles.section} aria-labelledby="why">
          <InView className={styles.grid}>
            <motion.h2 id="why" className={styles.label} variants={rise}>
              Why these apples
            </motion.h2>
            {features.map((f) => (
              <motion.article key={f.n} className={styles.feature} variants={rise}>
                <p className={styles.featureN}>{f.n}</p>
                <h3 className={styles.h3}>{f.title}</h3>
                <p>{f.body}</p>
              </motion.article>
            ))}
          </InView>
        </section>

        <section className={styles.section} aria-label="The orchard in numbers">
          <InView className={styles.grid}>
            <motion.p className={styles.stat} variants={rise}>
              <span className={styles.statN}>
                <Count to={12} />
              </span>
              varieties
            </motion.p>
            <motion.p className={styles.stat} variants={rise}>
              <span className={styles.statN}>
                <Count to={48} />
              </span>
              hectares
            </motion.p>
            <motion.p className={styles.stat} variants={rise}>
              <span className={styles.statN}>
                <Count to={3} />
              </span>
              days, tree to door
            </motion.p>
          </InView>
        </section>

        <section id="varieties" className={styles.section} aria-labelledby="var">
          <InView className={styles.grid}>
            <motion.h2 id="var" className={styles.label} variants={rise}>
              Varieties
            </motion.h2>
            <motion.table className={styles.table} variants={rise}>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Taste</th>
                  <th scope="col">Season</th>
                </tr>
              </thead>
              <tbody>
                {varieties.map(([name, taste, season]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td>{taste}</td>
                    <td>{season}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </InView>
        </section>

        <section className={styles.section} aria-label="What customers say">
          <InView className={styles.grid}>
            <motion.blockquote className={styles.quote} variants={rise}>
              <p>“The only apples my kids eat without being asked.”</p>
              <footer>— Lena V., subscriber since 2021</footer>
            </motion.blockquote>
          </InView>
        </section>

        <section id="order" className={styles.section} aria-labelledby="order-h">
          <InView className={styles.grid}>
            <motion.h2 id="order-h" className={styles.orderH} variants={rise}>
              One crate.
              <br />
              Twelve kilos.
              <br />
              Every two weeks.
            </motion.h2>
            <motion.div className={styles.orderAction} variants={rise}>
              <p className={styles.price}>€34 per crate, free delivery</p>
              <a className={styles.cta} href="#order">
                Order a crate <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </InView>
        </section>
      </main>

      <footer className={`${styles.grid} ${styles.footer}`}>
        <span>Orchard No. 1</span>
        <span>A fictional orchard for Style Discovery.</span>
      </footer>
    </div>
  );
}
