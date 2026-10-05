import "server-only";
import snapshot from "@/data/github-snapshot.json";
import { links } from "@/data/site";

const DAY = 86_400;
const USER = links.githubUser;

export type GhRepo = { name: string; description: string | null; language: string | null; pushedAt: string; url: string };
export type GhCompact = {
  fetchedAt: number;
  total: number;
  /** [YYYY-MM-DD, count] for the last year, oldest first. */
  days: [string, number][];
  repos: GhRepo[];
};
export type GhStats = GhCompact & {
  source: "live" | "snapshot";
  weeks: number[];
  activeDays: number;
  busiest: { date: string; count: number } | null;
  languages: { name: string; count: number }[];
};

const headers: HeadersInit = {
  "User-Agent": "siddhant-portfolio",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

/** Parses GitHub's public contributions calendar (no token needed). */
export function parseContributions(html: string): { total: number; days: [string, number][] } {
  const tips = new Map<string, number>();
  for (const m of html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]+)/g)) {
    const n = /^(\d+) contribution/.exec(m[2].trim());
    tips.set(m[1], n ? Number(n[1]) : 0);
  }
  const days: [string, number][] = [];
  for (const m of html.matchAll(/data-date="([\d-]+)" id="(contribution-day-component-[\d-]+)"/g)) {
    days.push([m[1], tips.get(m[2]) ?? 0]);
  }
  days.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  const total = Number(/([\d,]+)\s+contributions?\s+in the last year/.exec(html)?.[1].replace(/,/g, "") ?? 0);
  return { total: total || days.reduce((a, [, n]) => a + n, 0), days };
}

async function fetchCompact(): Promise<GhCompact> {
  const [calRes, repoRes] = await Promise.all([
    fetch(`https://github.com/users/${USER}/contributions`, { headers, next: { revalidate: DAY } }),
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers, next: { revalidate: DAY } }),
  ]);
  if (!calRes.ok) throw new Error(`contributions: HTTP ${calRes.status}`);
  if (!repoRes.ok) throw new Error(`repos: HTTP ${repoRes.status}`);
  const { total, days } = parseContributions(await calRes.text());
  if (!days.length) throw new Error("contributions: calendar not found");
  const raw = (await repoRes.json()) as {
    name: string;
    description: string | null;
    language: string | null;
    pushed_at: string;
    html_url: string;
    fork: boolean;
    archived: boolean;
  }[];
  const repos = raw
    .filter((r) => !r.fork && !r.archived)
    .map((r) => ({ name: r.name, description: r.description, language: r.language, pushedAt: r.pushed_at, url: r.html_url }));
  return { fetchedAt: Math.floor(Date.now() / 1000), total, days, repos };
}

function derive(c: GhCompact, source: GhStats["source"]): GhStats {
  const weeks: number[] = [];
  for (let i = 0; i < c.days.length; i += 7) weeks.push(c.days.slice(i, i + 7).reduce((a, [, n]) => a + n, 0));
  let busiest: GhStats["busiest"] = null;
  for (const [date, count] of c.days) if (!busiest || count > busiest.count) busiest = { date, count };
  const langs = new Map<string, number>();
  for (const r of c.repos) if (r.language) langs.set(r.language, (langs.get(r.language) ?? 0) + 1);
  return {
    ...c,
    source,
    weeks,
    activeDays: c.days.filter(([, n]) => n > 0).length,
    busiest: busiest && busiest.count > 0 ? busiest : null,
    languages: [...langs.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
  };
}

export async function getGithubStats(): Promise<GhStats> {
  try {
    return derive(await fetchCompact(), "live");
  } catch (err) {
    console.warn("[github] falling back to snapshot:", err instanceof Error ? err.message : err);
    return derive(snapshot as GhCompact, "snapshot");
  }
}
