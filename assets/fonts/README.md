# Fonts

- `shantell-sans-subset.woff2`: the site's display face. Built from Shantell Sans
  (SIL Open Font License 1.1, https://github.com/google/fonts/tree/main/ofl/shantellsans):
  instanced to BNCE=0, SPAC=0, wght 500–600, keeping the INFM (informality) axis,
  then subset to basic Latin plus a few punctuation marks.

  ```sh
  fonttools varLib.instancer "ShantellSans[BNCE,INFM,SPAC,wght].ttf" BNCE=0 SPAC=0 wght=500:600 -o inst.ttf
  fonttools subset inst.ttf --unicodes="U+0020-007E,U+00A0,U+00A9,U+00B2,U+00B7,U+00D7,U+00E9,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+2080-2089,U+2190-2193" --flavor=woff2 --layout-features='kern,liga,calt,rvrn' --output-file=shantell-sans-subset.woff2
  ```

  If you add text with characters outside that set to a heading, re-run the subset.
- `shantell-600.ttf`, `geist-400.ttf`: static instances used only to render OG images.
