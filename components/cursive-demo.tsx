"use client";

import { useEffect, useState } from "react";

const SCRIPT = [
  { typed: "The mitochondria is the", ghost: " powerhouse of the cell." },
  { typed: "Dear hiring team, I'm writing", ghost: " to apply for the summer internship." },
  { typed: "In conclusion, the evidence", ghost: " suggests a clear link between the two." },
];

/**
 * An illustration of ghost-text completion (not a screenshot of Cursive):
 * text types itself, a faint suggestion appears, then gets "accepted".
 */
export function CursiveDemo() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [stage, setStage] = useState<"type" | "ghost" | "accept">("type");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(SCRIPT[0].typed.length);
      setStage("ghost");
      return;
    }
    const line = SCRIPT[i];
    let t: number;
    if (stage === "type") {
      t = window.setTimeout(() => (n < line.typed.length ? setN(n + 1) : setStage("ghost")), n < line.typed.length ? 55 : 350);
    } else if (stage === "ghost") {
      t = window.setTimeout(() => setStage("accept"), 1500);
    } else {
      t = window.setTimeout(() => {
        setI((i + 1) % SCRIPT.length);
        setN(0);
        setStage("type");
      }, 1700);
    }
    return () => clearTimeout(t);
  }, [i, n, stage]);

  const line = SCRIPT[i];
  return (
    <figure className="m-0">
      <div className="glass rounded-[22px] p-2.5">
        <div className="rounded-[16px] border border-rule bg-[var(--glass-strong)] p-5 sm:p-7" aria-hidden="true">
          <div className="mb-5 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[var(--heat-1)]" />
            <span className="size-2.5 rounded-full bg-[var(--heat-2)]" />
            <span className="size-2.5 rounded-full bg-[var(--heat-3)]" />
          </div>
          <p className="min-h-[4.5em] font-[family-name:var(--font-sans)] text-[19px] leading-[1.6] sm:text-[21px]">
            <span>{line.typed.slice(0, n)}</span>
            {stage === "accept" ? <span className="text-ink">{line.ghost}</span> : null}
            <span className="caret" />
            {stage === "ghost" ? <span className="text-ink-2">{line.ghost}</span> : null}
          </p>
          <p className="mt-4 text-[13px] text-ink-2">
            {stage === "ghost" ? (
              <>
                press <kbd className="rounded-md border border-rule px-1.5 py-0.5 text-[12px]">Tab</kbd> to accept
              </>
            ) : (
              " "
            )}
          </p>
        </div>
      </div>
      <figcaption className="hand mt-3 px-1 text-[15px] text-ink-2">
        An illustration of how ghost-text completion feels, not a screenshot of the app.
      </figcaption>
    </figure>
  );
}
