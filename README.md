# siddhant arora: portfolio

Personal site. Frosted glass over a matcha and pale-sky field, a small bubble
mascot, film-camera date stamps, and live Codeforces stats.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Runtime dependencies are
just `next`, `react`, and `react-dom`; every animation is CSS.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
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

## Design notes

- `PRODUCT.md`: who the site is for, and the facts it's allowed to claim.
- `app/globals.css`: all colour tokens (light and dark), glass, the sky, motion.
- `assets/fonts/README.md`: how the Shantell Sans subset was built.
- `github-profile/`: a matching GitHub profile README.
