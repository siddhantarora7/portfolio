"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { isTodo, type Project } from "@/data/content";
import { Logo } from "./logo";
import { MaybeTodo } from "./todo";

const displayFont = "[font-family:var(--font-display),Georgia,serif]";

export function ProjectsScrollSequence({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (projects.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative my-10"
      style={{
        height: `${projects.length * 110}vh`,
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
      }}
      aria-label="Project showcase"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Ambience progress={scrollYProgress} total={projects.length} />

        <div className="relative z-10 h-full w-full flex items-center justify-center px-6 sm:px-10">
          {projects.map((project, i) => (
            <Card
              key={project.slug}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <Counter
          projects={projects}
          progress={scrollYProgress}
        />
      </div>
    </section>
  );
}

function Ambience({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const haloX = useTransform(progress, [0, 1], ["75%", "25%"]);
  const haloY = useTransform(progress, [0, 1], ["30%", "70%"]);
  const haloOpacity = useTransform(
    progress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0],
  );

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          background: `radial-gradient(circle at var(--hx) var(--hy), color-mix(in oklab, var(--accent) 28%, transparent), transparent 55%)`,
          opacity: haloOpacity,
          // @ts-expect-error custom props for radial position
          "--hx": haloX,
          "--hy": haloY,
        }}
        className="pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, var(--background), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to top, var(--background), transparent)",
        }}
      />
    </>
  );
}

function Card({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const buffer = Math.min(segment * 0.22, 0.09);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const inWindow = isFirst
    ? [end - buffer, end + buffer]
    : isLast
      ? [start - buffer, start + buffer]
      : [start - buffer, start + buffer, end - buffer, end + buffer];

  const opacity = useTransform(
    progress,
    inWindow,
    isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    inWindow,
    isFirst ? [0, -60] : isLast ? [60, 0] : [60, 0, 0, -60],
  );

  const scale = useTransform(
    progress,
    inWindow,
    isFirst ? [1, 0.94] : isLast ? [0.94, 1] : [0.94, 1, 1, 0.94],
  );

  const blur = useTransform(
    progress,
    inWindow,
    isFirst ? [0, 8] : isLast ? [8, 0] : [8, 0, 0, 8],
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const liveHref =
    project.links?.live && !isTodo(project.links.live)
      ? project.links.live
      : undefined;
  const githubHref =
    project.links?.github && !isTodo(project.links.github)
      ? project.links.github
      : undefined;

  const indexLabel = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <motion.article
      style={{ opacity, y, scale, filter }}
      className="absolute inset-x-0 mx-auto w-[min(94vw,1080px)]"
    >
      <div
        className="group relative overflow-hidden rounded-[28px] p-[1.5px]"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--accent) 75%, transparent), color-mix(in oklab, var(--foreground) 18%, transparent) 38%, color-mix(in oklab, var(--accent) 12%, transparent) 70%, color-mix(in oklab, var(--foreground) 24%, transparent))",
          boxShadow:
            "0 40px 90px -30px color-mix(in oklab, var(--accent) 35%, transparent), 0 10px 30px -15px rgb(0 0 0 / 0.35)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[26px] px-8 py-9 sm:px-12 sm:py-12"
          style={{
            background:
              "linear-gradient(155deg, color-mix(in oklab, var(--background) 92%, var(--foreground) 8%), var(--background) 55%, color-mix(in oklab, var(--background) 88%, var(--accent) 6%))",
          }}
        >
          {/* Top sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, color-mix(in oklab, var(--foreground) 35%, transparent), transparent)",
            }}
          />

          {/* Watermark numeral */}
          <div
            aria-hidden
            className={`pointer-events-none absolute -right-2 -top-6 select-none ${displayFont} font-medium leading-none`}
            style={{
              fontSize: "clamp(140px, 22vw, 280px)",
              color: "color-mix(in oklab, var(--accent) 22%, transparent)",
              letterSpacing: "-0.04em",
              fontStyle: "italic",
            }}
          >
            {indexLabel}
          </div>

          {/* Top meta row */}
          <div className="relative flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
                aria-hidden
              />
              <span className="tabular-nums">
                {indexLabel} <span className="opacity-50">/ {totalLabel}</span>
              </span>
            </span>
            <span className="tabular-nums">{project.period}</span>
          </div>

          {/* Headline */}
          <div className="relative mt-7 flex items-start gap-5">
            {project.logo && (
              <div
                className="shrink-0 rounded-xl p-2"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in oklab, var(--foreground) 6%, transparent), transparent)",
                  border:
                    "1px solid color-mix(in oklab, var(--foreground) 8%, transparent)",
                }}
              >
                <Logo
                  src={project.logo}
                  name={project.name}
                  size={48}
                  className="rounded-md"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3
                className={`${displayFont} text-[clamp(34px,5vw,64px)] font-medium leading-[0.95] tracking-[-0.02em]`}
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: "'opsz' 96",
                }}
              >
                {project.name}
              </h3>
              <p className="mt-3 max-w-[60ch] text-[15px] sm:text-[16px] text-[color:var(--muted)]">
                {project.shortDescription}
              </p>
            </div>
          </div>

          {/* Hairline divider */}
          <div
            aria-hidden
            className="relative my-8 h-px w-full"
            style={{
              background:
                "linear-gradient(to right, color-mix(in oklab, var(--accent) 50%, transparent), color-mix(in oklab, var(--foreground) 15%, transparent) 35%, transparent)",
            }}
          />

          {/* Body — two columns on md+ */}
          <div className="relative grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            <Field label="What" value={project.what} />
            <Field label="Why" value={project.why} />
            <Field label="How" value={project.how} />
            {project.results && (
              <Field label="Results" value={project.results} accent />
            )}
          </div>

          {/* Footer — tech + links */}
          <div className="relative mt-9 flex flex-wrap items-center justify-between gap-5">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-[3px] text-[11px] uppercase tracking-[0.14em]"
                  style={{
                    color: "color-mix(in oklab, var(--foreground) 78%, transparent)",
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

            <div className="flex items-center gap-2">
              {liveHref && (
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
                  style={{
                    color: "var(--background)",
                    background: "var(--accent)",
                    boxShadow:
                      "0 8px 22px -8px color-mix(in oklab, var(--accent) 80%, transparent)",
                  }}
                >
                  Live
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              )}
              {githubHref && (
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} on GitHub`}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors hover:bg-[color:var(--rule)]"
                  style={{
                    border:
                      "1px solid color-mix(in oklab, var(--foreground) 16%, transparent)",
                  }}
                >
                  <Github size={14} aria-hidden /> Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Field({
  label,
  value,
  accent = false,
}: {
  label: string;
  value?: string;
  accent?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="text-[14.5px] leading-[1.65]">
      <div
        className="mb-1.5 text-[10.5px] uppercase tracking-[0.22em]"
        style={{
          color: accent
            ? "var(--accent)"
            : "color-mix(in oklab, var(--foreground) 55%, transparent)",
        }}
      >
        {label}
      </div>
      <div className="text-[color:var(--foreground)]">
        <MaybeTodo value={value} />
      </div>
    </div>
  );
}

function Counter({
  projects,
  progress,
}: {
  projects: Project[];
  progress: MotionValue<number>;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center">
      <div
        className="flex items-center gap-3 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] backdrop-blur-sm"
        style={{
          background:
            "color-mix(in oklab, var(--background) 70%, transparent)",
          border:
            "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)",
          color: "color-mix(in oklab, var(--foreground) 70%, transparent)",
        }}
      >
        <span>scroll</span>
        <div className="flex gap-1">
          {projects.map((_, i) => (
            <CounterDot
              key={i}
              index={i}
              total={projects.length}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CounterDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / total;
  const center = index * segment + segment / 2;
  const width = useTransform(
    progress,
    [center - segment * 0.5, center, center + segment * 0.5],
    ["8px", "24px", "8px"],
  );
  const opacity = useTransform(
    progress,
    [center - segment * 0.5, center, center + segment * 0.5],
    [0.35, 1, 0.35],
  );
  return (
    <motion.span
      style={{ width, opacity, background: "var(--foreground)" }}
      className="block h-[3px] rounded-full"
    />
  );
}
