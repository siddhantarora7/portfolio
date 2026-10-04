import Link from "next/link";
import type { ReactNode } from "react";

export function BackLink() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="glass mb-8 grid size-10 place-items-center rounded-full text-ink-2 transition-colors hover:text-ink lg:absolute lg:top-0 lg:-left-16 lg:mb-0"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 3.5 5.5 8l4.5 4.5" />
      </svg>
    </Link>
  );
}

export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-display mb-3 text-[22px] leading-tight font-semibold">{title}</h2>
      <div className="text-[17px] leading-[1.7] text-pretty">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-matcha" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Chips({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li key={i} className="rounded-full border border-rule bg-[var(--glass-strong)] px-3 py-1 text-[14px]">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-matcha-soft px-2.5 py-0.5 text-[13px] font-medium text-matcha-deep">
      {children}
    </span>
  );
}

export function ExternalButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14.5px] font-medium transition-transform hover:-translate-y-px"
    >
      {children}
      <svg className="size-3 text-ink-2" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 2.5h5.5V8M9.2 2.8 2.8 9.2" strokeLinecap="round" />
      </svg>
    </a>
  );
}
