# Asset Convention

This repository uses one permanent asset convention for portfolio content.

## Work projects

`public/images/work/project-slug/`

- `hero.webp` — required, exported for the established 16:9 Work Hero standard.
- `gallery-01/01.webp`, `02.webp`, `03.webp`, etc.
- `gallery-02/01.webp`, `02.webp`, etc. when additional galleries are needed.

Gallery titles and captions are data, not filesystem labels.

## Visualisation scenes

`public/images/visualisation/scene-slug/`

- `hero.webp` — optional.
- `gallery-01/01.webp`, `02.webp`, `03.webp`, etc.
- Additional galleries use `gallery-02`, `gallery-03`, and so on.

A Visualisation scene with `hero.webp` renders Hero + Gallery. Without it, the existing gallery-only behaviour remains.

## Naming rules

- Use lowercase kebab-case for project and scene folders.
- Use `hero.webp` for Hero assets.
- Use numbered gallery folders: `gallery-01`, `gallery-02`, `gallery-03`, ...
- Use sequential image filenames: `01.webp`, `02.webp`, `03.webp`, ...
- Do not encode visitor-facing titles in folder or filename names.
- Keep display presentation controlled by the existing `DisplayPreset` system.
- Do not force gallery source images into a universal aspect ratio.

## Adding content

1. Create the project or scene folder.
2. Add `hero.webp` when required or desired.
3. Add gallery folders and sequential images.
4. Add or duplicate one data object in `src/lib/portfolio-data.ts`.
5. Update metadata, image paths, captions, and ordering data.
6. Run `npm run build` and `npm run lint` when available.

No component, routing, layout, or navigation changes should be necessary for normal content additions.
