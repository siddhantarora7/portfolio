"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { links } from "@/data/site";
import { MochiArt } from "./mochi-art";

type Msg = { from: "you" | "mochi"; body: ReactNode; id: number };

const L = ({ href, children }: { href: string; children: ReactNode }) =>
  /^https?:|^mailto:/.test(href) ? (
    <a className="link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link className="link" href={href}>
      {children}
    </Link>
  );

type Intent = { id: string; ask: string; match: RegExp; answer: (ctx: Ctx) => ReactNode };
type Ctx = { rating?: number };

const INTENTS: Intent[] = [
  {
    id: "now",
    ask: "what's he working on?",
    match: /\b(now|working|doing|current|lately|busy)\b/i,
    answer: () => (
      <>
        Right now: research at Algoverse on what hidden-state probes really measure in chain-of-thought (paper in
        progress), running <L href="/work/usamo-guide">usamo.guide</L> as co-founder and COO, and getting{" "}
        <L href="/work/olympiad4everyone">Olympiad4Everyone</L>&apos;s first edition ready for Nov 7.
      </>
    ),
  },
  {
    id: "research",
    ask: "the research, in one breath?",
    match: /\b(research|paper|probe|probes|reasoning|algoverse|auroc|llm|model)\b/i,
    answer: () => (
      <>
        Probes on a model&apos;s hidden states look like they predict whether its reasoning will end correctly, but
        within one problem they&apos;re at chance. Re-rolling the same prefix does much better (0.81 vs 0.55 AUROC at
        4,096 tokens). <L href="/research/recoverability">The chart is here.</L>
      </>
    ),
  },
  {
    id: "projects",
    ask: "show me a project",
    match: /\b(project|projects|built|build|made|velocity|spinfilter|cursive|housing)\b/i,
    answer: () => (
      <>
        <L href="/projects/velocity">Velocity</L> clocks a soccer kick from a phone video with YOLOv8n.{" "}
        <L href="/projects/spinfilter">SpinFilter</L> scores media bias and took 3rd at CalgaryHacks 2026. There&apos;s
        also a <L href="/projects/calgary-housing">neural net written from scratch in NumPy</L>.
      </>
    ),
  },
  {
    id: "contests",
    ask: "how good is he at contests?",
    match: /\b(contest|contests|codeforces|usaco|ccc|olympiad|rating|cp|competitive)\b/i,
    answer: (c) => (
      <>
        Codeforces Expert{c.rating ? `, rated ${c.rating}` : ""}, with 1,000+ problems solved. USACO Gold, top 3% in
        CCC Group III, and top 20 in Alberta at AHSMC. <L href="/#codeforces">Live stats are on the home page.</L>
      </>
    ),
  },
  {
    id: "contact",
    ask: "how do i reach him?",
    match: /\b(contact|email|reach|hire|intern|internship|linkedin|resume|cv|talk)\b/i,
    answer: () => (
      <>
        Email is best: <L href={`mailto:${links.email}`}>{links.email}</L>. He&apos;s also on{" "}
        <L href={links.linkedin}>LinkedIn</L>, and here&apos;s his <L href={links.resume}>resume</L>.
      </>
    ),
  },
  {
    id: "fun",
    ask: "what's he like off-screen?",
    match: /\b(fun|hobby|hobbies|soccer|trivia|kpop|k-pop|music|free time|off)\b/i,
    answer: () => (
      <>Soccer, competitive trivia (his Reach for the Top team won Alberta), and a lot of K-pop.</>
    ),
  },
  {
    id: "secrets",
    ask: "any secrets?",
    match: /\b(secret|secrets|easter|egg|hidden|konami)\b/i,
    answer: () => (
      <>
        Maybe. Poke me five times. Drag me and let go. Type <span className="hand">mochi</span> or{" "}
        <span className="hand">matcha</span> anywhere. There&apos;s a game at the bottom, and an old cheat code that
        makes it rain.
      </>
    ),
  },
  {
    id: "who",
    ask: "who are you?",
    match: /\b(who are you|you a bot|are you ai|what are you|chatgpt|gpt|claude)\b/i,
    answer: () => (
      <>
        A small rice cake. I&apos;m a scripted helper, not an AI, so I only know what&apos;s on this site.
      </>
    ),
  },
];

const FALLBACK = () => (
  <>
    Hmm, I&apos;m a small mochi with a short memory. Try one of the questions below, or{" "}
    <L href={`mailto:${links.email}`}>email Siddhant</L>.
  </>
);

export function AskMochi({ rating }: { rating?: number }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "mochi",
      id: 0,
      body: <>Hi! I&apos;m mochi. I know a few things about Siddhant. What do you want to know?</>,
    },
  ]);
  const [text, setText] = useState("");
  const [asked, setAsked] = useState<string[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const list = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onAsk = () => {
      opener.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener("mochi:ask", onAsk);
    return () => window.removeEventListener("mochi:ask", onAsk);
  }, []);

  useEffect(() => {
    if (!open) return;
    input.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        opener.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  function ask(q: string, intent?: Intent) {
    const hit = intent ?? INTENTS.find((i) => i.match.test(q));
    setMsgs((m) => [
      ...m,
      { from: "you", body: q, id: m.length },
      { from: "mochi", body: hit ? hit.answer({ rating }) : FALLBACK(), id: m.length + 1 },
    ]);
    if (hit) setAsked((a) => (a.includes(hit.id) ? a : [...a, hit.id]));
  }

  const suggestions = INTENTS.filter((i) => !asked.includes(i.id)).slice(0, 4);

  return (
    <div className="fixed right-4 bottom-4 z-[57] flex flex-col items-end sm:right-6 sm:bottom-6">
      {open ? (
        <div
          ref={panel}
          role="dialog"
          aria-labelledby={titleId}
          className="glass ask-panel flex max-h-[min(34rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[26px]"
        >
          <div className="flex items-center gap-2.5 border-b border-rule px-4 py-3">
            <MochiArt size={36} mood="happy" jetpack shadow={false} />
            <div className="min-w-0 flex-1">
              <p id={titleId} className="font-display text-[16px] leading-tight font-semibold">
                ask mochi
              </p>
              <p className="text-[12px] text-ink-2">scripted, not an AI. knows the basics.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                opener.current?.focus();
              }}
              className="grid size-8 place-items-center rounded-full text-ink-2 hover:text-ink"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M3 3l8 8M11 3l-8 8" />
              </svg>
            </button>
          </div>

          <div ref={list} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4" aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`msg max-w-[85%] rounded-2xl px-3.5 py-2 text-[14.5px] leading-[1.5] ${
                    m.from === "you" ? "bg-matcha-soft text-matcha-deep" : "bg-[var(--glass-strong)]"
                  }`}
                >
                  {m.body}
                </p>
              </div>
            ))}
          </div>

          {suggestions.length ? (
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => ask(s.ask, s)}
                  className="rounded-full border border-rule bg-[var(--glass-strong)] px-3 py-1 text-[13px] transition-colors hover:border-matcha"
                >
                  {s.ask}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="flex items-center gap-2 border-t border-rule px-3 py-2.5"
            onSubmit={(e) => {
              e.preventDefault();
              const q = text.trim();
              if (!q) return;
              ask(q);
              setText("");
            }}
          >
            <label htmlFor={`${titleId}-q`} className="sr-only">
              Ask mochi a question
            </label>
            <input
              id={`${titleId}-q`}
              ref={input}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="ask about research, projects, contests…"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-[14.5px] outline-none placeholder:text-ink-2"
            />
            <button
              type="submit"
              className="rounded-full bg-matcha-deep px-3.5 py-1.5 text-[13.5px] font-medium text-[var(--ground)] disabled:opacity-40"
              disabled={!text.trim()}
            >
              Ask
            </button>
          </form>
        </div>
      ) : null}

    </div>
  );
}
