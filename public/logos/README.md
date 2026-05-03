# Logos

Drop a square PNG (64–128px works well) into this folder for each entity below.
Until a file exists, the `<Logo>` component renders a muted square with the
entity's first letter — nothing breaks.

Required filenames (referenced by `data/content.ts`):

| File                 | Used for                       |
| -------------------- | ------------------------------ |
| `verve.png`          | Verve Consulting (internship)  |
| `usamoguide.png`     | usamo.guide (co-founder + project) |
| `school.png`         | High school                    |
| `usaco.png`          | USACO                          |
| `cemc.png`           | CEMC (CCC organization)        |
| `maa.png`            | MAA (AMC organization)         |
| `ahsmc.png`          | AHSMC                          |
| `calgaryhacks.png`   | CalgaryHacks                   |
| `glide.png`          | Glide project                  |
| `spinfilter.png`     | SpinFilter project             |

Logos are rendered at 20×20 with `border-radius: 0.125rem`. Square assets
look best; transparent PNGs are preferred.
