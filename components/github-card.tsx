import type { GhStats } from "@/lib/github";
import { links } from "@/data/site";

const fmt = new Intl.NumberFormat("en-CA");
const date = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const short = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "UTC" });

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#e8c94a",
  Python: "#3572a5",
  HTML: "#e34c26",
  Rust: "#c4734d",
  "C++": "#f34b7d",
  CSS: "#663399",
};

export function GithubCard({ stats }: { stats: GhStats }) {
  const max = Math.max(...stats.weeks, 1);
  const W = 600;
  const H = 96;
  const bw = W / stats.weeks.length;
  const bars = stats.weeks
    .map((n, i) => {
      const h = n ? Math.max((n / max) * (H - 8), 3) : 1.5;
      return `<rect x="${(i * bw + 1).toFixed(1)}" y="${(H - h).toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="${h.toFixed(1)}" rx="1.6" fill="${n ? "var(--matcha)" : "var(--heat-0)"}" ${n ? `fill-opacity="${(0.45 + 0.55 * (n / max)).toFixed(2)}"` : ""}><title>Week of ${short.format(new Date(stats.days[i * 7]?.[0] ?? Date.now()))}: ${n} contributions</title></rect>`;
    })
    .join("");
  const first = stats.days[0]?.[0];
  const last = stats.days[stats.days.length - 1]?.[0];
  const recent = stats.repos.slice(0, 4);

  return (
    <div className="glass rounded-[26px] p-5 sm:p-7">
      <p className="max-w-[50ch] text-[17px] leading-[1.55]">
        <a href={links.github} target="_blank" rel="noreferrer" className="link font-medium">
          {links.githubUser}
        </a>{" "}
        made <span className="tabular font-medium">{fmt.format(stats.total)}</span> contributions in the last year, on{" "}
        <span className="tabular font-medium">{stats.activeDays}</span> different days.
      </p>

      <figure className="m-0 mt-7">
        <figcaption className="mb-3 text-[14px] text-ink-2">Contributions per week</figcaption>
        <div className="dot-grid rounded-[14px] border border-rule p-3">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block h-auto w-full"
            role="img"
            aria-label={`Weekly GitHub contributions over the last year, ${stats.total} in total`}
            dangerouslySetInnerHTML={{ __html: bars }}
          />
          <div className="tabular mt-2 flex justify-between text-[11.5px] text-ink-2" aria-hidden="true">
            <span>{first ? short.format(new Date(first)) : ""}</span>
            {stats.busiest ? (
              <span className="hand text-[13px]">
                busiest day: {short.format(new Date(stats.busiest.date))}, {stats.busiest.count}
              </span>
            ) : null}
            <span>{last ? short.format(new Date(last)) : ""}</span>
          </div>
        </div>
      </figure>

      <div className="mt-8 grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:gap-10">
        <figure className="m-0">
          <figcaption className="mb-3 text-[14px] text-ink-2">Recently pushed</figcaption>
          <ul className="focus-list">
            {recent.map((r) => (
              <li key={r.name} className="border-b border-rule last:border-b-0">
                <a href={r.url} target="_blank" rel="noreferrer" className="block py-2.5">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[15px] font-medium">{r.name}</span>
                    <span className="tabular shrink-0 text-[12.5px] text-ink-2">{date.format(new Date(r.pushedAt))}</span>
                  </span>
                  {r.description ? <span className="mt-0.5 line-clamp-1 block text-[13.5px] text-ink-2">{r.description}</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </figure>
        <figure className="m-0">
          <figcaption className="mb-3 text-[14px] text-ink-2">Languages, by repo</figcaption>
          <ul className="space-y-2">
            {stats.languages.slice(0, 5).map((l) => (
              <li key={l.name} className="flex items-center gap-2.5 text-[14px]">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: LANG_COLORS[l.name] ?? "var(--ink-2)" }} />
                <span className="flex-1">{l.name}</span>
                <span className="tabular text-ink-2">{l.count}</span>
              </li>
            ))}
          </ul>
        </figure>
      </div>

      <p className="hand mt-7 text-[14px] text-ink-2">
        {stats.source === "live" ? "pulled from GitHub, refreshed daily" : "from a saved snapshot; GitHub was napping"}
      </p>
    </div>
  );
}
