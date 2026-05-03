import type { ReactNode } from "react";

export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-[16px] font-medium">
      <span className="text-[color:var(--muted)] mr-1.5" aria-hidden>
        ◆
      </span>
      {children}:
    </h2>
  );
}
