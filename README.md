# VR ArchiTechs — Portfolio

Editorial portfolio site for Vishnu Ahir / VR ArchiTechs.

The site is intentionally content-driven: **Work** and **Visualisation** are collections rendered by reusable components. Adding normal content should not require component, routing, or layout changes.

## Content workflow

See [`docs/CONTENT_WORKFLOW.md`](docs/CONTENT_WORKFLOW.md) for the single source of truth for adding, editing, and removing projects.

### Canonical templates

- **Work:** `Tri-Pod Residence`
- **Visualisation:** `Living Room`

Use those entries as structural examples for future content. Do not copy legacy asset metadata or create one-off component variants for individual projects.

## Project structure

```text
public/images/
├── landing/
├── profile/
├── work/
│   └── project-slug/
└── visualisation/
    └── scene-slug/

src/
├── components/site/     # reusable presentation components
├── lib/
│   ├── portfolio-data.ts # editable portfolio content
│   ├── site-assets.ts    # site-wide image references
│   └── work.ts           # Work collection helpers
└── routes/              # application routes
```

## Development

```sh
bun install
bun run dev
```

Before publishing content changes:

```sh
bun run build
bun run lint
```

The repository is connected to Lovable; keep `main` in a working state and do not rewrite published Git history.
