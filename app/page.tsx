import Link from "next/link";
import { awards, currently, hero, isTodo, projects } from "@/data/content";
import { Bullet } from "@/components/bullet";
import { ContactRow } from "@/components/contact-row";
import { Globe } from "@/components/globe";
import { HR } from "@/components/hr";
import { Logo } from "@/components/logo";
import { NavLinks } from "@/components/nav-links";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { MaybeTodo } from "@/components/todo";

const linkClass =
  "underline underline-offset-4 decoration-[color:var(--rule)] hover:decoration-current transition-colors";

function MaybeLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  if (!href || isTodo(href)) return <>{children}</>;
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <header>
        <div className="flex items-end justify-between gap-4">
          <h1 className="leading-[0.95]">
            <Link
              href="/"
              className="inline-flex items-end gap-2 transition-colors hover:text-[color:var(--foreground)]"
            >
              <span
                className="mb-2 text-[14px] text-[color:var(--muted)]"
                aria-hidden
              >
                ◆
              </span>
              <span
                className="[font-family:var(--font-display),Georgia,serif] text-[clamp(36px,5.5vw,52px)] font-medium tracking-[-0.02em]"
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: "'opsz' 96",
                }}
              >
                {hero.name}
              </span>
              <span className="mb-1.5 text-[15px] tabular-nums text-[color:var(--muted)]">
                , {hero.age}
              </span>
            </Link>
          </h1>
          <div className="pb-2">
            <NavLinks />
          </div>
        </div>
        <p className="mt-5 max-w-[55ch] text-[16px] sm:text-[17px] text-[color:var(--muted)]">
          {hero.bio}
        </p>
        <HR />
      </header>

      {/* Currently */}
      <Section>
        <SectionHeader>Currently</SectionHeader>
        <ul>
          {currently.map((c, i) => (
            <li key={i}>
              <Bullet>
                <span className="inline-flex flex-wrap items-center gap-x-1.5">
                  {c.role && <span>{c.role} at</span>}
                  <span className="inline-flex items-center gap-1.5">
                    <Logo src={c.entity.logo} name={c.entity.name} />
                    {c.entity.href ? (
                      <MaybeLink href={c.entity.href}>
                        <MaybeTodo value={c.entity.name} />
                      </MaybeLink>
                    ) : (
                      <MaybeTodo value={c.entity.name} />
                    )}
                  </span>
                  {c.period && (
                    <span className="text-[color:var(--muted)]">— {c.period}</span>
                  )}
                </span>
              </Bullet>
              {c.subBullets?.map((sb, j) => (
                <Bullet key={j} nested>
                  <span>{sb}</span>
                </Bullet>
              ))}
            </li>
          ))}
        </ul>
        <HR />
      </Section>

      {/* Awards */}
      <Section>
        <SectionHeader>Awards</SectionHeader>
        <ul>
          {awards.map((a, i) => (
            <li key={i}>
              <Bullet>
                <span className="inline-flex flex-wrap items-center gap-x-1.5">
                  {a.org && <Logo src={a.org.logo} name={a.org.name} />}
                  <span>{a.name}</span>
                  {a.result && (
                    <em className="not-italic">
                      {" — "}
                      <span className="italic">{a.result}</span>
                    </em>
                  )}
                </span>
              </Bullet>
            </li>
          ))}
        </ul>
        <HR />
      </Section>

      {/* Projects (preview) */}
      <Section>
        <SectionHeader>Projects</SectionHeader>
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              <Bullet>
                <span className="inline-flex flex-wrap items-center gap-x-1.5">
                  {p.logo && <Logo src={p.logo} name={p.name} />}
                  <Link href={`/projects/${p.slug}`} className={linkClass}>
                    {p.name}
                  </Link>
                  <span className="text-[color:var(--muted)]">—</span>
                  <span>{p.shortDescription}</span>
                  {p.result && (
                    <span>
                      , <em>{p.result}</em>
                    </span>
                  )}
                </span>
              </Bullet>
            </li>
          ))}
        </ul>
        <div className="mt-3 text-right text-[15px]">
          <Link href="/projects" className={`${linkClass} text-[color:var(--muted)]`}>
            see all →
          </Link>
        </div>
        <HR />
      </Section>

      {/* Location */}
      <Section>
        <div className="flex justify-center">
          <Globe />
        </div>
        <HR />
      </Section>

      {/* Contact */}
      <Section>
        <SectionHeader>Contact</SectionHeader>
        <ContactRow />
      </Section>
    </>
  );
}
