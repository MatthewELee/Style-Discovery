import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import { motion, type Variants } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import styles from "./page.module.css";

// No easing: jump in four hard steps.
const stepped = (t: number) => Math.floor(t * 4) / 4;

const appear: Variants = {
  hidden: { opacity: 0, x: -12 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.24, ease: stepped } },
};

function Block({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      variants={appear}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

type Deck = {
  model: string;
  width: number;
  length: number;
  wheelbase: number;
  price: number;
  stock: number;
};

const decks: Deck[] = [
  { model: "SLAB", width: 8.25, length: 31.9, wheelbase: 14.25, price: 64, stock: 14 },
  { model: "REBAR", width: 8.5, length: 32.1, wheelbase: 14.38, price: 64, stock: 6 },
  { model: "CURB", width: 8.0, length: 31.5, wheelbase: 14.0, price: 58, stock: 22 },
  { model: "PILLAR", width: 8.75, length: 32.5, wheelbase: 14.5, price: 69, stock: 3 },
  { model: "GRAVEL", width: 7.75, length: 31.25, wheelbase: 13.75, price: 54, stock: 0 },
];

const columns: { key: keyof Deck; label: string; unit?: string }[] = [
  { key: "model", label: "MODEL" },
  { key: "width", label: "WIDTH", unit: '"' },
  { key: "length", label: "LENGTH", unit: '"' },
  { key: "wheelbase", label: "WB", unit: '"' },
  { key: "price", label: "PRICE", unit: "$" },
  { key: "stock", label: "STOCK" },
];

function SpecTable() {
  const [sort, setSort] = useState<{ key: keyof Deck; dir: 1 | -1 }>({
    key: "model",
    dir: 1,
  });

  const rows = useMemo(
    () =>
      [...decks].sort((a, b) =>
        a[sort.key] > b[sort.key] ? sort.dir : a[sort.key] < b[sort.key] ? -sort.dir : 0,
      ),
    [sort],
  );

  return (
    <table className={styles.table}>
      <caption className={styles.caption}>
        ALL DECKS. CLICK A COLUMN TO SORT. SORTED BY {sort.key.toUpperCase()}{" "}
        {sort.dir === 1 ? "ASC" : "DESC"}.
      </caption>
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c.key}
              scope="col"
              aria-sort={
                sort.key === c.key
                  ? sort.dir === 1
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button
                type="button"
                onClick={() =>
                  setSort((s) => ({
                    key: c.key,
                    dir: s.key === c.key ? (s.dir === 1 ? -1 : 1) : 1,
                  }))
                }
              >
                {c.label}
                {sort.key === c.key ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((d) => (
          <tr key={d.model} className={d.stock === 0 ? styles.soldOut : undefined}>
            <th scope="row">{d.model}</th>
            <td>{d.width.toFixed(2)}"</td>
            <td>{d.length.toFixed(2)}"</td>
            <td>{d.wheelbase.toFixed(2)}"</td>
            <td>${d.price}</td>
            <td>{d.stock === 0 ? "SOLD OUT" : d.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DeckGraphic() {
  return (
    <svg
      viewBox="0 0 120 400"
      className={styles.deck}
      role="img"
      aria-label="Top view of a grey, concrete-textured skateboard deck"
    >
      <defs>
        <filter id="cd-xerox">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 -2.2 1.35"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <rect
        x="6"
        y="6"
        width="108"
        height="388"
        rx="54"
        fill="#c8c8c8"
        stroke="#000"
        strokeWidth="6"
      />
      <rect
        x="6"
        y="6"
        width="108"
        height="388"
        rx="54"
        fill="#000"
        filter="url(#cd-xerox)"
      />
      {[70, 92, 308, 330].map((y) => (
        <g key={y}>
          <circle cx="36" cy={y} r="5" fill="#000" />
          <circle cx="84" cy={y} r="5" fill="#000" />
        </g>
      ))}
      <text
        x="60"
        y="200"
        textAnchor="middle"
        fontFamily="Space Mono"
        fontWeight="700"
        fontSize="20"
        transform="rotate(-90 60 200)"
        fill="#000"
      >
        CONCRETE
      </text>
    </svg>
  );
}

export default function Page() {
  return (
    <div className={styles.root}>
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>
              SPECS: 7-PLY MAPLE /// PRICE: $54–$69 /// STOCK: 45 DECKS /// SHIPS: FRIDAY
              /// RETURNS: 30 DAYS /// NO GRAPHICS /// NO HYPE ///{" "}
            </span>
          ))}
        </div>
      </div>

      <header className={styles.header}>
        <p className={styles.path}>/INDEX/DECKS/SLAB.HTML</p>
        <nav aria-label="Concrete Decks" className={styles.nav}>
          <a href="#specs">[SPECS]</a>
          <a href="#reviews">[REVIEWS]</a>
          <a href="#buy">[BUY]</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <Block className={styles.heroTitle}>
            <h1 className={styles.h1}>CONCRETE DECKS</h1>
            <p className={styles.sub}>
              Skateboards with no graphics, no logo, no story. Seven plies of maple and a
              grey top. That's it.
              <span className={styles.cursor} aria-hidden="true">
                █
              </span>
            </p>
          </Block>
          <Block className={styles.heroDeck}>
            <DeckGraphic />
            <p className={styles.figCap}>FIG. 1 — DECK "SLAB", TOP VIEW.</p>
          </Block>
          <Block className={styles.heroPrice}>
            <p className={styles.priceLabel}>PRICE</p>
            <p className={styles.price}>$64</p>
            <a className={styles.buyLink} href="#buy">
              BUY →
            </a>
          </Block>
        </section>

        <section className={styles.features} aria-labelledby="facts">
          <h2 id="facts" className={styles.h2}>
            3 FACTS
          </h2>
          <ol className={styles.factList}>
            <li>
              <Block>
                <h3>7-PLY CANADIAN MAPLE</h3>
                <p>Cold-pressed for 24 hours. Same as everyone else. We just say it.</p>
              </Block>
            </li>
            <li>
              <Block>
                <h3>MEDIUM-STEEP CONCAVE</h3>
                <p>
                  Locks your feet in for flip tricks without fighting you on transition.
                </p>
              </Block>
            </li>
            <li>
              <Block>
                <h3>NO GRAPHICS</h3>
                <p>
                  The top is sealed grey. It will scuff. Scuffs are the graphic you make
                  yourself.
                </p>
              </Block>
            </li>
          </ol>
        </section>

        <section id="specs" className={styles.specs} aria-labelledby="specs-h">
          <h2 id="specs-h" className={styles.h2}>
            SPEC SHEET
          </h2>
          <div className={styles.tableWrap}>
            <SpecTable />
          </div>
        </section>

        <section id="reviews" className={styles.reviews} aria-labelledby="rev">
          <h2 id="rev" className={styles.h2}>
            REVIEWS (3)
          </h2>
          <ul className={styles.reviewList}>
            <li>
              <p className={styles.meta}>2026-09-14 08:12 — user: kickflip_dad</p>
              <p>Boring. Rides perfect. 5/5.</p>
            </li>
            <li>
              <p className={styles.meta}>2026-08-30 22:47 — user: m.ortiz</p>
              <p>Snapped mine after 4 months of daily stairs. That's actually good.</p>
            </li>
            <li>
              <p className={styles.meta}>2026-08-02 16:03 — user: anon</p>
              <p>finally a deck that doesn't try to be my personality</p>
            </li>
          </ul>
        </section>

        <section id="buy" className={styles.buy} aria-labelledby="buy-h">
          <h2 id="buy-h" className={styles.srOnly}>
            Buy
          </h2>
          <a className={styles.buyBig} href="#buy">
            BUY DECK — $64
          </a>
          <p className={styles.buyNote}>
            SHIPS FRIDAY. FREE GRIP TAPE. NO ACCOUNT NEEDED.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>LAST UPDATED 2026-10-29 /// NO COOKIES /// NO TRACKING /// FICTIONAL BRAND</p>
        <p>
          <a href="#top">BACK TO TOP</a>
        </p>
      </footer>
    </div>
  );
}
