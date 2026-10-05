"use client";

import { useState } from "react";

/** The hero's film date stamp. Click it to "take a photo". */
export function FlashStamp({ label, className = "" }: { label: string; className?: string }) {
  const [shot, setShot] = useState<string | null>(null);
  const [n, setN] = useState(0);

  function snap() {
    const t = new Intl.DateTimeFormat("en-CA", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Edmonton" }).format(new Date());
    setShot(t);
    setN((x) => x + 1);
    window.setTimeout(() => setShot(null), 2600);
  }

  return (
    <>
      {n ? <span key={n} className="camera-flash pointer-events-none fixed inset-0 z-[80]" aria-hidden="true" /> : null}
      <button type="button" onClick={snap} className={`led text-[11px] leading-none ${className}`} aria-label="Take a photo">
        {shot ? `${label} ${shot}` : label}
      </button>
    </>
  );
}
