import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, Chips } from "@/components/detail";
import { LogoTile } from "@/components/primitives";
import { ShotFrame } from "@/components/shot";
import { getWork, work } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  return { title: w.name, description: w.note, alternates: { canonical: `/work/${w.slug}` } };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();

  const [hero, ...rest] = w.shots ?? [];
  const i = work.findIndex((x) => x.slug === w.slug);
  const next = work[(i + 1) % work.length];
  const linkList = [...(w.site ? [w.site] : []), ...(w.extraLinks ?? [])];

  // interleave paragraphs with the remaining screenshots
  const blocks: ({ kind: "p"; text: string } | { kind: "shot"; shot: (typeof rest)[number] })[] = [];
  w.about.forEach((text, k) => {
    blocks.push({ kind: "p", text });
    if (rest[k]) blocks.push({ kind: "shot", shot: rest[k] });
  });
  rest.slice(w.about.length).forEach((shot) => blocks.push({ kind: "shot", shot }));

  return (
    <article className="relative">
      <BackLink />

      {hero ? (
        <div className="arrive mb-10">
          <ShotFrame shot={{ ...hero, caption: undefined }} priority stamp />
        </div>
      ) : null}

      <header className={hero ? "" : "arrive"}>
        <div className="flex items-center gap-3.5">
          <LogoTile name={w.name} src={w.logo} mark={w.mark} />
          <h1 className="font-display text-[clamp(32px,6.5vw,48px)] leading-[1.06] font-semibold tracking-[-0.02em] text-balance">
            {w.name}
          </h1>
        </div>
        <p className="hand mt-3 text-[18px] text-ink-2">
          {w.role}, <span className="tabular">{w.period}</span>
        </p>
        {linkList.length ? (
          <ul className="mt-5 space-y-1.5 text-[15.5px]">
            {linkList.map((l) => (
              <li key={l.href} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-matcha" />
                <a className="link" href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-12 flex flex-col gap-10">
        {blocks.map((b, k) =>
          b.kind === "p" ? (
            <p key={k} className="max-w-[62ch] text-[17.5px] leading-[1.75] text-pretty">
              {b.text}
            </p>
          ) : (
            <ShotFrame key={k} shot={b.shot} framed={false} />
          ),
        )}
      </div>

      {w.sponsors?.length ? (
        <section className="mt-14 space-y-6">
          {w.sponsors.map((s) => (
            <div key={s.tier}>
              <h2 className="font-display mb-3 text-[20px] font-semibold">{s.tier}</h2>
              <Chips items={s.names} />
            </div>
          ))}
        </section>
      ) : null}

      <nav aria-label="Next" className="mt-20 border-t border-rule pt-6">
        <Link href={`/work/${next.slug}`} className="group flex items-baseline justify-between gap-4">
          <span className="text-[14.5px] text-ink-2">Next</span>
          <span className="font-display text-[22px] font-semibold transition-transform group-hover:translate-x-1">
            {next.name}
          </span>
        </Link>
      </nav>
    </article>
  );
}
