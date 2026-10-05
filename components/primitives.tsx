import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { isTodo, showTodos, todoText } from "@/data/todo";

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function Section({
  id,
  title,
  note,
  children,
  className = "",
}: {
  id: string;
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`mt-20 sm:mt-24 ${className}`}>
      <div className="mb-3 flex items-baseline gap-3">
        <h2 id={`${id}-title`} className="font-display text-[26px] leading-none font-semibold tracking-[-0.01em]">
          {title}
        </h2>
        {note ? <span className="hand -rotate-2 text-[15px] text-ink-2">{note}</span> : null}
      </div>
      {children}
    </section>
  );
}

// ---------------------------------------------------------------------------
// TODO notes: visible in dev/preview, gone in production.
// ---------------------------------------------------------------------------

export function Todo({ value, className = "" }: { value: string; className?: string }) {
  if (!showTodos) return null;
  return (
    <span
      className={`hand inline-block rounded-lg border border-dashed border-led/60 px-2 py-0.5 text-[14px] text-ink-2 ${className}`}
      title="Visible in development and previews only"
    >
      to write: {todoText(value)}
    </span>
  );
}

/** Renders text, or a TODO note (or nothing in production) when unconfirmed. */
export function Maybe({ value, className }: { value?: string; className?: string }) {
  if (!value) return null;
  if (isTodo(value)) return <Todo value={value} className={className} />;
  return <span className={className}>{value}</span>;
}

// ---------------------------------------------------------------------------
// Logo tile
// ---------------------------------------------------------------------------

export function LogoTile({ name, src, mark }: { name: string; src?: string; mark?: string }) {
  return (
    <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[11px] border border-rule bg-[var(--glass-strong)]">
      {src ? (
        <Image
          src={src}
          alt=""
          width={72}
          height={72}
          unoptimized={src.endsWith(".svg")}
          className="size-full object-contain p-[3px]"
        />
      ) : (
        <span className="font-display text-[14px] font-semibold tracking-[-0.02em] text-matcha-deep" aria-hidden="true">
          {mark ?? name.charAt(0).toUpperCase()}
        </span>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Row: the Diwen-style line item. Lives inside a `.focus-list`.
// ---------------------------------------------------------------------------

export function Row({
  name,
  role,
  aside,
  note,
  href,
  logo,
  mark,
  compact = false,
}: {
  name: string;
  role?: string;
  aside?: string;
  note?: string;
  href?: string;
  logo?: string | null;
  mark?: string;
  compact?: boolean;
}) {
  const linkable = href && !isTodo(href);
  const external = linkable && /^https?:/.test(href);

  const body = (
    <>
      {logo !== null ? <LogoTile name={name} src={logo} mark={mark} /> : null}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <span className="min-w-0">
            <span className={`font-medium ${compact ? "text-[15.5px]" : "text-[16.5px]"}`}>{name}</span>
            {role ? <span className="ml-2 text-[14.5px] text-ink-2">{role}</span> : null}
            {external ? (
              <svg className="ml-1 inline size-3 -translate-y-px text-ink-2 opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 2.5h5.5V8M9.2 2.8 2.8 9.2" strokeLinecap="round" />
              </svg>
            ) : null}
          </span>
          {aside ? <Maybe value={aside} className="tabular shrink-0 text-[14px] text-ink-2" /> : null}
        </span>
        {note ? (
          <span className={`mt-1 block max-w-[60ch] text-ink-2 ${compact ? "text-[14px]" : "text-[14.5px] leading-[1.55]"}`}>
            <Maybe value={note} />
          </span>
        ) : null}
        {href && isTodo(href) ? <Todo value={href} className="mt-2" /> : null}
      </span>
    </>
  );

  const cls = `group flex gap-3.5 border-b border-rule ${compact ? "items-center py-2.5" : "items-start py-3.5"}`;

  if (!linkable) {
    return (
      <li className={cls}>{body}</li>
    );
  }

  return (
    <li className="border-b border-rule">
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={`${cls} border-b-0`}>
          {body}
        </a>
      ) : (
        <Link href={href} className={`${cls} border-b-0`}>
          {body}
        </Link>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Ink-in paragraph (scroll-driven, CSS only).
// ---------------------------------------------------------------------------

export function InkIn({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={`ink-in ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="w" style={{ ["--p" as string]: (i / words.length).toFixed(3) }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
