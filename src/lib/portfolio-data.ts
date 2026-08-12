import { img } from "./images";

export type Plate = { src: string; alt: string; caption: string };

export type Project = {
  id: string;
  number: string;
  title: string;
  indexTitle: string;
  location: string;
  meta: { label: string; value: string }[];
  /** mono strapline under the title: "Radhanpur, Gujarat — Design → Structural → Built" */
  sub: string;
  notes: string[];
  pull?: string;
  heroImage?: { src: string; alt: string } | null;
  heroTag?: string;
  galleryImages: { title: string; plates: Plate[] }[];
  tags: string[];
};

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
    src: img["p09-tri-pod-residence-exterior-render"],
    alt: "Terracotta-clad residential facade with vertical louvers at dusk",
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
    id: "pintubhai-bungalow",
    number: "01",
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
    },
    galleryImages: [
      {
        title: "Render Views",
        plates: [
          { src: img["p03-render-1"], alt: "Front render of the bungalow", caption: "Street Approach" },
          { src: img["p04-render-2"], alt: "Angled render of the bungalow", caption: "Corner Massing" },
          { src: img["p05-render-3"], alt: "Entrance render of the bungalow", caption: "Entrance & Gate" },
          { src: img["p06-render-4"], alt: "Evening render of the bungalow", caption: "Evening Study" },
        ],
      },
      {
        title: "Drawings & Details",
        plates: [
          {
            src: img["p07-ground-floor-plan-and-wall-cladding-detail"],
            alt: "Ground floor plan with wall cladding detail",
            caption: "Ground Floor Plan & Wall Cladding Detail",
          },
          {
            src: img["p08-front-elevation-and-section"],
            alt: "Front elevation and section drawing",
            caption: "Front Elevation & Section",
          },
        ],
      },
    ],
    tags: ["Ground Floor Planning", "Stone Cladding Detail", "Main Gate Design", "Structural Sections"],
  },
  {
    id: "tri-pod-residence",
    number: "02",
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
      src: img["p09-tri-pod-residence-exterior-render"],
      alt: "Exterior render of the Tri-Pod Residence facade",
    },
    galleryImages: [
      {
        title: "Facade Strategy & Elevations",
        plates: [
          { src: img["p10-tri-pod-residence-street-elevation"], alt: "Street elevation render", caption: "Street Elevation" },
          {
            src: img["p11-facade-strategy-diagram"],
            alt: "Diagram of the facade strategy",
            caption: "Vertical Anchor, Horizontal Flow, Material Layering",
          },
          { src: img["p12-north-elevation"], alt: "North elevation drawing", caption: "North Elevation" },
          { src: img["p13-balcony-edge-profile-detail"], alt: "Balcony edge profile detail", caption: "Curved Balcony Edge Profile" },
        ],
      },
    ],
    tags: ["Terracotta Cladding", "Vertical Louvers", "Curved Balconies", "Twinmotion Render"],
  },
  {
    id: "harekrushna-villa",
    number: "03",
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
    heroImage: { src: img["p14-harekrushna-villa-front-render"], alt: "Front render of Harekrushna Villa" },
    galleryImages: [
      {
        title: "Concept to Built",
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
    number: "04",
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
    heroImage: { src: img["p25-living-room-interior-render"], alt: "Living room interior render" },
    galleryImages: [
      {
        title: "Living Room",
        plates: [
          { src: img["p26-living-room-wide-view"], alt: "Wide view of the living room", caption: "Living Room" },
          { src: img["p27-living-room-alternate-angle"], alt: "Living room from an alternate angle", caption: "Alternate Angle" },
          { src: img["p28-tv-unit-detail"], alt: "Television unit detail", caption: "TV Unit Detail" },
          { src: img["p29-wall-art-detail"], alt: "Feature wall art detail", caption: "Feature Wall Art" },
        ],
      },
      {
        title: "Bedrooms & Study",
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
    number: "05",
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
    heroImage: { src: img["p34-bharatbhai-bunglow-exterior-render"], alt: "Exterior render of Bharatbhai Bungalow" },
    galleryImages: [
      {
        title: "Render Views",
        plates: [
          { src: img["p35-front-exterior-render"], alt: "Front exterior render", caption: "Front Exterior" },
          { src: img["p36-dusk-exterior-render"], alt: "Dusk exterior render", caption: "Dusk View" },
          { src: img["p37-side-angle-render"], alt: "Side elevation render", caption: "Side Elevation View" },
          { src: img["p38-outdoor-seating-area"], alt: "Outdoor seating area render", caption: "Outdoor Seating" },
          { src: img["p39-stone-water-feature"], alt: "Stone water feature in the garden", caption: "Landscape Water Feature" },
        ],
      },
    ],
    tags: ["Classical Elevation", "Landscape Design", "VR ArchiTechs Visualisation"],
  },
  {
    id: "wood-centric-living",
    number: "06",
    title: "Wood-Centric Minimalist Living Area",
    indexTitle: "Wood-Centric Minimalist Living",
    location: "Noida",
    meta: [
      { label: "Area", value: "320 sq.ft" },
      { label: "Scope", value: "Interior & Documentation" },
      { label: "Focus", value: "Compact Planning" },
    ],
    sub: "Noida — Interior Design",
    notes: [
      "A compact 320 sq.ft minimalist living area where fluted timber panelling, a marble-framed TV wall and a small shrine niche share one continuous material language — warm oak against cool white marble.",
      "Full-height glazing borrows the private garden as the room's fourth wall.",
    ],
    heroImage: { src: img["p40-wood-centric-living-area-render"], alt: "Wood-centric living area render" },
    galleryImages: [
      {
        title: "Living Area Views",
        plates: [
          { src: img["p41-glazed-corner-opening-to-garden"], alt: "Glazed corner opening to the garden", caption: "Glazed Corner & Private Garden" },
          { src: img["p42-seating-area-with-wooden-furniture"], alt: "Seating area with wooden furniture", caption: "Seating Area" },
          { src: img["p43-seating-area-alternate-view"], alt: "Seating area from an alternate view", caption: "Alternate View" },
          { src: img["p44-seating-area-with-study-nook"], alt: "Seating area with study nook", caption: "Seating with Study Nook" },
        ],
      },
    ],
    tags: ["Fluted Wood Paneling", "Puja Niche", "Compact Planning"],
  },
];

export type Scene = {
  id: string;
  number: string;
  name: string;
  note: string;
  heroImage?: { src: string; alt: string } | null;
  galleryImages: Plate[];
};

export const scenes: Scene[] = [
  {
    id: "scene-living",
    number: "I",
    name: "Living Room",
    note: "A burgundy bouclé chair set against marble and wood panelling, with terracotta figurative art holding the accent. The study is about how bouclé, stone and lacquer each take the same afternoon light.",
    heroImage: { src: img["r01-living-room-wide-presentation-render"], alt: "Wide presentation render of a living room" },
    galleryImages: [
      { src: img["r02-living-room-seating-detail"], alt: "Living room seating detail", caption: "Seating & Feature Wall" },
      { src: img["r03-living-room-sofa-and-art-detail"], alt: "Sofa and sculptural art detail", caption: "Sofa & Sculptural Art" },
      { src: img["r04-living-room-styling-detail-with-pouf"], alt: "Styling detail with pouf and console", caption: "Styling — Pouf & Console" },
    ],
  },
  {
    id: "scene-dining",
    number: "II",
    name: "Dining Room",
    note: "One layout, two material arguments: veined marble with circular wall art, and an ink-wash mural alternative. Both hang from the same bamboo-motif pendant so the comparison stays honest.",
    heroImage: null,
    galleryImages: [
      { src: img["r05-dining-room-marble-wall-variant"], alt: "Dining room with marble wall", caption: "Marble Variant — Front" },
      { src: img["r06-dining-room-ink-mural-variant"], alt: "Dining room with ink mural wall", caption: "Ink Mural Variant — Front" },
      { src: img["r07-dining-room-angled-view"], alt: "Angled view of the marble variant", caption: "Angled — Marble" },
      { src: img["r08-dining-room-angled-view-ink-mural"], alt: "Angled view of the ink mural variant", caption: "Angled — Ink Mural" },
    ],
  },
  {
    id: "scene-bathroom",
    number: "III",
    name: "Bathroom",
    note: "Sage cabinetry, textured marble tiling and a glazed walk-in shower lit from its niche — a spa register tested at close range, where grout and reflection decide the mood.",
    heroImage: null,
    galleryImages: [
      { src: img["r09-bathroom-wide-render"], alt: "Wide render of a sage-toned bathroom", caption: "Bathroom — Wide View" },
      { src: img["r10-bathroom-vanity-detail"], alt: "Bathroom vanity detail", caption: "Vanity & Mirror Wall" },
      { src: img["r11-bathroom-shower-detail"], alt: "Bathroom shower niche detail", caption: "Shower Niche Detail" },
    ],
  },
];

export const sections = [
  { id: "top", label: "Top" },
  { id: "visualisation", label: "Renders" },
  { id: "studio", label: "Studio" },
  { id: "work", label: "Work" },
  ...projects.map((p) => ({ id: p.id, label: p.number })),
  { id: "contact", label: "Contact" },
];
