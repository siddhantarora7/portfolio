"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MochiArt, type MochiKind, type MochiMood } from "./mochi-art";

const LINES: Record<MochiKind, string[]> = {
  mochi: [
    "hi! i'm mochi.",
    "squish.",
    "matcha's my roommate.",
    "he's solved 1,000+ codeforces problems. i've solved zero.",
    "i'm made of rice. no hidden states.",
    "psst. ask me things, bottom right.",
    "try ↑ ↑ ↓ ↓ ← → ← → b a",
  ],
  matcha: [
    "matcha here. slightly bitter.",
    "careful, i stain.",
    "the chart on the research page is green. you're welcome.",
    "type “matcha” anywhere. trust me.",
    "poke mochi, not me.",
  ],
};

const SLEEPY: Record<MochiKind, string> = {
  mochi: "zzz… oh! hi.",
  matcha: "five more minutes…",
};

type Say = { who: MochiKind; text: string; n: number };

export function MochiFriends({ size = 72 }: { size?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<Record<MochiKind, MochiMood>>({ mochi: "idle", matcha: "idle" });
  const [beat, setBeat] = useState<Record<MochiKind, { n: number; kind: "squish" | "hop" | "" }>>({
    mochi: { n: 0, kind: "" },
    matcha: { n: 0, kind: "" },
  });
  const [say, setSay] = useState<Say | null>(null);
  const pokes = useRef(0);
  const next = useRef<Record<MochiKind, number>>({ mochi: 0, matcha: 0 });
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const speak = useCallback((who: MochiKind, text: string, face: MochiMood = "happy") => {
    setSay((s) => ({ who, text, n: (s?.n ?? 0) + 1 }));
    setMood((m) => ({ ...m, [who]: face }));
    later(() => setMood((m) => ({ ...m, [who]: "idle" })), 1600);
    later(() => setSay((s) => (s && s.text === text ? null : s)), 2800);
  }, []);

  // eyes follow the pointer (mouse only)
  useEffect(() => {
    const el = wrap.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const update = () => {
      raf = 0;
      el.querySelectorAll<HTMLElement>("[data-mascot]").forEach((m) => {
        const r = m.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height * 0.6);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 260);
        m.style.setProperty("--gx", `${((dx / d) * 2.6 * k).toFixed(2)}px`);
        m.style.setProperty("--gy", `${((dy / d) * 2.1 * k).toFixed(2)}px`);
      });
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // other parts of the page can make them talk
  useEffect(() => {
    const onSay = (e: Event) => {
      const d = (e as CustomEvent<{ who?: MochiKind; text: string }>).detail;
      speak(d.who ?? "matcha", d.text);
    };
    window.addEventListener("mochi:say", onSay);
    const t = timers.current;
    return () => {
      window.removeEventListener("mochi:say", onSay);
      t.forEach(clearTimeout);
    };
  }, [speak]);

  function poke(who: MochiKind) {
    const other: MochiKind = who === "mochi" ? "matcha" : "mochi";
    pokes.current += 1;
    setBeat((b) => ({
      ...b,
      [who]: { n: b[who].n + 1, kind: "squish" },
      [other]: { n: b[other].n + 1, kind: "hop" },
    }));
    setMood((m) => ({ ...m, [who]: "squish" }));

    const asleep = document.documentElement.dataset.theme === "dark";
    if (pokes.current % 10 === 0) {
      later(() => speak(who, "okay okay, i'm awake", "dizzy"), 380);
      return;
    }
    const text = asleep ? SLEEPY[who] : LINES[who][next.current[who]++ % LINES[who].length];
    later(() => speak(who, text), 380);
  }

  return (
    <div ref={wrap} className="mochi-friends relative flex items-end gap-1">
      {(["mochi", "matcha"] as const).map((who, i) => (
        <div key={who} data-mascot={who} className="relative">
          {say?.who === who ? (
            <span
              key={say.n}
              className="speech hand pointer-events-none absolute bottom-full left-1/2 mb-1 w-max max-w-[15rem] -translate-x-1/2 rounded-2xl px-3 py-1.5 text-center text-[14px] leading-snug"
            >
              {say.text}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => poke(who)}
            onPointerEnter={(e) => e.pointerType === "mouse" && mood[who] === "idle" && setMood((m) => ({ ...m, [who]: "happy" }))}
            onPointerLeave={() => mood[who] === "happy" && setMood((m) => ({ ...m, [who]: "idle" }))}
            aria-label={`Poke ${who}`}
            className="mochi-button block rounded-[40%] focus-visible:outline-offset-0"
          >
            <span className={`land block ${i ? "land-late" : ""}`}>
              <span
                key={beat[who].n}
                className={`block ${beat[who].kind === "squish" ? "do-squish" : beat[who].kind === "hop" ? "do-hop" : ""}`}
              >
                <span className={`breathe block ${i ? "breathe-late" : ""}`}>
                  <MochiArt kind={who} mood={mood[who]} size={who === "matcha" ? size * 0.86 : size} />
                </span>
              </span>
            </span>
          </button>
        </div>
      ))}
      <span className="sr-only" aria-live="polite">
        {say ? `${say.who} says: ${say.text}` : ""}
      </span>
    </div>
  );
}
