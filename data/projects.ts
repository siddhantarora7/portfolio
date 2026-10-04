import { TODO } from "./todo";

// ---------------------------------------------------------------------------
// Projects. Each one gets an Apple-style page at /projects/<slug>.
//
// Images: drop files in /public/projects/<slug>/ and set `src` below,
// e.g. src: "/projects/velocity/hero.png". Empty slots render a cover.
// ---------------------------------------------------------------------------

export type ProjectImage = { src?: string; alt: string; caption?: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  status?: string;
  /** Short badge on the card, e.g. an award. */
  result?: string;
  links: { github?: string; live?: string; demo?: string };
  problem: string;
  built: string[];
  hardPart: string;
  stack: string[];
  results: string[];
  hero: ProjectImage;
  gallery: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "velocity",
    name: "Velocity",
    tagline: "Measures how fast you kick a soccer ball from a phone video.",
    year: "2026",
    links: { github: "https://github.com/siddhantarora7/velocity" },
    problem: TODO("why kick speed, and who it's for"),
    built: [
      "YOLOv8n finds the ball in every frame of an uploaded clip.",
      "A trajectory fit turns those pixel positions into a speed estimate.",
      "Two-point scale calibration maps pixels to real distances.",
      "A FastAPI backend processes jobs asynchronously, with JWT auth and Postgres, all deployed in Docker.",
    ],
    hardPart: TODO("the hardest problem you hit, e.g. motion blur or calibration"),
    stack: ["YOLOv8n", "OpenCV", "FastAPI", "Postgres", "Docker"],
    results: [TODO("accuracy or test results, if you have them")],
    hero: { alt: "Velocity tracking a kick in a phone video" },
    gallery: [
      { alt: "Ball detections plotted along the fitted trajectory" },
      { alt: "Two-point calibration screen" },
    ],
  },
  {
    slug: "spinfilter",
    name: "SpinFilter",
    tagline: "Scores articles, audio, and video for bias on a 1–100 Drama Index.",
    year: "2026",
    result: "3rd at CalgaryHacks",
    links: { github: "https://github.com/ThePeeps191/calgary-hacks-2026" },
    problem:
      "Political bias, loaded tone, and framing are easy to absorb and hard to spot. We built SpinFilter in 24 hours at CalgaryHacks 2026 to flag them and offer a neutral rewrite.",
    built: [
      "A Flask backend scrapes articles, or transcribes audio and YouTube in chunks.",
      "Gemini detects bias and writes a neutral version, shown as a highlighted diff.",
      "A RoBERTa emotion model plus counts of power words and absolutist language produce the 1–100 Drama Index.",
      "A React frontend streams the results and looks up each outlet's known bias.",
    ],
    hardPart: TODO("the hardest part of building it in 24 hours"),
    stack: ["RoBERTa", "Gemini", "Flask", "React"],
    results: ["3rd place, CalgaryHacks 2026 Tier 2, out of 500+ participants."],
    hero: { alt: "SpinFilter scoring an article on the Drama Index" },
    gallery: [
      { alt: "Neutral rewrite with diff highlighting" },
      { alt: "Outlet bias lookup" },
    ],
  },
  {
    slug: "cursive",
    name: "Cursive",
    tagline: "A web text editor that finishes your sentences in ghost text.",
    year: "2026",
    status: "In development",
    links: { github: TODO("Cursive repo URL (is this the old Glide repo?)") },
    problem: TODO("why you built Cursive"),
    built: [
      "Ghost-text completions appear inline as you type.",
      "Completions come from a Groq and Gemini inference chain.",
      "Bring your own API key.",
    ],
    hardPart: TODO("the hardest part, e.g. latency or prompt context"),
    stack: ["Groq", "Gemini", TODO("framework")],
    results: [TODO("results or usage, if any")],
    hero: { alt: "Cursive suggesting the rest of a sentence in ghost text" },
    gallery: [{ alt: "Bring-your-own-key settings" }],
  },
  {
    slug: "calgary-housing",
    name: "Calgary housing neural network",
    tagline: "A neural network written from scratch in NumPy that prices Calgary homes.",
    year: "2026",
    status: "Technical report in progress",
    result: "R² 0.986 (log)",
    links: { github: "https://github.com/ThePeeps191/calgary-housing-nn" },
    problem:
      "To really understand backpropagation, optimizers, and loss functions by writing them by hand instead of calling .fit(), on a real dataset: the City of Calgary's open property assessments.",
    built: [
      "An 86 → 256 → 128 → 64 → 1 multilayer perceptron with ReLU activations.",
      "Huber loss in log₁₀ space, Adam with learning-rate decay, and He initialization.",
      "Layers, loss, optimizer, and training loop are all plain NumPy. No PyTorch, no Keras.",
    ],
    hardPart: TODO("the hardest part, e.g. debugging gradients by hand"),
    stack: ["Python", "NumPy", "Pandas"],
    results: [
      "R² of 0.986 in log space and 0.87 in dollars on held-out data.",
      "About $66k mean absolute error and about 6% median absolute percentage error.",
    ],
    hero: { alt: "Predicted vs. assessed prices on held-out Calgary homes" },
    gallery: [{ alt: "Training and validation loss curves" }],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
