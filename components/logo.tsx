"use client";

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

  if (!src || errored) {
    return (
      <span
        role="img"
        aria-label={name}
        style={{ width: size, height: size, background: "var(--logo-fallback)" }}
        className={cn(
          "inline-flex items-center justify-center rounded-sm text-white font-medium select-none shrink-0",
          className,
        )}
      >
        <span style={{ fontSize: Math.max(8, Math.round(size * 0.55)), lineHeight: 1 }}>
          {letter}
        </span>
      </span>
    );
  }

  // Plain <img> rather than next/image: many users name files .png that are
  // actually svg/webp/jpeg, and next/image gets fussy about MIME mismatches.
  // The browser sniffs the bytes and renders correctly regardless of extension.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      className={cn(
        "inline-block rounded-sm object-contain shrink-0",
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}
