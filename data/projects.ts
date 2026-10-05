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
};

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
    gallery: [],
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
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
