// Refreshes data/github-snapshot.json, the fallback used when GitHub is unreachable.
// Usage: npm run github:snapshot
import { writeFile } from "node:fs/promises";

const USER = "siddhantarora7";
const headers = { "User-Agent": "siddhant-portfolio" };

const html = await (await fetch(`https://github.com/users/${USER}/contributions`, { headers })).text();
const tips = new Map();
for (const m of html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]+)/g)) {
  const n = /^(\d+) contribution/.exec(m[2].trim());
  tips.set(m[1], n ? Number(n[1]) : 0);
}
const days = [];
for (const m of html.matchAll(/data-date="([\d-]+)" id="(contribution-day-component-[\d-]+)"/g)) days.push([m[1], tips.get(m[2]) ?? 0]);
days.sort((a, b) => (a[0] < b[0] ? -1 : 1));
const total = Number(/([\d,]+)\s+contributions?\s+in the last year/.exec(html)?.[1].replace(/,/g, "") ?? 0);

const raw = await (await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers })).json();
const repos = raw
  .filter((r) => !r.fork && !r.archived)
  .map((r) => ({ name: r.name, description: r.description, language: r.language, pushedAt: r.pushed_at, url: r.html_url }));

await writeFile(
  new URL("../data/github-snapshot.json", import.meta.url),
  JSON.stringify({ fetchedAt: Math.floor(Date.now() / 1000), total, days, repos }),
);
console.log(`snapshot: ${total} contributions, ${days.length} days, ${repos.length} repos`);
