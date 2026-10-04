---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/projects","app/research"]
---

Scope: whole site (home, research detail, project details, 404). Visitor mode: Experience.
Audience: research labs/programs and startup founders, equally; 20-second read, often on a phone.

## Direction contract

THESIS: A quiet personal index seen through frosted glass at dusk, with the soft, slightly imperfect cuteness of good stationery. Refuses the category default (cream paper, script name, logo list) and any subject-literal metaphor; one general mood the owner picked. No literal Japanese motifs.

OWN-WORLD: Cool paper ground (#EEF0F5) under two slow blurred fields, sakura #F4B6C2 and sky #A9C8F0; indigo-black ink #1B1D26; one LED-orange accent #F26B1D (fills, focus, heatmap; never body text). Night: indigo #0E1020 ground, faint indigo/magenta fields. Frosted glass (backdrop blur, 1px light inner edge, soft offset shadow) only on hero card, nav pill, project cards, Codeforces card. Shantell Sans (informal axis low for headings, high for hand notes) + Geist for reading; Geist Mono only for the LED date stamp. Mark: a small glass soap-bubble character with tiny face changes. Retro artifacts: orange LED film date stamp, faint scanlines on image slots, dot-matrix chart grid, static film grain.

STORY: Visitor meets the name, bubble, and one human paragraph; scans research, work, projects, highlights, Codeforces; leaves via github/linkedin/email/resume.

FIRST VIEWPORT: Floating glass nav pill top. Centred 640px column: glass hero card holding bubble + name (Shantell, ~60px), bio, human line, links; LED date stamp at its bottom-right corner. Research row visible below on desktop.

FORM: user-pinned (glassmorphism, retro artifacts, cute-imperfect but clean); supersedes roll seed 5f4a25bc.

Signature interaction: hovering a list row defocuses siblings (blur + fade) like a lens pull; bio words ink in on scroll; the bubble blinks and reacts. Reduced motion disables all of it.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
