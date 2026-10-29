import { motion } from "motion/react";
import type { ReactNode } from "react";
import styles from "./page.module.css";

function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const features = [
  { title: "First feature", body: "One short sentence about why this matters." },
  { title: "Second feature", body: "Another benefit, kept brief and scannable." },
  { title: "Third feature", body: "A final reason to care, in plain words." },
];

export default function Page() {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <p className={styles.kicker}>Sample Co.</p>
        <h1 className={styles.h1}>A placeholder product.</h1>
        <p className={styles.lede}>The one-line promise goes here.</p>
        <a className={styles.cta} href="#buy">
          Primary call to action
        </a>
      </header>

      <main>
        <section className={styles.section} aria-labelledby="features">
          <Reveal>
            <h2 id="features" className={styles.h2}>
              Features
            </h2>
            <ul className={styles.features}>
              {features.map((f) => (
                <li key={f.title}>
                  <h3 className={styles.h3}>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className={styles.section} aria-labelledby="details">
          <Reveal>
            <h2 id="details" className={styles.h2}>
              Details
            </h2>
            <p className={styles.body}>
              Ingredients, specs, materials or how it's made. In a real concept this is
              where the style has to hold up under more text.
            </p>
          </Reveal>
        </section>

        <section className={styles.section} aria-labelledby="proof">
          <Reveal>
            <h2 id="proof" className={styles.h2}>
              What people say
            </h2>
            <blockquote className={styles.quote}>
              “A quote from a happy customer.”
            </blockquote>
          </Reveal>
        </section>

        <section id="buy" className={styles.closing}>
          <h2 className={styles.h2}>Ready?</h2>
          <a className={styles.cta} href="#buy">
            Closing call to action
          </a>
        </section>
      </main>

      <footer className={styles.footer}>© Sample Co. A fictional brand.</footer>
    </div>
  );
}
