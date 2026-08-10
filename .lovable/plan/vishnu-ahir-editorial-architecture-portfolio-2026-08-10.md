# Vishnu Ahir — Editorial Architecture Portfolio

A quiet-luxury, magazine-style portfolio built as a real site in this project, using the projects, images and captions from your two uploaded files.

## Visual direction

- Paper ivory background (#FAF9F7), near-black ink (#16150F), and a single restrained accent: **antique brass** (#9C7B45), with a paler brass tint for hairlines and hover underlines. Used only for eyebrows, rules, numerals and hover states — never as a button fill or large colour block.
- Serif display type for headlines (Playfair Display), grotesk sans (Inter) for labels, meta and body. Tracked-out uppercase eyebrows, generous negative space, drop caps on lede paragraphs.
- Architectural motifs: oversized faint project numerals as background watermarks, hairline rules instead of cards or shadows, asymmetric grids, no rounded corners, no stock icons.
- Two dark "chapter" bands (visualisation intro and footer) in deep ink for contrast.

## Structure (one long scrolling home page with section anchors)

1. **Hero** — full-bleed dimmed render behind name, role, and a one-line philosophy statement; brass hairline and a quiet scroll cue.
2. **Studio** — portrait plus two-column magazine bio with a drop cap and a pull-quote, then a hairline "facts" row: discipline, approach, software.
3. **Work index** — editorial numbered list (number / title / location). Hover shifts the title, tints it brass, and reveals a "View project" cue. No thumbnail grid.
4. **Project spreads** — one per project (Pintubhai Bungalow, Tri-Pod Residence, Harekrushna Villa, Rupesh Interior, Bharatbhai Bungalow): numeral watermark, title, meta row (scope / floors / area), lede paragraph, one large hero image, a horizontal-scrolling filmstrip of drawings and photos with captions, and a row of tag pills.
5. **Visualisation section** — rendering craft grouped by scene/room (living areas, bedrooms, exteriors, detail studies) rather than by client, same editorial treatment.
6. **Dark footer** — large closing statement, contact links, credits.

## Interaction

- Minimal fixed nav: name at left, uppercase section links at right, brass underline on the active section; a simple sheet menu on mobile.
- Fixed right-hand progress rail of dots marking the active section on scroll (hidden on mobile).
- Restrained scroll-reveal fade/rise on sections via IntersectionObserver — no bounce, no parallax.
- Fully responsive: single column on mobile, filmstrips stay horizontally scrollable with snap.

## Copy

Headlines, ledes and captions rewritten in an editorial voice, keeping the real project names, locations and image subjects intact.

## Technical notes

- Home page rewritten at `src/routes/index.tsx`, composed from focused section components under `src/components/`.
- Design tokens (ivory, ink, brass, serif/sans families, hairline widths) added to `src/styles.css` via `@theme`; fonts loaded with a `<link>` in `src/routes/__root.tsx`. No hardcoded colour utilities in components.
- The images embedded as base64 in your uploads are extracted and registered as CDN asset pointers in `src/assets/`, then imported normally — so the page loads fast instead of shipping a 14 MB document. Lazy loading and alt text on every image.
- Route `head()` metadata: portfolio-specific title, description, og/twitter tags, and a hero og:image.