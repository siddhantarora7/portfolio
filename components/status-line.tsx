"use client";

import { useEffect, useState } from "react";

const CALGARY_TZ = "America/Edmonton";

function formatCalgaryTime(): string {
  return new Date()
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: CALGARY_TZ,
      hour12: true,
    })
    .toLowerCase()
    .replace(/\s/g, "");
}

function statusForHour(): string {
  const hour = Number(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: CALGARY_TZ,
    }),
  );
  if (hour >= 1 && hour < 7) return "probably asleep";
  if (hour >= 7 && hour < 9) return "waking up";
  if (hour >= 9 && hour < 16) return "at school";
  if (hour >= 16 && hour < 22) return "shipping code";
  return "shipping code";
}

export function StatusLine() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(formatCalgaryTime());
      setStatus(statusForHour());
    };
    tick();
    setMounted(true);
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return <p className="mt-1 text-[14px] italic text-[color:var(--muted)] h-[1.3em]" />;
  }

  return (
    <p className="mt-1 text-[14px] italic text-[color:var(--muted)]">
      in calgary · {time} · {status}
    </p>
  );
}
