"use client";

import { useEffect, useRef } from "react";

/**
 * A soft custom cursor: an exact dot plus a trailing ring that grows over
 * anything clickable and shows a short hint from data-cursor. Only on mouse
 * devices; text fields keep the native caret. Without JS, nothing changes.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let raf = 0;
    let shown = false;

    const draw = () => {
      raf = 0;
      const k = reduced ? 1 : 0.22;
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (Math.abs(x - rx) + Math.abs(y - ry) > 0.3) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        root.dataset.cursorShown = "on";
      }
      const t = (e.target as Element | null)?.closest?.("a, button, [data-cursor], summary, label, select");
      const field = (e.target as Element | null)?.closest?.("input, textarea, [contenteditable='true']");
      root.dataset.cursorMode = field ? "text" : t ? "link" : "default";
      const label = t?.getAttribute("data-cursor") ?? "";
      if (hint.current && hint.current.textContent !== label) hint.current.textContent = label;
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onDown = () => (root.dataset.cursorPress = "on");
    const onUp = () => delete root.dataset.cursorPress;
    const onLeave = () => {
      shown = false;
      delete root.dataset.cursorShown;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={hint} className="cursor-hint hand" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
