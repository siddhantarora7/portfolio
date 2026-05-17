"use client";

import { useEffect, useState } from "react";

interface LocationTagProps {
  city?: string;
  country?: string;
  timezone?: string;
  tz?: string;
}

export function LocationTag({
  city = "San Francisco",
  country = "USA",
  timezone = "PST",
  tz,
}: LocationTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const opts: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      if (tz) opts.timeZone = tz;
      setCurrentTime(new Date().toLocaleTimeString("en-US", opts));
    };
    updateTime();
    const interval = setInterval(updateTime, 30_000);
    return () => clearInterval(interval);
  }, [tz]);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-3 rounded-full border px-4 py-2.5 transition-all duration-500 ease-out"
      style={{
        borderColor: isHovered
          ? "color-mix(in oklab, var(--foreground) 22%, transparent)"
          : "color-mix(in oklab, var(--foreground) 12%, transparent)",
        background: isHovered
          ? "color-mix(in oklab, var(--foreground) 7%, transparent)"
          : "color-mix(in oklab, var(--foreground) 3%, transparent)",
        boxShadow: isHovered
          ? "0 0 20px color-mix(in oklab, var(--foreground) 6%, transparent)"
          : "none",
      }}
    >
      {/* Live pulse indicator */}
      <div className="relative flex items-center justify-center">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      </div>

      {/* Location text */}
      <div className="relative flex items-center gap-2 overflow-hidden">
        <span
          className="text-sm font-medium text-[color:var(--foreground)] transition-all duration-500"
          style={{
            transform: isHovered ? "translateY(-100%)" : "translateY(0)",
            opacity: isHovered ? 0 : 1,
          }}
        >
          {city}, {country}
        </span>

        <span
          className="absolute inset-0 text-sm font-medium text-[color:var(--foreground)] transition-all duration-500 tabular-nums"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          {currentTime} {timezone}
        </span>
      </div>

      {/* Arrow indicator */}
      <svg
        className="h-3 w-3 transition-all duration-300"
        style={{
          color: "var(--muted)",
          transform: isHovered
            ? "translateX(2px) rotate(-45deg)"
            : "translateX(0) rotate(0)",
          opacity: isHovered ? 1 : 0.5,
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </button>
  );
}
