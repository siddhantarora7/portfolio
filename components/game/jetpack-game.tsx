"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const W = 720;
const H = 400;
const MOCHI_X = 150;
const R = 19;
const WALL_W = 62;
const RANKS: [number, string][] = [
  [0, "newbie"],
  [1200, "pupil"],
  [1400, "specialist"],
  [1600, "expert"],
  [1900, "candidate master"],
  [2100, "master"],
  [2300, "international master"],
  [2400, "grandmaster"],
  [2600, "international grandmaster"],
  [3000, "legendary grandmaster"],
];
const rankOf = (r: number) => [...RANKS].reverse().find(([min]) => r >= min)![1];
const BEST_KEY = "mochi-jetpack-best";

type Wall = { x: number; gapY: number; gap: number; rating: number; passed: boolean };
type Phase = "ready" | "play" | "over";

export default function JetpackGame({ target, onClose }: { target: number; onClose: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [rating, setRating] = useState(800);
  const [best, setBest] = useState(800);
  const [beat, setBeat] = useState(false);

  const g = useRef({
    y: H / 2,
    vy: 0,
    walls: [] as Wall[],
    rating: 800,
    travel: 0,
    flame: 0,
    raf: 0,
    last: 0,
    phase: "ready" as Phase,
    sprite: null as HTMLImageElement | null,
    colors: { ground: "#f4f6f0", ink: "#1d2621", ink2: "#56625b", matcha: "#5e8b3e", soft: "#dcebc9", rule: "rgba(29,38,33,.09)" },
    font: "system-ui",
    beat: false,
  });

  useEffect(() => {
    try {
      const b = Number(localStorage.getItem(BEST_KEY));
      if (b) setBest(b);
    } catch {}
    const img = new Image();
    img.src = "/mochi-jet.svg";
    g.current.sprite = img;
    const cs = getComputedStyle(document.documentElement);
    const v = (n: string, f: string) => cs.getPropertyValue(n).trim() || f;
    g.current.colors = {
      ground: v("--ground", "#f4f6f0"),
      ink: v("--ink", "#1d2621"),
      ink2: v("--ink-2", "#56625b"),
      matcha: v("--matcha", "#5e8b3e"),
      soft: v("--matcha-soft", "#dcebc9"),
      rule: v("--rule", "rgba(29,38,33,.09)"),
    };
    g.current.font = getComputedStyle(document.body).fontFamily;
  }, []);

  const draw = useCallback(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const st = g.current;
    const col = st.colors;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== W * dpr) {
      c.width = W * dpr;
      c.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = col.ground;
    ctx.fillRect(0, 0, W, H);
    // dot grid drifting with travel
    ctx.fillStyle = col.rule;
    const off = st.travel % 20;
    for (let x = -off; x < W; x += 20) for (let y = 10; y < H; y += 20) ctx.fillRect(x, y, 1.6, 1.6);

    // walls
    for (const w of st.walls) {
      const top = w.gapY - w.gap / 2;
      const bot = w.gapY + w.gap / 2;
      ctx.fillStyle = w.passed ? col.soft : "#a7cb84";
      ctx.strokeStyle = col.ink;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect(w.x, -20, WALL_W, top + 20, [0, 0, 16, 16]);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(w.x, bot, WALL_W, H - bot + 20, [16, 16, 0, 0]);
      ctx.fill();
      ctx.stroke();
      // rating label on the lower wall
      ctx.fillStyle = col.ink;
      ctx.font = `600 13px ${st.font}`;
      ctx.textAlign = "center";
      ctx.fillText(String(w.rating), w.x + WALL_W / 2, bot + 22);
    }

    // flames
    const fl = Math.max(0, st.flame);
    if (fl > 0.02) {
      for (const dx of [-8.8, 8.8]) {
        const fx = MOCHI_X + dx;
        const fy = st.y + 15.8;
        const len = 10 + fl * 22 + Math.random() * 4;
        const grad = ctx.createLinearGradient(0, fy, 0, fy + len);
        grad.addColorStop(0, "#fff3b0");
        grad.addColorStop(0.5, "#ffb547");
        grad.addColorStop(1, "rgba(255,107,61,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(fx - 4.5, fy);
        ctx.quadraticCurveTo(fx, fy + len * 1.1, fx + 4.5, fy);
        ctx.fill();
      }
    }

    // mochi
    if (st.sprite?.complete) {
      ctx.save();
      ctx.translate(MOCHI_X, st.y);
      ctx.rotate(Math.max(-0.5, Math.min(0.6, st.vy * 0.055)));
      ctx.drawImage(st.sprite, -26, -30, 52, 52);
      ctx.restore();
    }

    // HUD
    ctx.textAlign = "left";
    ctx.fillStyle = col.ink;
    ctx.font = `600 22px ${st.font}`;
    ctx.fillText(String(st.rating), 18, 34);
    ctx.font = `500 13px ${st.font}`;
    ctx.fillStyle = col.ink2;
    ctx.fillText(rankOf(st.rating), 18, 52);
  }, []);

  const loop = useCallback(
    (now: number) => {
      const st = g.current;
      const dt = Math.min(2, st.last ? (now - st.last) / 16.67 : 1);
      st.last = now;
      if (st.phase !== "play") return;

      const speed = 2.7 + (st.rating - 800) / 900;
      st.vy += 0.34 * dt;
      st.y += st.vy * dt;
      if (st.y - R < 0) {
        // bonk the ceiling instead of dying
        st.y = R;
        st.vy = Math.max(st.vy, 0.5);
      }
      st.flame *= Math.pow(0.88, dt);
      st.travel += speed * dt;

      // spawn
      const lastWall = st.walls[st.walls.length - 1];
      if (!lastWall || lastWall.x < W - 240) {
        const gap = Math.max(118, 176 - (st.rating - 800) / 25);
        const nextRating = (lastWall?.rating ?? 800) + 100;
        st.walls.push({ x: W + 10, gap, gapY: 70 + gap / 2 + Math.random() * (H - 140 - gap), rating: nextRating, passed: false });
      }
      for (const w of st.walls) {
        w.x -= speed * dt;
        if (!w.passed && w.x + WALL_W < MOCHI_X - R) {
          w.passed = true;
          st.rating = w.rating;
          setRating(w.rating);
          if (!st.beat && w.rating > target) {
            st.beat = true;
            setBeat(true);
          }
        }
      }
      st.walls = st.walls.filter((w) => w.x > -WALL_W - 10);

      // collisions
      let dead = st.y + R > H;
      for (const w of st.walls) {
        if (MOCHI_X + R - 4 > w.x && MOCHI_X - R + 4 < w.x + WALL_W) {
          if (st.y - R + 4 < w.gapY - w.gap / 2 || st.y + R - 4 > w.gapY + w.gap / 2) dead = true;
        }
      }
      draw();
      if (dead) {
        st.phase = "over";
        setPhase("over");
        setBest((b) => {
          const nb = Math.max(b, st.rating);
          try {
            localStorage.setItem(BEST_KEY, String(nb));
          } catch {}
          return nb;
        });
        return;
      }
      st.raf = requestAnimationFrame(loop);
    },
    [draw, target],
  );

  const start = useCallback(() => {
    const st = g.current;
    st.y = H / 2;
    st.vy = -4;
    st.walls = [];
    st.rating = 800;
    st.travel = 0;
    st.flame = 1;
    st.last = 0;
    st.beat = false;
    st.phase = "play";
    setRating(800);
    setBeat(false);
    setPhase("play");
    cancelAnimationFrame(st.raf);
    st.raf = requestAnimationFrame(loop);
    canvas.current?.focus();
  }, [loop]);

  const flap = useCallback(() => {
    const st = g.current;
    if (st.phase !== "play") return start();
    st.vy = -6;
    st.flame = 1;
  }, [start]);

  useEffect(() => {
    draw();
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "Escape") return onClose();
      if ([" ", "ArrowUp", "w", "W"].includes(e.key)) {
        e.preventDefault();
        flap();
      } else if (e.key === "Enter" && g.current.phase !== "play") {
        e.preventDefault();
        start();
      }
    };
    const onHide = () => {
      if (document.hidden && g.current.phase === "play") {
        g.current.phase = "over";
        setPhase("over");
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onHide);
    const st = g.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onHide);
      cancelAnimationFrame(st.raf);
    };
  }, [draw, flap, onClose, start]);

  return (
    <div className="relative">
      <canvas
        ref={canvas}
        tabIndex={0}
        width={W}
        height={H}
        onPointerDown={(e) => {
          e.preventDefault();
          flap();
        }}
        aria-label="Jetpack mochi game. Press space or tap to fire the jetpack."
        className="block aspect-[720/400] w-full touch-none rounded-[16px] border border-rule"
      />

      {phase !== "play" ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center p-4">
          <div className="glass pointer-events-auto max-w-[22rem] rounded-[20px] px-5 py-4 text-center">
            {phase === "ready" ? (
              <>
                <p className="font-display text-[20px] font-semibold">jetpack mochi</p>
                <p className="mt-1 text-[14.5px] text-ink-2">
                  Every wall is +100 rating. Tap, click, or press space to fly. Can you beat {target}?
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-[20px] font-semibold">
                  rated {rating}, {rankOf(rating)}
                </p>
                <p className="mt-1 text-[14.5px] text-ink-2">
                  {beat ? `You out-rated beansQ (${target}). Mochi is impressed.` : `Best: ${best}. beansQ is at ${target}.`}
                </p>
              </>
            )}
            <div className="mt-3 flex justify-center gap-2">
              <button type="button" onClick={start} className="rounded-full bg-matcha-deep px-4 py-1.5 text-[14px] font-medium text-[var(--ground)]">
                {phase === "ready" ? "Start" : "Fly again"}
              </button>
              <button type="button" onClick={onClose} className="rounded-full border border-rule px-4 py-1.5 text-[14px]">
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {beat && phase === "play" ? (
        <p className="hand pointer-events-none absolute top-3 right-4 rounded-full bg-matcha-soft px-3 py-1 text-[14px] text-matcha-deep">
          out-rated beansQ!
        </p>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {phase === "over" ? `Game over. Rated ${rating}, ${rankOf(rating)}. Best ${best}.` : ""}
      </p>
    </div>
  );
}
