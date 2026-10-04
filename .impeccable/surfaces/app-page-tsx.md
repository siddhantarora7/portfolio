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

OWN-WORLD (updated after the owner's matcha/pale-blue steer): mochi ground #F4F6F0 under two still blurred fields, matcha #C2DCA3 and pale sky #C0DCF2; green-charcoal ink #1D2621, secondary ink #56625B; matcha #5E8B3E for focus rings, chips, bars, and the heatmap ramp. LED orange #FF7A1A only on the film date stamp. Night: ground #0F1512, fields #22382A / #15293D, ink #E6EDE7. Frosted glass (backdrop blur 20px, saturate 1.5, 1px light edge, soft offset shadow) only on hero card, nav pill, project cards, Codeforces card, chart card. Shantell Sans (self-hosted Latin subset, wght 500–600 + INFM; INFM 18 headings, 100 hand notes) + Geist for reading; Geist Mono only for the LED stamp. Mark: a small glass soap-bubble character with tiny face changes. Retro artifacts: LED film date stamp, faint scanlines on image slots, dot-matrix chart grid, static film grain.

STORY: Visitor meets the name, bubble, and one human paragraph; scans research, work, projects, highlights, Codeforces; leaves via github/linkedin/email/resume.

FIRST VIEWPORT: Floating glass nav pill top. Centred 640px column: glass hero card holding bubble + name (Shantell, ~60px), bio, three proof chips (usamo.guide 3M+/50K+, Codeforces Expert, USACO Gold), human line, links; LED date stamp at its bottom-right corner. Research row visible below on desktop.

FORM: user-pinned (glassmorphism, retro artifacts, cute-imperfect but clean); supersedes roll seed 5f4a25bc.

Signature interaction: hovering a list row defocuses siblings (blur + fade) like a lens pull; bio words ink in on scroll; the bubble blinks and reacts. Reduced motion disables all of it.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
