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
      name: "usamo.guide",
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
    name: "usamo.guide",
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
    name: "Calgary Housing Price Predictor",
    shortDescription: "MLP built from scratch in NumPy for Calgary property assessments, 0.99 log space R², 0.87 dollar space R²",
    techStack: ["Python", "NumPy", "Pandas", "Flask"],
    period: "2026",
    links: { github: "https://github.com/ThePeeps191/calgary-housing-nn" },
    what: "A neural network that predicts residential property assessments in Calgary, built end-to-end in NumPy with no high-level ML libraries (no Keras, no PyTorch). Co-built on the City of Calgary's open assessment data.",
    why: "We wanted to actually understand backprop, optimizers, and loss functions by writing them ourselves rather than calling .fit() on PyTorch. Calgary's open dataset gave us a real, industry data-set to work against.",
    how: "86-feature input (numerics + sub-property-use one-hots + land-use multi-hots) feeds an 86 → 256 → 128 → 64 → 1 MLP with ReLU activation and a linear output. He init, Huber loss (δ=0.1) in log10 space, Adam Optimization with learning rate halved every 30 epochs, batch size 512, 120 epochs. Layers, optimizer, loss, and training loop are all NumPy under src/nn/.",
    results: "R² = 0.99 in log space, R² = 0.87 in dollar space, Mean Absolute Error ~$66k, median Absolute Percentage Error ~6% on held-out test (after trimming the top 1,000 most expensive properties to remove excessively harmful data).",
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
