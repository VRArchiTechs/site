# Quiet Luxury Portfolio

Design a premium, editorial-style portfolio website for an architect/interior 

designer. Goals: feel like a boutique design studio's site, not a template.

STYLE DIRECTION

- Aesthetic: quiet luxury, editorial/magazine layout, architectural — not

  generic "startup" design (no big rounded cards, no stock icons, no bright

  saturated colors).

- Palette: warm ivory/paper background, near-black ink text, one restrained

  metallic accent (brass, bronze, or muted gold) used sparingly for rules,

  labels, and hover states. Optional dark "chapter" sections for contrast.

- Typography: a refined serif (Playfair Display / Fraunces / Georgia) for

  headlines, paired with a clean grotesk sans (Inter/Helvetica) for labels

  and body copy. Use large-scale display type, generous negative space,

  tracked-out uppercase eyebrows/labels.

- Motifs specific to architecture: oversized faint numerals or line-drawing

  elevations as background texture, thin hairline rules instead of boxes/

  shadows, drop caps on lede paragraphs, asymmetric grids instead of even

  3-column cards.

STRUCTURE

1. Full-bleed hero: name, role, one-line philosophy statement, subtle

   architectural drawing or render as a dimmed background image.

2. Studio/About: portrait + biography in a magazine-style two-column layout

   with a pull-quote or drop cap, plus a compact "facts" row (discipline,

   approach, software).

3. Work index: an editorial list of projects (number, title, location) with

   a hover state that shifts text and reveals a "view project" cue — not a

   grid of thumbnail cards.

4. Individual project spreads: numbered watermark, title, meta (scope,

   floors, area), a short lede paragraph, one large hero image, then a

   horizontal-scrolling "filmstrip" gallery of supporting images/drawings

   with captions, and a row of tag pills.

5. A dedicated visualisation/rendering-craft section, styled consistently,

   grouped by scene/room rather than by client.

6. Dark, generous footer with a large closing statement and contact links.

INTERACTION

- Sticky/fixed nav that stays minimal and unobtrusive.

- Optional fixed side "progress rail" of dots showing which section is

  active on scroll.

- Subtle scroll-reveal fade-ins on sections (no bouncy/gimmicky motion).

- Fully responsive: single column on mobile, filmstrips still horizontally

  scrollable.

TECHNICAL

- Single self-contained HTML file — all images embedded as base64 data URIs

  (no external asset folder to keep track of).

- No external fonts/CDN dependencies if avoidable, so it works fully offline.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://studio-folio-editor.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6643ab61-6243-4123-90e6-83b67cc01216).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
