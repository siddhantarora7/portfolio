"use client";

import { useState, type MouseEvent } from "react";
import { ChevronRight, Github, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { MaybeTodo } from "./todo";
import { isTodo, type Project } from "@/data/content";
import { cn } from "@/lib/cn";

const linkClass =
  "underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors";

function stop(e: MouseEvent) {
  e.stopPropagation();
}

export function ExpandableProject({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  const liveHref =
    project.links?.live && !isTodo(project.links.live) ? project.links.live : undefined;
  const githubHref =
    project.links?.github && !isTodo(project.links.github)
      ? project.links.github
      : undefined;

  const titleNode = liveHref ? (
    <a
      href={liveHref}
      target="_blank"
      rel="noreferrer"
      className={`${linkClass} inline-flex items-baseline gap-0.5`}
      onClick={stop}
    >
      {project.name}
      <ArrowUpRight size={14} className="self-center" aria-hidden />
    </a>
  ) : (
    <span>{project.name}</span>
  );

  return (
    <div className="border-t border-[color:var(--rule)] py-4">
      <div
        className="flex items-start justify-between gap-4 cursor-pointer group"
        onClick={() => setOpen((v) => !v)}
        role="button"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <ChevronRight
            size={16}
            className={cn(
              "text-[color:var(--muted)] shrink-0 self-center transition-transform duration-200",
              open && "rotate-90",
            )}
            aria-hidden
          />
          <div className="w-10 h-10 shrink-0 flex items-center justify-center">
            {project.logo && (
              <Logo src={project.logo} name={project.name} size={40} className="rounded" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-normal leading-snug inline-flex items-baseline flex-wrap gap-x-1.5">
              {titleNode}
              {githubHref && (
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`${linkClass} inline-flex items-center`}
                  onClick={stop}
                  aria-label={`${project.name} on GitHub`}
                >
                  <Github size={14} aria-hidden />
                </a>
              )}
            </h3>
            <p className="mt-0.5 text-[14px] text-[color:var(--muted)] group-hover:text-[color:var(--foreground)] transition-colors">
              {project.shortDescription}
            </p>
          </div>
        </div>
        <span className="text-[14px] text-[color:var(--muted)] shrink-0 ml-4 mt-0.5">
          {project.period}
        </span>
      </div>

      {open && (
        <div className="pl-[76px] mt-3 space-y-3">
          <ExpandedField label="What" value={project.what} />
          <ExpandedField label="Why" value={project.why} />
          <ExpandedField label="How" value={project.how} />
          {project.results && <ExpandedField label="Results" value={project.results} />}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[12px] rounded bg-[color:var(--rule)] text-[color:var(--foreground)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExpandedField({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="text-[14px] leading-relaxed">
      <span className="text-[color:var(--muted)] mr-1.5">{label}:</span>
      <MaybeTodo value={value} />
    </div>
  );
}
