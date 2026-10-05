import Link from "next/link";
import { Dock } from "./dock";
import { MochiArt } from "./mochi/mochi-art";
import { ThemeToggle } from "./theme-toggle";

const items: { href: string; label: string; wide?: boolean }[] = [
  { href: "/#work", label: "work" },
  { href: "/#projects", label: "projects" },
  { href: "/research/recoverability", label: "research" },
  { href: "/#play", label: "play" },
  { href: "/resume.pdf", label: "resume", wide: true },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-5">
      <nav aria-label="Main" className="glass flex items-center gap-0.5 rounded-full py-1 pr-1 pl-1.5 text-[14px]">
        <Dock className="nav-dock flex items-center gap-0.5" max={1.3} reach={55}>
          <li className="dock-item">
            <Link href="/" aria-label="Home" className="grid size-9 place-items-center rounded-full">
              <MochiArt size={30} shadow={false} />
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href} className={`dock-item ${item.wide ? "max-[420px]:hidden" : ""}`}>
              <a href={item.href} className="block rounded-full px-2.5 py-1.5 text-ink-2 transition-colors hover:text-ink max-[420px]:px-2">
                {item.label}
              </a>
            </li>
          ))}
        </Dock>
        <ThemeToggle />
      </nav>
    </header>
  );
}
