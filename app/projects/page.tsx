import Link from "next/link";
import type { Metadata } from "next";
import { isTodo, projects } from "@/data/content";
import { HR } from "@/components/hr";
import { Logo } from "@/components/logo";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";

const linkClass =
  "underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors";

export const metadata: Metadata = {
  title: "Projects — Siddhant Arora",
};

function projectLinks(links?: { live?: string; github?: string; demo?: string }) {
  if (!links) return [];
  const out: { label: string; href: string }[] = [];
  if (links.live && !isTodo(links.live)) out.push({ label: "Live", href: links.live });
  if (links.github && !isTodo(links.github)) out.push({ label: "GitHub", href: links.github });
  if (links.demo && !isTodo(links.demo)) out.push({ label: "Demo", href: links.demo });
  return out;
}

export default function ProjectsPage() {
  return (
    <>
      <header>
        <div className="flex items-center justify-between gap-4 text-[15px]">
          <Link href="/" className={linkClass}>
            ← back
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className={linkClass}>
            Resume
          </a>
        </div>
        <div className="mt-8">
          <SectionHeader>Projects</SectionHeader>
        </div>
        <HR />
      </header>

      {projects.map((p, i) => {
        const links = projectLinks(p.links);
        return (
          <Section key={p.slug}>
            <article>
              <h3 className="flex items-center gap-2 text-[16px] font-medium">
                <Logo src={p.logo} name={p.name} />
                <Link href={`/projects/${p.slug}`} className={linkClass}>
                  {p.name}
                </Link>
              </h3>
              <p className="mt-2">{p.shortDescription}</p>
              <p className="mt-2 text-[14px] text-[color:var(--muted)]">
                {p.techStack.join(" · ")}
              </p>
              <p className="mt-1 text-[14px] text-[color:var(--muted)]">{p.period}</p>
              {links.length > 0 && (
                <p className="mt-2 text-[14px]">
                  {links.map((l, j) => (
                    <span key={l.label}>
                      {j > 0 && (
                        <span className="text-[color:var(--muted)] mx-2" aria-hidden>·</span>
                      )}
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                      >
                        {l.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </article>
            {i < projects.length - 1 && <HR />}
          </Section>
        );
      })}
    </>
  );
}
