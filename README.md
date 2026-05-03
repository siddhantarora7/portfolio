# Siddhant Arora — Portfolio

A minimal, single-column personal site. Dark mode by default, with a light-mode
toggle that lives in the contact row. All content is typed and lives in
`/data/content.ts` — no CMS, no markdown, no surprises.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (CSS-variable theme)
- next-themes (dark default, system preference disabled)
- framer-motion (subtle scroll fade-ins only)
- lucide-react (icons)
- Inter via `next/font/google`

## Setup

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Editing content

Everything renders from `/data/content.ts`. The exports are:

- `hero` — name, age, one-line bio
- `currently` — array of `CurrentEntry` (role, entity, period, optional sub-bullets)
- `awards` — array of `Award` (name, optional org, optional italic result)
- `projects` — array of `Project` (slug, name, logo, short description, tech stack, period, links, what/why/how/results)
- `contact` — email, github, linkedin, twitter, instagram

Anything you don't have yet should use the `TODO("...")` helper:

```ts
links: { live: TODO("glide live url") }
what: TODO("what is Glide — 1 short paragraph"),
```

TODO strings render as **orange italic placeholder text** wherever they appear,
so missing content stays loud and obvious. Twitter and Instagram are the only
contact fields that can be left as the empty string (`""`) to omit them entirely.

### Adding a new project

1. Append a new entry to the `projects` array in `/data/content.ts`.
2. Drop a logo at `/public/logos/<slug>.png` (optional — the fallback letter
   tile renders if the file is missing).
3. The new `/projects/<slug>` page is generated automatically (SSG).

### Adding logos

Drop square PNGs into `/public/logos/`. See `/public/logos/README.md` for the
list of expected filenames. Missing logos render a fallback square with the
entity's first letter — the build never fails over a missing logo.

### Replacing the resume

Overwrite `/public/resume.pdf` with the real PDF.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Visit https://vercel.com/new and import the repo.
3. Framework preset: **Next.js**. No environment variables required.
4. Click **Deploy**.

That's it — every push to `main` redeploys.

## Theming

- Dark is the explicit default. System preference is ignored unless the user
  uses the toggle in the contact row.
- Color tokens live as CSS variables in `app/globals.css` (`--background`,
  `--foreground`, `--muted`, `--rule`, `--accent`).
