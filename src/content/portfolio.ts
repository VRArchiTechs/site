import { gallery, imageSize, render } from "./renders";

export type Category = "Exterior" | "Interior" | "Visualisation" | "Commercial";
export type Filter = "All" | Category;

export type Project = {
  title: string;
  location: string;
  year: string;
  type: string;
  category: Category;
  summary: string;
  scope?: string;
  tags?: string[];
  image: string;
  width: number;
  height: number;
  images: string[];
};

export const logoMark = render("logo-mark.webp");
export const heroImage = render("landing/landing-image.webp");
export const portraitImage = render("profile/vishnu.webp");

export const projects: Project[] = [
  {
    title: "Tri-Pod Residence",
    location: "Ahmedabad",
    year: "2026",
    type: "G+3 Residential",
    category: "Exterior",
    summary:
      "A controlled balance between vertical emphasis and fluid horizontal movement within a compact G+3 residential form. A continuous louvered element establishes hierarchy and privacy; curved balcony edges soften the mass with a rhythmic, floor-by-floor progression. Terracotta cladding layered against neutral concrete adds depth to the street-facing elevation.",
    scope: "Facade · Planning · Visualisation",
    tags: ["Terracotta Cladding", "Vertical Louvers", "Curved Balconies", "Twinmotion"],
    image: render("work/tri-pod-residence/hero/hero.webp"),
    ...imageSize(render("work/tri-pod-residence/hero/hero.webp")),
    images: gallery("work/tri-pod-residence"),
  },
  {
    title: "Harekrushna Villa",
    location: "Radhanpur",
    year: "2026",
    type: "G+1 Villa",
    category: "Exterior",
    summary:
      "Classical elements — decorative pediments, symmetrical proportions and columned verandahs — reinterpreted through modern construction. Architecture, complete structural development, interiors, custom detailing and construction documentation carried through to a completed, built residence.",
    scope: "Architecture · Interior Design · Structural Design",
    tags: ["Residential Villa", "Structural Design", "Interior Design", "Enscape"],
    image: render("work/harekrushna-villa/hero/hero.webp"),
    ...imageSize(render("work/harekrushna-villa/hero/hero.webp")),
    images: gallery("work/harekrushna-villa"),
  },
  {
    title: "Residence 03B",
    location: "Bengaluru",
    year: "2025",
    type: "3BHK Residence · Design Proposal",
    category: "Interior",
    summary:
      "A design proposal for a 3BHK urban residence — a warm contemporary language of layered timber, muted wall surfaces, soft upholstery, marble accents and controlled architectural lighting, developed from measured elevations and sections to rendered space.",
    scope: "Interior Design · Space Planning · Documentation · Visualisation",
    tags: ["Space Planning", "Design Documentation", "3ds Max", "Corona Renderer"],
    image: render("work/residence-03b/hero/hero.webp"),
    ...imageSize(render("work/residence-03b/hero/hero.webp")),
    images: gallery("work/residence-03b"),
  },
];

type Viz = { title: string; note: string; summary: string; image: string; images: string[] };

const viz: Viz[] = [
  {
    title: "Living Room",
    note: "Material & light study",
    summary: "A controlled study of warm timber, soft daylight and layered seating composition.",
    image: render("visualisation/living-room/hero/hero.webp"),
    images: gallery("visualisation/living-room"),
  },
  {
    title: "Dining Room",
    note: "Material & light study",
    summary: "Material and artwork variants tested under controlled lighting conditions.",
    image: render("visualisation/dining-room/gallery-01/01.webp"),
    images: gallery("visualisation/dining-room"),
  },
  {
    title: "Bathroom",
    note: "Material & light study",
    summary: "A compact material study focused on stone, vanity joinery and reflective surfaces.",
    image: render("visualisation/bath-room/gallery-01/01.webp"),
    images: gallery("visualisation/bath-room"),
  },
];

export const allWork: Project[] = [
  ...projects,
  ...viz.map((v) => ({
    title: v.title,
    location: "Visualisation Studio",
    year: "2026",
    type: v.note,
    category: "Visualisation" as const,
    summary: v.summary,
    scope: "Interior Visualisation",
    image: v.image,
    ...imageSize(v.image),
    images: v.images,
  })),
];

export const filters: Filter[] = ["All", "Exterior", "Interior", "Visualisation"];

export const navLinks: { href: string; label: string; filter?: Filter }[] = [
  { href: "#work", label: "Work", filter: "All" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/vrarchitechs/", handle: "@vrarchitechs" },
  { label: "Pinterest", href: "https://in.pinterest.com/vr_architechs/", handle: "vr_architechs" },
];

export const contactEmail = "ahirvishnu111@gmail.com";