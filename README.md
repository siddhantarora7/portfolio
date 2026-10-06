# siddhant arora: portfolio

<<<<<<< HEAD
Personal site. Frosted glass over a matcha and pale-sky field, a small bubble
mascot, film-camera date stamps, and live Codeforces stats.
=======
A clean portfolio site built using Typescript, Tailwind, and various UI frameworks, listing some cool stuff about me :). Made for personal use and Hackclub Horizons.

Contains a home page for quick summaries on projects and experiences, a boot splash animation to provide some aesthetics, rotating globe animation, a projects section with custom scroll animations, dark/light mode functionality, and a resume.

<img width="915" height="912" alt="image" src="https://github.com/user-attachments/assets/593bd936-6d18-4133-9130-b6303b64fa73" />
<img width="920" height="589" alt="image" src="https://github.com/user-attachments/assets/18aeef7d-33f8-44d6-97d6-51b0ff7087d7" />
<img width="1179" height="943" alt="image" src="https://github.com/user-attachments/assets/f0502ef8-1915-4be1-a15c-9443a5c4c2b0" />

## Motivation

It's 2026 and having a comprehensive portfolio site that is both clear and comprehensive is one of the best things one can do to showcase identity. This project was built with the purpose of achieving that, a clean, minimalist portfolio site to give a visual flow to some of my experiences. Enjoy!
>>>>>>> origin/main

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Runtime dependencies are
just `next`, `react`, and `react-dom`; every animation is CSS.

<<<<<<< HEAD
## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
npm run github:snapshot      # refresh the GitHub fallback
```

## Edit content

All content lives in typed files under `data/`:

| File | What's in it |
| --- | --- |
| `data/site.ts` | intro, links, research, work, the compact "also" list, highlights |
| `data/projects.ts` | projects; each gets a page at `/projects/<slug>` |
| `data/codeforces-snapshot.json` | fallback stats if the Codeforces API is down |

**Missing facts** use `TODO("what's missing")`. TODOs show as dashed notes in
`npm run dev` and Vercel preview deploys, and are hidden on the production
deploy (`VERCEL_ENV=production`). Search the repo for `TODO(` to see what's left.

**Project images:** drop files in `public/projects/<slug>/`, then set `src` on
`hero` or a `gallery` item, e.g. `{ src: "/projects/velocity/hero.png", alt: "…" }`.
Until then each slot shows a soft cover with the project name.

**Research chart:** the detail page shows the 4,096-token comparison now. When
you have the full curve, replace `curve: TODO(…)` in `data/site.ts` with rows
like `{ tokens: 1024, probe: 0.53, sampling: 0.66 }` and the line chart appears.

## Codeforces

The home page fetches `user.info`, `user.rating`, and `user.status` for
`beansQ`, at least 2.1 s apart, cached for a day (`revalidate = 86400`). If the
API fails, it falls back to `data/codeforces-snapshot.json`. Refresh the
snapshot occasionally with:

```bash
npm run codeforces:snapshot
```

## Deploy

Import the repo on Vercel (framework preset: Next.js, no env vars needed).
Once the custom domain is live, set `NEXT_PUBLIC_SITE_URL=https://your.domain`
so canonical URLs, OG images, and the sitemap use it.

## Secrets

Type `mochi` or `matcha` anywhere, try the Konami code, click the orange date
stamp, poke or throw mochi, and play the game at the bottom of the page.

## QA builds beside `next dev`

`NEXT_DIST_DIR=.next-qa npm run build` builds into a separate folder so it
never clobbers a running dev server's `.next`.

## Design notes

- `PRODUCT.md`: who the site is for, and the facts it's allowed to claim.
- `app/globals.css`: all colour tokens (light and dark), glass, the sky, motion.
- `assets/fonts/README.md`: how the Shantell Sans subset was built.
- `github-profile/`: a matching GitHub profile README.
=======
The tech stack was made with the purpose of being simple yet also powerful tools that allow aesthetically pleasing UI and functionality:

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (CSS themes)
- next-themes (dark default, system preference disabled)
- framer-motion (subtle scroll fade-ins only)
- lucide-react (for icons)
- Inter via `next/font/google`

The site should run at http://localhost:3000.

## Content

The crux of the project! Hand-crafted content to provide explanations to projects and experiences. All details render from `/data/content.ts` (contains all the technical details of projects, experiences, etc.). It does these exports:

1) `hero`: My name, age, one-line bio,
2) `currently`: An array of `CurrentEntry` (role, entity, period, optional extra information via bullets)
3) `awards`: An array of `Award` (name, optional organization)
4) `projects`: An array of `Project` (slug, name, logo, short description, tech stack, period, links, what/why/how/results)
5) `contact`: Contains my email, github, linkedin, twitter, instagram

## How It Works

The project layout in `/app/layout.ts` gathers everything in a ThemeProvider (such as themes, loading fonts, etc.).
`/home` renders the hero page with a concise section on awards, project previews, and a rotating globe from 21st.dev.
`/projects` contains the fill project index with scroll animations to show cards containing each project.
`/public/logos` contains all the images needded to add a visual indicator to experiences, awards, projects, etc.

## Attribution

All content was written by hand, various UI components were derived from https://https://21st.dev/. Claude Code was utilized to aid in developing the frontend.
>>>>>>> origin/main
