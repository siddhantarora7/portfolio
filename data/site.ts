// ---------------------------------------------------------------------------
// Everything on the home page comes from this file.
// Edit freely; types keep the shape honest.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Siddhant Arora",
  /** Shown lowercase in the hero. */
  display: "siddhant arora",
  location: "Calgary",
  bio: "Junior at Westmount Charter School in Calgary. I do AI/ML research at Algoverse, and I build things for math and CS students.",
  human: "Off-screen, catch me playing soccer, competitive trivia, or listening to K-pop.",
  /** Proof points shown in the hero. Keep them short and true. */
  facts: ["usamo.guide: 3M+ visits, 50K+ users", "Codeforces Expert", "USACO Gold", "AIME 2027 qualifier"],
  /** Used for metadata and OG images. */
  summary:
    "High school researcher and builder in Calgary. AI/ML research at Algoverse; co-founder of usamo.guide.",
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
// Research. Details stay off the site until the paper is public.
// ---------------------------------------------------------------------------

export type Research = Row & { org: string; blurb: string };

export const research: Research[] = [
  {
    name: "AI/ML research",
    org: "Algoverse AI Research",
    logo: "/logos/algoverse.png",
    role: "AI/ML Researcher, Algoverse",
    period: "Jun 2026 – now",
    blurb:
      "I'm co-authoring a paper on language models at Algoverse. I'm keeping the specifics off this site until it's public; I'll post it here once it's out.",
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
    site: { label: "ontariocmc.ca", href: "https://www.ontariocmc.ca" },
    shots: [
      { src: "/work/ocmc/1.jpg", alt: "OCMC home page", caption: "Workshops and contests led by student mathematicians." },
      { src: "/work/ocmc/2.jpg", alt: "OCMC mission section" },
    ],
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
  { name: "Codeforces Expert", detail: "1,000+ problems", href: "https://codeforces.com/profile/beansQ", logo: "/logos/codeforces.svg" },
  { name: "AIME qualifier", detail: "2027", mark: "AIME" },
  { name: "USACO Gold", detail: "2024 – 2026", logo: "/logos/usaco-clear.png" },
  { name: "CCC Group III", detail: "Top 3% nationally", logo: "/logos/cemc-clear.png" },
  { name: "AHSMC", detail: "Honourable Mention, top 20 in Alberta", logo: "/logos/uofa.jpeg" },
  { name: "Hack the Change 2026", detail: "Winner, Best Use of Tiger Data (Amble)", href: "/projects/amble", logo: "/logos/hackthechange.png" },
  { name: "CalgaryHacks 2026", detail: "3rd place, Tier 2 (500+ participants)", logo: "/logos/calgaryhacks.png" },
  { name: "Reach for the Top", detail: "1st in Alberta, team", logo: "/logos/reach-for-the-top.png" },
];
