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
  githubUser: "siddhantarora7",
  linkedin: "https://ca.linkedin.com/in/siddhant-arora-017023400",
  email: "siddaroraleo@gmail.com",
  resume: "/resume.pdf",
  codeforces: "https://codeforces.com/profile/beansQ",
};

export type Shot = { src: string; alt: string; caption?: string; ratio?: string };

export type Row = {
  name: string;
  role?: string;
  period?: string;
  /** One line under the name. Keep it to facts. */
  note?: string;
  href?: string;
  /** Path under /public. Missing logos fall back to a lettered tile. */
  logo?: string;
  /** Letters for the fallback tile when there's no logo. */
  mark?: string;
};

// ---------------------------------------------------------------------------
// Research
// ---------------------------------------------------------------------------

export type CeilingPoint = { tokens: number; auroc: number; lo: number; hi: number };
export type ProbePoint = { tokens: number; auroc: number };

export type Research = Row & {
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  org: string;
  model: string;
  dataset: string;
  /** Read out word by word as you scroll. */
  oneBreath: string;
  findings: string[];
  contributions: string[];
  methods: string[];
  venue: string;
  /**
   * The figure. Only the parts that carry the argument:
   * the recoverability ceiling (with its 95% CI), the probe on the same
   * prefixes, the strict-sweep probe, and the last-token comparison.
   */
  chart: {
    ceiling: CeilingPoint[];
    probeSame: ProbePoint[];
    probeStrict: ProbePoint[];
    gaps: { tokens: number; gap: number; lo: number; hi: number }[];
    lastToken: { probe: number; length: number; diff: number; lo: number; hi: number };
    notes: string[];
  };
};

export const research: Research[] = [
  {
    slug: "recoverability",
    name: "From Correctness to Recoverability",
    title: "From Correctness to Recoverability",
    subtitle: "Rethinking what hidden-state probes measure in chain-of-thought reasoning",
    org: "Algoverse AI Research",
    role: "AI/ML Researcher, Algoverse",
    period: "Jun 2026 – now",
    status: "Paper in progress",
    href: "/research/recoverability",
    model: "DeepSeek-R1-Distill-Qwen-1.5B",
    dataset: "MATH-500, levels 3–5",
    oneBreath:
      "Hidden-state probes look like they can tell whether a reasoning trace will end correctly. Within a single problem they sit at chance, and at the last token they do no better than the trace's length. Re-rolling the same prefix does far better, and shows that many traces that end wrong were still recoverable mid-reasoning.",
    findings: [
      "Within a problem, probes can't tell a trace that will end right from one that will end wrong. Across 2,202 traces from 106 mixed-outcome problems, every 95% interval from 128 to 4,096 tokens contains 0.5.",
      "Re-rolling 8 continuations from the same prefix predicts the outcome far better: 0.63 AUROC at 512 tokens, rising to 0.81 at 4,096. That's a gap of +0.26 over the probe on the same prefixes.",
      "At the last token the probe scores 0.809, but trace length alone scores 0.787, and the difference isn't significant. The probe mostly reads out difficulty.",
    ],
    contributions: ["Designed the experiments", "Ran training and ablations", "Built the evaluation pipeline"],
    methods: [
      "Recoverability metrics",
      "Logistic-regression and gradient-boosted probes",
      "Text baselines (length, TF-IDF)",
      "Error injection",
    ],
    venue:
      "Co-authoring a technical paper we're aiming to submit to AAAI and ICLR conferences and workshops. These are working numbers and may change before the paper is out.",
    chart: {
      ceiling: [
        { tokens: 512, auroc: 0.626, lo: 0.56, hi: 0.69 },
        { tokens: 2048, auroc: 0.655, lo: 0.58, hi: 0.72 },
        { tokens: 4096, auroc: 0.811, lo: 0.76, hi: 0.86 },
      ],
      probeSame: [
        { tokens: 512, auroc: 0.5 },
        { tokens: 2048, auroc: 0.53 },
        { tokens: 4096, auroc: 0.55 },
      ],
      probeStrict: [
        { tokens: 128, auroc: 0.549 },
        { tokens: 256, auroc: 0.519 },
        { tokens: 512, auroc: 0.487 },
        { tokens: 1024, auroc: 0.547 },
        { tokens: 2048, auroc: 0.495 },
        { tokens: 4096, auroc: 0.498 },
      ],
      gaps: [
        { tokens: 512, gap: 0.13, lo: 0.03, hi: 0.21 },
        { tokens: 4096, gap: 0.26, lo: 0.18, hi: 0.34 },
      ],
      lastToken: { probe: 0.809, length: 0.787, diff: 0.022, lo: -0.004, hi: 0.048 },
      notes: [
        "Recoverability: 448 traces, 88 problems, 8 re-rolls per prefix, scored by 1 − r̂. It's a lower bound, since 8 re-rolls leave 10–20% of pairs tied.",
        "Strict sweep: 2,202 traces, 106 mixed-outcome problems, nested cross-validation, within-problem.",
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Work. Entries with a `slug` get their own page at /work/<slug>.
// ---------------------------------------------------------------------------

export type WorkEntry = Row & {
  slug: string;
  /** Short paragraphs for the detail page. */
  about: string[];
  shots?: Shot[];
  site?: { label: string; href: string };
  extraLinks?: { label: string; href: string }[];
  sponsors?: { tier: string; names: string[] }[];
  /** A sub-project shown as its own section on the detail page. */
  sub?: {
    id: string;
    title: string;
    period: string;
    about: string[];
    shots?: Shot[];
    sponsors?: { tier: string; names: string[] }[];
  };
};

export const work: WorkEntry[] = [
  {
    slug: "usamo-guide",
    name: "usamo.guide",
    role: "Co-founder & COO",
    period: "Mar 2026 – now",
    logo: "/logos/usamoguide.png",
    note: "Free olympiad math platform: 50+ modules from AMC 8 to USAMO, a 40+ person team, and 3M+ visits and 50K+ users in under two months.",
    site: { label: "usamoguide.com", href: "https://www.usamoguide.com" },
    extraLinks: [{ label: "source on GitHub", href: "https://github.com/usamoguide/usamo-guide" }],
    about: [
      "usamo.guide is a free, structured path through olympiad math, from AMC 8 to USAMO: 50+ modules, curated resources, problem sets, and progress tracking.",
      "I co-founded it and run operations as COO, leading a 40+ person team. It grew to 3M+ visits and 50K+ registered users in under two months, mostly through SEO and outreach.",
      "On the engineering side I built the MDX content pipeline, the tiered problem database, progress tracking, and auth, in Gatsby and React.",
    ],
    shots: [
      { src: "/work/usamo-guide/1.jpg", alt: "usamo.guide home page", caption: "A structured pathway for learning competition math." },
      { src: "/work/usamo-guide/2.jpg", alt: "Curated resources and problem sets on usamo.guide", caption: "Curated resources and problem sets, tagged by contest and difficulty." },
      { src: "/work/usamo-guide/3.jpg", alt: "usamo.guide progress tracking dashboard", caption: "Progress tracking across modules." },
    ],
  },
  {
    slug: "olympiad4everyone",
    name: "Olympiad4Everyone",
    role: "Co-founder",
    period: "Aug 2026 – now",
    logo: "/logos/olympiad4everyone.svg",
    note: "A free, proctored online math olympiad by USAMO Guide with 1k+ competitors. Proceeds pay AMC fees for schools that can't.",
    site: { label: "olympiad4everyone.com", href: "https://www.olympiad4everyone.com" },
    about: [
      "Olympiad4Everyone is a free, proctored online math olympiad run by USAMO Guide, with 1k+ competitors.",
      "For a lot of students, the AMC is the first olympiad they could sit, but only if their school pays to offer it. We raise money to cover the AMC at schools that can't.",
      "A team of AIME, USAMO, and USAJMO qualifiers writes the problems and handles grading and awards. Thanksgiving Edition 1 runs Nov 7–21, 2026.",
    ],
    shots: [
      { src: "/work/olympiad4everyone/1.jpg", alt: "Olympiad4Everyone landing page", caption: "Olympiad math belongs to everyone." },
      { src: "/work/olympiad4everyone/2.jpg", alt: "Olympiad4Everyone mission section" },
      { src: "/work/olympiad4everyone/3.jpg", alt: "Section explaining that Olympiad4Everyone pays for the AMC at schools that can't", caption: "Paying for the AMC at schools that can't." },
    ],
  },
  {
    slug: "codethecure",
    name: "CodeTheCure",
    role: "Software Developer & Hackathon Organizer",
    period: "Mar 2026 – now",
    logo: "/logos/codethecure.png",
    note: "AI/ML features for a cancer-research startup with 5k+ users, and co-organizing its international hackathon (Oct 10–12, 2026).",
    site: { label: "codethecure.app", href: "https://www.codethecure.app" },
    extraLinks: [{ label: "codethecure.app/hackathon", href: "https://www.codethecure.app/hackathon" }],
    about: [
      "CodeTheCure builds free tools that help people with cancer understand their care in plain language.",
      "I build AI/ML features with PyTorch, Hugging Face, and external APIs for its 5k+ users, working on UI/UX and core functionality alongside high school researchers with lab experience at Yale, Stanford, and MIT.",
    ],
    shots: [
      { src: "/work/codethecure/1.jpg", alt: "CodeTheCure home page", caption: "Plain-language answers about cancer, free for anyone." },
      { src: "/work/codethecure/2.jpg", alt: "CodeTheCure AI answering questions in plain language" },
    ],
    sub: {
      id: "hackathon",
      title: "The International CodeTheCure Hackathon",
      period: "Oct 10 – 12, 2026",
      about: [
        "A free, virtual weekend hackathon where high schoolers build software for people with cancer. Any level of experience is welcome.",
        "I co-organize it. So far ~100 students from ~20 countries have registered. Prizes include $500 for first place, n8n Cloud Pro licenses, CodeCrafters VIP for the top three teams, and internships at CodeTheCure.",
      ],
      shots: [
        { src: "/work/codethecure-hackathon/1.jpg", alt: "The hackathon's pixel-art reception page", caption: "The site is a pixel-art hospital you walk through." },
        { src: "/work/codethecure-hackathon/3.jpg", alt: "How to join the hackathon", caption: "Teams of 1–4, no experience needed." },
      ],
      sponsors: [
        { tier: "Sponsors", names: ["n8n", "CodeCrafters", "Miro", "BSD Education", ".xyz"] },
        { tier: "Community partners", names: ["MIT THINK", "Technica"] },
      ],
    },
  },
  {
    slug: "ocmc",
    name: "OCMC",
    role: "Member of Technical Staff",
    period: "Jun 2026 – now",
    logo: "/logos/ocmc.png",
    note: "Computer-vision pipelines that automate contest grading, plus Next.js contest delivery and registration for 500+ Ontario students.",
    about: [
      "The Ontario Competitive Mathematics Committee runs math contests for high school students across Ontario.",
      "I build computer-vision pipelines that automate contest grading and cut manual marking time, and Next.js features for contest delivery and registration used by 500+ students.",
    ],
  },
];

export const getWork = (slug: string) => work.find((w) => w.slug === slug);

/** Shown compactly, lower in the list. */
export const alsoWork: Row[] = [
  {
    name: "Math Attack Society",
    role: "Executive, Security & IT",
    period: "Aug 2026 – now",
    href: "https://www.mathattacksociety.org/",
    logo: "/logos/math-attack.png",
  },
  { name: "Alpine Reasoning Challenge", role: "Executive", href: "https://archallenge.org/", logo: "/logos/arc.png" },
  { name: "Westmount Math Club", role: "President", period: "2026 – now", logo: "/logos/westmount-clear.png" },
  {
    name: "Verve Consulting",
    role: "Software Developer & Consultant",
    period: "Feb 2026 – now",
    href: "https://createwithverve.com/",
    logo: "/logos/verve.svg",
  },
];

// ---------------------------------------------------------------------------
// Coming up: shown as countdowns near the top of the home page.
// Past events hide themselves.
// ---------------------------------------------------------------------------

export type Event = { name: string; start: string; end: string; href: string };

export const events: Event[] = [
  { name: "CodeTheCure Hackathon", start: "2026-10-10", end: "2026-10-12", href: "/work/codethecure#hackathon" },
  { name: "Olympiad4Everyone, Edition 1", start: "2026-11-07", end: "2026-11-21", href: "/work/olympiad4everyone" },
];

// ---------------------------------------------------------------------------
// Highlights
// ---------------------------------------------------------------------------

export type Highlight = { name: string; detail: string; href?: string; logo?: string; mark?: string };

export const highlights: Highlight[] = [
  { name: "Codeforces Expert", detail: "1,000+ problems", href: "https://codeforces.com/profile/beansQ", mark: "CF" },
  { name: "USACO Gold", detail: "2024 – 2026", logo: "/logos/usaco-clear.png" },
  { name: "CCC Group III", detail: "Top 3% nationally", logo: "/logos/cemc-clear.png" },
  { name: "AHSMC", detail: "Honourable Mention, top 20 in Alberta", logo: "/logos/uofa.jpeg" },
  { name: "CalgaryHacks 2026", detail: "3rd place, Tier 2 (500+ participants)", logo: "/logos/calgaryhacks.png" },
  { name: "Reach for the Top", detail: "1st in Alberta, team", mark: "RT" },
];

// Unconfirmed bits still waiting on the owner.
export const pending = {
  ocmcSite: TODO("OCMC website URL"),
};
