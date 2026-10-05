import Image from "next/image";
import Link from "next/link";
import { CodeforcesCard } from "@/components/codeforces";
import { FlashStamp } from "@/components/flash-stamp";
import { GithubCard } from "@/components/github-card";
import { stampLabel } from "@/components/led-stamp";
import { Play } from "@/components/game/play";
import { LinksDock } from "@/components/links-dock";
import { NowTiles } from "@/components/now-tiles";
import { InkIn, LogoTile, Row, Section } from "@/components/primitives";
import { housingRuns, projects } from "@/data/projects";
import { alsoWork, highlights, profile, research, work } from "@/data/site";
import { getCodeforcesStats } from "@/lib/codeforces";
import { getGithubStats } from "@/lib/github";

// Live stats and countdowns refresh once a day.
export const revalidate = 86400;

const tilts = ["-0.8deg", "0.7deg", "0.5deg", "-0.6deg"];

export default async function Home() {
  const [cf, gh] = await Promise.all([getCodeforcesStats(), getGithubStats()]);
  const lead = research[0];

  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section aria-labelledby="hero-title" className="relative pt-12 sm:pt-10">
        <span
          data-mochi-dock
          aria-hidden="true"
          className="absolute -top-6 right-6 z-10 block h-[76px] w-[76px] max-md:h-[60px] max-md:w-[60px] sm:right-10"
        />

        <div className="glass arrive relative rounded-[28px] px-5 pt-9 pb-12 sm:px-9 sm:pt-11 sm:pb-10">
          <h1
            id="hero-title"
            className="font-display text-[clamp(34px,8.6vw,60px)] leading-[1.02] font-semibold tracking-[-0.025em] text-balance"
          >
            {profile.display}
          </h1>
          <p className="mt-5 max-w-[40ch] text-[18px] leading-[1.6] text-pretty sm:text-[19px]">{profile.bio}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
            {profile.facts.map((f) => (
              <li key={f} className="rounded-full bg-matcha-soft px-3 py-1 text-[13.5px] font-medium text-matcha-deep">
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-[44ch] text-[16px] text-ink-2">{profile.human}</p>
          <LinksDock className="mt-8" />
          <FlashStamp label={stampLabel()} className="absolute right-5 bottom-5 sm:right-8" />
        </div>

        <NowTiles cf={cf} />
      </section>

      {/* --------------------------------------------------------- research */}
      <Section id="research" title="research" note="in progress">
        <ul className="focus-list">
          <Row name={lead.title} role={lead.org} aside={lead.period} href={lead.href} logo={null} />
        </ul>
        <InkIn text={lead.oneBreath} className="mt-7 text-[20px] leading-[1.55] tracking-[-0.005em] text-pretty sm:text-[22px]" />
        <Link href={lead.href!} className="link mt-4 inline-block text-[15px] text-ink-2">
          see the chart and findings
        </Link>
      </Section>

      {/* ------------------------------------------------------------- work */}
      <Section id="work" title="work" note="click one for more">
        <ul className="focus-list">
          {work.map((w) => (
            <Row
              key={w.slug}
              name={w.name}
              role={w.role}
              aside={w.period}
              note={w.note}
              href={`/work/${w.slug}`}
              logo={w.logo}
              mark={w.mark}
            />
          ))}
        </ul>
        <h3 className="mt-9 mb-1 text-[14px] text-ink-2">Also</h3>
        <ul className="focus-list">
          {alsoWork.map((w) => (
            <Row key={w.name} compact name={w.name} role={w.role} aside={w.period} href={w.href} logo={w.logo} mark={w.mark} />
          ))}
        </ul>
      </Section>

      {/* --------------------------------------------------------- projects */}
      <Section id="projects" title="projects" note="things I made">
        <ul className="grid gap-6 pt-2 sm:grid-cols-2 sm:gap-5">
          {projects.map((p, i) => (
            <li key={p.slug} className="placed" style={{ ["--tilt" as string]: tilts[i % tilts.length] }}>
              <Link href={`/projects/${p.slug}`} className="glass group block h-full rounded-[22px] p-2.5">
                {p.visual && !p.hero?.src ? (
                  <span className="relative mb-1 block overflow-hidden rounded-[15px] border border-rule" style={{ aspectRatio: "16 / 10" }}>
                    <CardVisual kind={p.visual} />
                  </span>
                ) : null}
                {p.hero?.src ? (
                  <span
                    className="scanlines relative mb-1 block overflow-hidden rounded-[15px] border border-rule"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <Image
                      src={p.hero.src}
                      alt={p.hero.alt}
                      fill
                      sizes="(min-width: 640px) 320px, 100vw"
                      className="object-cover object-top"
                    />
                  </span>
                ) : null}
                <span className="block px-2 pt-2.5 pb-2">
                  <span className="flex items-center gap-2.5">
                    {p.logo || p.mark ? <LogoTile name={p.name} src={p.logo} mark={p.mark} /> : null}
                    <span className="font-display flex-1 text-[19px] leading-tight font-semibold">{p.name}</span>
                    <span className="tabular text-[13px] text-ink-2">{p.year}</span>
                  </span>
                  <span className="mt-2 block text-[14.5px] leading-[1.5] text-ink-2">{p.tagline}</span>
                  {p.result || p.status ? (
                    <span className="mt-3 inline-block rounded-full bg-matcha-soft px-2.5 py-0.5 text-[12.5px] font-medium text-matcha-deep">
                      {p.result ?? p.status}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------- highlights */}
      <Section id="highlights" title="highlights">
        <ul className="focus-list">
          {highlights.map((h) => (
            <Row key={h.name} compact name={h.name} aside={h.detail} href={h.href} logo={h.logo} mark={h.mark} />
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------- codeforces */}
      <Section id="codeforces" title="codeforces">
        <CodeforcesCard stats={cf} />
      </Section>

      {/* ----------------------------------------------------------- github */}
      <Section id="github" title="github" note="yes, it's green on purpose">
        <GithubCard stats={gh} />
      </Section>

      {/* ------------------------------------------------------------- play */}
      <Section id="play" title="play" note="a tiny game">
        <Play target={cf.info.rating} />
      </Section>
    </>
  );
}

function CardVisual({ kind }: { kind: "cursive-demo" | "housing-chart" }) {
  if (kind === "cursive-demo") {
    return (
      <span className="dot-grid absolute inset-0 flex flex-col justify-center gap-2 bg-[var(--glass-strong)] px-5" aria-hidden="true">
        <span className="text-[15px] leading-snug">
          Dear hiring team, I&apos;m writing<span className="caret" />
          <span className="text-ink-2"> to apply for the summer internship.</span>
        </span>
        <span className="hand text-[13px] text-ink-2">ghost text, as you type</span>
      </span>
    );
  }
  return (
    <span className="dot-grid absolute inset-0 flex items-end justify-center gap-3 bg-[var(--glass-strong)] px-6 pb-5" aria-hidden="true">
      {housingRuns.map((r) => (
        <span key={r.label} className="flex flex-1 flex-col items-center gap-1">
          <span className="tabular text-[11px] font-semibold">{r.r2Dollars.toFixed(2)}</span>
          <span className="w-full rounded-t-md bg-matcha" style={{ height: `${r.r2Dollars * 88}px`, opacity: 0.45 + 0.55 * r.r2Dollars }} />
        </span>
      ))}
    </span>
  );
}
