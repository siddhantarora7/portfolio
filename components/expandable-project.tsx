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
    project.links?.live && !isTodo(project.links.live)
      ? project.links.live
      : undefined;
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
    <div
      className="relative mb-4 overflow-hidden rounded-2xl p-[1px] transition-[box-shadow,transform] duration-200"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--foreground) 26%, transparent), color-mix(in oklab, var(--foreground) 6%, transparent) 50%, color-mix(in oklab, var(--foreground) 18%, transparent))",
      }}
    >
      <div
        className="relative rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in oklab, var(--background) 94%, var(--foreground) 6%), var(--background) 60%, color-mix(in oklab, var(--background) 96%, var(--foreground) 4%))",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, color-mix(in oklab, var(--foreground) 22%, transparent), transparent)",
          }}
        />

        <div
          className="group flex cursor-pointer items-start justify-between gap-4 px-6 py-5 sm:px-7"
          onClick={() => setOpen((v) => !v)}
          role="button"
          aria-expanded={open}
        >
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <ChevronRight
              size={16}
              className={cn(
                "shrink-0 self-center text-[color:var(--muted)] transition-transform duration-200",
                open && "rotate-90",
              )}
              aria-hidden
            />
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              {project.logo && (
                <Logo
                  src={project.logo}
                  name={project.name}
                  size={48}
                  className="rounded-md"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="inline-flex flex-wrap items-baseline gap-x-1.5 text-[17px] font-normal leading-snug">
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
              <p className="mt-1 text-[14.5px] text-[color:var(--muted)] transition-colors group-hover:text-[color:var(--foreground)]">
                {project.shortDescription}
              </p>
            </div>
          </div>
          <span className="ml-4 mt-0.5 shrink-0 text-[13px] tabular-nums text-[color:var(--muted)]">
            {project.period}
          </span>
        </div>

        {open && (
          <div className="space-y-3 pb-6 pl-[100px] pr-6 sm:pl-[108px] sm:pr-7">
            <ExpandedField label="What" value={project.what} />
            <ExpandedField label="Why" value={project.why} />
            <ExpandedField label="How" value={project.how} />
            {project.results && (
              <ExpandedField label="Results" value={project.results} />
            )}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.techStack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-[3px] text-[11px] uppercase tracking-[0.14em]"
                  style={{
                    color:
                      "color-mix(in oklab, var(--foreground) 78%, transparent)",
                    border:
                      "1px solid color-mix(in oklab, var(--foreground) 14%, transparent)",
                    background:
                      "color-mix(in oklab, var(--foreground) 3%, transparent)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExpandedField({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="text-[14px] leading-relaxed">
      <span className="mr-1.5 text-[color:var(--muted)]">{label}:</span>
      <MaybeTodo value={value} />
    </div>
  );
}
