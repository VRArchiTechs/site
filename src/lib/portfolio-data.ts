import { images } from "./image-registry";
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

// Existing studio data
export const studio = {
  name: "Vishnu Ahir",
  practice: "VR ArchiTechs",
  role: "Engineer & Architecture Designer",
  city: "Gandhinagar, Gujarat",
  email: "ahirvishnu111@gmail.com",
  phone: "+91 90999 51391",
  philosophy:
    "Buildings should be read slowly — material by material, joint by joint.",
  portrait: { src: img["p01-vishnu-ahir-portrait"], alt: "Portrait of Vishnu Ahir" },
  landingImage: {
    src: img["landing-image"],
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

// Existing Work project data
export const projects: Project[] = [
  {
    id: "pintubhai-bungalow",
    sortOrder: 20,
    status: "published",
    year: 2026,
    title: "Bungalow for Mr. Pintubhai",
    indexTitle: "Bungalow for Mr. Pintubhai",
    location: "Gandhinagar",
    meta: [
      { label: "Scope", value: "Architecture & Structure" },
      { label: "Type", value: "Residential Bungalow" },
      { label: "Delivery", value: "Drawings to Render" },
    ],
    sub: "Gandhinagar, Gujarat — Plan → Elevation → Section → Detail",
    notes: [
      "A ground-up residential project carried through complete construction documentation — floor plans, elevations, sections and wall cladding details, coordinated down to stone cladding profiles and RCC chaja levels.",
      "This is the layer that sits underneath every render on this page: the working drawing set a contractor actually builds from.",
    ],
    pull: "Every finished render starts as a dimensioned line drawing — this is that layer, shown in full.",
    heroImage: {
      src: img["p02-bungalow-for-mr-pintubhai-render-view"],
      alt: "Render view of a compact stone-clad residential bungalow",
      display: "16:9-cover",
    },
    galleries: [
      {
        title: "Render Views",
        type: "render",
        display: "4:3-cover",
        plates: [
          { src: img["p03-render-1"], alt: "Front render of the bungalow", caption: "Street Approach" },
          { src: img["p04-render-2"], alt: "Angled render of the bungalow", caption: "Corner Massing" },
          { src: img["p05-render-3"], alt: "Entrance render of the bungalow", caption: "Entrance & Gate" },
          { src: img["p06-render-4"], alt: "Evening render of the bungalow", caption: "Evening Study" },
        ],
      },
      {
        title: "Drawings & Details",
        type: "drawing",
        display: "4:3-contain",
        plates: [
          { src: img["p07-ground-floor-plan-and-wall-cladding-detail"], alt: "Ground floor plan with wall cladding detail", caption: "Ground Floor Plan & Wall Cladding Detail" },
          { src: img["p08-front-elevation-and-section"], alt: "Front elevation and section drawing", caption: "Front Elevation & Section" },
        ],
      },
    ],
    tags: ["Ground Floor Planning", "Stone Cladding Detail", "Main Gate Design", "Structural Sections"],
  },
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
      src: `${images.work.triPodResidence.hero}/hero.webp`,
      alt: "Street perspective render of Tri-Pod Residence",
      display: "16:9-cover",
    },
    galleries: [
      {
        title: "Facade Strategy & Elevations",
        type: "drawing",
        display: "4:3-cover",
        plates: [
          { src: `${images.work.triPodResidence.gallery01}/01.webp`, alt: "Street perspective render of Tri-Pod Residence", caption: "Street Perspective Render" },
          { src: `${images.work.triPodResidence.gallery01}/02.webp`, alt: "Annotated front elevation strategy drawing for Tri-Pod Residence", caption: "Front Elevation Strategy" },
          { src: `${images.work.triPodResidence.gallery01}/03.webp`, alt: "Annotated side elevation strategy drawing for Tri-Pod Residence", caption: "Side Elevation Strategy" },
          { src: `${images.work.triPodResidence.gallery01}/04.webp`, alt: "Architectural detail of the curved balcony edge", caption: "Curved Balcony Edge Detail" },
        ],
      },
    ],
    tags: ["Terracotta Cladding", "Vertical Louvers", "Curved Balconies", "Twinmotion Render"],
  },
  {
    id: "harekrushna-villa",
    sortOrder: 30,
    status: "published",
    year: 2026,
    title: "Harekrushna Villa",
    indexTitle: "Harekrushna Villa",
    location: "Radhanpur",
    meta: [
      { label: "Scope", value: "Architecture · Interior · Structure" },
      { label: "Floors", value: "G+1 · 5,000 sq.ft plot" },
      { label: "Programme", value: "7 Bed · 5 Bath" },
    ],
    sub: "Radhanpur, Gujarat — Design → Structural → Interior → Built",
    notes: [
      "A balanced integration of architecture, structural engineering and interior design within a contemporary villa typology. Classical elements — pediments, symmetrical proportions, columned verandahs — are reinterpreted through modern construction and spatial planning.",
      "The scope ran past the drawing board: structural development, interior design, custom detailing and full construction documentation, carried through to a completed, occupied residence.",
    ],
    pull: "The completed residence demonstrates the translation of design intent into a built reality — with consistency held across architecture, interior and technical disciplines.",
    heroImage: { src: img["p14-harekrushna-villa-front-render"], alt: "Front render of Harekrushna Villa", display: "16:9-cover" },
    galleries: [
      {
        title: "Concept to Built",
        type: "site",
        display: "4:3-contain",
        plates: [
          { src: img["p15-completed-villa-at-dusk"], alt: "Completed villa photographed at dusk", caption: "Completed & Built" },
          { src: img["p16-site-under-construction"], alt: "Site photograph during construction", caption: "Site — Under Construction" },
          { src: img["p17-foundation-stage"], alt: "Foundation stage on site", caption: "Foundation Stage" },
          { src: img["p18-structure-completed"], alt: "Completed structural frame", caption: "Structure Completed" },
          { src: img["p19-finishing-stage"], alt: "Finishing stage on site", caption: "Finishing Stage" },
          { src: img["p20-floor-plan"], alt: "Villa floor plan drawing", caption: "Floor Plan" },
        ],
      },
      {
        title: "Interior Experience",
        type: "photo",
        display: "4:3-contain",
        plates: [
          { src: img["p21-dining-area"], alt: "Dining area interior", caption: "Dining Area" },
          { src: img["p22-guest-bedroom"], alt: "Guest bedroom interior", caption: "Guest Bedroom" },
          { src: img["p23-master-bedroom"], alt: "Master bedroom interior", caption: "Master Bedroom" },
          { src: img["p24-puja-room"], alt: "Puja room interior", caption: "Puja Room" },
        ],
      },
    ],
    tags: ["Classical Facade", "Structural Documentation", "Full Interior Design", "Site Supervision"],
  },
  {
    id: "rupesh-interior",
    sortOrder: 40,
    status: "published",
    year: 2026,
    title: "Interior for Mr. Rupesh",
    indexTitle: "Interior for Mr. Rupesh",
    location: "Delhi",
    meta: [
      { label: "Area", value: "1,500 sq.ft" },
      { label: "Scope", value: "Interior Design & Visualisation" },
      { label: "Rooms", value: "Living · Study · Bedrooms" },
    ],
    sub: "Delhi — Full Interior Design",
    notes: [
      "A cohesive 1,500 sq.ft interior built on elegant materials, warm lighting and thoughtful detailing — a geometric wood-and-mirror feature wall carries through from the living area into the master bedroom, tying the apartment together.",
      "Every custom piece — the TV unit, the wardrobe, the walk-in closet — was drawn and dimensioned before it was rendered.",
    ],
    pull: "Each space is crafted to offer comfort and a timeless sense of luxury, while holding visual harmony throughout the residence.",
    heroImage: { src: img["p25-living-room-interior-render"], alt: "Living room interior render", display: "16:9-cover" },
    galleries: [
      {
        title: "Living Room",
        type: "render",
        display: "4:3-cover",
        plates: [
          { src: img["p26-living-room-wide-view"], alt: "Wide view of the living room", caption: "Living Room" },
          { src: img["p27-living-room-alternate-angle"], alt: "Living room from an alternate angle", caption: "Alternate Angle" },
          { src: img["p28-tv-unit-detail"], alt: "Television unit detail", caption: "TV Unit Detail" },
          { src: img["p29-wall-art-detail"], alt: "Feature wall art detail", caption: "Feature Wall Art" },
        ],
      },
      {
        title: "Bedrooms & Study",
        type: "render",
        display: "4:3-cover",
        plates: [
          { src: img["p30-study-nook"], alt: "Study nook interior", caption: "Study Nook" },
          { src: img["p31-bedroom-with-study-desk"], alt: "Bedroom with study desk", caption: "Bedroom with Study Desk" },
          { src: img["p32-master-bedroom"], alt: "Master bedroom interior", caption: "Master Bedroom" },
          { src: img["p33-bedroom-tv-feature-wall"], alt: "Bedroom television feature wall", caption: "Bedroom Feature Wall" },
        ],
      },
    ],
    tags: ["Feature Wall Design", "Cove Lighting", "Custom Furniture"],
  },
  {
    id: "bharatbhai-bungalow",
    sortOrder: 50,
    status: "published",
    year: 2026,
    title: "Bharatbhai Bungalow",
    indexTitle: "Bharatbhai Bungalow",
    location: "Ahmedabad",
    meta: [
      { label: "Area", value: "3,000 sq.ft" },
      { label: "Scope", value: "Architecture & Landscape" },
      { label: "Storeys", value: "Two" },
    ],
    sub: "Ahmedabad, Gujarat — Visualisation, with VR ArchiTechs",
    notes: [
      "A 3,000 sq.ft classical villa set within a landscaped garden — arched porticos, balustraded balconies and a stone water feature framed against dense planting.",
      "Balconies wrap the upper floor for shade, and the seating court is kept deliberately dark and cool. Visualisation work produced in collaboration with VR ArchiTechs.",
    ],
    heroImage: { src: img["p34-bharatbhai-bunglow-exterior-render"], alt: "Exterior render of Bharatbhai Bungalow", display: "16:9-cover" },
    galleries: [
      {
        title: "Render Views",
        type: "render",
        display: "4:3-cover",
        plates: [
          { src: img["p35-front-exterior-render"], alt: "Front exterior render", caption: "Front Exterior" },
          { src: img["p36-dusk-exterior-render"], alt: "Dusk exterior render", caption: "Dusk View" },
          { src: img["p37-side-angle-render"], alt: "Side angle exterior render", caption: "Side Angle" },
          { src: img["p38-outdoor-seating-area"], alt: "Outdoor seating area", caption: "Outdoor Seating" },
          { src: img["p39-stone-water-feature"], alt: "Stone water feature detail", caption: "Stone Water Feature" },
        ],
      },
      {
        title: "Wood-Centric Living Area",
        type: "render",
        display: "4:3-cover",
        plates: [
          { src: img["p40-wood-centric-living-area-render"], alt: "Wood-centric living area render", caption: "Living Area" },
          { src: img["p41-glazed-corner-opening-to-garden"], alt: "Glazed corner opening to garden", caption: "Glazed Corner" },
          { src: img["p42-seating-area-with-wooden-furniture"], alt: "Seating area with wooden furniture", caption: "Seating Composition" },
          { src: img["p43-seating-area-alternate-view"], alt: "Seating area alternate view", caption: "Alternate View" },
          { src: img["p44-seating-area-with-study-nook"], alt: "Seating area with study nook", caption: "Study Nook" },
        ],
      },
    ],
    tags: ["Classical Facade", "Landscape Design", "Stone Water Feature"],
  },
  {
    id: "wood-centric-living",
    sortOrder: 60,
    status: "published",
    year: 2026,
    title: "Wood-Centric Minimalist Living Area",
    indexTitle: "Wood-Centric Minimalist Living",
    location: "Noida",
    meta: [
      { label: "Area", value: "1,200 sq.ft" },
      { label: "Scope", value: "Interior Design & Visualisation" },
      { label: "Style", value: "Warm Minimalism" },
    ],
    sub: "Noida, Delhi NCR — Interior & Visualisation",
    notes: [
      "A warm minimalist living space centred around timber grain, soft daylight and restrained furniture. The palette is deliberately quiet so that texture, joinery and proportion carry the visual weight.",
    ],
    heroImage: { src: img["p40-wood-centric-living-area-render"], alt: "Wood-centric minimalist living area", display: "16:9-cover" },
    galleries: [
      {
        title: "Living Area",
        type: "render",
        display: "4:3-cover",
        plates: [
          { src: img["p41-glazed-corner-opening-to-garden"], alt: "Glazed corner opening to garden", caption: "Glazed Corner" },
          { src: img["p42-seating-area-with-wooden-furniture"], alt: "Seating area with wooden furniture", caption: "Seating Composition" },
          { src: img["p43-seating-area-alternate-view"], alt: "Seating area alternate view", caption: "Alternate View" },
          { src: img["p44-seating-area-with-study-nook"], alt: "Seating area with study nook", caption: "Study Nook" },
        ],
      },
    ],
    tags: ["Warm Minimalism", "Timber", "Daylight Study"],
  },
];

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
    heroImage: { src: `${images.visualisation.livingRoom.hero}/hero.webp`, alt: "Wide living room visualisation", display: "16:9-cover" },
    galleryDisplay: "3:4-cover",
    galleryImages: [
      { src: `${images.visualisation.livingRoom.gallery01}/01.webp`, alt: "Living room seating detail", caption: "Seating Detail" },
      { src: `${images.visualisation.livingRoom.gallery01}/02.webp`, alt: "Living room sofa and art detail", caption: "Sofa & Art" },
      { src: `${images.visualisation.livingRoom.gallery01}/03.webp`, alt: "Living room styling detail with pouf", caption: "Styling Study" },
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
      { src: `${images.visualisation.diningRoom.gallery01}/01.webp`, alt: "Dining room marble wall variant", caption: "Marble Wall Variant" },
      { src: `${images.visualisation.diningRoom.gallery01}/02.webp`, alt: "Dining room ink mural variant", caption: "Ink Mural Variant" },
      { src: `${images.visualisation.diningRoom.gallery01}/03.webp`, alt: "Dining room angled view", caption: "Angled View" },
      { src: `${images.visualisation.diningRoom.gallery01}/04.webp`, alt: "Dining room angled view with ink mural", caption: "Angled Mural Study" },
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
      { src: `${images.visualisation.bathroom.gallery01}/01.webp`, alt: "Wide bathroom visualisation", caption: "Wide View" },
      { src: `${images.visualisation.bathroom.gallery01}/02.webp`, alt: "Bathroom vanity detail", caption: "Vanity Detail" },
      { src: `${images.visualisation.bathroom.gallery01}/03.webp`, alt: "Bathroom shower detail", caption: "Shower Detail" },
    ],
    tags: [],
  },
];
