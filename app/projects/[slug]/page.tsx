import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, Bullets, Chips, DetailSection, ExternalButton, Pill } from "@/components/detail";
import { LogoTile, Maybe, Todo } from "@/components/primitives";
import { HousingChart } from "@/components/housing-chart";
import { ShotFrame } from "@/components/shot";
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

const visible = (items: string[]) => items.filter((x) => !isTodo(x) || showTodos);

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
  const how = visible(p.how);
  const results = visible(p.results);
  const stack = visible(p.stack);

  return (
    <article className="relative">
      <BackLink />

      {p.hero?.src ? (
        <div className="arrive mb-10">
          <ShotFrame shot={{ ...p.hero, caption: undefined }} priority stamp ratio={p.hero.ratio} />
        </div>
      ) : null}

      <header className={p.hero?.src ? "" : "arrive"}>
        <div className="flex items-center gap-3.5">
          {p.logo || p.mark ? <LogoTile name={p.name} src={p.logo} mark={p.mark} /> : null}
          <h1 className="font-display text-[clamp(34px,7vw,52px)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance">
            {p.name}
          </h1>
        </div>
        <p className="mt-3 max-w-[38ch] text-[20px] leading-[1.45] text-ink-2 text-pretty">{p.tagline}</p>
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

      <DetailSection title="What it is">
        <div className="space-y-4">
          {p.about.map((t) => (
            <p key={t}>{t}</p>
          ))}
          {p.credit ? <p className="hand text-[16px] text-ink-2">{p.credit}</p> : null}
        </div>
      </DetailSection>

      {p.hero?.caption ? <p className="hand mt-4 text-[15px] text-ink-2">{p.hero.caption}</p> : null}

      {p.visual === "housing-chart" ? (
        <div className="mt-12">
          <HousingChart />
        </div>
      ) : null}

      {how.length ? (
        <DetailSection title="How it works">
          <Bullets items={how.map((x) => <Maybe key={x} value={x} />)} />
        </DetailSection>
      ) : null}

      {stack.length ? (
        <DetailSection title="Stack">
          <Chips items={stack.map((s) => (isTodo(s) ? <Todo key={s} value={s} className="-my-1" /> : s))} />
        </DetailSection>
      ) : null}

      {results.length ? (
        <DetailSection title="Results">
          <Bullets items={results.map((x) => <Maybe key={x} value={x} />)} />
        </DetailSection>
      ) : null}

      {p.gallery.length ? (
        <div className="mt-14 flex flex-col gap-10">
          {p.gallery.map((s) => (
            <ShotFrame key={s.src} shot={s} framed={false} ratio={s.ratio} />
          ))}
        </div>
      ) : null}

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
