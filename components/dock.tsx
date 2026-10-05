"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnifies its children by distance from the pointer, like the macOS Dock.
 * Transform-only (no layout shift); only on mouse devices with motion allowed.
 */
export function Dock({
  children,
  className = "",
  max = 1.6,
  reach = 70,
  label,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  reach?: number;
  label?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let px = 0;
    let inside = false;
    const apply = () => {
      raf = 0;
      for (const it of Array.from(el.children) as HTMLElement[]) {
        // scaling from the bottom-centre never moves an item's horizontal centre
        const r = it.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = inside ? px - c : Infinity;
        const s = 1 + (max - 1) * Math.exp(-(d * d) / (2 * reach * reach));
        it.style.setProperty("--dock", s.toFixed(3));
      }
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      inside = true;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      inside = false;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [max, reach]);

  return (
    <ul ref={ref} className={`dock ${className}`} aria-label={label}>
      {children}
    </ul>
  );
}
