import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hero, isTodo, projects, type Project } from "@/data/content";
import { HR } from "@/components/hr";
import { Logo } from "@/components/logo";
import { SectionHeader } from "@/components/section-header";
import { MaybeTodo } from "@/components/todo";

const linkClass =
  "underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.name} — ${hero.name}`,
    description: project.shortDescription,
  };
}

function Para({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="mt-6">
      <h3 className="mb-1 text-[15px] font-medium text-[color:var(--muted)]">
        {label}
      </h3>
      <MaybeTodo as="p" value={value} className="leading-[1.7]" />
    </div>
  );
}

function detailLinks(p: Project) {
  const out: { label: string; href: string }[] = [];
  if (p.links?.live && !isTodo(p.links.live)) out.push({ label: "Live", href: p.links.live });
  if (p.links?.github && !isTodo(p.links.github)) out.push({ label: "GitHub", href: p.links.github });
  if (p.links?.demo && !isTodo(p.links.demo)) out.push({ label: "Demo", href: p.links.demo });
  return out;
}

export default function ProjectDetailPage({ params }: Params) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const links = detailLinks(project);

  return (
    <article>
      <Link href="/projects" className={`${linkClass} text-[15px]`}>
        ← back to projects
      </Link>

      <div className="mt-8">
        <SectionHeader>{project.name}</SectionHeader>
      </div>

      <div className="mt-1 flex items-center gap-2 text-[14px] text-[color:var(--muted)]">
        {project.logo && <Logo src={project.logo} name={project.name} />}
        <span>{project.techStack.join(" · ")}</span>
        <span aria-hidden>·</span>
        <span>{project.period}</span>
      </div>

      <Para label="What" value={project.what} />
      <Para label="Why" value={project.why} />
      <Para label="How" value={project.how} />
      {project.results && <Para label="Results" value={project.results} />}

      {links.length > 0 && (
        <>
          <HR />
          <p className="text-[14px]">
            {links.map((l, i) => (
              <span key={l.label}>
                {i > 0 && (
                  <span className="text-[color:var(--muted)] mx-2" aria-hidden>·</span>
                )}
                <a href={l.href} target="_blank" rel="noreferrer" className={linkClass}>
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </>
      )}
    </article>
  );
}
