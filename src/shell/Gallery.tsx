import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { concepts } from "../concepts/registry";
import styles from "./Gallery.module.css";
import {
  filterGroups,
  matches,
  optionsFor,
  rememberGallerySearch,
  toggle,
} from "./galleryFilter";

const MotionLink = motion.create(Link);

export default function Gallery() {
  useEffect(() => {
    document.title = "Style Discovery";
  }, []);

  const [params, setParams] = useSearchParams();
  const shown = concepts.filter((c) => matches(c, params));
  const filtering = params.size > 0;

  useEffect(() => {
    rememberGallerySearch(params.size ? `?${params}` : "");
  }, [params]);

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

      <section className={styles.filters} aria-label="Filter concepts">
        {filterGroups.map((group) => (
          <div
            key={group.param}
            className={styles.group}
            role="group"
            aria-label={group.label}
          >
            <span className={styles.groupLabel} aria-hidden="true">
              {group.label}
            </span>
            <span className={styles.chips}>
              {optionsFor(group, concepts).map((value) => {
                const on = params.getAll(group.param).includes(value);
                const next = toggle(params, group, value);
                const count = concepts.filter((c) => matches(c, next)).length;
                return (
                  <button
                    key={value}
                    type="button"
                    className={styles.chip}
                    aria-pressed={on}
                    disabled={!on && count === 0}
                    onClick={() => setParams(next, { replace: true })}
                  >
                    {group.format ? group.format(value) : value}
                    {!on && <span className={styles.chipCount}>{count}</span>}
                  </button>
                );
              })}
            </span>
          </div>
        ))}
        <p className={styles.status} role="status">
          {filtering ? (
            <>
              Showing {shown.length} of {concepts.length}
              <button
                type="button"
                className={styles.clear}
                onClick={() => setParams({}, { replace: true })}
              >
                Clear filters
              </button>
            </>
          ) : (
            "Pick a tag or an axis to narrow the list."
          )}
        </p>
      </section>

      <motion.ol
        className={styles.grid}
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.05 } } }}
      >
        <AnimatePresence mode="popLayout">
          {shown.map((c) => (
            <motion.li
              key={c.slug}
              layout
              variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
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
        </AnimatePresence>
      </motion.ol>

      {shown.length === 0 && (
        <p className={styles.empty}>No concept matches all of these filters.</p>
      )}

      <footer className={styles.footer}>{concepts.length} concepts and growing.</footer>
    </div>
  );
}
