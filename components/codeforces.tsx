import type { CfStats } from "@/lib/codeforces";
import { links } from "@/data/site";

const fmt = new Intl.NumberFormat("en-CA");
const BANDS = [
  { at: 1200, label: "pupil" },
  { at: 1400, label: "specialist" },
  { at: 1600, label: "expert" },
  { at: 1900, label: "candidate master" },
];

export function CodeforcesCard({ stats }: { stats: CfStats }) {
  const { info } = stats;
  const rank = info.rank.replace(/\b\w/g, (c) => c.toUpperCase());
  const article = /^[aeiou]/i.test(rank) ? "an" : "a";
  const solvedThisYear = Object.values(stats.daily).reduce((a, b) => a + b, 0);

  return (
    <div className="glass rounded-[26px] p-5 sm:p-7">
      <p className="max-w-[48ch] text-[17px] leading-[1.55]">
        <a href={links.codeforces} target="_blank" rel="noreferrer" className="link font-medium">
          {info.handle}
        </a>{" "}
        is {article} {rank}, rated <span className="tabular font-medium">{info.rating}</span>
        {info.maxRating > info.rating ? (
          <>
            {" "}
            (peak <span className="tabular">{info.maxRating}</span>)
          </>
        ) : null}
        , with <span className="tabular font-medium">{fmt.format(stats.solvedCount)}</span> problems solved.
      </p>

      <Figure title="Rating" className="mt-7">
        <RatingChart stats={stats} />
      </Figure>

      <Figure title={`Solved in the last year: ${fmt.format(solvedThisYear)}`} className="mt-8">
        <Heatmap stats={stats} />
      </Figure>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
        <Figure title="Top topics">
          <Tags stats={stats} />
        </Figure>
        <Figure title="By difficulty">
          <Difficulty stats={stats} />
        </Figure>
      </div>

      <p className="hand mt-7 text-[14px] text-ink-2">
        {stats.source === "live" ? "pulled from the Codeforces API, refreshed daily" : "from a saved snapshot; the API was napping"}
      </p>
    </div>
  );
}

function Figure({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <figcaption className="mb-3 text-[14px] text-ink-2">{title}</figcaption>
      {children}
    </figure>
  );
}

// ---------------------------------------------------------------------------

function RatingChart({ stats }: { stats: CfStats }) {
  const pts = stats.ratings;
  if (pts.length < 2) return null;
  const W = 600;
  const H = 190;
  const pad = { l: 4, r: 40, t: 12, b: 22 };
  const t0 = pts[0].t;
  const t1 = pts[pts.length - 1].t;
  const lo = Math.floor((Math.min(...pts.map((p) => p.rating)) - 100) / 100) * 100;
  const hi = Math.ceil((Math.max(...pts.map((p) => p.rating)) + 120) / 100) * 100;
  const x = (t: number) => pad.l + ((t - t0) / (t1 - t0 || 1)) * (W - pad.l - pad.r);
  const y = (r: number) => pad.t + (1 - (r - lo) / (hi - lo)) * (H - pad.t - pad.b);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.rating).toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  const years: number[] = [];
  for (let yr = new Date(t0 * 1000).getFullYear() + 1; yr <= new Date(t1 * 1000).getFullYear(); yr++) years.push(yr);

  return (
    <div className="dot-grid rounded-[14px] border border-rule p-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Codeforces rating over ${pts.length} rated contests, from ${pts[0].rating} to ${last.rating}.`}
      >
        {BANDS.filter((b) => b.at > lo && b.at < hi).map((b) => (
          <g key={b.at}>
            <line x1={pad.l} x2={W - pad.r} y1={y(b.at)} y2={y(b.at)} stroke="var(--ink-2)" strokeOpacity="0.25" strokeDasharray="2 4" />
            <text x={W - pad.r + 6} y={y(b.at) + 3.5} fontSize="10" fill="var(--ink-2)">
              {b.at}
            </text>
          </g>
        ))}
        {years.map((yr) => {
          const tx = x(Date.UTC(yr, 0, 1) / 1000);
          return (
            <text key={yr} x={tx} y={H - 4} fontSize="10" fill="var(--ink-2)" textAnchor="middle">
              {yr}
            </text>
          );
        })}
        <path d={d} fill="none" stroke="var(--matcha)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p) => (
          <circle key={p.t} cx={x(p.t)} cy={y(p.rating)} r="2.6" fill="var(--ground)" stroke="var(--matcha)" strokeWidth="1.6">
            <title>{`${p.contest}: ${p.rating}`}</title>
          </circle>
        ))}
        <circle cx={x(last.t)} cy={y(last.rating)} r="4.5" fill="var(--matcha)" />
        <text x={x(last.t) - 8} y={y(last.rating) - 9} fontSize="11.5" fontWeight="600" fill="var(--ink)" textAnchor="end">
          {last.rating}
        </text>
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------

function Heatmap({ stats }: { stats: CfStats }) {
  const [ty, tm, td] = stats.today.split("-").map(Number);
  const today = new Date(Date.UTC(ty, tm - 1, td));
  const weeks = 53;
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - today.getUTCDay() - (weeks - 1) * 7);
  const cell = 10;
  const gap = 2.6;
  const step = cell + gap;
  const top = 14;
  const level = (n: number) => (n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4);
  const months = new Intl.DateTimeFormat("en-CA", { month: "short", timeZone: "UTC" });
  const long = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "UTC" });

  const cells: React.ReactNode[] = [];
  const labels: React.ReactNode[] = [];
  let lastMonth = -1;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + w * 7 + d);
      if (date > today) continue;
      const key = date.toISOString().slice(0, 10);
      const n = stats.daily[key] ?? 0;
      if (d === 0 && date.getUTCMonth() !== lastMonth && date.getUTCDate() <= 7) {
        lastMonth = date.getUTCMonth();
        if (w < weeks - 2) {
          labels.push(
            <text key={key} x={w * step} y={9} fontSize="9.5" fill="var(--ink-2)">
              {months.format(date)}
            </text>,
          );
        }
      }
      cells.push(
        <rect key={key} x={w * step} y={top + d * step} width={cell} height={cell} rx="2.6" fill={`var(--heat-${level(n)})`}>
          <title>{`${long.format(date)}: ${n} solved`}</title>
        </rect>,
      );
    }
  }

  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <svg
        viewBox={`0 0 ${weeks * step} ${top + 7 * step}`}
        className="block h-auto w-full min-w-[520px]"
        role="img"
        aria-label="Calendar of problems solved per day over the last year"
      >
        {labels}
        {cells}
      </svg>
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[12px] text-ink-2" aria-hidden="true">
        less
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className="size-2.5 rounded-[3px]" style={{ background: `var(--heat-${l})` }} />
        ))}
        more
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function Tags({ stats }: { stats: CfStats }) {
  const max = Math.max(...stats.tags.map((t) => t.count), 1);
  return (
    <ul className="space-y-2">
      {stats.tags.map((t) => (
        <li key={t.tag} className="grid grid-cols-[minmax(0,9.5rem)_1fr_auto] items-center gap-3 text-[14px]">
          <span className="truncate">{t.tag}</span>
          <span className="h-2 rounded-full bg-[var(--heat-0)]">
            <span className="block h-full rounded-full bg-matcha" style={{ width: `${(t.count / max) * 100}%` }} />
          </span>
          <span className="tabular text-ink-2">{t.count}</span>
        </li>
      ))}
    </ul>
  );
}

function Difficulty({ stats }: { stats: CfStats }) {
  const max = Math.max(...stats.difficulty.map((d) => d.count), 1);
  return (
    <div>
      <div className="flex h-[150px] items-end gap-[3px]" role="img" aria-label="Problems solved at each difficulty rating">
        {stats.difficulty.map((d) => (
          <span
            key={d.rating}
            className="flex-1 rounded-t-[3px] bg-matcha"
            style={{ height: `${Math.max((d.count / max) * 100, d.count ? 2 : 0)}%`, opacity: 0.45 + 0.55 * (d.count / max) }}
            title={`${d.rating}: ${d.count}`}
          />
        ))}
      </div>
      <div className="tabular mt-2 flex justify-between text-[12px] text-ink-2" aria-hidden="true">
        <span>{stats.difficulty[0]?.rating}</span>
        <span>{stats.difficulty[Math.floor(stats.difficulty.length / 2)]?.rating}</span>
        <span>{stats.difficulty[stats.difficulty.length - 1]?.rating}</span>
      </div>
      {stats.unrated ? <p className="mt-2 text-[13px] text-ink-2">plus {stats.unrated} unrated</p> : null}
    </div>
  );
}
