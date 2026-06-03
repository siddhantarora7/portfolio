# Siddhant Arora — Portfolio

A clean portfolio site built using Typescript, Tailwind, and various UI frameworks, basically, some cool stuff about me :). Made for personal use and Hackclub Horizons.

Contains a home page for quick summaries on projects and experiences, a boot splash animation to provide some aesthetics, rotating globe animation, a projects section with custom scroll animations, dark/light mode functionality, and a resume.

<img width="915" height="912" alt="image" src="https://github.com/user-attachments/assets/593bd936-6d18-4133-9130-b6303b64fa73" />
<img width="920" height="589" alt="image" src="https://github.com/user-attachments/assets/18aeef7d-33f8-44d6-97d6-51b0ff7087d7" />
<img width="1179" height="943" alt="image" src="https://github.com/user-attachments/assets/f0502ef8-1915-4be1-a15c-9443a5c4c2b0" />

## Motivation

It's 2026 and having a comprehensive portfolio site that is both clear and comprehensive is one of the best things one can do to showcase identity. This project was built with the purpose of achieving that, a clean, minimalist portfolio site to give a visual flow to some of my experiences. Enjoy!

## Stack

The tech stack was made with the purpose of being simple yet also powerful tools that allow aesthetically pleasing UI and functionality:

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (CSS themes)
- next-themes (dark default, system preference disabled)
- framer-motion (subtle scroll fade-ins only)
- lucide-react (for icons)
- Inter via `next/font/google`

## Setup

To run the site locally, run these command via terminal:

```bash
npm install
npm run dev
```

The site should run at http://localhost:3000.

## Content

All details render from `/data/content.ts` (contains all the technical details of projects, experiences, etc.). It does these exports:

1) `hero`: My name, age, one-line bio,
2) `currently`: An array of `CurrentEntry` (role, entity, period, optional extra information via bullets)
3) `awards`: An array of `Award` (name, optional organization)
4) `projects`: An array of `Project` (slug, name, logo, short description, tech stack, period, links, what/why/how/results)
5) `contact`: Contains my email, github, linkedin, twitter, instagram
