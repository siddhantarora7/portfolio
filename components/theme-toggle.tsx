"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="inline-flex min-w-[7rem] h-5" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors"
      aria-label={`Switch to ${next} mode`}
    >
      <Icon size={14} aria-hidden />
      <span>{label}</span>
    </button>
  );
}
