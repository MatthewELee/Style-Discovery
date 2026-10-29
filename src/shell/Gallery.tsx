import { motion } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router";
import { concepts } from "../concepts/registry";
import styles from "./Gallery.module.css";

const MotionLink = motion.create(Link);

export default function Gallery() {
  useEffect(() => {
    document.title = "Style Discovery";
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Style Discovery</h1>
        <p className={styles.intro}>
          Single-page product sites for made-up products, each in a deliberately different
          visual style. Open any concept, use the arrows (or ← → keys) to move between
          them, and tap <strong>About this style</strong> on each page to see how it was
          made.
        </p>
      </header>

      <motion.ol
        className={styles.grid}
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.05 } } }}
      >
        {concepts.map((c) => (
          <motion.li
            key={c.slug}
            variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
          >
            <MotionLink
              to={`/c/${c.slug}`}
              className={styles.card}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <span className={styles.swatches} aria-hidden="true">
                {c.palette.map((s) => (
                  <span key={s.hex} style={{ background: s.hex }} />
                ))}
              </span>
              <span className={styles.number}>{c.number}</span>
              <span className={styles.style}>{c.style}</span>
              <span className={styles.product}>
                {c.brand} · {c.product}
              </span>
              <span className={styles.tags}>{c.visualTags.join(" · ")}</span>
            </MotionLink>
          </motion.li>
        ))}
      </motion.ol>

      <footer className={styles.footer}>{concepts.length} concepts and growing.</footer>
    </div>
  );
}
