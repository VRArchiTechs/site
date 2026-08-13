# Portfolio images

Portfolio media lives under this directory and follows the content workflow in [`/docs/CONTENT_WORKFLOW.md`](../../docs/CONTENT_WORKFLOW.md).

```text
images/
├── landing/
│   └── landing-image.webp
├── profile/
│   └── vishnu.webp
├── work/
│   └── <project-slug>/
│       ├── hero/hero.webp
│       └── gallery-01/01.webp
└── visualisation/
    └── <scene-slug>/
        ├── hero/hero.webp       # optional
        └── gallery-01/01.webp
```

Use lowercase kebab-case for project/scene folders and sequential filenames inside galleries. Image paths are referenced directly by `src/lib/portfolio-data.ts`.
