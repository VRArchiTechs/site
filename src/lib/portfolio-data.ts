import { img } from "./images";
import type { DisplayPreset } from "./display-presets";

export type Plate = { src: string; alt: string; caption: string };

export type WorkGallery = {
  title: string;
  description?: string;
  type: "render" | "drawing" | "site" | "photo";
  display: DisplayPreset;
  plates: Plate[];
};

export type ProjectStatus = "published" | "draft" | "private";

export type Project = {
  id: string;
  sortOrder: number;
  status: ProjectStatus;
  year: number;
  title: string;
  indexTitle: string;
  location: string;
  meta: { label: string; value: string }[];
  sub: string;
  notes: string[];
  pull?: string;
  heroImage?: { src: string; alt: string; display: DisplayPreset } | null;
  heroTag?: string;
  galleries: WorkGallery[];
  tags: string[];
};

export type VisualisationScene = {
  id: string;
  slug: string;
  sortOrder: number;
  status: ProjectStatus;
  year: number;
  title: string;
  description: string;
  metadata: { label: string; value: string }[];
  heroImage?: { src: string; alt: string; display: DisplayPreset };
  galleryDisplay: DisplayPreset;
  galleryImages: Plate[];
  tags: string[];
};

export const sections = [
  { id: "hero", label: "Landing" },
  { id: "studio", label: "Studio" },
  { id: "visualisation", label: "Visualisation" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

// ... existing studio and projects data remains unchanged ...

export const scenes: VisualisationScene[] = [
  {
    id: "living-room",
    slug: "living-room",
    sortOrder: 10,
    status: "published",
    year: 2026,
    title: "Living Room",
    description: "A controlled study of warm timber, soft daylight and layered seating composition.",
    metadata: [],
    heroImage: {
      src: img["r01-living-room-wide-presentation-render"],
      alt: "Wide living room visualisation",
      display: "16:9-cover",
    },
    galleryDisplay: "3:4-cover",
    galleryImages: [
      { src: img["r02-living-room-seating-detail"], alt: "Living room seating detail", caption: "Seating Detail" },
      { src: img["r03-living-room-sofa-and-art-detail"], alt: "Living room sofa and art detail", caption: "Sofa & Art" },
      { src: img["r04-living-room-styling-detail-with-pouf"], alt: "Living room styling detail with pouf", caption: "Styling Study" },
    ],
    tags: [],
  },
  {
    id: "dining-room",
    slug: "dining-room",
    sortOrder: 20,
    status: "published",
    year: 2026,
    title: "Dining Room",
    description: "Material and artwork variants tested under controlled lighting conditions.",
    metadata: [],
    galleryDisplay: "3:4-cover",
    galleryImages: [
      { src: img["r05-dining-room-marble-wall-variant"], alt: "Dining room marble wall variant", caption: "Marble Wall Variant" },
      { src: img["r06-dining-room-ink-mural-variant"], alt: "Dining room ink mural variant", caption: "Ink Mural Variant" },
      { src: img["r07-dining-room-angled-view"], alt: "Dining room angled view", caption: "Angled View" },
      { src: img["r08-dining-room-angled-view-ink-mural"], alt: "Dining room angled view with ink mural", caption: "Angled Mural Study" },
    ],
    tags: [],
  },
  {
    id: "bathroom",
    slug: "bathroom",
    sortOrder: 30,
    status: "published",
    year: 2026,
    title: "Bathroom",
    description: "A compact material study focused on stone, vanity joinery and reflective surfaces.",
    metadata: [],
    galleryDisplay: "3:4-cover",
    galleryImages: [
      { src: img["r09-bathroom-wide-render"], alt: "Wide bathroom visualisation", caption: "Wide View" },
      { src: img["r10-bathroom-vanity-detail"], alt: "Bathroom vanity detail", caption: "Vanity Detail" },
      { src: img["r11-bathroom-shower-detail"], alt: "Bathroom shower detail", caption: "Shower Detail" },
    ],
    tags: [],
  },
];
