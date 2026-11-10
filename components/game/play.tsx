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
          <button type="button" onClick={() => setOpen(true)} className="key-btn key-btn--primary shrink-0 !px-6 !py-3.5 !text-[16px]">
            <svg viewBox="0 0 16 16" className="size-[15px]" fill="currentColor" aria-hidden="true">
              <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.3-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" />
            </svg>
            Play
          </button>
        </div>
      )}
    </div>
  );
}
