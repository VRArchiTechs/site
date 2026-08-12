# Work Project Template

Tri-Pod Residence is the canonical reference for future Work projects.

## Add a project

1. Create the project asset folder:

`public/images/work/project-name/`

Use the existing project structure:

- `hero/hero.webp` for the optional project hero
- `section-01/`, `section-02/`, etc. for gallery sections

2. Prepare media using the existing presentation standards:

- Work hero: 16:9 composition
- Gallery media: use the existing `DisplayPreset` selected in the project data
- Do not stretch or squash images; prepare source images to suit their selected preset

3. Add one project object to `src/lib/portfolio-data.ts`.

4. Set editable project data including:

- `id`
- `sortOrder` (use increments of 10)
- `status`
- `year`
- `title`
- `indexTitle`
- `location`
- `meta`
- `sub`
- `notes`
- `pull` when needed
- optional `heroImage`
- `galleries`
- `tags`

For each image provide:

- `src`
- `alt`
- `caption`

Each gallery provides:

- `title`
- optional `description`
- `type`
- `display`
- `plates`

## Do not edit components

Do not modify Work components, routing, numbering, previous/next navigation, or layout when adding a project.

The Work service in `src/lib/work.ts` automatically:

- filters published projects
- sorts by `sortOrder`
- generates `displayNumber`
- resolves previous and next projects

## Adding image captions

Keep captions short, descriptive, and specific to the image view or drawing detail. Use the same naming style across the project.

Example:

`01 — Street Perspective Render`

`02 — Front Elevation Strategy`

`03 — Side Elevation Strategy`

The UI generates the numeric prefix automatically; store only the caption text in data.

## Final check

After adding a project:

- confirm every referenced image path exists
- confirm the hero is optional
- confirm every gallery has the intended `display` preset
- confirm `sortOrder` is unique
- run `npm run build`
- run `npm run lint` when available

A future project should require only image uploads and one data object update. No component or navigation changes should be necessary.
