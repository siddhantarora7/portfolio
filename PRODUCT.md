# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel (custom domain later). Motion via Framer Motion or GSAP; Lenis only if it does not hurt accessibility. Content lives in typed data / MDX files the owner edits by hand. Minimal dependencies. This is a from-scratch rebuild of the existing Next 14 site in this repo.

## Users

People Siddhant sends the link to, with equal weight between:

- **Research labs and programs** (summer research programs, labs, selective programs): judging rigor, curiosity, and whether he can do real research.
- **Startups** (founders hiring interns): judging whether he ships real products at real scale.

They arrive from a cold email, an application form, or a resume link. They give it about 20 seconds, often on a phone, and should leave thinking "this person ships real things and has taste."

## Product Purpose

A personal portfolio for Siddhant Arora, a junior at Westmount Charter School in Calgary. He researches how reasoning models notice (or fail to notice) their own mistakes, and he builds things for math and CS students. Success means the reader understands who he is, what he has shipped, and how to reach him, fast, and remembers the site.

## Positioning

A high schooler doing actual ML research (hidden-state probes on chain-of-thought) who also co-runs a platform at real scale (usamo.guide), with competitive programming and olympiad credentials. Few portfolios can honestly claim research, product scale, and contest results together.

## Capabilities and Constraints

- Sections: intro, research (top), work, projects (detail pages), highlights/awards, Codeforces showcase, links.
- Research detail page with one chart (owner supplies the data).
- Project detail pages: overview, problem, what was built, the hard part, stack, results, links, and image slots the owner fills later.
- Codeforces showcase uses the public API (`user.info`, `user.rating`, `user.status`, handle `beansQ`), fetched at build time with daily revalidation, under ~1 request per 2 s, cached.
- Required: dark mode, `prefers-reduced-motion`, visible keyboard focus, semantic HTML, Lighthouse 95+ in every category, per-page OG images, sitemap.
- Missing facts render as visible TODOs; never fabricated.

## Brand Commitments

- The visual theme is one general mood, deliberately **not** a metaphor for the owner's work (he rejected subject-literal directions: answer sheets, red-pen margins, reasoning traces).
- Owner-pinned direction (Oct 2026): glassmorphism with retro artifacts, plus a Japanese-stationery *sensibility* (soft, cute, slightly imperfect, still clean). No literal Japanese elements: no kana, kanji, seals, or other overtly Japanese motifs.
- Two type families, few colours, lots of whitespace. Diwen-style restraint in lists; nudgy-style warmth in details. Never reuse nudgy's mascot, fonts, palette, or wording.

## Evidence on Hand

The resume (Google Doc, Oct 2026) is the source of truth for numbers and dates.

**Intro:** Siddhant Arora, junior, Westmount Charter School, Calgary. Human line (owner's draft, final wording open): "Off-screen, catch me playing soccer, competitive trivia, or listening to K-pop."

**Research**
- Algoverse AI Research, AI/ML Researcher, Jun 2026 to present. Paper in progress: "From Correctness to Recoverability: Rethinking What Hidden-State Probes Measure in Chain-of-Thought Reasoning." DeepSeek-R1-Distill-Qwen-1.5B, MATH-500 levels 3–5. Early hidden-state correctness probes largely track difficulty and length. Continuation sampling from the same prefixes predicts eventual correctness far better (AUROC ~0.81 vs ~0.55 at 4,096 tokens). Many wrong-ending traces are still recoverable mid-reasoning. Methods: recoverability metrics, tree-based and logistic-regression probes, error injection. He designed experiments, ran training and ablations, and built the eval pipeline. Status "in progress"; a soft mention of targeting AAAI / ICLR (conferences and workshops) is allowed, with no acceptance claims.

**Work**
- usamo.guide: Co-founder & COO, Mar 2026 to present. Free olympiad math platform, 50+ modules from AMC 8 to USAMO, 40+ person team. 3M+ site visits, 50K+ registered users in under two months (SEO and outreach). Architected the MDX content pipeline, tiered problem database, progress tracking, and auth (Gatsby, React).
- Olympiad4Everyone (olympiad4everyone.com, by USAMO Guide): co-founded, Aug 2026 to present. Title: TODO. International proctored online math olympiad (Thanksgiving Edition 1, Nov 7–21, 2026), 1k+ competitors; proceeds fund AMC fees for schools that can't pay. Team of AIME/USAMO/USAJMO qualifiers writing problems, plus grading and awards.
- CodeTheCure: Software Developer, Mar 2026 to present. AI/ML features (PyTorch, Hugging Face, external APIs) for a cancer-research startup with 5k+ users, built with high school researchers who have lab experience at Yale, Stanford, and MIT.
- International CodeTheCure Hackathon: Organizer (co-ran). Free, virtual, cancer-focused high school hackathon, 3 weeks ending early Nov 2026. ~100 registrants from ~20 countries so far. Sponsors include MIT THINK and n8n; $1k+ in prizes. Full sponsor list and URL: TODO.
- OCMC (Ontario Competitive Mathematics Committee): Member of Technical Staff, Jun 2026 to present. Computer-vision pipelines that automate contest grading; Next.js contest delivery and registration used by 500+ Ontario high school students.
- Math Attack Society: Executive (Security & IT), Aug 2026 to present. Landing pages, sponsor outreach, seminars, 1:1 mentoring; ~150 contest participants, ~$1k raised. (compact)
- Alpine Reasoning Challenge (ARC): Executive, similar role; ~120 contest participants. (compact)
- Verve Consulting: Software Developer & Consultant, Feb 2026 to present. (compact)
- Westmount Math Club: President, 2026 to present.

**Projects**
- Velocity: soccer kick-speed tracker from phone video. YOLOv8n detection, trajectory-fit speed estimation, two-point scale calibration, async jobs, JWT auth (FastAPI, OpenCV, Postgres, Docker). github.com/siddhantarora7/velocity
- SpinFilter: media-bias detection scoring articles, audio, and video on a 1–100 "Drama Index" (RoBERTa, Gemini, Flask, React), built in 24 hours; unbiased rephrasing with diff highlighting, outlet bias lookup, chunked audio transcription. 3rd place, CalgaryHacks 2026 Tier 2 (500+ participants). github.com/ThePeeps191/calgary-hacks-2026
- Cursive: web text editor with ghost-text completion (Groq/Gemini inference chain, bring-your-own-key). Assumed to be the successor/rename of the earlier "Glide" repo (github.com/siddhantarora7/glide). Confirm.
- Calgary housing neural network: from-scratch NumPy MLP on City of Calgary assessment data. R² 0.986 (log) / 0.87 (dollars), ~$66k MAE, ~6% median APE on held-out data. Technical report in progress. github.com/ThePeeps191/calgary-housing-nn

**Highlights**
- Codeforces Expert, 1,000+ problems (handle beansQ)
- USACO Gold (2024–2026)
- CCC Group III, top 3% nationally (Honour Roll)
- AHSMC Honourable Mention, top 20 in Alberta
- CalgaryHacks 2026, 3rd place (Tier 2, 500+ participants)
- Reach for the Top: academic trivia team, 1st in Alberta

**Links:** github.com/siddhantarora7, LinkedIn (ca.linkedin.com/in/siddhant-arora-017023400), siddaroraleo@gmail.com, /resume.pdf.

**Assets:** some logos exist in `public/logos/`. No project screenshots yet (image slots). No research chart data yet (owner will supply). No testimonials, press, or venue acceptance. Do not fabricate any.

## Product Principles

1. **Twenty seconds is the budget.** The name, one human sentence, and the strongest three facts must land before any scroll.
2. **Real over impressive-sounding.** Every number comes from the owner. Unknowns show as TODO, never as filler.
3. **Restraint is the proof of taste.** One idea per section, generous whitespace, and nothing decorative that doesn't carry meaning.
4. **Research and shipping weigh the same.** Neither audience should feel the site was written for the other.
5. **Easy to keep current.** Projects and roles change monthly, so editing content must be trivial.

## Accessibility & Inclusion

WCAG AA contrast in both themes, full keyboard navigation with visible focus, a reduced-motion path for every animation, semantic landmarks, and alt text on every image slot.
