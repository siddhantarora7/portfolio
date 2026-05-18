"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 sm:bottom-8 sm:right-8"
      style={{
        background: "color-mix(in oklab, var(--background) 70%, transparent)",
        border:
          "1px solid color-mix(in oklab, var(--foreground) 14%, transparent)",
        color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
        boxShadow:
          "0 8px 22px -10px color-mix(in oklab, var(--foreground) 30%, transparent)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ArrowUp size={16} aria-hidden />
    </button>
  );
}
