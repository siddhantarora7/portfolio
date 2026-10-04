// Refreshes data/codeforces-snapshot.json, the fallback used when the
// Codeforces API is unreachable at build or revalidation time.
// Usage: npm run codeforces:snapshot
import { writeFile } from "node:fs/promises";

const HANDLE = "beansQ";
const API = "https://codeforces.com/api";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cf(method, params) {
  const res = await fetch(`${API}/${method}?${new URLSearchParams(params)}`);
  const body = await res.json();
  if (body.status !== "OK") throw new Error(`${method}: ${body.comment}`);
  await sleep(2100); // stay under ~1 request per 2 seconds
  return body.result;
}

const [info] = await cf("user.info", { handles: HANDLE });
const ratings = await cf("user.rating", { handle: HANDLE });
const subs = await cf("user.status", { handle: HANDLE });

const firstAc = new Map();
for (const s of subs) {
  if (s.verdict !== "OK") continue;
  const p = s.problem;
  const id = `${p.contestId ?? p.problemsetName}-${p.index}`;
  const prev = firstAc.get(id);
  if (!prev || s.creationTimeSeconds < prev.t) {
    firstAc.set(id, { id, t: s.creationTimeSeconds, rating: p.rating, tags: p.tags });
  }
}

const out = {
  fetchedAt: Math.floor(Date.now() / 1000),
  info: {
    handle: info.handle,
    rating: info.rating,
    maxRating: info.maxRating,
    rank: info.rank,
    maxRank: info.maxRank,
  },
  ratings: ratings.map((r) => ({ t: r.ratingUpdateTimeSeconds, rating: r.newRating, contest: r.contestName })),
  solved: [...firstAc.values()],
};

await writeFile(new URL("../data/codeforces-snapshot.json", import.meta.url), JSON.stringify(out));
console.log(`snapshot: ${out.solved.length} solved, ${out.ratings.length} rated contests, rating ${out.info.rating}`);
