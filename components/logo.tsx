"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function Logo({
  src,
  name,
  size = 20,
  className,
}: {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const letter = (name.trim()[0] ?? "?").toUpperCase();

  const fallback = (
    <span
      role="img"
      aria-label={name}
      style={{ width: size, height: size, background: "var(--logo-fallback)" }}
      className={cn(
        "inline-flex items-center justify-center rounded-sm text-white font-medium select-none",
        className,
      )}
    >
      <span style={{ fontSize: Math.max(8, Math.round(size * 0.55)), lineHeight: 1 }}>
        {letter}
      </span>
    </span>
  );

  if (!src || errored) return fallback;

  return (
    <span
      className="inline-flex items-center justify-center overflow-hidden rounded-sm shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className={cn("rounded-sm object-cover", className)}
        onError={() => setErrored(true)}
        unoptimized
      />
    </span>
  );
}
