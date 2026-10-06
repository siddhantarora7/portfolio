import type { ReactNode } from "react";

/** A row of items where only the hovered or focused one pops up (see .dock-item in globals.css). */
export function Dock({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <ul className={`dock ${className}`} aria-label={label}>
      {children}
    </ul>
  );
}
