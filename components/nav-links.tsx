import Link from "next/link";

const linkClass =
  "underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors";

export function NavLinks() {
  return (
    <nav className="text-[15px] flex items-center gap-2">
      <Link href="/projects" className={linkClass}>
        Projects
      </Link>
      <span className="text-[color:var(--muted)]" aria-hidden>|</span>
      <a href="/resume.pdf" target="_blank" rel="noreferrer" className={linkClass}>
        Resume
      </a>
    </nav>
  );
}
