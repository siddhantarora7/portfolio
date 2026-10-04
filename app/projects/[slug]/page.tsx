import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, Bullets, Chips, DetailSection, ExternalButton, Pill } from "@/components/detail";
import { ImageSlot } from "@/components/image-slot";
import { Maybe, Todo } from "@/components/primitives";
import { getProject, projects } from "@/data/projects";
import { isTodo, showTodos } from "@/data/todo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.name, description: p.tagline, alternates: { canonical: `/projects/${p.slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const linkList = [
    { key: "live", label: "Visit site", href: p.links.live },
    { key: "demo", label: "Watch demo", href: p.links.demo },
    { key: "github", label: "View on GitHub", href: p.links.github },
  ].filter((l) => l.href);
  const hasHardPart = !isTodo(p.hardPart) || showTodos;
  const results = p.results.filter((x) => !isTodo(x) || showTodos);

  return (
    <article className="relative">
      <BackLink />

      {p.hero.src || showTodos ? (
      <div className="glass arrive mb-10 rounded-[26px] p-2.5">
        <ImageSlot
          image={p.hero}
          path={`public/projects/${p.slug}/`}
          priority
          rounded="rounded-[19px]"
          coverSize="text-[20px]"
        />
      </div>
      ) : null}

      <header className="arrive">
        <h1 className="font-display text-[clamp(36px,7vw,54px)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance">
          {p.name}
        </h1>
        <p className="mt-3 max-w-[36ch] text-[20px] leading-[1.45] text-ink-2 text-pretty">{p.tagline}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2.5 text-[14.5px] text-ink-2">
          <span className="tabular">{p.year}</span>
          {p.status ? <Pill>{p.status}</Pill> : null}
          {p.result ? <Pill>{p.result}</Pill> : null}
        </div>
        {linkList.length ? (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {linkList.map((l) =>
              isTodo(l.href) ? (
                <Todo key={l.key} value={l.href!} />
              ) : (
                <ExternalButton key={l.key} href={l.href!}>
                  {l.label}
                </ExternalButton>
              ),
            )}
          </div>
        ) : null}
      </header>

      {isTodo(p.problem) && !showTodos ? null : (
        <DetailSection title="The problem">
          <Maybe value={p.problem} />
        </DetailSection>
      )}

      <DetailSection title="What I built">
        <Bullets items={p.built} />
      </DetailSection>

      {p.gallery[0] && (p.gallery[0].src || showTodos) ? (
        <div className="mt-14">
          <ImageSlot image={p.gallery[0]} path={`public/projects/${p.slug}/`} variant={1} coverSize="text-[18px]" />
        </div>
      ) : null}

      {hasHardPart ? (
        <DetailSection title="The hard part">
          <Maybe value={p.hardPart} />
        </DetailSection>
      ) : null}

      <DetailSection title="Stack">
        <Chips items={p.stack.map((s) => (isTodo(s) ? <Todo key={s} value={s} className="-my-1" /> : s))} />
      </DetailSection>

      {results.length ? (
        <DetailSection title="Results">
          <Bullets items={results.map((x) => <Maybe key={x} value={x} />)} />
        </DetailSection>
      ) : null}

      {p.gallery.slice(1).map((img) => (
        <div key={img.alt} className="mt-14">
          <ImageSlot image={img} path={`public/projects/${p.slug}/`} coverSize="text-[18px]" />
        </div>
      ))}

      <nav aria-label="Next project" className="mt-20 border-t border-rule pt-6">
        <Link href={`/projects/${next.slug}`} className="group flex items-baseline justify-between gap-4">
          <span className="text-[14.5px] text-ink-2">Next project</span>
          <span className="font-display text-[22px] font-semibold transition-transform group-hover:translate-x-1">
            {next.name}
          </span>
        </Link>
      </nav>
    </article>
  );
}
