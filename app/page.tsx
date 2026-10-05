import Image from "next/image";
import Link from "next/link";
import { CodeforcesCard } from "@/components/codeforces";
import { FlashStamp } from "@/components/flash-stamp";
import { GithubCard } from "@/components/github-card";
import { stampLabel } from "@/components/led-stamp";
import { MochiFriends } from "@/components/mochi/mochi-friends";
import { NowTiles } from "@/components/now-tiles";
import { InkIn, LogoTile, Row, Section } from "@/components/primitives";
import { projects } from "@/data/projects";
import { alsoWork, highlights, links, profile, research, work } from "@/data/site";
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
        <div className="absolute -top-1 right-4 z-10 sm:-top-4 sm:right-8">
          <MochiFriends size={74} />
        </div>
        <p
          aria-hidden="true"
          className="hand arrive-late pointer-events-none absolute top-6 right-[190px] z-10 rotate-[-5deg] text-[15px] text-ink-2 max-sm:top-9 max-sm:right-[176px] max-sm:text-[14px]"
        >
          poke us!
          <svg className="absolute top-1 -right-8" width="30" height="22" viewBox="0 0 30 22" fill="none" aria-hidden="true">
            <path d="M2 5c9-4 18-2 24 9m0 0-1-7m1 7-7-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </p>

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
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            <li>
              <a className="link" href={links.github} target="_blank" rel="noreferrer">
                github
              </a>
            </li>
            <li>
              <a className="link" href={links.linkedin} target="_blank" rel="noreferrer">
                linkedin
              </a>
            </li>
            <li>
              <a className="link" href={`mailto:${links.email}`}>
                email
              </a>
            </li>
            <li>
              <a className="link" href={links.resume}>
                resume
              </a>
            </li>
          </ul>
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
    </>
  );
}
