"use client";

import { useEffect, useState } from "react";
import { MochiArt } from "./mochi-art";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

type Drop = {
  id: number;
  left: number;
  delay: number;
  dur: number;
  size: number;
  spin: number;
  mood: "happy" | "wow";
};

const say = (text: string) => window.dispatchEvent(new CustomEvent("mochi:say", { detail: { text } }));

export function EasterEggs() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    console.log(
      "%cmochi says hi.%c\nyou're reading the console, so you might like the source: https://github.com/siddhantarora7/portfolio",
      "font: 600 15px system-ui; color: #5e8b3e",
      "font: 13px system-ui; color: #56625b",
    );

    let seq: string[] = [];
    let typed = "";
    let rainTimer = 0;
    let matchaTimer = 0;
    let noteTimer = 0;

    const toast = (text: string) => {
      setNote(text);
      clearTimeout(noteTimer);
      noteTimer = window.setTimeout(() => setNote(null), 3200);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

      // ↑ ↑ ↓ ↓ ← → ← → b a
      seq = [...seq, e.key].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) {
        seq = [];
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          toast("it's raining mochi (quietly, since you prefer less motion)");
        } else {
          setDrops(
            Array.from({ length: 28 }, (_, i) => ({
              id: Date.now() + i,
              left: Math.random() * 96,
              delay: Math.random() * 1.4,
              dur: 2.2 + Math.random() * 1.6,
              size: 30 + Math.random() * 34,
              spin: (Math.random() - 0.5) * 120,
              mood: Math.random() < 0.5 ? "happy" : "wow",
            })),
          );
          clearTimeout(rainTimer);
          rainTimer = window.setTimeout(() => setDrops([]), 4600);
        }
        say("it's raining mochi!");
      }

      // type "mochi" or "matcha" anywhere
      if (e.key.length === 1) {
        typed = (typed + e.key.toLowerCase()).slice(-6);
        if (typed.endsWith("mochi")) {
          typed = "";
          window.dispatchEvent(new Event("mochi:summon"));
        }
        if (typed === "matcha") {
          typed = "";
          document.documentElement.dataset.matcha = "on";
          say("matcha mode: on.");
          clearTimeout(matchaTimer);
          matchaTimer = window.setTimeout(() => delete document.documentElement.dataset.matcha, 7000);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(rainTimer);
      clearTimeout(matchaTimer);
      clearTimeout(noteTimer);
    };
  }, []);

  return (
    <>
      {drops.length ? (
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
          {drops.map((d) => (
            <span
              key={d.id}
              className="mochi-drop absolute -top-20"
              style={{
                left: `${d.left}%`,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.dur}s`,
                ["--spin" as string]: `${d.spin}deg`,
              }}
            >
              <MochiArt mood={d.mood} size={d.size} jetpack shadow={false} />
            </span>
          ))}
        </div>
      ) : null}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4">
        {note ? <p className="glass hand rounded-full px-4 py-2 text-[15px]">{note}</p> : null}
      </div>
    </>
  );
}
