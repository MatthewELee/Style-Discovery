import { Link } from "react-router";
import { concepts, type Concept } from "../concepts/registry";
import { galleryPath } from "./galleryFilter";
import styles from "./NavBar.module.css";

type Props = {
  concept: Concept;
  prev: Concept;
  next: Concept;
  onOpenCard: () => void;
};

/** Floating controls that sit above every concept and look the same on all of them. */
export default function NavBar({ concept, prev, next, onOpenCard }: Props) {
  return (
    <nav className={styles.bar} aria-label="Concepts">
      <Link
        to={`/c/${prev.slug}`}
        className={styles.arrow}
        aria-label={`Previous: ${prev.style}`}
        title={`${prev.style} (←)`}
      >
        <Chevron flip />
      </Link>

      <Link to={galleryPath()} className={styles.home} title="All concepts (Esc)">
        <span className={styles.count}>
          {concept.number} / {String(concepts.length).padStart(2, "0")}
        </span>
        <span className={styles.name}>{concept.style}</span>
      </Link>

      <Link
        to={`/c/${next.slug}`}
        className={styles.arrow}
        aria-label={`Next: ${next.style}`}
        title={`${next.style} (→)`}
      >
        <Chevron />
      </Link>

      <button type="button" className={styles.about} onClick={onOpenCard}>
        About this style
      </button>
    </nav>
  );
}

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
