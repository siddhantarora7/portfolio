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
    role: "Chief Operating Officer, Software Developer",
    entity: {
      name: "USAMO Guide",
      logo: "/logos/usamoguide.png",
      href: "https://usamoguide.com",
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
    shortDescription: "usaco.guide for math; 150k+ visits, math competition learning platform",
    techStack: ["Gatsby", "Next.js", "TypeScript", "Supabase", "MDX", "Python"],
    period: "2026",
    links: {
      live: "https://usamoguide.com",
      github: "https://github.com/usamoguide/usamo-guide",
    },
    what: "usaco.guide for math. A structured platform for learning competition math featuring a CodeForces style contest system, 100+ articles on math competitions concepts, and a flair system.",
    why: "Built to foster the next generation of math competitors. Addresses the lack of a comprehensive roadmap in the competition scence and provides structure and a robust roadmap to learn, practice, and compete in competition math",
    how: "Forked and heavily modified from usaco.guide. Built on Gatsby and React with TypeScript and Tailwind, using MDX (JSX-in-Markdown) so 100+ articles can embed interactive components and LaTeX-rendered math alongside prose.",
  },
  {
    slug: "spinfilter",
    name: "SpinFilter",
    logo: "/logos/spinfilter.svg",
    shortDescription: "ML misinformation detection",
    result: "3rd at CalgaryHacks",
    techStack: ["Python", "React", "Flask", "Gemini API"],
    period: "2026",
    links: { github: "https://github.com/ThePeeps191/calgary-hacks-2026" },
    what: "Submission to CalgaryHacks 2026 to fight bias and address misinformation. A React powered web application that discerns the bias level, key points, and rewrites the article in a non-biased fashion using quantitaive techniques, web-scarping, and LLM APIs.",
    why: "Motivated by the growing distortion of media, SpinFilter was built to address exactly that (and the hackathon prompt!). Political biases, tone, and framing techniques were spotted and rewritten.",
    how: "A Flask backend scrapes articles or transcribes audio/YouTube, then runs Gemini-powered bias detection and neutral rewrites. A RoBERTa emotion model plus power-word and absolutist-language counts produce a 1-100 drama index, all streamed to a React frontend.",
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
    what: "A neural net that predicts residential property prices in Calgary, written end-to-end in NumPy, no Keras, no PyTorch, on the City's open assessment data.",
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
    what: "CoPilot for general use. Glide provides a writing imterface powered by AI to streamline a user's thoughts by taking context (such as a school assignment) and reduce friction while writing. Ghost text recommendations, rewrite features, etc. are implemented to enhance the writing experience beyond using Google Docs.",
    why: "It's 2026 and the general writing scene is still Google Docs with no agentic features to streamline work. Glide addresses that problem by providing a glimpse into how a text editor can incorporate AI into its experience and improve user productivity.",
    how: "A Tiptap editor captures debounced keystrokes, extracts a context window around the cursor, and builds a prompt blending that context with a tone profile and any sidebar instructions. Groq (Llama 3) streams completions rendered as Tab-to-accept ghost text, with an LRU cache for instant repeats."
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
