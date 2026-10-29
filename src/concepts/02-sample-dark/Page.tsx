import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import styles from "./page.module.css";

const specs = [
  ["Weight", "120 g"],
  ["Size", "10 × 4 × 4 cm"],
  ["Material", "Placeholder"],
  ["Origin", "Nowhere in particular"],
];

export default function Page() {
  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <p className={styles.kicker}>SAMPLE CO. / 002</p>
        <h1 className={styles.h1}>PLACEHOLDER_PRODUCT</h1>
        <p>The one-line promise goes here.</p>
        <a className={styles.cta} href="#buy">
          [ PRIMARY CTA ]
        </a>
      </header>

      <main className={styles.grid}>
        <section aria-labelledby="features">
          <h2 id="features" className={styles.h2}>
            01 / FEATURES
          </h2>
          <ol className={styles.list}>
            <li>First feature in one line.</li>
            <li>Second feature in one line.</li>
            <li>Third feature in one line.</li>
          </ol>
        </section>

        <section aria-labelledby="details">
          <h2 id="details" className={styles.h2}>
            02 / DETAILS
          </h2>
          <dl className={styles.specs}>
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="proof">
          <h2 id="proof" className={styles.h2}>
            03 / PROOF
          </h2>
          <blockquote>“A quote from a happy customer.”</blockquote>
        </section>

        <section id="buy" aria-labelledby="cta">
          <h2 id="cta" className={styles.h2}>
            04 / BUY
          </h2>
          <a className={styles.cta} href="#buy">
            [ CLOSING CTA ]
          </a>
        </section>
      </main>

      <footer className={styles.footer}>© SAMPLE CO. FICTIONAL BRAND.</footer>
    </div>
  );
}
