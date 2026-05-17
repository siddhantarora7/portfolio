"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { isTodo, type Project } from "@/data/content";
import { Logo } from "./logo";
import { MaybeTodo } from "./todo";
import { Progress } from "./ui/interfaces-progress";

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
        <Ambience progress={scrollYProgress} />

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

        <ScrollIndicator
          total={projects.length}
          progress={scrollYProgress}
        />
      </div>
    </section>
  );
}

function Ambience({ progress }: { progress: MotionValue<number> }) {
  const haloX = useTransform(progress, [0, 1], ["72%", "28%"]);
  const haloY = useTransform(progress, [0, 1], ["28%", "72%"]);
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
          background: `radial-gradient(circle at var(--hx) var(--hy), color-mix(in oklab, var(--foreground) 14%, transparent), transparent 58%)`,
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
            "linear-gradient(135deg, color-mix(in oklab, var(--foreground) 42%, transparent), color-mix(in oklab, var(--foreground) 10%, transparent) 42%, color-mix(in oklab, var(--foreground) 28%, transparent) 70%, color-mix(in oklab, var(--foreground) 12%, transparent))",
          boxShadow:
            "0 40px 90px -30px rgb(0 0 0 / 0.55), 0 10px 30px -15px rgb(0 0 0 / 0.35)",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[26px] px-8 py-9 sm:px-12 sm:py-12"
          style={{
            background:
              "linear-gradient(155deg, color-mix(in oklab, var(--background) 90%, var(--foreground) 10%), var(--background) 55%, color-mix(in oklab, var(--background) 92%, var(--foreground) 8%))",
          }}
        >
          {/* Top sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, color-mix(in oklab, var(--foreground) 40%, transparent), transparent)",
            }}
          />

          {/* Watermark numeral */}
          <div
            aria-hidden
            className={`pointer-events-none absolute -right-2 -top-6 select-none ${displayFont} font-medium leading-none`}
            style={{
              fontSize: "clamp(140px, 22vw, 280px)",
              color: "color-mix(in oklab, var(--foreground) 8%, transparent)",
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
                style={{ background: "var(--foreground)" }}
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
                "linear-gradient(to right, color-mix(in oklab, var(--foreground) 32%, transparent), color-mix(in oklab, var(--foreground) 8%, transparent) 50%, transparent)",
            }}
          />

          {/* Body — two columns on md+ */}
          <div className="relative grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            <Field label="What" value={project.what} />
            <Field label="Why" value={project.why} />
            <Field label="How" value={project.how} />
            {project.results && <Field label="Results" value={project.results} />}
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
                    background: "var(--foreground)",
                    boxShadow:
                      "0 8px 22px -8px color-mix(in oklab, var(--foreground) 50%, transparent)",
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

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="text-[14.5px] leading-[1.65]">
      <div
        className="mb-1.5 text-[10.5px] uppercase tracking-[0.22em]"
        style={{
          color: "color-mix(in oklab, var(--foreground) 55%, transparent)",
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

function ScrollIndicator({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  const [pct, setPct] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  useMotionValueEvent(progress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    setPct(Math.round(clamped * 100));
    const idx = Math.min(total, Math.max(1, Math.floor(clamped * total) + 1));
    setCurrentIndex(idx);
  });

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-6">
      <div
        className="pointer-events-auto flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-md"
        style={{
          background:
            "color-mix(in oklab, var(--background) 65%, transparent)",
          border:
            "1px solid color-mix(in oklab, var(--foreground) 12%, transparent)",
        }}
      >
        <span
          className="text-[10.5px] uppercase tracking-[0.24em]"
          style={{
            color: "color-mix(in oklab, var(--foreground) 60%, transparent)",
          }}
        >
          scroll
        </span>
        <Progress value={pct} className="h-[3px] w-40 sm:w-56" />
        <span
          className="text-[11px] tabular-nums"
          style={{
            color: "color-mix(in oklab, var(--foreground) 80%, transparent)",
          }}
        >
          <span className="font-medium">
            {String(currentIndex).padStart(2, "0")}
          </span>
          <span
            className="mx-1"
            style={{
              color: "color-mix(in oklab, var(--foreground) 35%, transparent)",
            }}
          >
            /
          </span>
          <span
            style={{
              color: "color-mix(in oklab, var(--foreground) 50%, transparent)",
            }}
          >
            {String(total).padStart(2, "0")}
          </span>
        </span>
      </div>
    </div>
  );
}
