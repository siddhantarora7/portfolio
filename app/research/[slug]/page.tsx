import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AurocChart } from "@/components/auroc-chart";
import { BackLink, Bullets, Chips, DetailSection, Pill } from "@/components/detail";
import { InkIn } from "@/components/primitives";
import { research } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = research.find((x) => x.slug === slug);
  if (!r) return {};
  return { title: r.title, description: r.subtitle, alternates: { canonical: `/research/${r.slug}` } };
}

export default async function ResearchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = research.find((x) => x.slug === slug);
  if (!r) notFound();

  return (
    <article className="relative">
      <BackLink />
      <header className="arrive">
        <div className="flex flex-wrap items-center gap-3 text-[14.5px] text-ink-2">
          <span>{r.org}</span>
          <Pill>{r.status}</Pill>
        </div>
        <h1 className="font-display mt-4 text-[clamp(34px,6.4vw,50px)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance">
          {r.title}
        </h1>
        <p className="mt-3 max-w-[40ch] text-[19px] leading-[1.5] text-ink-2 text-pretty">{r.subtitle}</p>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-[14.5px] sm:grid-cols-4">
          {[
            ["Role", r.role],
            ["When", r.period],
            ["Model", r.model],
            ["Data", r.dataset],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-ink-2">{k}</dt>
              <dd className="mt-0.5">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <InkIn text={r.oneBreath} className="mt-16 text-[22px] leading-[1.5] tracking-[-0.01em] text-pretty sm:text-[26px]" />

      <div className="mt-14">
        <AurocChart r={r} />
      </div>

      <DetailSection title="What we found">
        <Bullets items={r.findings} />
      </DetailSection>

      <DetailSection title="What I did">
        <Bullets items={r.contributions} />
      </DetailSection>

      <DetailSection title="Methods">
        <Chips items={r.methods} />
      </DetailSection>

      <DetailSection title="Status">
        <p>{r.venue} Nothing has been accepted yet; this page will link the paper once it&apos;s public.</p>
      </DetailSection>
    </article>
  );
}
