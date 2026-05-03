import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Bullet({
  children,
  nested = false,
  className,
}: {
  children: ReactNode;
  nested?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-1.5",
        nested ? "pl-8 mt-1" : "pl-4 mt-1.5",
        className,
      )}
    >
      <span className="text-[color:var(--muted)] shrink-0" aria-hidden>
        ↳
      </span>
      <span className="flex-1 min-w-0">{children}</span>
    </div>
  );
}
