---
name: Siddhant Arora
description: A quiet personal index seen through frosted glass at dusk, with the soft, slightly imperfect cuteness of good stationery.
colors:
  mochi-ground: "#f4f6f0"
  matcha-field: "#c2dca3"
  pale-sky-field: "#c0dcf2"
  green-charcoal-ink: "#1d2621"
  moss-ink: "#56625b"
  hairline-rule: "rgb(29 38 33 / 0.09)"
  matcha: "#5e8b3e"
  matcha-deep: "#3f6b26"
  matcha-soft: "#dcebc9"
  sky: "#9cc4e4"
  glass: "rgb(255 255 255 / 0.52)"
  glass-strong: "rgb(255 255 255 / 0.7)"
  glass-edge: "rgb(255 255 255 / 0.85)"
  led-orange: "#ff7a1a"
  heat-0: "rgb(29 38 33 / 0.06)"
  heat-1: "#cfe3b6"
  heat-2: "#a7cb84"
  heat-3: "#77a752"
  heat-4: "#4b7a2f"
  night-ground: "#0f1512"
  night-matcha-field: "#22382a"
  night-sky-field: "#15293d"
  night-ink: "#e6ede7"
  night-moss-ink: "#a3b0a7"
  night-matcha: "#93c46e"
  night-matcha-deep: "#b5dc95"
  night-sky: "#4d7aa3"
  night-led: "#ff8a33"
typography:
  display:
    fontFamily: "Shantell Sans, ui-rounded, system-ui, sans-serif"
    fontSize: "clamp(31px, 8.2vw, 60px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'INFM' 18"
  headline:
    fontFamily: "Shantell Sans, ui-rounded, system-ui, sans-serif"
    fontSize: "clamp(34px, 6.4vw, 54px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'INFM' 18"
  title:
    fontFamily: "Shantell Sans, ui-rounded, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'INFM' 18"
  title-small:
    fontFamily: "Shantell Sans, ui-rounded, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    fontVariation: "'INFM' 18"
  lede:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(18px, 2.4vw, 22px)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'ss01', 'cv11'"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  hand:
    fontFamily: "Shantell Sans, ui-rounded, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    fontVariation: "'INFM' 100"
  led-stamp:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
rounded:
  logo: "11px"
  inset: "14px"
  image: "18px"
  card: "22px"
  panel: "26px"
  hero: "28px"
  pill: "9999px"
spacing:
  gutter: "16px"
  gutter-wide: "20px"
  card-pad: "20px"
  card-pad-wide: "28px"
  section-gap: "80px"
  section-gap-wide: "96px"
  column: "680px"
components:
  chip-proof:
    backgroundColor: "{colors.matcha-soft}"
    textColor: "{colors.matcha-deep}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-stack:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.green-charcoal-ink}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  button-glass:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.green-charcoal-ink}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  button-back:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.moss-ink}"
    rounded: "{rounded.pill}"
    size: "40px"
  nav-pill:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.moss-ink}"
    rounded: "{rounded.pill}"
    padding: "4px 4px 4px 6px"
  nav-link:
    textColor: "{colors.moss-ink}"
    rounded: "{rounded.pill}"
    padding: "6px 10px"
  nav-link-hover:
    textColor: "{colors.green-charcoal-ink}"
  card-hero:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.hero}"
    padding: "36px"
  card-project:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.card}"
    padding: "10px"
  card-panel:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.panel}"
    padding: "{spacing.card-pad-wide}"
  logo-tile:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.matcha-deep}"
    rounded: "{rounded.logo}"
    size: "36px"
  list-row:
    textColor: "{colors.green-charcoal-ink}"
    padding: "14px 0"
---

# Design System: Siddhant Arora

## Overview

**Creative North Star: "Frosted Glass at Dusk, Pressed into a Stationery Notebook"**

A quiet personal index under a still sky. One large matcha glow sits fixed behind everything and travels across the page as you scroll (a CSS scroll timeline, free at rest) on a mochi-pale ground with a static film grain. A small number of frosted-glass objects float above that sky; everything else is plain ink on the ground: hairline-ruled list rows, short paragraphs, hand-written margin notes. The softness comes from rounded glass, two small mascots, mochi and matcha, and a rounded hand-lettered display face; the cleanliness comes from a single 680px column, generous section gaps, and a strict budget on every effect.

The retro layer is small and specific: an orange LED film date stamp burned into the corner of the hero card and image frames, faint scanlines over image slots, dot-matrix grids behind charts, and the film grain over the sky. These read as found artifacts, not decoration, and none of them repeat beyond their one role. The world is deliberately general: no literal Japanese motifs, no subject-literal metaphors for research or code, no cream-paper-and-script-name portfolio default.

Night mode is the same world after sunset: a deep green-black ground, darkened fields, pale ink, a brighter matcha, and two mascots that fall asleep. Light is always the default; dark only appears when the visitor picks it.

**Key Characteristics:**
- Mochi ground with two fixed, blurred matcha and pale-sky fields and static film grain.
- Frosted glass on a short list of floating objects only; list content sits directly on the ground.
- Shantell Sans for headings and hand notes, Geist for reading, Geist Mono for the LED stamp alone.
- Matcha carries every interactive and data accent; LED orange is the only warm hue.
- One mascot, mochi, a white daifuku with a tiny matcha jetpack, whose face changes and flight are the site's personality.
- One arrival, one lens-pull hover, one scroll ink-in; nothing loops; all of it off under reduced motion.

## Colors

A cool, low-chroma green-and-blue world with one warm spark reserved for the film stamp.

### Primary
- **Matcha** (`matcha`): focus rings, link-underline hover, bullet dots, chart lines and points, topic and difficulty bars, the current-band wash in the rating chart, caret colour. Brightens at night (`night-matcha`).
- **Deep Matcha** (`matcha-deep`): text on matcha-soft chips, logo-tile monograms, the hand-lettered band label in charts.
- **Matcha Milk** (`matcha-soft`): proof chips, status pills, text selection.
- **Matcha Ramp** (`heat-0` to `heat-4`): the Codeforces heatmap ramp and the empty track behind bars (`heat-0`). Inverted at night so the brightest cell stays the busiest day.

### Secondary
- **Pale Sky** (`sky`): the second data series only (the comparison bar and curve in the AUROC chart). Never used for UI chrome.

### Tertiary
- **LED Orange** (`led-orange`, `night-led` at night): the film date stamp, rendered in Geist Mono with a soft glow, at the bottom-right of the hero card, image frames, and OG images.

### Neutral
- **Mochi Ground** (`mochi-ground`, `night-ground`): page and browser theme colour.
- **Matcha Field / Pale Sky Field** (`matcha-field`, `pale-sky-field`, and night variants): the two fixed radial sky fields, image-slot placeholder covers, and the footer colour arc.
- **Green-Charcoal Ink** (`green-charcoal-ink`, `night-ink`): all primary text and the mascot's face.
- **Moss Ink** (`moss-ink`, `night-moss-ink`): secondary text, metadata, dates, hand notes, nav links at rest, chart labels.
- **Hairline Rule** (`hairline-rule`): row dividers, image and chart borders, dot-grid dots, link underlines at rest.
- **Glass / Glass Strong / Glass Edge** (`glass`, `glass-strong`, `glass-edge`): frosted surface fill, the opaque fallback when backdrop-filter is unsupported (also logo tiles and stack chips), and the 1px light edge.

### Named Rules
**The One Spark Rule.** LED orange appears only as the film date stamp. Matcha does every other accent job: focus, chips, bars, lines, heatmap.

**The Second Series Rule.** Pale sky is a data colour for the second series in a comparison chart, and the colour of the right-hand sky field. It is never a button, link, or chip colour.

## Typography

**Display Font:** Shantell Sans, self-hosted Latin subset, variable wght 500 to 600 with the INFM (informality) axis (with ui-rounded, system-ui fallback)
**Body Font:** Geist (with ui-sans-serif, system-ui fallback), stylistic sets ss01 and cv11 on
**Label/Mono Font:** Geist Mono 600, used only for the LED stamp

**Character:** a rounded, slightly bouncy hand-lettered face at INFM 18 for headings, pushed to INFM 100 for margin notes, against a precise neo-grotesque for everything people actually read. All headings are lowercase in content ("research", "work", "this page popped").

### Hierarchy
- **Display** (600, clamp(31px, 8.2vw, 60px), 1.02, -0.025em): the name in the hero card; the mascots perch on the card's top edge.
- **Headline** (600, clamp(34px, 6.4vw, 50px) on research pages, clamp(36px, 7vw, 54px) on project pages, 1.05 to 1.08): detail-page titles. 404 title at 38px.
- **Title** (600, 26px, leading 1): home section headings. Detail section headings at 22px.
- **Title Small** (600, 19px): project card names and chart card captions.
- **Lede** (400, 18 to 22px, 1.5 to 1.6): hero bio (max 38ch), ink-in paragraph, detail subtitles in moss ink (max 36 to 40ch).
- **Body** (400, 16.5px, 1.6): base text; detail prose at 17px / 1.7; row notes max 60ch.
- **Label** (400 to 500, 12 to 14.5px): row roles, dates (tabular numerals), figure captions, chip text, nav (14px).
- **Hand** (500, 14 to 19px, INFM 100): margin notes beside section headings (rotated -2deg), chart footnotes, the hero arrow note, the footer sign-off, TODO notes.
- **LED Stamp** (Geist Mono 600, 11px, 0.06em): the date stamp only.

### Named Rules
**The Two Informalities Rule.** Shantell Sans runs at exactly two INFM settings: 18 for headings, 100 for hand notes. Hand notes are always moss ink and never carry information the page needs.

**The Mono Is a Stamp Rule.** Geist Mono is loaded at one weight for one element. Numbers elsewhere use Geist with tabular numerals.

## Layout

A single centred column, max 680px, with 16px side padding (20px from 640px). Content starts 96px below the top (128px from 640px) to clear the floating nav. Home sections are separated by 80px (96px from 640px); detail sections by 56px. The footer sits 128px below content.

Lists are full-column rows divided by hairline rules: 14px vertical padding (10px compact), an optional 36px logo tile, name and role left, date right in tabular numerals, wrapping on narrow screens. Projects use a two-column grid from 640px with 20px gaps, one column with 24px gaps below. Glass panels pad 20px, 28px from 640px. On desktop (1024px and up) detail pages hang the back button 64px into the left margin.

## Elevation & Depth

Depth is a frosted-glass layer over a fixed sky, not a shadow scale. The sky (two radial fields plus film grain at 7% light / 9% dark) sits at z-index -1; content on the ground is flat; a short list of objects float as glass with backdrop blur and a single soft drop shadow. There is one shadow recipe, and it belongs to glass.

### Shadow Vocabulary
- **Glass lift** (`box-shadow: 0 1px 2px rgb(40 60 40 / 0.06), 0 18px 40px -22px rgb(40 70 40 / 0.35), inset 0 1px 0 rgb(255 255 255 / 0.35)`; dark: `0 1px 2px rgb(0 0 0 / 0.3), 0 22px 44px -24px rgb(0 0 0 / 0.7)` plus the same inset): every glass surface, paired with `backdrop-filter: blur(20px) saturate(1.5)` and a 1px glass-edge border.
- **LED glow** (`text-shadow: 0 0 6px color-mix(in srgb, var(--led) 60%, transparent), 0 0 1px var(--led)`): the date stamp only.

### Named Rules
**The Glass Budget Rule.** Glass is reserved for floating objects: the hero card, nav pill, project cards and the project-page image frame, the Codeforces card, the AUROC chart card, the back button, external-link buttons, the 404 home button, and the skip link. List rows, sections, and prose never sit in glass.

**The Still Sky Rule.** The sky fields and grain are fixed and static. Nothing in the background moves.

## Shapes

Soft and pillowy at every scale, with radii stepping down as objects nest: hero card 28px, panels 26px, project cards 22px, image frames 18px (15 to 19px when inset in a card), chart insets 14px, logo tiles 11px, bars and heatmap cells 2.6 to 3px. Every chip, nav item, and button is a full pill; the back button and theme toggle are circles. Focus outlines round to 8px.

Imperfection is applied sparingly and on purpose: the mascots are hand-drawn and a little lumpy; project cards sit at small tilts (-0.8deg to 0.7deg) that straighten and lift 3px on hover or focus; hand notes rotate -2 to -4deg. Image slots carry a hairline border and faint 3px scanlines.

## Components

### Buttons
Glass pills that feel like smooth pebbles.
- **Shape:** full pill (9999px); back button is a 40px glass circle with a 16px chevron.
- **External link button:** glass, ink text 14.5px medium, 8px 16px padding, trailing 12px arrow-out icon in moss ink; lifts 1px on hover.
- **404 home:** glass pill, 10px 20px, 15px medium.
- **Hover / Focus:** moss-to-ink colour shift on back button and nav; 2px matcha outline offset 3px on focus.

### Chips
- **Proof chip / status pill:** matcha-soft fill, matcha-deep 12.5 to 13.5px medium text, 2 to 4px by 10 to 12px padding. Static, never interactive.
- **Stack chip:** glass-strong fill, hairline border, ink 14px text.

### Cards / Containers
- **Corner Style:** 22 to 28px (see Shapes).
- **Background:** glass fill over the sky.
- **Shadow Strategy:** glass lift only (see Elevation & Depth).
- **Border:** 1px glass edge.
- **Internal Padding:** hero 20 to 36px with extra bottom room for the stamp; panels 20 to 28px; project cards 10px around an inset image, 8px text inset.

### Navigation
A floating glass pill, centred, 12px from the top (20px from 640px). Home is a 28px mochi in a 36px circle; text links are lowercase 14px moss ink in pill hit areas, ink on hover; the theme toggle is a 36px circle with an 18px moon/sun line icon. Below 420px link padding tightens and "resume" drops out.

### List Row
The workhorse. Rows sit in a `.focus-list`: hovering or focusing one row fades its siblings to 0.38 opacity with a 1.6px blur over 420ms (ease-out-expo), like a lens pull. External rows reveal a small arrow on hover. Logo tiles are 36px glass-strong squares at 11px radius with a matcha-deep Shantell monogram when no logo exists.

### Mochi (the one mascot)
A soft white daifuku drawn as inline SVG (components/mochi/mochi-art.tsx): 2.4px ink outline (--mochi-ink), radial fill, white shine and dusting, pink cheeks (#f6a9b9). It wears a tiny matcha jetpack (two green thrusters, a harness strap) with flames whose length follows --thrust.
- **Moods:** idle, happy, squish, dizzy, wow, sleep. Idle mochi sleeps in dark mode via CSS.
- **Companion (components/mochi/companion.tsx):** fixed-position, spring physics in one rAF loop that stops when settled. Perches on the hero card ([data-mochi-dock]); takes off when you scroll; rides along with the page and springs back to the right margin (bottom-right on phones), tilting with velocity and flaring its flames when it climbs. Click: loop-de-loop and a line (every 5th poke: dizzy). Drag and release: thrown, then flies home. First time each section appears it comments once. At the footer it lands on [data-mochi-rest] and naps. Eyes follow a mouse. Nothing moves before the first interaction, and reduced motion keeps it still.
- **Elsewhere:** 30px in the nav, the ask-mochi avatar, the dock tile, the 404 (squished and dizzy), the favicon, OG images, and the game sprite. There is never a second mochi on screen as a character.

### LED Date Stamp
Today's date as `'YY MM DD` in Geist Mono 600 11px LED orange with glow, decorative (aria-hidden), absolutely placed at the bottom-right of the hero card and image frames.

### Charts
Server-rendered SVG strings (no hydration), on a 10px dot-grid inset with hairline border and 14px radius inside a glass card. Matcha is the primary series, pale sky the second; reference lines are dashed moss ink at 25% or rule colour; axis text 9.5 to 11.5px moss ink. The current rating band is washed in 10% matcha and named once in hand lettering. Heatmap cells are 10px squares with 2.6px radius on the matcha ramp. Each chart carries an aria-label summary and per-point titles.

### Image Slot
16:10 frame with hairline border, scanlines, and the LED stamp. Without a source it renders, in development and previews only, a field-gradient cover with a hand-lettered description and the path to add; in production it renders nothing.

### TODO Note
Unconfirmed data written as `TODO("...")` renders as a dashed hand-lettered note ("to write: ...") in development and preview builds and is removed when `VERCEL_ENV` is production. It is a working tool, not part of the shipped surface.

## Do's and Don'ts

### Do:
- **Do** keep every new surface inside the 680px column on the mochi ground with the fixed sky behind it.
- **Do** use glass only for floating objects from the Glass Budget list, with the full recipe: 20px blur, saturate 1.5, 1px glass edge, glass lift shadow, glass-strong fallback.
- **Do** use matcha for every accent and data mark; use pale sky only as a second data series.
- **Do** set headings in Shantell Sans 600 at INFM 18 and lowercase; set reading text in Geist.
- **Do** put lists in hairline-ruled rows inside a focus-list so the lens-pull defocus applies.
- **Do** limit motion to the one arrival (settle from 12px, 0.985 scale, 6px blur over 900ms, content visible from the first frame), the mascots landing (one squash on impact), a few breaths and blinks that stop, hover lens-pull, and one scroll ink-in paragraph per page.
- **Do** disable every animation and transition under prefers-reduced-motion.
- **Do** render charts as server-side SVG strings on a dot grid, with aria-labels.

### Don't:
- **Don't** use LED orange for anything except the film date stamp.
- **Don't** put list rows, sections, or prose in glass.
- **Don't** add infinite or looping animation, or move the sky.
- **Don't** use Geist Mono outside the LED stamp.
- **Don't** introduce literal Japanese motifs (no torii, cherry blossoms, kanji, waves, or similar).
- **Don't** use a hard or offset shadow; the glass lift is the only shadow.
- **Don't** ship TODO notes or empty image slots to production.

## Small text

Below the label sizes, a few UI-only sizes are part of the system: 13px for card metadata, chips, dates, and footnotes; 12.5px for tile captions; 12px for axis labels and the ask-mochi subtitle; 11px for the LED stamp. In light mode the LED stamp uses #a8380a so it passes 4.5:1 as a button; secondary data text that names the sky series uses --sky-ink (#3a6f9c light, #8fbbe3 dark).

## Delight layer

- **Ask mochi** (components/mochi/ask-mochi.tsx): opened from mochi's speech bubble or the dock's mochi tile. A scripted Q&A dialog that answers only from site data and says it is not an AI. Esc closes and returns focus.
- **Easter eggs** (components/mochi/easter-eggs.tsx): type "mochi" anywhere for a triple loop with hearts; type "matcha" to steep the glow; the Konami code rains mochi; clicking the hero's LED stamp flashes a camera; a hello in the console.
- **Jetpack mochi** (components/game): a lazy-loaded canvas game in the "play" section. Tap or Space to thrust; each wall is +100 Codeforces rating with rank names; beat beansQ's live rating. Best score is kept in localStorage. The ceiling bonks; the floor ends the run.
- **Custom cursor** (components/cursor.tsx): a dot and a trailing ring that grows over anything clickable and shows hints from data-cursor ("poke", "play", "flap"). Mouse only; text fields keep the native caret.
- **Dock** (components/dock.tsx): macOS-style magnification by pointer distance (Gaussian, transform-only). Used for the hero and footer link docks (with labels) and, gently, the nav.
- **Now tiles**, **live data cards**, and **detail pages** as before; project cards now carry a screenshot or a drawn visual (Cursive's ghost-text illustration, the housing net's R² bars).
