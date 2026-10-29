import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { Concept } from "../concepts/registry";
import { defineTerm, type UxTag, type VisualTag } from "../content/glossary";
import styles from "./StyleCard.module.css";

type Props = {
  concept: Concept;
  open: boolean;
  onClose: () => void;
};

/**
 * The "About this style" panel. A native <dialog> opened with showModal(), which gives
 * focus trapping, Esc to close, an inert page behind it and focus restore for free.
 */
export default function StyleCard({ concept, open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click on the dialog element itself (not the panel inside it) is the backdrop.
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Keyed so pressed tags and scroll position reset for each concept. */}
      <div key={concept.slug} className={styles.panel}>
        <header className={styles.head}>
          <p className={styles.kicker}>
            {concept.number} · {concept.brand} · {concept.product}
          </p>
          <h2 id={titleId} className={styles.title}>
            {concept.style}
          </h2>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
            ref={closeRef}
          >
            ×
          </button>
        </header>

        <p className={styles.description}>{concept.description}</p>

        <TagGroup label="Visual" tags={concept.visualTags} />
        <TagGroup label="UX" tags={concept.uxTags} />

        <Section title="How it's built">
          <ul className={styles.list}>
            {concept.howItsBuilt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Palette">
          <Palette swatches={concept.palette} />
        </Section>

        <Section title="Typefaces">
          <ul className={styles.fonts}>
            {concept.fonts.map((font) => (
              <li key={font}>
                <span className={styles.sample} style={{ fontFamily: `"${font}"` }}>
                  Aa
                </span>
                {font}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Motion">
          <p>{concept.motion}</p>
        </Section>

        {concept.rulesBroken && concept.rulesBroken.length > 0 && (
          <Section title="Rules broken on purpose">
            <ul className={styles.list}>
              {concept.rulesBroken.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </dialog>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {children}
    </section>
  );
}

/** Tag chips; pressing one shows its glossary definition underneath. */
function TagGroup({ label, tags }: { label: string; tags: (VisualTag | UxTag)[] }) {
  const [active, setActive] = useState<VisualTag | UxTag | null>(null);
  const definitionId = useId();

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{label}</h3>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={styles.tag}
            aria-pressed={active === tag}
            aria-controls={definitionId}
            onClick={() => setActive(active === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <p id={definitionId} className={styles.definition} aria-live="polite">
        {active ? (
          <>
            <strong>{active}:</strong> {defineTerm(active)}
          </>
        ) : (
          <span className={styles.hint}>Tap a tag to see what it means.</span>
        )}
      </p>
    </section>
  );
}

function Palette({ swatches }: { swatches: Concept["palette"] }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1500);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission); the hex is visible anyway.
    }
  }

  return (
    <>
      <ul className={styles.palette}>
        {swatches.map((s) => (
          <li key={s.hex}>
            <button
              type="button"
              className={styles.swatch}
              onClick={() => copy(s.hex)}
              title={`Copy ${s.hex}`}
            >
              <span className={styles.chip} style={{ background: s.hex }} />
              <span className={styles.swatchName}>{s.name}</span>
              <span className={styles.hex}>{copied === s.hex ? "Copied" : s.hex}</span>
            </button>
          </li>
        ))}
      </ul>
      <span className={styles.visuallyHidden} aria-live="polite">
        {copied ? `Copied ${copied}` : ""}
      </span>
    </>
  );
}
