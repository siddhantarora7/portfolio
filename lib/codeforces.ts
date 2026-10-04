import "server-only";
import snapshot from "@/data/codeforces-snapshot.json";

export const CF_HANDLE = "beansQ";
const API = "https://codeforces.com/api";
const DAY = 86_400;
const GAP_MS = 2_100; // Codeforces asks for at most ~1 call every 2 seconds.
const TZ = "America/Edmonton";

// ---------------------------------------------------------------------------
// Compact shapes (also the snapshot format written by scripts/codeforces-snapshot.mjs)
// ---------------------------------------------------------------------------

export type CfInfo = { handle: string; rating: number; maxRating: number; rank: string; maxRank: string };
export type CfRatingPoint = { t: number; rating: number; contest: string };
export type CfSolved = { id: string; t: number; rating?: number; tags: string[] };
export type CfCompact = { fetchedAt: number; info: CfInfo; ratings: CfRatingPoint[]; solved: CfSolved[] };

export type CfStats = {
  source: "live" | "snapshot";
  fetchedAt: number;
  info: CfInfo;
  ratings: CfRatingPoint[];
  solvedCount: number;
  /** YYYY-MM-DD (Calgary time) → problems first solved that day, last ~53 weeks. */
  daily: Record<string, number>;
  today: string;
  tags: { tag: string; count: number }[];
  difficulty: { rating: number; count: number }[];
  unrated: number;
};

// ---------------------------------------------------------------------------
// Rate-limited fetch
// ---------------------------------------------------------------------------

let queue: Promise<unknown> = Promise.resolve();
let lastCall = 0;

function cf<T>(method: string, params: Record<string, string>): Promise<T> {
  const run = async () => {
    const wait = lastCall + GAP_MS - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastCall = Date.now();
    const res = await fetch(`${API}/${method}?${new URLSearchParams(params)}`, {
      next: { revalidate: DAY },
    });
    if (!res.ok) throw new Error(`Codeforces ${method}: HTTP ${res.status}`);
    const body = (await res.json()) as { status: string; result?: T; comment?: string };
    if (body.status !== "OK" || !body.result) throw new Error(`Codeforces ${method}: ${body.comment}`);
    return body.result;
  };
  const next = queue.then(run, run);
  queue = next.catch(() => undefined);
  return next;
}

type RawSubmission = {
  creationTimeSeconds: number;
  verdict?: string;
  problem: { contestId?: number; problemsetName?: string; index: string; rating?: number; tags: string[] };
};

async function fetchCompact(): Promise<CfCompact> {
  const [info] = await cf<CfInfo[]>("user.info", { handles: CF_HANDLE });
  const ratings = await cf<{ ratingUpdateTimeSeconds: number; newRating: number; contestName: string }[]>(
    "user.rating",
    { handle: CF_HANDLE },
  );
  const subs = await cf<RawSubmission[]>("user.status", { handle: CF_HANDLE });

  const firstAc = new Map<string, CfSolved>();
  for (const s of subs) {
    if (s.verdict !== "OK") continue;
    const p = s.problem;
    const id = `${p.contestId ?? p.problemsetName}-${p.index}`;
    const prev = firstAc.get(id);
    if (!prev || s.creationTimeSeconds < prev.t) {
      firstAc.set(id, { id, t: s.creationTimeSeconds, rating: p.rating, tags: p.tags });
    }
  }

  return {
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
}

// ---------------------------------------------------------------------------
// Derived stats
// ---------------------------------------------------------------------------

const dayKey = (seconds: number) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(seconds * 1000),
  );

function derive(data: CfCompact, source: CfStats["source"], nowSeconds: number): CfStats {
  const since = nowSeconds - 372 * DAY;
  const daily: Record<string, number> = {};
  const tagCounts = new Map<string, number>();
  const diffCounts = new Map<number, number>();
  let unrated = 0;

  for (const s of data.solved) {
    if (s.t >= since) {
      const k = dayKey(s.t);
      daily[k] = (daily[k] ?? 0) + 1;
    }
    for (const tag of s.tags) tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    if (s.rating) diffCounts.set(s.rating, (diffCounts.get(s.rating) ?? 0) + 1);
    else unrated++;
  }

  const ratings = Object.keys(Object.fromEntries(diffCounts)).map(Number);
  const maxRating = ratings.length ? Math.max(...ratings) : 800;
  const difficulty = [];
  for (let r = 800; r <= maxRating; r += 100) difficulty.push({ rating: r, count: diffCounts.get(r) ?? 0 });

  return {
    source,
    fetchedAt: data.fetchedAt,
    info: data.info,
    ratings: data.ratings,
    solvedCount: data.solved.length,
    daily,
    today: dayKey(nowSeconds),
    tags: [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag, count]) => ({ tag, count })),
    difficulty,
    unrated,
  };
}

export async function getCodeforcesStats(): Promise<CfStats> {
  try {
    const live = await fetchCompact();
    return derive(live, "live", live.fetchedAt);
  } catch (err) {
    console.warn("[codeforces] falling back to snapshot:", err instanceof Error ? err.message : err);
    const snap = snapshot as CfCompact;
    return derive(snap, "snapshot", snap.fetchedAt);
  }
}
