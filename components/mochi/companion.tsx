"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MochiArt, type MochiMood } from "./mochi-art";

const POKES = [
  "hi! i'm mochi.",
  "wheee!",
  "jetpack runs on matcha.",
  "he's solved 1,000+ codeforces problems. i've solved zero.",
  "i'm made of rice. no hidden states.",
  "drag me. i dare you.",
  "type “mochi” anywhere.",
  "try ↑ ↑ ↓ ↓ ← → ← → b a",
];

const SECTION_LINES: Record<string, string> = {
  research: "that's the paper. there's a chart!",
  work: "click one. there are screenshots.",
  projects: "velocity clocked a 41.4 km/h kick.",
  codeforces: "1,000+ problems. i counted. (i did not count.)",
  github: "green squares. very healthy.",
  play: "oh! that's me in there. wanna play?",
};

type Say = { text: string; ask?: boolean; n: number };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function Companion() {
  const wrap = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<MochiMood>("idle");
  const [say, setSay] = useState<Say | null>(null);
  const [ready, setReady] = useState(false);
  const [flying, setFlying] = useState(false);
  const [bubbleLeft, setBubbleLeft] = useState(true);
  const [hearts, setHearts] = useState(0);
  const [resting, setResting] = useState(false);

  const s = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    size: 76,
    flying: false,
    awake: false,
    reduced: false,
    raf: 0,
    last: 0,
    lastScroll: 0,
    swirlStart: 0,
    swirlDur: 0,
    swirlLoops: 0,
    drag: null as null | { ox: number; oy: number; px: number; py: number; pt: number; moved: number; vx: number; vy: number },
    pokes: 0,
    lastSpoke: 0,
    seen: new Set<string>(),
    justDragged: false,
    resting: false,
    sayTimer: 0,
    moodTimer: 0,
  });

  const speak = useCallback((text: string, opts: { ask?: boolean; face?: MochiMood; ms?: number } = {}) => {
    const st = s.current;
    st.lastSpoke = performance.now();
    setSay((p) => ({ text, ask: opts.ask, n: (p?.n ?? 0) + 1 }));
    setMood(opts.face ?? "happy");
    clearTimeout(st.sayTimer);
    clearTimeout(st.moodTimer);
    st.moodTimer = window.setTimeout(() => setMood("idle"), 1800);
    st.sayTimer = window.setTimeout(() => setSay(null), opts.ms ?? (opts.ask ? 5200 : 3000));
  }, []);

  // ------------------------------------------------------------ geometry
  const dockPoint = () => {
    const d = document.querySelector<HTMLElement>("[data-mochi-dock]");
    if (!d) return null;
    const r = d.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const restPoint = () => {
    const r = document.querySelector<HTMLElement>("[data-mochi-rest]")?.getBoundingClientRect();
    if (!r || r.top > window.innerHeight - 30 || r.bottom < 0) return null;
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const flyPoint = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw < 768) return { x: vw - 44, y: vh - 96 };
    const contentRight = vw / 2 + 340;
    const x = contentRight + 110 < vw ? contentRight + 76 : vw - 58;
    return { x, y: vh * 0.4 };
  };

  const shouldDock = () => window.scrollY < 90 && dockPoint() !== null;

  // ------------------------------------------------------------ render one frame
  const paint = useCallback((tilt = 0, extraX = 0, extraY = 0, spin = 0, thrust = 0.5) => {
    const st = s.current;
    const el = wrap.current;
    if (!el) return;
    el.style.transform = `translate3d(${(st.x - st.size / 2 + extraX).toFixed(1)}px, ${(st.y - st.size / 2 + extraY).toFixed(1)}px, 0)`;
    if (body.current) body.current.style.transform = `rotate(${(tilt + spin).toFixed(1)}deg)`;
    el.style.setProperty("--thrust", thrust.toFixed(2));
  }, []);

  const loop = useCallback(
    (now: number) => {
      const st = s.current;
      const dt = Math.min(2.5, st.last ? (now - st.last) / 16.67 : 1);
      st.last = now;

      let tx: number;
      let ty: number;
      if (!st.flying) {
        const d = dockPoint();
        if (!d) {
          st.flying = true;
          setFlying(true);
          return (st.raf = requestAnimationFrame(loop));
        }
        tx = d.x;
        ty = d.y;
      } else {
        const rest = restPoint();
        if (rest !== null) {
          tx = rest.x;
          ty = rest.y;
        } else {
          const f = flyPoint();
          tx = f.x;
          ty = f.y + Math.sin(now / 520) * 5;
        }
        if ((rest !== null) !== st.resting) {
          st.resting = rest !== null;
          setResting(st.resting);
        }
      }

      if (st.drag) {
        // position is driven by the pointer
      } else {
        const k = st.flying ? 0.05 : 0.18;
        const damp = st.flying ? 0.86 : 0.7;
        st.vx = (st.vx + (tx - st.x) * k * dt) * Math.pow(damp, dt);
        st.vy = (st.vy + (ty - st.y) * k * dt) * Math.pow(damp, dt);
        st.x += st.vx * dt;
        st.y += st.vy * dt;
      }

      // loop-de-loop
      let ex = 0;
      let ey = 0;
      let spin = 0;
      if (st.swirlDur) {
        const p = (now - st.swirlStart) / st.swirlDur;
        if (p >= 1) st.swirlDur = 0;
        else {
          const e = 1 - Math.pow(1 - p, 2);
          const a = e * Math.PI * 2 * st.swirlLoops;
          const R = 28;
          ex = Math.sin(a) * R;
          ey = -(1 - Math.cos(a)) * R;
          spin = (a * 180) / Math.PI;
        }
      }

      const tilt = clamp(st.vx * 2.4, -30, 30);
      const thrust = st.resting && !st.drag ? 0 : st.flying || st.drag ? clamp(0.55 - st.vy * 0.09 + Math.abs(st.vx) * 0.04 + (st.swirlDur ? 0.5 : 0), 0.35, 1.7) : 0;
      paint(tilt, ex, ey, spin, thrust);
      setBubbleLeft(st.x > window.innerWidth / 2);

      const settled = (!st.flying || st.resting) && !st.drag && !st.swirlDur && Math.abs(st.vx) + Math.abs(st.vy) < 0.05 && Math.abs(tx - st.x) + Math.abs(ty - st.y) < 0.5;
      if (settled) {
        st.raf = 0;
        st.last = 0;
        return;
      }
      st.raf = requestAnimationFrame(loop);
    },
    [paint],
  );

  const kick = useCallback(() => {
    const st = s.current;
    if (st.reduced || st.raf) return;
    st.raf = requestAnimationFrame(loop);
  }, [loop]);

  const place = useCallback(() => {
    const st = s.current;
    const p = shouldDock() ? dockPoint()! : flyPoint();
    st.x = p.x;
    st.y = p.y;
    paint(0, 0, 0, 0, st.flying ? 0.5 : 0);
  }, [paint]);

  const swirl = useCallback(
    (loops = 1, dur = 950) => {
      const st = s.current;
      if (st.reduced) return;
      st.swirlStart = performance.now();
      st.swirlDur = dur;
      st.swirlLoops = loops;
      kick();
    },
    [kick],
  );

  // ------------------------------------------------------------ setup
  useEffect(() => {
    const st = s.current;
    st.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    st.size = window.innerWidth < 768 ? 60 : 76;
    st.flying = !shouldDock();
    st.lastScroll = window.scrollY;
    setFlying(st.flying);
    place();
    setReady(true);

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - st.lastScroll;
      st.lastScroll = y;
      const dock = shouldDock();
      if (st.reduced) {
        st.flying = !dock;
        setFlying(st.flying);
        place();
        return;
      }
      if (dock && st.flying) {
        st.flying = false;
        setFlying(false);
      } else if (!dock && !st.flying) {
        st.flying = true;
        setFlying(true);
        st.vy = -7; // take off
      } else if (st.flying && !st.drag) {
        st.y -= clamp(dy * 0.55, -60, 60); // ride along with the page, then catch up
      }
      st.awake = true;
      kick();
    };
    const onResize = () => {
      st.size = window.innerWidth < 768 ? 60 : 76;
      if (st.reduced) place();
      else kick();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !wrap.current) return;
      const dx = e.clientX - st.x;
      const dy = e.clientY - st.y;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260);
      wrap.current.style.setProperty("--gx", `${((dx / d) * 2.6 * k).toFixed(2)}px`);
      wrap.current.style.setProperty("--gy", `${((dy / d) * 2.1 * k).toFixed(2)}px`);
    };

    const onSay = (e: Event) => {
      const d = (e as CustomEvent<{ text: string }>).detail;
      speak(d.text);
    };
    const onSummon = () => {
      speak("you called?", { face: "happy" });
      setHearts((h) => h + 1);
      swirl(3, 1600);
    };

    // comment on sections the first time they show up
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const id = en.target.id;
          if (!en.isIntersecting || st.seen.has(id) || !SECTION_LINES[id]) continue;
          st.seen.add(id);
          if (st.flying && performance.now() - st.lastSpoke > 4000) speak(SECTION_LINES[id], { ask: id === "work" });
        }
      },
      { threshold: 0.3 },
    );
    Object.keys(SECTION_LINES).forEach((id) => {
      const n = document.getElementById(id);
      if (n) io.observe(n);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mochi:say", onSay);
    window.addEventListener("mochi:summon", onSummon);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mochi:say", onSay);
      window.removeEventListener("mochi:summon", onSummon);
      io.disconnect();
      cancelAnimationFrame(st.raf);
      clearTimeout(st.sayTimer);
      clearTimeout(st.moodTimer);
    };
  }, [kick, place, speak, swirl]);

  // ------------------------------------------------------------ poke & drag
  function poke() {
    const st = s.current;
    st.pokes += 1;
    if (st.pokes % 5 === 0) {
      speak("okay okay, i'm dizzy", { face: "dizzy" });
      swirl(2, 1300);
      return;
    }
    const asleep = document.documentElement.dataset.theme === "dark";
    const text = asleep ? "zzz… oh! hi." : POKES[(st.pokes - 1) % POKES.length];
    setMood("squish");
    window.setTimeout(() => speak(text, { ask: st.pokes === 1 || st.pokes % 3 === 0 }), 250);
    swirl(1);
  }

  function onPointerDown(e: React.PointerEvent) {
    const st = s.current;
    if (st.reduced || e.button !== 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    st.drag = { ox: e.clientX - st.x, oy: e.clientY - st.y, px: e.clientX, py: e.clientY, pt: performance.now(), moved: 0, vx: 0, vy: 0 };
  }
  function onPointerMove(e: React.PointerEvent) {
    const st = s.current;
    const d = st.drag;
    if (!d) return;
    const now = performance.now();
    const ddt = Math.max(1, now - d.pt) / 16.67;
    d.vx = (e.clientX - d.px) / ddt;
    d.vy = (e.clientY - d.py) / ddt;
    d.moved += Math.abs(e.clientX - d.px) + Math.abs(e.clientY - d.py);
    d.px = e.clientX;
    d.py = e.clientY;
    d.pt = now;
    if (d.moved > 6) {
      st.x = e.clientX - d.ox;
      st.y = e.clientY - d.oy;
      setMood("wow");
      kick();
    }
  }
  function onPointerUp() {
    const st = s.current;
    const d = st.drag;
    st.drag = null;
    if (!d) return;
    if (d.moved <= 6) return; // treated as a click
    st.justDragged = true;
    st.vx = clamp(d.vx, -40, 40);
    st.vy = clamp(d.vy, -40, 40);
    if (!st.flying) {
      st.flying = true;
      setFlying(true);
    }
    speak(Math.hypot(st.vx, st.vy) > 14 ? "wheeee!" : "okay, back to work.");
    kick();
  }

  return (
    <div
      ref={wrap}
      className={`companion fixed top-0 left-0 z-[56] ${ready ? "" : "invisible"} ${flying ? "is-flying" : "is-docked"}`}
      style={{ width: "var(--mochi-size)", height: "var(--mochi-size)" }}
    >
      {say ? (
        <div
          key={say.n}
          className={`speech hand absolute top-1/2 w-max max-w-[14rem] -translate-y-1/2 rounded-2xl px-3 py-1.5 text-[14px] leading-snug ${
            bubbleLeft ? "speech-left right-full mr-2" : "speech-right left-full ml-2"
          } ${flying ? "" : "max-sm:top-auto max-sm:bottom-full max-sm:mb-1 max-sm:right-0 max-sm:mr-0 max-sm:translate-y-0"}`}
        >
          {say.text}
          {say.ask ? (
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("mochi:ask"))}
              className="mt-1 block font-[family-name:var(--font-sans)] text-[13px] font-medium text-matcha-deep underline underline-offset-2"
            >
              ask me something
            </button>
          ) : null}
        </div>
      ) : null}

      {hearts ? (
        <span key={hearts} className="hearts pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <svg key={i} viewBox="0 0 20 18" style={{ ["--i" as string]: i }}>
              <path d="M10 17S1 11.5 1 5.6A4.6 4.6 0 0 1 10 3.6a4.6 4.6 0 0 1 9 2C19 11.5 10 17 10 17Z" fill="#f6a9b9" stroke="var(--mochi-ink)" strokeWidth="1.4" />
            </svg>
          ))}
        </span>
      ) : null}

      <button
        type="button"
        aria-label="Mochi, the site's mascot. Poke for a hello."
        data-cursor="poke"
        onClick={() => {
          if (s.current.justDragged) {
            s.current.justDragged = false;
            return;
          }
          poke();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={(e) => e.pointerType === "mouse" && mood === "idle" && setMood("happy")}
        onPointerLeave={() => mood === "happy" && !say && setMood("idle")}
        className="mochi-button block size-full touch-none rounded-[40%]"
      >
        <div ref={body} className="size-full">
          <span className="land block size-full">
            <MochiArt mood={resting && mood === "idle" ? "sleep" : mood} jetpack shadow={!flying || resting} size={100} className="size-full" />
          </span>
        </div>
      </button>
      <span className="sr-only" aria-live="polite">
        {say ? `Mochi says: ${say.text}` : ""}
      </span>
    </div>
  );
}
