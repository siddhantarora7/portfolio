import Link from "next/link";
import { Bubble } from "./bubble";
import { ThemeToggle } from "./theme-toggle";

const items: { href: string; label: string; wide?: boolean }[] = [
  { href: "/#work", label: "work" },
  { href: "/#projects", label: "projects" },
  { href: "/#codeforces", label: "codeforces" },
  { href: "/resume.pdf", label: "resume", wide: true },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-5">
      <nav
        aria-label="Main"
        className="glass mascot-host flex items-center gap-0.5 rounded-full py-1 pr-1 pl-1.5 text-[14px]"
      >
        <Link href="/" aria-label="Home" className="grid size-9 place-items-center rounded-full">
          <Bubble size={26} />
        </Link>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`rounded-full px-2.5 py-1.5 text-ink-2 transition-colors hover:text-ink max-[420px]:px-2 ${item.wide ? "max-[420px]:hidden" : ""}`}
          >
            {item.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
