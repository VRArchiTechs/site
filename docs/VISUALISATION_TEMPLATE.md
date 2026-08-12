# Visualisation Template

Visualisation is data-driven. The current UI is the canonical presentation and should not require component changes when a new scene is added.

## Asset structure

Create each scene under:

`public/images/visualisation/scene-slug/`

Use this standard structure:

- `hero.webp` — optional
- `gallery-01/01.webp`, `02.webp`, `03.webp`, etc.
- `gallery-02/01.webp`, `02.webp`, etc. when additional galleries are needed

Hero behaviour is data-driven:

- `hero.webp` present → Hero + Gallery
- no `hero.webp` → Gallery only

## Add a scene

1. Create the scene asset folder using the structure above.
2. Upload the prepared images.
3. Add one scene object to `src/lib/portfolio-data.ts`.
4. Set the scene content, ordering, status and year.
5. Set the existing DisplayPreset values appropriate to the media.

Do not edit components, routing, layout, numbering or gallery rendering.

## Media standards

- Hero: use `hero.webp` when a Hero is needed and keep the existing Hero DisplayPreset.
- Gallery images: use `01.webp`, `02.webp`, `03.webp`, etc. inside numbered gallery folders.
- Do not force gallery images into a universal source aspect ratio. Preserve the intended composition and let the existing DisplayPreset control presentation.

For every image, provide the existing data fields required by the current schema, including `src`, `alt`, and `caption` where applicable.

## Final check

After adding a scene:

- confirm every referenced image path exists
- confirm the Hero is optional
- confirm gallery order is correct
- confirm the intended DisplayPreset is set
- run `npm run build`
- run `npm run lint` when available

A future Visualisation scene should require only image uploads and one data-object update. No component or routing changes should be necessary.
