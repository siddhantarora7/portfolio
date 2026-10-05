import Link from "next/link";
import { events, research } from "@/data/site";
import type { CfStats } from "@/lib/codeforces";
import { RecoverabilitySpark } from "./recoverability-chart";

const TZ = "America/Edmonton";
const today = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
const short = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "UTC" });

function when(start: string, end: string, now: string) {
  if (now > end) return null;
  if (now >= start) return "happening now";
  const n = days(now, start);
  return n === 1 ? "tomorrow" : `in ${n} days`;
}

export function NowTiles({ cf }: { cf: CfStats }) {
  const now = today();
  const upcoming = events
    .map((e) => ({ ...e, label: when(e.start, e.end, now) }))
    .filter((e): e is typeof e & { label: string } => Boolean(e.label));
  const lead = research[0];

  const pts = cf.ratings.slice(-14);
  const lo = Math.min(...pts.map((p) => p.rating));
  const hi = Math.max(...pts.map((p) => p.rating));
  const spark = pts
    .map((p, i) => `${i ? "L" : "M"}${(4 + (i / Math.max(pts.length - 1, 1)) * 152).toFixed(1)},${(58 - ((p.rating - lo) / (hi - lo || 1)) * 50).toFixed(1)}`)
    .join(" ");

  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-3.5" aria-label="Right now">
      {upcoming.length ? (
        <li className="placed" style={{ ["--tilt" as string]: "-1deg" }}>
          <div className="glass h-full rounded-[22px] p-4">
            <p className="hand text-[15px] text-ink-2">coming up</p>
            <ul className="mt-2 space-y-3">
              {upcoming.map((e) => (
                <li key={e.name}>
                  <Link href={e.href} className="group block">
                    <span className="block text-[14.5px] leading-snug font-medium group-hover:underline">{e.name}</span>
                    <span className="mt-0.5 flex items-baseline justify-between gap-2 text-[13px] text-ink-2">
                      <span className="tabular">{short.format(new Date(e.start))}</span>
                      <span className="rounded-full bg-matcha-soft px-2 py-px font-medium text-matcha-deep">{e.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ) : null}

      <li className="placed" style={{ ["--tilt" as string]: "0.8deg" }}>
        <Link href={lead.href!} className="glass group block h-full rounded-[22px] p-4">
          <p className="hand text-[15px] text-ink-2">researching</p>
          <p className="mt-2 text-[14.5px] leading-snug font-medium group-hover:underline">
            What do hidden-state probes actually measure?
          </p>
          <div className="mt-3">
            <RecoverabilitySpark r={lead} />
          </div>
          <p className="mt-1.5 text-[12.5px] text-ink-2">
            <span className="text-matcha-deep">re-rolling</span> vs <span className="text-[color:var(--sky-ink)]">probe</span>
          </p>
        </Link>
      </li>

      <li className="placed" style={{ ["--tilt" as string]: "-0.5deg" }}>
        <a href="#codeforces" className="glass group block h-full rounded-[22px] p-4">
          <p className="hand text-[15px] text-ink-2">solving</p>
          <p className="mt-2 text-[14.5px] leading-snug font-medium group-hover:underline">
            Codeforces <span className="tabular">{cf.info.rating}</span>, {cf.info.rank}
          </p>
          <svg viewBox="0 0 160 64" preserveAspectRatio="none" className="mt-3 block h-14 w-full" aria-hidden="true">
            <path
              d={spark}
              fill="none"
              stroke="var(--matcha)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <p className="mt-1.5 text-[12.5px] text-ink-2">
            <span className="tabular">{cf.solvedCount.toLocaleString("en-CA")}</span> problems solved
          </p>
        </a>
      </li>
    </ul>
  );
}
