import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/content";
import { ExpandableProject } from "@/components/expandable-project";
import { ProjectsScrollSequence } from "@/components/projects-scroll-sequence";

const linkClass =
  "underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors";

export const metadata: Metadata = {
  title: "Projects — Siddhant Arora",
};

export default function ProjectsPage() {
  return (
    <>
      <header
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
      >
        <div
          className="mx-auto flex items-end justify-between gap-4"
          style={{ width: "min(94vw, 1080px)" }}
        >
          <h1 className="leading-[0.95]">
            <Link
              href="/projects"
              className="inline-flex items-end gap-2 transition-colors hover:text-[color:var(--foreground)]"
            >
              <span
                className="mb-2 text-[14px] text-[color:var(--muted)]"
                aria-hidden
              >
                ◆
              </span>
              <span
                className="[font-family:var(--font-display),Georgia,serif] text-[clamp(40px,6vw,60px)] font-medium tracking-[-0.02em]"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: "'opsz' 96",
                }}
              >
                Projects
              </span>
            </Link>
          </h1>
          <nav className="flex items-center gap-2 pb-2 text-[15px]">
            <Link href="/" className={linkClass}>
              Home
            </Link>
            <span className="text-[color:var(--muted)]" aria-hidden>|</span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Resume
            </a>
          </nav>
        </div>
      </header>

      <ProjectsScrollSequence projects={projects} />

      <div
        className="mt-10"
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
      >
        <div
          className="mx-auto px-4 sm:px-6"
          style={{ width: "min(94vw, 1000px)" }}
        >
          {projects.map((p) => (
            <ExpandableProject key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </>
  );
}
