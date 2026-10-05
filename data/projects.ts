import type { Shot } from "./site";
import { TODO } from "./todo";

// ---------------------------------------------------------------------------
// Projects. Each one gets a page at /projects/<slug>.
// Images live in /public/projects/<slug>/.
// ---------------------------------------------------------------------------

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  logo?: string;
  mark?: string;
  status?: string;
  /** Short badge on the card, e.g. an award. */
  result?: string;
  credit?: string;
  links: { github?: string; live?: string; demo?: string };
  /** What it is, in a few plain sentences. */
  about: string[];
  /** Technical details. */
  how: string[];
  stack: string[];
  results: string[];
  hero?: Shot;
  gallery: Shot[];
  /** A drawn visual instead of (or alongside) screenshots. */
  visual?: "cursive-demo" | "housing-chart";
};

/** Test-set results from the housing net's README, in the order they were run. */
export const housingRuns = [
  { label: "baseline", note: "MSE, 200 epochs", r2Dollars: 0.194, r2Log: null as number | null },
  { label: "Huber + Adam", note: "new encoding", r2Dollars: 0.724, r2Log: 0.986 },
  { label: "top 500 out", note: "priciest removed", r2Dollars: 0.765, r2Log: 0.987 },
  { label: "top 1,000 out", note: "priciest removed", r2Dollars: 0.867, r2Log: 0.987 },
];

export const projects: Project[] = [
  {
    slug: "velocity",
    name: "Velocity",
    tagline: "Clocks how fast you kick a soccer ball, from a phone video.",
    year: "2026",
    links: { github: "https://github.com/siddhantarora7/velocity" },
    about: [
      "Upload a clip of a kick, tap two points a known distance apart, and Velocity tracks the ball frame by frame to report its real-world speed. Log in and it keeps a history of your shots, so you can watch your striking improve.",
      "Built for myself and for Hack Club Horizons.",
    ],
    how: [
      "YOLOv8n detects the ball in every frame. Missed frames are recorded as gaps rather than dropped, so later stages know what's missing.",
      "Kick detection scans for a sustained speed spike above an adaptive median threshold and returns the launch window.",
      "Two-point calibration converts pixels to metres. Top speed is measured inside the kick window, and launch speed comes from a trajectory fit.",
      "A FastAPI backend runs analysis as background jobs that the React frontend polls. Accounts use bcrypt and JWTs, and shots are stored in Postgres.",
      "The backend runs in Docker on Hugging Face Spaces; the frontend is on Vercel.",
    ],
    stack: ["YOLOv8n", "OpenCV", "FastAPI", "React", "TypeScript", "Postgres", "Docker"],
    results: ["A working end-to-end app: upload, calibrate, measure, and keep a history of every kick."],
    hero: {
      src: "/projects/velocity/shot-3.jpg",
      alt: "Velocity result screen showing a top speed of 41.4 km/h",
      caption: "Strike clocked: top speed, launch speed, and the speed curve over time.",
    },
    gallery: [
      { src: "/projects/velocity/shot-1.jpg", alt: "Velocity upload screen", caption: "Step 1: drop in a video of the kick." },
      { src: "/projects/velocity/shot-2.jpg", alt: "Velocity calibration screen with two points on a ball", caption: "Step 2: set the scale with two points a known distance apart." },
      { src: "/projects/velocity/shot-4.jpg", alt: "Velocity history screen with a personal best", caption: "Your shots, with a personal best." },
    ],
  },
  {
    slug: "spinfilter",
    name: "SpinFilter",
    tagline: "Scores articles, audio, and video for bias on a 1–100 Drama Index.",
    year: "2026",
    logo: "/logos/spinfilter.svg",
    result: "3rd at CalgaryHacks",
    credit: "Built in 24 hours with a team at CalgaryHacks 2026.",
    links: { github: "https://github.com/ThePeeps191/calgary-hacks-2026" },
    about: [
      "Paste a news URL, upload audio, or drop in a YouTube link. SpinFilter flags biased and inflammatory language, scores the piece on a 1–100 Drama Index, and suggests neutral rewrites.",
    ],
    how: [
      "Articles are scraped with Newspaper4k. YouTube audio is downloaded with yt-dlp and transcribed in ~50-second chunks to stay under API limits.",
      "Gemini detects biased language and writes neutral alternatives, shown as an inline diff.",
      "A RoBERTa emotion model, plus counts of power words and absolutist language, produces the Drama Index with an emotion breakdown.",
      "It also looks up the outlet's known bias and finds related coverage through News API. A Flask backend streams results to a React frontend.",
    ],
    stack: ["Flask", "Gemini", "RoBERTa", "Hugging Face", "yt-dlp", "React"],
    results: ["3rd place, CalgaryHacks 2026 Tier 2, out of 500+ participants."],
    hero: {
      src: "/projects/spinfilter/result.jpg",
      alt: "SpinFilter analysing a CNN article: bias score 65 and a Drama Index of 70 with an emotion breakdown",
      caption: "A real run on a CNN article: bias 65, Drama Index 70, mostly anger.",
      ratio: "972 / 1100",
    },
    gallery: [
      { src: "/projects/spinfilter/home.jpg", alt: "SpinFilter home page with URL, audio, and video inputs", caption: "Paste a link, upload audio, or drop in a video." },
      { src: "/projects/spinfilter/audio.jpg", alt: "SpinFilter audio upload tab", caption: "Audio is transcribed in ~50-second chunks before analysis." },
    ],
  },
  {
    slug: "cursive",
    name: "Cursive",
    tagline: "A web text editor that finishes your sentences in ghost text.",
    year: "2026",
    mark: "Cu",
    status: "In development",
    links: { github: "https://github.com/siddhantarora7/Cursive" },
    about: [
      "A writing app where suggestions appear inline, as faint ghost text, while you type.",
    ],
    how: [
      "Completions come from a Groq and Gemini inference chain.",
      "Bring your own key: Cursive runs on the writer's own API key.",
      TODO("anything else worth saying about how Cursive works"),
    ],
    stack: ["Groq", "Gemini", TODO("Cursive's framework")],
    results: [],
    gallery: [],
    visual: "cursive-demo",
  },
  {
    slug: "calgary-housing",
    name: "Calgary housing neural network",
    tagline: "A neural network written from scratch in NumPy that prices Calgary homes.",
    year: "2026",
    logo: "/logos/calgary-housing-nn.svg",
    status: "Technical report in progress",
    result: "R² 0.986 (log)",
    credit: "Built with Danny Wang.",
    links: { github: "https://github.com/ThePeeps191/calgary-housing-nn" },
    about: [
      "A property-price model trained on the City of Calgary's open assessment data, with every layer, loss, and optimizer written by hand in NumPy. No PyTorch, no Keras.",
    ],
    how: [
      "An 86 → 256 → 128 → 64 → 1 multilayer perceptron with ReLU and a linear output, 63,489 parameters in all.",
      "Inputs: four numeric features (year built, property type, log land size, community average), plus one-hot property use and multi-hot zoning codes.",
      "Huber loss (δ = 0.1) in log₁₀ dollars, Adam with the learning rate halved every 30 epochs, He initialization, batch size 512, 120 epochs.",
      "The output bias starts at the mean log-price, so the network only has to learn deviations from it.",
    ],
    stack: ["Python", "NumPy", "Pandas", "Flask"],
    results: [
      "R² of 0.986 in log space on held-out data, with a median absolute percentage error of about 6%.",
      "With the 1,000 most expensive properties excluded: R² 0.87 in dollars and about $66k mean absolute error.",
    ],
    gallery: [],
    visual: "housing-chart",
  },
  {
    slug: "portfolio",
    name: "This website",
    tagline: "The site you're on: frosted glass, one matcha glow, and a mochi with a jetpack.",
    year: "2026",
    logo: "/logos/mochi.svg",
    links: { github: "https://github.com/siddhantarora7/portfolio" },
    about: [
      "A personal site that tries to read clearly in 20 seconds and still be fun to poke at. Everything you see is data-driven, so it stays current without me touching it.",
    ],
    how: [
      "Next.js 16 with the App Router. Every page is prerendered; the home page revalidates daily.",
      "Codeforces and GitHub stats are fetched at build time with rate limiting, cached for a day, and fall back to committed snapshots if an API is down.",
      "Charts are drawn as server-rendered SVG strings, so React never has to hydrate hundreds of nodes.",
      "Mochi is hand-drawn SVG with spring physics: it follows your scroll, tilts with velocity, and can be dragged, thrown, and poked.",
      "The scroll-linked effects are pure CSS scroll timelines; everything respects reduced motion.",
      "The display face is a 62 KB self-hosted subset of Shantell Sans that keeps its informality axis.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "SVG", "Canvas"],
    results: ["Lighthouse 100 for accessibility, best practices, and SEO."],
    hero: { src: "/projects/portfolio/home.jpg", alt: "The home page of this website", caption: "The home page, with mochi parked on the card." },
    gallery: [{ src: "/projects/portfolio/game.jpg", alt: "The jetpack mini-game", caption: "The mini-game: fly mochi up through Codeforces ratings." }],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
