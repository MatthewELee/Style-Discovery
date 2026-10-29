import "@fontsource-variable/jetbrains-mono";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import styles from "./page.module.css";

// --- Frequency response --------------------------------------------------

const W = 600;
const H = 240;
const PAD = { l: 40, r: 12, t: 12, b: 28 };
const F_MIN = 20;
const F_MAX = 20000;
const DB_MIN = -12;
const DB_MAX = 12;

/** A believable studio-monitor curve: gentle sub-bass lift, presence bump, 8 kHz dip. */
function response(f: number) {
  const lf = Math.log10(f);
  const bump = (centre: number, width: number, gain: number) =>
    gain * Math.exp(-((lf - Math.log10(centre)) ** 2) / (2 * width ** 2));
  return (
    bump(40, 0.25, 3.2) +
    bump(3000, 0.15, 2.4) +
    bump(8000, 0.08, -4.5) -
    (lf > 4.1 ? (lf - 4.1) * 18 : 0)
  );
}

const xOf = (f: number) =>
  PAD.l +
  ((Math.log10(f) - Math.log10(F_MIN)) / (Math.log10(F_MAX) - Math.log10(F_MIN))) *
    (W - PAD.l - PAD.r);
const yOf = (db: number) =>
  PAD.t + ((DB_MAX - db) / (DB_MAX - DB_MIN)) * (H - PAD.t - PAD.b);
const fOf = (x: number) =>
  10 **
  (Math.log10(F_MIN) +
    ((x - PAD.l) / (W - PAD.l - PAD.r)) * (Math.log10(F_MAX) - Math.log10(F_MIN)));

const curve = Array.from({ length: 160 }, (_, i) => {
  const f =
    10 ** (Math.log10(F_MIN) + (i / 159) * (Math.log10(F_MAX) - Math.log10(F_MIN)));
  return `${i ? "L" : "M"}${xOf(f).toFixed(1)} ${yOf(response(f)).toFixed(1)}`;
}).join(" ");

const fmtHz = (f: number) =>
  f >= 1000 ? `${(f / 1000).toFixed(f >= 10000 ? 0 : 1)} kHz` : `${Math.round(f)} Hz`;

function FrequencyChart() {
  const [f, setF] = useState<number | null>(null);

  function onMove(e: PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    setF(x < PAD.l || x > W - PAD.r ? null : fOf(x));
  }

  return (
    <figure className={styles.chartFig}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={styles.chart}
        onPointerMove={onMove}
        onPointerLeave={() => setF(null)}
        role="img"
        aria-label="Frequency response from 20 Hz to 20 kHz: about +3 dB in the sub-bass, flat mids, a small presence lift near 3 kHz and a dip near 8 kHz."
      >
        {[-12, -6, 0, 6, 12].map((db) => (
          <g key={db}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={yOf(db)}
              y2={yOf(db)}
              className={db === 0 ? styles.gridZero : styles.chartGrid}
            />
            <text x={PAD.l - 6} y={yOf(db) + 3} textAnchor="end" className={styles.axis}>
              {db > 0 ? `+${db}` : db}
            </text>
          </g>
        ))}
        {[20, 100, 1000, 10000, 20000].map((hz) => (
          <g key={hz}>
            <line
              x1={xOf(hz)}
              x2={xOf(hz)}
              y1={PAD.t}
              y2={H - PAD.b}
              className={styles.chartGrid}
            />
            <text x={xOf(hz)} y={H - 8} textAnchor="middle" className={styles.axis}>
              {fmtHz(hz)}
            </text>
          </g>
        ))}
        <motion.path
          d={curve}
          className={styles.curve}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {f && (
          <g>
            <line
              x1={xOf(f)}
              x2={xOf(f)}
              y1={PAD.t}
              y2={H - PAD.b}
              className={styles.crosshair}
            />
            <circle cx={xOf(f)} cy={yOf(response(f))} r="4" className={styles.dot} />
          </g>
        )}
      </svg>
      <figcaption className={styles.readout} aria-live="polite">
        {f ? (
          <>
            <span>{fmtHz(f)}</span>
            <span className={styles.signal}>
              {response(f) >= 0 ? "+" : ""}
              {response(f).toFixed(1)} dB
            </span>
          </>
        ) : (
          <span className={styles.dim}>HOVER THE CHART TO READ VALUES</span>
        )}
      </figcaption>
    </figure>
  );
}

// --- Live waveform -------------------------------------------------------

// Built from whole cycles over 600 units, so two copies side by side loop seamlessly.
const wave = Array.from({ length: 241 }, (_, i) => {
  const x = i * 5;
  const t = (2 * Math.PI * x) / 600;
  const y =
    30 + 12 * Math.sin(3 * t) * Math.sin(t) + 6 * Math.sin(17 * t) + 3 * Math.sin(41 * t);
  return `${i ? "L" : "M"}${x} ${y.toFixed(1)}`;
}).join(" ");

function Waveform() {
  return (
    <div className={styles.waveBox} aria-hidden="true">
      <motion.svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className={styles.wave}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <path d={wave} />
      </motion.svg>
    </div>
  );
}

function Ticker({
  base,
  jitter,
  decimals = 0,
  unit,
}: {
  base: number;
  jitter: number;
  decimals?: number;
  unit: string;
}) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(base);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setV(base + (Math.random() - 0.5) * 2 * jitter), 700);
    return () => clearInterval(id);
  }, [base, jitter, reduce]);
  return (
    <>
      {v.toFixed(decimals)}
      <span className={styles.unit}> {unit}</span>
    </>
  );
}

// --- Panels --------------------------------------------------------------

function Panel({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      className={`${styles.panel} ${className ?? ""}`}
      aria-label={label}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <p className={styles.label}>{label}</p>
      {children}
    </motion.section>
  );
}

const tabs = {
  Drivers: [
    ["Type", "50 mm beryllium-coated dynamic"],
    ["Frequency range", "5 Hz – 40 kHz"],
    ["Impedance", "32 Ω"],
    ["Sensitivity", "102 dB SPL / mW"],
    ["THD", "< 0.1% @ 1 kHz, 100 dB"],
  ],
  Comfort: [
    ["Weight", "285 g"],
    ["Clamp force", "4.2 N"],
    ["Pads", "Replaceable memory foam, velour"],
    ["Headband", "Spring steel, 12-step"],
  ],
  Cable: [
    ["Length", "3 m coiled / 1.2 m straight"],
    ["Termination", "3.5 mm + 6.35 mm adapter"],
    ["Connector", "Locking mini-XLR, either cup"],
  ],
} as const;

type TabName = keyof typeof tabs;

function SpecTabs() {
  const [tab, setTab] = useState<TabName>("Drivers");
  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Specifications">
        {(Object.keys(tabs) as TabName[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`krt-tab-${t}`}
            aria-selected={tab === t}
            aria-controls="krt-tabpanel"
            className={styles.tab}
            onClick={() => setTab(t)}
          >
            {t.toUpperCase()}
            {tab === t && (
              <motion.span layoutId="krt-underline" className={styles.underline} />
            )}
          </button>
        ))}
      </div>
      <dl
        id="krt-tabpanel"
        role="tabpanel"
        aria-labelledby={`krt-tab-${tab}`}
        className={styles.specList}
      >
        {tabs[tab].map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function Headphones() {
  return (
    <svg
      viewBox="0 0 260 220"
      className={styles.diagram}
      role="img"
      aria-label="Line drawing of the KRT-7 headphones with callouts for the 50 mm driver, memory foam pads and steel headband"
    >
      <g className={styles.lineArt}>
        <path d="M60 130 C 60 40, 200 40, 200 130" />
        <path d="M68 130 C 68 52, 192 52, 192 130" />
        <rect x="36" y="118" width="44" height="74" rx="16" />
        <rect x="180" y="118" width="44" height="74" rx="16" />
        <circle cx="202" cy="155" r="14" />
        <circle cx="202" cy="155" r="5" />
      </g>
      <g className={styles.callouts}>
        <line x1="216" y1="155" x2="246" y2="155" />
        <text x="246" y="148" textAnchor="end">
          50MM
        </text>
        <line x1="40" y1="178" x2="14" y2="206" />
        <text x="4" y="216">
          PADS
        </text>
        <line x1="130" y1="46" x2="130" y2="18" />
        <text x="130" y="12" textAnchor="middle">
          STEEL BAND
        </text>
      </g>
    </svg>
  );
}

export default function Page() {
  const [cable, setCable] = useState<"coiled" | "straight">("coiled");

  return (
    <div className={styles.root}>
      <header className={styles.top}>
        <span className={styles.brand}>KRT-7</span>
        <span className={styles.dim}>STUDIO MONITOR HEADPHONES / REV C</span>
        <span className={styles.status}>
          <span className={styles.led} aria-hidden="true" /> IN STOCK · SHIPS 24H
        </span>
      </header>

      <main className={styles.grid}>
        <Panel label="01 / OVERVIEW" className={styles.hero}>
          <h1 className={styles.h1}>KRT-7</h1>
          <p className={styles.lede}>
            Closed-back studio headphones measured to within ±3 dB from 20 Hz to 10 kHz.
            Built to tell you what&apos;s actually in the mix, then be worn for eight
            hours.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.cta} href="#configure">
              CONFIGURE &amp; BUY →
            </a>
            <span className={styles.price}>$349</span>
          </div>
        </Panel>

        <Panel label="02 / DIAGRAM" className={styles.diagramPanel}>
          <Headphones />
        </Panel>

        <Panel
          label="03 / FREQUENCY RESPONSE (dB SPL, NORMALISED)"
          className={styles.chartPanel}
        >
          <FrequencyChart />
        </Panel>

        <Panel label="04 / LIVE READOUT" className={styles.readoutPanel}>
          <Waveform />
          <dl className={styles.readouts}>
            <div>
              <dt>IMPEDANCE</dt>
              <dd>
                <Ticker base={32} jitter={0.4} decimals={1} unit="Ω" />
              </dd>
            </div>
            <div>
              <dt>SENSITIVITY</dt>
              <dd>
                <Ticker base={102} jitter={0.3} decimals={1} unit="dB" />
              </dd>
            </div>
            <div>
              <dt>WEIGHT</dt>
              <dd>
                285<span className={styles.unit}> g</span>
              </dd>
            </div>
            <div>
              <dt>ISOLATION</dt>
              <dd>
                -24<span className={styles.unit}> dB</span>
              </dd>
            </div>
          </dl>
        </Panel>

        <Panel label="05 / SPECIFICATIONS" className={styles.half}>
          <SpecTabs />
        </Panel>

        <Panel label="06 / COMPARISON" className={styles.half}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">METRIC</th>
                  <th scope="col" className={styles.signal}>
                    KRT-7
                  </th>
                  <th scope="col">KRT-5</th>
                  <th scope="col">TYPICAL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Deviation 20 Hz–10 kHz", "±3 dB", "±5 dB", "±9 dB"],
                  ["THD @ 100 dB", "<0.1%", "0.3%", "1%+"],
                  ["Weight", "285 g", "310 g", "250 g"],
                  ["Replaceable parts", "All", "Pads", "None"],
                  ["Warranty", "5 yr", "2 yr", "1 yr"],
                ].map(([m, a, b, c]) => (
                  <tr key={m}>
                    <th scope="row">{m}</th>
                    <td className={styles.signal}>{a}</td>
                    <td>{b}</td>
                    <td className={c === "None" || c === "1%+" ? styles.warn : undefined}>
                      {c}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel label="07 / FIELD REPORTS" className={styles.wide}>
          <ul className={styles.log}>
            <li>
              <span className={styles.dim}>[MIX ENGINEER · 2026-09-02]</span> Low end is
              honest. I stopped second-guessing kick drums on the monitors.
            </li>
            <li>
              <span className={styles.dim}>[PODCAST EDITOR · 2026-08-18]</span> Eight-hour
              sessions, no headache, no hot ears.
            </li>
            <li>
              <span className={styles.dim}>[FIELD RECORDIST · 2026-07-29]</span> Isolation
              is good enough to monitor next to a generator.
            </li>
          </ul>
        </Panel>

        <Panel label="08 / CONFIGURE" className={styles.wide}>
          <div id="configure" className={styles.configure}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.dim}>CABLE</legend>
              {(["coiled", "straight"] as const).map((c) => (
                <label key={c} className={styles.radio}>
                  <input
                    type="radio"
                    name="krt-cable"
                    checked={cable === c}
                    onChange={() => setCable(c)}
                  />
                  {c === "coiled" ? "3 M COILED" : "1.2 M STRAIGHT"}
                </label>
              ))}
            </fieldset>
            <p className={styles.summary}>
              KRT-7 / REV C / {cable === "coiled" ? "3 M COILED" : "1.2 M STRAIGHT"} / 5
              YR WARRANTY
            </p>
            <a className={styles.cta} href="#configure">
              BUY — $349
            </a>
          </div>
        </Panel>
      </main>

      <footer className={styles.footer}>
        <span>KRT-7 IS A FICTIONAL PRODUCT.</span>
        <span>DOC REV 2026.10</span>
      </footer>
    </div>
  );
}
