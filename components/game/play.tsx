"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MochiArt } from "../mochi/mochi-art";

const JetpackGame = dynamic(() => import("./jetpack-game"), {
  ssr: false,
  loading: () => <div className="aspect-[720/400] w-full animate-pulse rounded-[16px] bg-[var(--heat-0)]" />,
});

/** The home page's mini-game. The game code only loads after "Play". */
export function Play({ target }: { target: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass rounded-[26px] p-3 sm:p-4">
      {open ? (
        <JetpackGame target={target} onClose={() => setOpen(false)} />
      ) : (
        <div className="dot-grid relative flex flex-col items-center gap-5 overflow-hidden rounded-[16px] border border-rule px-6 py-10 text-center sm:flex-row sm:text-left">
          <span className="play-mochi block shrink-0">
            <MochiArt size={96} jetpack shadow={false} mood="happy" />
          </span>
          <div className="flex-1">
            <p className="font-display text-[22px] leading-tight font-semibold">jetpack mochi</p>
            <p className="mt-1.5 max-w-[38ch] text-[15px] text-ink-2">
              Fly mochi up the Codeforces ladder. Every wall you clear is +100 rating. beansQ is at {target}. Can you beat
              that?
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 rounded-full bg-matcha-deep px-5 py-2.5 text-[15px] font-medium text-[var(--ground)] transition-transform hover:-translate-y-0.5"
          >
            Play
          </button>
        </div>
      )}
    </div>
  );
}
