export const TODO_PREFIX = "TODO:";
export const TODO = (s: string): string => `${TODO_PREFIX} ${s}`;
export const isTodo = (s: string | undefined): boolean =>
  typeof s === "string" && s.trimStart().startsWith(TODO_PREFIX);

export type Entity = {
  name: string;
  logo?: string;
  href?: string;
};

export type CurrentEntry = {
  role?: string;
  entity: Entity;
  period?: string;
  subBullets?: string[];
};

export type Award = {
  name: string;
  org?: Entity;
  result?: string;
};

export type ProjectPreview = {
  slug: string;
  name: string;
  logo: string;
  shortDescription: string;
  result?: string;
};

export type Project = ProjectPreview & {
  techStack: string[];
  period: string;
  links?: { live?: string; github?: string; demo?: string };
  what: string;
  why: string;
  how: string;
  results?: string;
};

export const hero = {
  name: "Siddhant Arora",
  age: 16,
  bio: "high school student in calgary building tools for math competitors and writing software",
};

export const currently: CurrentEntry[] = [
  {
    role: "Software Engineering Intern",
    entity: {
      name: "Verve Consulting",
      logo: "/logos/verve.png",
      href: TODO("verve url"),
    },
    period: "Feb 2026 – present",
  },
  {
    role: "Co-founder",
    entity: {
      name: "usamo.guide",
      logo: "/logos/usamoguide.png",
      href: "https://usamo.guide",
    },
    period: "Jan 2026 – present",
  },
  {
    role: "Grade 10",
    entity: {
      name: "SCHOOL_NAME_TODO",
      logo: "/logos/school.png",
    },
    period: "96 average — taking AP Calc BC + AP CSP",
    subBullets: ["incoming president of Math Club and Coding Club"],
  },
];

export const awards: Award[] = [
  {
    name: "USACO Bronze",
    org: { name: "USACO", logo: "/logos/usaco.png" },
  },
  {
    name: "CCC Senior",
    org: { name: "CEMC", logo: "/logos/cemc.png" },
  },
  {
    name: "AMC 10",
    org: { name: "MAA", logo: "/logos/maa.png" },
    result: "Top 10%",
  },
  {
    name: "AHSMC II",
    org: { name: "AHSMC", logo: "/logos/ahsmc.png" },
    result: "Honorable Mention",
  },
  { name: "Calgary Top 3% (Group III)" },
  {
    name: "CalgaryHacks Tier 2",
    org: { name: "CalgaryHacks", logo: "/logos/calgaryhacks.png" },
    result: "3rd Place",
  },
];

export const projects: Project[] = [
  {
    slug: "glide",
    name: "Glide",
    logo: "/logos/glide.png",
    shortDescription: "AI writing augmentation tool with ghost-text predictions",
    techStack: ["Next.js", "TypeScript", "Groq"],
    period: "2025",
    links: {
      live: TODO("glide live url"),
      github: TODO("glide github url"),
    },
    what: TODO("what is Glide — 1 short paragraph"),
    why: TODO("why you built Glide — 1 short paragraph"),
    how: TODO("how Glide works — 1 short paragraph"),
  },
  {
    slug: "spinfilter",
    name: "SpinFilter",
    logo: "/logos/spinfilter.png",
    shortDescription: "ML misinformation detection",
    result: "3rd at CalgaryHacks",
    techStack: ["Python", "PyTorch", "Next.js"],
    period: "2025",
    links: { github: TODO("spinfilter github url") },
    what: TODO("what is SpinFilter"),
    why: TODO("why you built SpinFilter"),
    how: TODO("how SpinFilter works"),
    results: "3rd Place at CalgaryHacks Tier 2",
  },
  {
    slug: "usamo-guide",
    name: "usamo.guide",
    logo: "/logos/usamoguide.png",
    shortDescription: "free math competition resource platform",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    period: "2026",
    links: {
      live: "https://usamo.guide",
      github: TODO("usamo.guide github url"),
    },
    what: TODO("what is usamo.guide"),
    why: TODO("why you built usamo.guide"),
    how: TODO("how usamo.guide works"),
  },
];

export const contact = {
  email: TODO("siddhant's email"),
  github: TODO("siddhant's github username"),
  linkedin: TODO("siddhant's linkedin url"),
  twitter: "",
  instagram: "",
};
