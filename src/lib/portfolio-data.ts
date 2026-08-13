import { images } from "./image-registry";
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
      src: images.work.triPodResidence.hero,
      alt: "Street perspective render of Tri-Pod Residence",
      display: "16:9-cover",
    },
    galleries: [
      {
        title: "Facade Strategy & Elevations",
        display: "4:3-cover",
        plates: images.work.triPodResidence.gallery01.map((src, index) => ({
          src,
          alt: [
            "Street perspective render of Tri-Pod Residence",
            "Annotated front elevation strategy drawing for Tri-Pod Residence",
            "Annotated side elevation strategy drawing for Tri-Pod Residence",
            "Architectural detail of the curved balcony edge",
          ][index],
          caption: [
            "Street Perspective Render",
            "Front Elevation Strategy",
            "Side Elevation Strategy",
            "Curved Balcony Edge Detail",
          ][index],
        })),
      },
    ],
    tags: ["Terracotta Cladding", "Vertical Louvers", "Curved Balconies", "Twinmotion Render"],
  },
  {
    id: "harekrushna-villa",
    sortOrder: 20,
    status: "published",
    year: 2026,
    title: "Harekrushna Villa",
    indexTitle: "Harekrushna Villa",
    location: "Radhanpur",
    meta: [
      { label: "Scope", value: "Architecture · Interior Design · Structural Design" },
      { label: "Floors", value: "G+1" },
      { label: "Software", value: "AutoCAD · SketchUp · Enscape" },
    ],
    sub: "Radhanpur — Architecture · Interior Design · Structural Design",
    notes: [
      "The project explores a balanced integration of architecture, structural engineering, and interior design within a contemporary villa typology. Classical architectural elements such as decorative pediments, symmetrical proportions, and columned verandahs are reinterpreted through modern construction techniques and spatial planning.",
      "The design extended beyond architectural planning to include complete structural development, interior design, custom detailing, visualization, and construction documentation. The completed residence demonstrates the successful translation of design intent into built reality while maintaining consistency across architectural, interior, and technical disciplines.",
    ],
    pull: "A balanced residential study where architectural character, structural logic and interior design are resolved as one continuous design process.",
    heroImage: {
      src: images.work.harekrushnaVilla.hero,
      alt: "Harekrushna Villa architectural visualisation",
      display: "16:9-cover",
    },
    galleries: [
      {
        title: "Architectural Design Studies",
        description: "Architectural, facade and design documentation studies for Harekrushna Villa.",
        display: "4:3-cover",
        plates: images.work.harekrushnaVilla.gallery01.map((src, index) => ({
          src,
          alt: `Harekrushna Villa architectural design study ${index + 1}`,
          caption: `Design Study ${String(index + 1).padStart(2, "0")}`,
        })),
      },
      {
        title: "Visualisation Studies",
        description: "Selected visualisation and presentation studies for the completed residence.",
        display: "4:3-cover",
        plates: images.work.harekrushnaVilla.gallery02.map((src, index) => ({
          src,
          alt: `Harekrushna Villa visualisation study ${index + 1}`,
          caption: `Visualisation ${String(index + 1).padStart(2, "0")}`,
        })),
      },
    ],
    tags: ["Residential Villa", "Architecture", "Interior Design", "Structural Design", "Enscape"],
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
      src: images.visualisation.livingRoom.hero,
      alt: "Wide living room visualisation",
      display: "16:9-cover",
    },
    galleryDisplay: "3:4-cover",
    galleryImages: images.visualisation.livingRoom.gallery01.map((src, index) => ({
      src,
      alt: [
        "Living room seating detail",
        "Living room sofa and art detail",
        "Living room styling detail with pouf",
      ][index],
      caption: ["Seating Detail", "Sofa & Art", "Styling Study"][index],
    })),
  },
  {
    id: "dining-room",
    sortOrder: 20,
    status: "published",
    year: 2026,
    title: "Dining Room",
    description: "Material and artwork variants tested under controlled lighting conditions.",
    galleryDisplay: "3:4-cover",
    galleryImages: images.visualisation.diningRoom.gallery01.map((src, index) => ({
      src,
      alt: [
        "Dining room marble wall variant",
        "Dining room ink mural variant",
        "Dining room angled view",
        "Dining room angled view with ink mural",
      ][index],
      caption: [
        "Marble Wall Variant",
        "Ink Mural Variant",
        "Angled View",
        "Angled Mural Study",
      ][index],
    })),
  },
  {
    id: "bathroom",
    sortOrder: 30,
    status: "published",
    year: 2026,
    title: "Bathroom",
    description: "A compact material study focused on stone, vanity joinery and reflective surfaces.",
    galleryDisplay: "3:4-cover",
    galleryImages: images.visualisation.bathroom.gallery01.map((src, index) => ({
      src,
      alt: [
        "Wide bathroom visualisation",
        "Bathroom vanity detail",
        "Bathroom shower detail",
      ][index],
      caption: ["Wide View", "Vanity Detail", "Shower Detail"][index],
    })),
  },
];
