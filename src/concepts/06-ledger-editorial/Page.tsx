import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/source-serif-4";
import "@fontsource/ibm-plex-sans-condensed/500.css";
import "@fontsource/ibm-plex-sans-condensed/600.css";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import styles from "./page.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

/** Splits a headline into words that rise out of a mask, one after another. */
function RevealLine({
  text,
  className,
  id,
  as: Tag = "h1",
}: {
  text: string;
  className: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true }}
      variants={{ shown: { transition: { staggerChildren: 0.07 } } }}
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className={styles.mask} aria-hidden="true">
          <motion.span
            className={styles.word}
            variants={{
              hidden: { y: "110%" },
              shown: { y: "0%", transition: { duration: 0.7, ease } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

const settle: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function Settle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={settle}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

function CoffeeBag() {
  return (
    <svg
      viewBox="0 0 400 300"
      className={styles.photo}
      role="img"
      aria-label="A kraft paper coffee bag with a cream label, photographed on a linen tabletop"
    >
      <rect width="400" height="300" fill="#e9e1d3" />
      <rect y="210" width="400" height="90" fill="#d8cfc2" />
      <ellipse cx="200" cy="262" rx="110" ry="12" fill="#1a1a1a" opacity="0.12" />
      <path d="M128 70 L272 70 L284 258 L116 258 Z" fill="#b8956a" />
      <path d="M128 70 L272 70 L268 92 L132 92 Z" fill="#a5845b" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={i}
          x1={134 + i * 18}
          y1="72"
          x2={134 + i * 18}
          y2="90"
          stroke="#8f7149"
          strokeWidth="2"
        />
      ))}
      <rect x="152" y="124" width="96" height="100" fill="#fbf8f3" />
      <text
        x="200"
        y="152"
        textAnchor="middle"
        fontFamily="Playfair Display Variable"
        fontSize="20"
        fontWeight="700"
        fill="#1a1a1a"
      >
        Ledger
      </text>
      <line x1="170" y1="162" x2="230" y2="162" stroke="#7a3e1d" />
      <text
        x="200"
        y="182"
        textAnchor="middle"
        fontFamily="IBM Plex Sans Condensed"
        fontSize="9"
        letterSpacing="1.5"
        fill="#1a1a1a"
      >
        Nº 27 · LAS NUBES
      </text>
      <text
        x="200"
        y="200"
        textAnchor="middle"
        fontFamily="Source Serif 4 Variable"
        fontStyle="italic"
        fontSize="10"
        fill="#1a1a1a"
      >
        washed · 1,850 m
      </text>
      {[
        [80, 236],
        [98, 244],
        [312, 238],
        [326, 248],
        [300, 250],
      ].map(([x, y], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="7"
          ry="5"
          fill="#4a2a17"
          transform={`rotate(${i * 40} ${x} ${y})`}
        />
      ))}
    </svg>
  );
}

export default function Page() {
  return (
    <div className={styles.root}>
      <header className={styles.masthead}>
        <p className={styles.issueLine}>
          <span>Issue Nº 27</span>
          <span>Autumn 2026</span>
          <span>$18 / issue</span>
        </p>
        <p className={styles.logo}>Ledger</p>
        <p className={styles.tagline}>
          A coffee roaster that publishes, one origin at a time
        </p>
      </header>

      <main>
        <section className={styles.cover}>
          <div className={styles.coverText}>
            <p className={styles.kicker}>Cover story</p>
            <RevealLine text="The slow cup." className={styles.h1} />
            <Settle>
              <p className={styles.standfirst}>
                Each issue of Ledger is a single coffee from a single farm, roasted the
                week it ships and delivered with the story of where it came from. This is
                Nº 27: Las Nubes, a washed coffee from 1,850 metres.
              </p>
              <p className={styles.byline}>
                Words by the roastery · Tasting notes inside
              </p>
              <a className={styles.cta} href="#subscribe">
                Subscribe to the next issue →
              </a>
            </Settle>
          </div>
          <figure className={styles.coverFigure}>
            <CoffeeBag />
            <figcaption className={styles.caption}>
              <strong>Fig. 1</strong> Issue Nº 27 in its kraft bag. 250 g, whole bean.
            </figcaption>
          </figure>
        </section>

        <section className={styles.contents} aria-labelledby="contents-h">
          <h2 id="contents-h" className={styles.rail}>
            In this issue
          </h2>
          <ol className={styles.contentsList}>
            {[
              [
                "04",
                "One farm per issue",
                "Never a blend. You taste one place, one harvest, one process.",
              ],
              [
                "11",
                "Roasted the week it ships",
                "Light-to-medium, rested four days, then posted. Peak flavour on arrival.",
              ],
              [
                "18",
                "The story comes too",
                "A printed field note on the farm, the people and the process, folded in every bag.",
              ],
            ].map(([page, title, body]) => (
              <li key={page}>
                <Settle className={styles.contentsItem}>
                  <span className={styles.pageN}>{page}</span>
                  <h3 className={styles.h3}>{title}</h3>
                  <p>{body}</p>
                </Settle>
              </li>
            ))}
          </ol>
        </section>

        <article className={styles.article} aria-labelledby="field-h">
          <header className={styles.articleHead}>
            <p className={styles.kicker}>Field notes</p>
            <RevealLine
              as="h2"
              id="field-h"
              text="Above the clouds at Las Nubes"
              className={styles.h2}
            />
          </header>

          <div className={styles.columns}>
            <p className={styles.dropcap}>
              The road up to Las Nubes stops being a road about forty minutes before the
              farm does. From there it is a footpath, then a staircase cut into the hill,
              then rows of coffee trees so steep that pickers lean into the slope as they
              work. Mist sits in the valley until late morning, which is where the farm
              gets its name, and why the cherries ripen so slowly.
            </p>
            <p>
              Slow ripening means more time for sugars to build in the fruit. The family
              who run the farm pick only the deep red cherries, passing over each tree
              four or five times across the season rather than stripping it once.
            </p>
            <blockquote className={styles.pullQuote}>
              “We do not hurry the coffee. The mountain has already decided how long it
              takes.”
            </blockquote>
            <p>
              After picking, the cherries are pulped the same day, fermented for
              thirty-six hours in tanks fed by spring water, and dried on raised beds
              under shade cloth. The result is a clean, bright cup: red apple and panela
              sweetness up front, a little black tea at the finish.
            </p>
            <p>
              We roast it light enough to keep that brightness, and rest it for four days
              before it ships. Brew it as a pour-over at 94°C if you can; it is generous
              in a cafetière too.
            </p>
          </div>

          <aside className={styles.sidebar} aria-labelledby="notes-h">
            <h3 id="notes-h" className={styles.sidebarH}>
              Tasting notes
            </h3>
            <dl className={styles.notes}>
              <div>
                <dt>Origin</dt>
                <dd>Las Nubes, Huila</dd>
              </div>
              <div>
                <dt>Altitude</dt>
                <dd>1,850 m</dd>
              </div>
              <div>
                <dt>Process</dt>
                <dd>Washed, 36 h ferment</dd>
              </div>
              <div>
                <dt>Roast</dt>
                <dd>Light–medium</dd>
              </div>
              <div>
                <dt>In the cup</dt>
                <dd>Red apple, panela, black tea</dd>
              </div>
            </dl>
          </aside>
        </article>

        <section className={styles.letters} aria-labelledby="letters-h">
          <h2 id="letters-h" className={styles.rail}>
            Letters
          </h2>
          <div className={styles.letterGrid}>
            <Settle>
              <blockquote className={styles.letter}>
                <p>
                  “I have started reading the field notes before I open the bag. Issue 24
                  was the best coffee I have had at home.”
                </p>
                <footer>— R. Okafor, Leeds</footer>
              </blockquote>
            </Settle>
            <Settle>
              <blockquote className={styles.letter}>
                <p>
                  “It feels like a magazine subscription, except the magazine is
                  delicious.”
                </p>
                <footer>— J. Ferreira, Porto</footer>
              </blockquote>
            </Settle>
          </div>
        </section>

        <section id="subscribe" className={styles.subscribe} aria-labelledby="sub-h">
          <div className={styles.coupon}>
            <p className={styles.kicker}>Subscription</p>
            <h2 id="sub-h" className={styles.subH}>
              Subscribe to the next issue
            </h2>
            <p>
              One new origin every four weeks, 250 g whole bean, with its field notes. $18
              an issue, delivery included. Skip or cancel any time.
            </p>
            <a className={styles.ctaSolid} href="#subscribe">
              Start with Nº 28
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Ledger Roasters · A fictional publication</span>
        <span>Printed on paper, roasted in small batches.</span>
      </footer>
    </div>
  );
}
