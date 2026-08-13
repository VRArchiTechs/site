# Portfolio Content Workflow

This is the canonical workflow for future portfolio content. **Tri-Pod Residence** is the Work template and **Living Room** is the Visualisation template.

## 1. Work projects

Create:

`public/images/work/<project-slug>/`

Standard structure:

```text
project-slug/
├── hero/
│   └── hero.webp
├── gallery-01/
│   ├── 01.webp
│   ├── 02.webp
│   └── ...
└── gallery-02/        # optional
    ├── 01.webp
    └── ...
```

Then add **one object** to `projects` in `src/lib/portfolio-data.ts`.

Required project fields:

- `id` — same stable slug used for the folder
- `sortOrder` — unique, normally 10, 20, 30...
- `status` — `published`, `draft`, or `private`
- `year`
- `title`
- `indexTitle`
- `location`
- `meta`
- `sub`
- `notes`
- `galleries`
- `tags`

Optional:

- `pull`
- `heroImage`
- `heroTag`
- gallery `description`

For every image, provide `src`, `alt`, and `caption` where applicable.

### Work rules

- Use Tri-Pod Residence as the structural reference.
- Do not edit `WorkIndex`, `ProjectSpread`, `Filmstrip`, routing, or navigation for a normal new project.
- Numbering and previous/next behaviour are generated automatically from the collection.
- Keep gallery folders sequential and image filenames `01.webp`, `02.webp`, etc.

## 2. Visualisation scenes

Create:

`public/images/visualisation/<scene-slug>/`

Standard structure:

```text
scene-slug/
├── hero/
│   └── hero.webp        # optional
└── gallery-01/
    ├── 01.webp
    ├── 02.webp
    └── ...
```

Then add **one object** to `scenes` in `src/lib/portfolio-data.ts`.

Fields:

- `id`
- `sortOrder`
- `status`
- `year`
- `title`
- `description`
- optional `heroImage`
- `galleryDisplay`
- `galleryImages`

### Visualisation rules

- Use Living Room as the structural reference.
- A hero is optional.
- Do not edit the Visualisation component for normal scene additions.
- Scenes are independent studies; they do not need to belong to a client project.

## 3. Image rules

- Lowercase kebab-case for folders.
- `hero/hero.webp` for hero media.
- `gallery-01`, `gallery-02`, etc. for galleries.
- `01.webp`, `02.webp`, `03.webp`, etc. for images.
- Keep visitor-facing titles and descriptions in `portfolio-data.ts`, not filenames.
- Do not stretch or squash source images.
- Use the existing `DisplayPreset` values rather than creating one-off CSS for individual images.

## 4. Removing content

When removing a project or scene:

1. Remove its data object.
2. Remove its dedicated image folder.
3. Remove any related legacy asset metadata if it exists.
4. Search the repository for the old ID/title and remove stale references.
5. Do not restore deleted legacy projects or old asset registries.

## 5. What should remain stable

Normal content work must not require changes to:

- routing
- section navigation
- numbering logic
- gallery components
- project layout
- visualisation layout
- global styling

If a new project requires component changes, treat that as a reusable-system improvement first, not a project-specific patch.

## 6. Final verification

Before publishing:

1. Check every referenced image path exists.
2. Check `id` and folder names match.
3. Check `sortOrder` is unique.
4. Check the correct collection is used: `projects` or `scenes`.
5. Run `bun run build`.
6. Run `bun run lint`.
7. Search for the old project ID/title when deleting content.
