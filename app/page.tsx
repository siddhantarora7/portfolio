import Link from "next/link";
import { Bubble } from "@/components/bubble";
import { CodeforcesCard } from "@/components/codeforces";
import { ImageSlot } from "@/components/image-slot";
import { LedStamp } from "@/components/led-stamp";
import { InkIn, Row, Section } from "@/components/primitives";
import { projects } from "@/data/projects";
import { alsoWork, highlights, links, profile, research, work } from "@/data/site";
import { getCodeforcesStats } from "@/lib/codeforces";
import { showTodos } from "@/data/todo";

// Codeforces stats refresh once a day.
export const revalidate = 86400;

const tilts = ["-0.8deg", "0.7deg", "0.5deg", "-0.6deg"];

export default async function Home() {
  const stats = await getCodeforcesStats();
  const lead = research[0];

  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section aria-labelledby="hero-title" className="mascot-host relative">
        <div className="glass arrive relative rounded-[28px] px-5 pt-6 pb-12 sm:px-9 sm:pt-9 sm:pb-10">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <span className="arrive-pop">
              <Bubble size={52} className="size-10 sm:size-[52px]" />
            </span>
            <h1
              id="hero-title"
              className="font-display text-[clamp(31px,8.2vw,60px)] leading-[1.02] font-semibold tracking-[-0.025em] text-balance"
            >
              {profile.display}
            </h1>
          </div>
          <p className="mt-6 max-w-[38ch] text-[18px] leading-[1.6] text-pretty sm:text-[19px]">{profile.bio}</p>
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
          <LedStamp className="absolute right-5 bottom-5 sm:right-8" />
        </div>
        <p
          aria-hidden="true"
          className="hand arrive-late pointer-events-none absolute -top-7 left-24 hidden rotate-[-4deg] text-[15px] text-ink-2 sm:block"
        >
          hi! that&apos;s me, sort of
          <svg className="absolute -bottom-5 -left-6" width="30" height="26" viewBox="0 0 30 26" fill="none" aria-hidden="true">
            <path d="M27 3C18 4 9 9 5 20m0 0 0-7m0 7 6-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </p>
      </section>

      {/* --------------------------------------------------------- research */}
      <Section id="research" title="research" note="in progress">
        <ul className="focus-list">
          <Row name={lead.title} role={lead.org} aside={lead.period} href={lead.href} logo={null} />
        </ul>
        <InkIn text={lead.oneBreath} className="mt-7 text-[20px] leading-[1.55] tracking-[-0.005em] text-pretty sm:text-[22px]" />
        <Link href={lead.href!} className="link mt-4 inline-block text-[15px] text-ink-2">
          read about the paper
        </Link>
      </Section>

      {/* ------------------------------------------------------------- work */}
      <Section id="work" title="work">
        <ul className="focus-list">
          {work.map((w) => (
            <Row key={w.name} name={w.name} role={w.role} aside={w.period} note={w.note} href={w.href} logo={w.logo} mark={w.mark} />
          ))}
        </ul>
        <h3 className="mt-9 mb-1 text-[14px] text-ink-2">Also</h3>
        <ul className="focus-list">
          {alsoWork.map((w) => (
            <Row
              key={w.name}
              compact
              name={w.name}
              role={w.role}
              aside={w.period}
              href={w.href}
              logo={null}
            />
          ))}
        </ul>
      </Section>

      {/* --------------------------------------------------------- projects */}
      <Section id="projects" title="projects" note="things I made">
        <ul className="grid gap-6 pt-2 sm:grid-cols-2 sm:gap-5">
          {projects.map((p, i) => (
            <li key={p.slug} className="placed" style={{ ["--tilt" as string]: tilts[i % tilts.length] }}>
              <Link href={`/projects/${p.slug}`} className="glass group block rounded-[22px] p-2.5">
                <ImageSlot
                  image={p.hero}
                  path={`public/projects/${p.slug}/`}
                  sizes="(min-width: 640px) 320px, 100vw"
                  rounded="rounded-[15px]"
                  stamp={false}
                  variant={i}
                  coverSize="text-[15px]"
                />
                <span className={`block px-2 pb-2 ${p.hero.src || showTodos ? "pt-3.5" : "pt-2"}`}>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-[19px] font-semibold">{p.name}</span>
                    <span className="tabular text-[13px] text-ink-2">{p.year}</span>
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-[1.5] text-ink-2">{p.tagline}</span>
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
            <Row key={h.name} compact name={h.name} aside={h.detail} href={h.href} logo={null} />
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------- codeforces */}
      <Section id="codeforces" title="codeforces">
        <CodeforcesCard stats={stats} />
      </Section>

    </>
  );
}
