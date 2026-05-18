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
  logo?: string;
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
  age: 15,
  bio: "15yr old from calgary who spents most afternoons shipping code",
};

export const currently: CurrentEntry[] = [
  {
    role: "Consultant",
    entity: {
      name: "Verve Consulting",
      logo: "/logos/verve.jpeg",
      href: "https://createwithverve.com/",
    },
    period: "Feb 2026 – present",
  },
  {
    role: "Chief Operating Officer, Software Engineer",
    entity: {
      name: "USAMO Guide",
      logo: "/logos/usamoguide.png",
      href: "https://www.usamoguide.com/",
    },
    period: "Jan 2026 – present",
  },
  {
    role: "Grade 10",
    entity: {
      name: "Westmount Charter School",
      logo: "/logos/westmount.png",
    },
    period: "96 average — self-studying AP Calculus BC + AP Computer Science Principles",
    subBullets: ["incoming president of Math Club and Coding Club"],
  },
];

export const awards: Award[] = [
  {
    name: "USACO Gold",
    org: { name: "USACO", logo: "/logos/usaco2.png" },
  },
  {
    name: "CCC Senior Top 1%",
    org: { name: "CEMC", logo: "/logos/cemc2.png" },
  },
  {
    name: "Alberta High School Mathematics Competition",
    org: { name: "AHSMC", logo: "/logos/uofa.jpeg" },
    result: "Honorable Mention",
  },
  {
    name: "CalgaryHacks 3rd Place, Tier II",
    org: { name: "CalgaryHacks", logo: "/logos/calgaryhacks.png" },
    result: "3rd Place",
  },
];

export const projects: Project[] = [
  {
    slug: "usamo-guide",
    name: "USAMO Guide",
    logo: "/logos/usamoguide.png",
    shortDescription: "usaco.guide for math; 100k+ visits, math competition learning platform",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    period: "2026",
    links: {
      live: "https://usamo.guide",
      github: "https://github.com/usamoguide/usamo-guide",
    },
    what: TODO("what is usamo.guide"),
    why: TODO("why you built usamo.guide"),
    how: TODO("how usamo.guide works"),
  },
  {
    slug: "spinfilter",
    name: "SpinFilter",
    logo: "/logos/spinfilter.svg",
    shortDescription: "ML misinformation detection",
    result: "3rd at CalgaryHacks",
    techStack: ["Python", "PyTorch", "Next.js", "React.js"],
    period: "2025",
    links: { github: "https://github.com/ThePeeps191/calgary-hacks-2026" },
    what: TODO("what is SpinFilter"),
    why: TODO("why you built SpinFilter"),
    how: TODO("how SpinFilter works"),
    results: "3rd Place at CalgaryHacks Tier 2",
  },
  {
    slug: "calgary-housing-nn",
    name: "Housing Price Neural Net",
    logo: "/logos/calgary-housing-nn.svg",
    shortDescription: "From-scratch NumPy MLP that prices Calgary homes",
    techStack: ["Python", "NumPy", "Pandas", "Flask"],
    period: "2026",
    links: { github: "https://github.com/ThePeeps191/calgary-housing-nn" },
    what: "A neural net that predicts residential property prices in Calgary, written end-to-end in NumPy — no Keras, no PyTorch — on the City's open assessment data.",
    why: "To actually understand backprop, optimizers, and loss functions by writing them ourselves instead of calling .fit().",
    how: "86 features → 256 → 128 → 64 → 1 MLP, ReLU + linear output. Huber loss in log10 space, Adam with LR decay, He init. Layers, loss, optimizer, and training loop are all NumPy.",
    results: "R² = 0.87 in dollar space, MAE ~$66k, median APE ~6% on the held-out test set.",
  },
  {
    slug: "glide",
    name: "Glide",
    shortDescription: "CoPilot for writing",
    techStack: ["Next.js", "TypeScript", "Groq"],
    period: "2025",
    links: {
      live: TODO("glide live url"),
      github: "https://github.com/siddhantarora7/glide",
    },
    what: TODO("what is Glide — 1 short paragraph"),
    why: TODO("why you built Glide — 1 short paragraph"),
    how: TODO("how Glide works — 1 short paragraph"),
  },
];

export type Contact = {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  instagram?: string;
};

export const contact: Contact = {
  email: "siddaroraleo@gmail.com",
  github: "https://github.com/siddhantarora7",
  linkedin: "https://ca.linkedin.com/in/siddhant-arora-017023400",
};
