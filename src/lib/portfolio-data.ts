import { siteAssets } from "./site-assets";
import type { DisplayPreset } from "./display-presets";

export type Plate = { src: string; alt: string; caption: string };

export type WorkGallery = {
  title: string;
  description?: string;
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
  sortOrder: number;
  status: ProjectStatus;
  year: number;
  title: string;
  description: string;
  heroImage?: { src: string; alt: string; display: DisplayPreset };
  galleryDisplay: DisplayPreset;
  galleryImages: Plate[];
};

export const sections = [
  { id: "hero", label: "Landing" },
  { id: "studio", label: "Studio" },
  { id: "visualisation", label: "Visualisation" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export const studio = {
  name: "Vishnu Ahir",
  practice: "VR ArchiTechs",
  role: "Engineer & Architecture Designer",
  city: "Gandhinagar, Gujarat",
  email: "ahirvishnu111@gmail.com",
  phone: "+91 90999 51391",
  philosophy:
    "Buildings should be read slowly — material by material, joint by joint.",
  portrait: { src: siteAssets.studioPortrait, alt: "Portrait of Vishnu Ahir" },
  landingImage: {
    src: siteAssets.landing,
    alt: "Homepage landing image",
  },
  bio: [
    "Trained as an engineer and practising as a designer, I work across the whole lifecycle of a house — the plan, the frame that holds it up, and the rooms people finally live in. Nothing is handed off; drawings, structure and interior are resolved together, on the same table.",
    "My interest sits in material behaviour. How bamboo, steel, brick and concrete meet — and misbehave — decides the character of a space long before finishes arrive. Climate and culture set the rest: openings sized for Gujarat's light, thresholds shaped by how a family actually moves through a day.",
  ],
  pullQuote:
    "Detail is not decoration. It is the moment where an idea agrees to be built.",
  facts: [
    { label: "Discipline", value: "Architecture · Structure · Interior" },
    { label: "Approach", value: "One team from plan to handover" },
    { label: "Software", value: "AutoCAD · SketchUp · Twinmotion · Enscape" },
  ],
};

export const projects: Project[] = [
  {
    id: "tri-pod-residence",
    sortOrder: 10,
    status: "published",
    year: 2026,
    title: "Tri-Pod Residence",
    indexTitle: "Tri-Pod Residence",
    location: "Ahmedabad",
    meta: [
      { label: "Scope", value: "Facade · Planning · Visualisation" },
      { label: "Floors", value: "G+3 Residential" },
      { label: "Tools", value: "AutoCAD · SketchUp · Twinmotion" },
    ],
    sub: "Ahmedabad, Gujarat — Facade Design · Planning · Visualisation",
    notes: [
      "A controlled balance between vertical emphasis and fluid horizontal movement within a compact G+3 residential form. A continuous louvered element establishes hierarchy and privacy; curved balcony edges soften the mass with a rhythmic, floor-by-floor progression.",
      "Terracotta cladding is layered against neutral concrete to define primary zones and add depth to the street-facing elevation.",
    ],
    pull: "The composition responds to both scale and context — introducing rhythm, privacy and a distinct architectural identity.",
    heroImage: {
      src: "/images/work/tri-pod-residence/hero/hero.webp",
      alt: "Street perspective render of Tri-Pod Residence",
      display: "16:9-cover",
    },
    galleries: [
      {
        title: "Facade Strategy & Elevations",
        display: "4:3-cover",
        plates: [
          { src: "/images/work/tri-pod-residence/gallery-01/01.webp", alt: "Street perspective render of Tri-Pod Residence", caption: "Street Perspective Render" },
          { src: "/images/work/tri-pod-residence/gallery-01/02.webp", alt: "Annotated front elevation strategy drawing for Tri-Pod Residence", caption: "Front Elevation Strategy" },
          { src: "/images/work/tri-pod-residence/gallery-01/03.webp", alt: "Annotated side elevation strategy drawing for Tri-Pod Residence", caption: "Side Elevation Strategy" },
          { src: "/images/work/tri-pod-residence/gallery-01/04.webp", alt: "Architectural detail of the curved balcony edge", caption: "Curved Balcony Edge Detail" },
        ],
      },
    ],
    tags: ["Terracotta Cladding", "Vertical Louvers", "Curved Balconies", "Twinmotion Render"],
  },
];

export const scenes: VisualisationScene[] = [
  {
    id: "living-room",
    sortOrder: 10,
    status: "published",
    year: 2026,
    title: "Living Room",
    description: "A controlled study of warm timber, soft daylight and layered seating composition.",
    heroImage: {
      src: "/images/visualisation/living-room/hero/hero.webp",
      alt: "Wide living room visualisation",
      display: "16:9-cover",
    },
    galleryDisplay: "3:4-cover",
    galleryImages: [
      { src: "/images/visualisation/living-room/gallery-01/01.webp", alt: "Living room seating detail", caption: "Seating Detail" },
      { src: "/images/visualisation/living-room/gallery-01/02.webp", alt: "Living room sofa and art detail", caption: "Sofa & Art" },
      { src: "/images/visualisation/living-room/gallery-01/03.webp", alt: "Living room styling detail with pouf", caption: "Styling Study" },
    ],
  },
  {
    id: "dining-room",
    sortOrder: 20,
    status: "published",
    year: 2026,
    title: "Dining Room",
    description: "Material and artwork variants tested under controlled lighting conditions.",
    galleryDisplay: "3:4-cover",
    galleryImages: [
      { src: "/images/visualisation/dining-room/gallery-01/01.webp", alt: "Dining room marble wall variant", caption: "Marble Wall Variant" },
      { src: "/images/visualisation/dining-room/gallery-01/02.webp", alt: "Dining room ink mural variant", caption: "Ink Mural Variant" },
      { src: "/images/visualisation/dining-room/gallery-01/03.webp", alt: "Dining room angled view", caption: "Angled View" },
      { src: "/images/visualisation/dining-room/gallery-01/04.webp", alt: "Dining room angled view with ink mural", caption: "Angled Mural Study" },
    ],
  },
  {
    id: "bathroom",
    sortOrder: 30,
    status: "published",
    year: 2026,
    title: "Bathroom",
    description: "A compact material study focused on stone, vanity joinery and reflective surfaces.",
    galleryDisplay: "3:4-cover",
    galleryImages: [
      { src: "/images/visualisation/bath-room/gallery-01/01.webp", alt: "Wide bathroom visualisation", caption: "Wide View" },
      { src: "/images/visualisation/bath-room/gallery-01/02.webp", alt: "Bathroom vanity detail", caption: "Vanity Detail" },
      { src: "/images/visualisation/bath-room/gallery-01/03.webp", alt: "Bathroom shower detail", caption: "Shower Detail" },
    ],
  },
];
