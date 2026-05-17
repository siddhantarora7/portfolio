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
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-[16px] font-medium">
          <Link href="/projects" className={linkClass}>
            <span className="text-[color:var(--muted)] mr-1.5" aria-hidden>◆</span>
            Projects
          </Link>
        </h1>
        <nav className="flex items-center gap-2 text-[15px]">
          <Link href="/" className={linkClass}>Home</Link>
          <span className="text-[color:var(--muted)]" aria-hidden>|</span>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className={linkClass}>
            Resume
          </a>
        </nav>
      </header>

      <ProjectsScrollSequence projects={projects} />

      <div className="mt-6">
        {projects.map((p) => (
          <ExpandableProject key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
