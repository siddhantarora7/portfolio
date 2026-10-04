import { TODO } from "./todo";

// ---------------------------------------------------------------------------
// Everything on the home page comes from this file.
// Edit freely; types keep the shape honest.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Siddhant Arora",
  /** Shown lowercase in the hero. */
  display: "siddhant arora",
  location: "Calgary",
  bio: "Junior at Westmount Charter School in Calgary. I research how reasoning models notice (or fail to notice) their own mistakes, and I build things for math and CS students.",
  human: "Off-screen, catch me playing soccer, competitive trivia, or listening to K-pop.",
  /** Three proof points shown in the hero. Keep them short and true. */
  facts: ["usamo.guide: 3M+ visits, 50K+ users", "Codeforces Expert", "USACO Gold"],
  /** Used for metadata and OG images. */
  summary:
    "High school researcher and builder in Calgary. Reasoning-model research at Algoverse; co-founder of usamo.guide.",
};

export const links = {
  github: "https://github.com/siddhantarora7",
  linkedin: "https://ca.linkedin.com/in/siddhant-arora-017023400",
  email: "siddaroraleo@gmail.com",
  resume: "/resume.pdf",
  codeforces: "https://codeforces.com/profile/beansQ",
};

export type Row = {
  name: string;
  role?: string;
  period?: string;
  /** One line under the name. Keep it to facts. */
  note?: string;
  href?: string;
  /** Path under /public. Missing logos fall back to a lettered tile. */
  logo?: string;
  /** Letter for the fallback tile when there's no logo. */
  mark?: string;
};

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------

export type ResearchPoint = { label: string; auroc: number; approx?: boolean };

export type Research = Row & {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  org: string;
  model: string;
  dataset: string;
  /** Read out word by word as you scroll on the home page. */
  oneBreath: string;
  findings: string[];
  contributions: string[];
  methods: string[];
  venue: string;
  /** The headline comparison, read off a single context length. */
  comparison: { atTokens: number; points: ResearchPoint[]; chance: number };
  /**
   * Full curve for the detail page. Leave as TODO until you have the data;
   * then replace with rows like { tokens: 512, probe: 0.52, sampling: 0.61 }.
   */
  curve: { tokens: number; probe: number; sampling: number }[] | string;
};

export const research: Research[] = [
  {
    slug: "recoverability",
    name: "From Correctness to Recoverability",
    title: "From Correctness to Recoverability",
    subtitle:
      "Rethinking what hidden-state probes measure in chain-of-thought reasoning",
    org: "Algoverse AI Research",
    role: "AI/ML Researcher, Algoverse",
    period: "Jun 2026 – now",
    status: "Paper in progress",
    href: "/research/recoverability",
    model: "DeepSeek-R1-Distill-Qwen-1.5B",
    dataset: "MATH-500, levels 3–5",
    oneBreath:
      "Early hidden-state probes that seem to predict whether a reasoning trace ends correctly mostly track how hard the problem is and how long the trace runs. Sampling continuations from the same prefix predicts the outcome far better, and many traces that end wrong were still recoverable mid-reasoning.",
    findings: [
      "Early hidden-state correctness probes largely track problem difficulty and trace length, not correctness itself.",
      "Continuation sampling from the same prefixes predicts eventual correctness far better than the probes.",
      "Many traces that end wrong are still recoverable partway through the reasoning.",
    ],
    contributions: [
      "Designed the experiments",
      "Ran training and ablations",
      "Built the evaluation pipeline",
    ],
    methods: [
      "Recoverability metrics",
      "Tree-based and logistic-regression probes",
      "Error injection",
    ],
    venue:
      "Co-authoring a technical paper we're aiming to submit to AAAI and ICLR conferences and workshops.",
    comparison: {
      atTokens: 4096,
      chance: 0.5,
      points: [
        { label: "Continuation sampling", auroc: 0.81, approx: true },
        { label: "Hidden-state probe", auroc: 0.55, approx: true },
      ],
    },
    curve: TODO("AUROC vs. tokens for probe and continuation sampling"),
  },
];

// ---------------------------------------------------------------------------
// Work
// ---------------------------------------------------------------------------

export const work: Row[] = [
  {
    name: "usamo.guide",
    role: "Co-founder & COO",
    period: "Mar 2026 – now",
    href: "https://www.usamoguide.com",
    logo: "/logos/usamoguide.png",
    note: "Free olympiad math platform: 50+ modules from AMC 8 to USAMO, a 40+ person team, and 3M+ visits and 50K+ users in under two months. I built the MDX content pipeline, problem database, progress tracking, and auth.",
  },
  {
    name: "Olympiad4Everyone",
    mark: "O4",
    role: "Co-founder",
    period: "Aug 2026 – now",
    href: "https://olympiad4everyone.com",
    note: "A free, proctored online math olympiad by USAMO Guide with 1k+ competitors. Thanksgiving Edition 1 runs Nov 7–21, 2026. Proceeds pay AMC fees for schools that can't, and a team of AIME, USAMO, and USAJMO qualifiers writes and grades the problems.",
  },
  {
    name: "CodeTheCure",
    mark: "CC",
    role: "Software Developer",
    period: "Mar 2026 – now",
    note: "AI/ML features with PyTorch and Hugging Face for a cancer-research startup with 5k+ users.",
  },
  {
    name: "International CodeTheCure Hackathon",
    mark: "CC",
    role: "Organizer",
    period: "Oct – Nov 2026",
    href: TODO("hackathon website URL"),
    note: "A free, virtual, cancer-focused hackathon for high schoolers: ~100 registrants from ~20 countries so far, $1k+ in prizes, and sponsors including MIT THINK and n8n.",
  },
  {
    name: "OCMC",
    mark: "OC",
    role: "Member of Technical Staff",
    period: "Jun 2026 – now",
    note: "Computer-vision pipelines that automate contest grading, plus Next.js contest delivery and registration for 500+ Ontario students.",
  },
];

/** Shown compactly, lower in the list. */
export const alsoWork: Row[] = [
  {
    name: "Math Attack Society",
    role: "Executive, Security & IT",
    period: "Aug 2026 – now",
    note: "~150 contest participants, ~$1k raised",
  },
  {
    name: "Alpine Reasoning Challenge",
    role: "Executive",
    period: TODO("ARC dates"),
    note: "~120 contest participants",
  },
  {
    name: "Westmount Math Club",
    role: "President",
    period: "2026 – now",
  },
  {
    name: "Verve Consulting",
    role: "Software Developer & Consultant",
    period: "Feb 2026 – now",
    href: "https://createwithverve.com/",
    logo: "/logos/verve.png",
  },
];

// ---------------------------------------------------------------------------
// Highlights
// ---------------------------------------------------------------------------

export type Highlight = { name: string; detail: string; href?: string };

export const highlights: Highlight[] = [
  {
    name: "Codeforces Expert",
    detail: "1,000+ problems",
    href: "https://codeforces.com/profile/beansQ",
  },
  { name: "USACO Gold", detail: "2024 – 2026" },
  { name: "CCC Group III", detail: "Top 3% nationally" },
  { name: "AHSMC", detail: "Honourable Mention, top 20 in Alberta" },
  { name: "CalgaryHacks 2026", detail: "3rd place, Tier 2 (500+ participants)" },
  { name: "Reach for the Top", detail: "1st in Alberta, team" },
];
