import { isTodo, TODO_PREFIX } from "@/data/content";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function TodoText({ children }: { children: ReactNode }) {
  return (
    <span className="text-[color:var(--accent)] italic">{children}</span>
  );
}

/**
 * Renders a string as plain text, or as an orange italic placeholder
 * if the string starts with the TODO: prefix.
 */
export function MaybeTodo({
  value,
  as: Tag = "span",
  className,
}: {
  value: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}) {
  if (isTodo(value)) {
    const stripped = value.trimStart().slice(TODO_PREFIX.length).trim();
    return (
      <Tag className={cn("text-[color:var(--accent)] italic", className)}>
        TODO: {stripped}
      </Tag>
    );
  }
  return <Tag className={className}>{value}</Tag>;
}
