import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Instagram, Mail, Phone } from "lucide-react";
import { Cursor } from "@/components/site/Cursor";
import { render, gallery } from "@/content/renders";

const hero = render("landing/landing-image.webp");
const portrait = render("profile/vishnu.webp");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VR ArchiTechs — Architecture & Visualisation Studio" },
      { name: "description", content: "Bespoke residences, interior architecture and photorealistic 3D visualisation by VR ArchiTechs — based in Gandhinagar, working on projects worldwide." },
      { property: "og:title", content: "VR ArchiTechs — Architecture & Visualisation Studio" },
      { property: "og:description", content: "Bespoke residences, interior architecture and photorealistic 3D visualisation by Vishnu Ahir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Category = "Exterior" | "Interior" | "Visualisation" | "Commercial";
type Filter = "All" | Category;

type Project = {
  title: string;
  location: string;
  year: string;
  type: string;
  category: Category;
  summary: string;
  scope?: string;
  tags?: string[];
  image: string;
  images: string[];
};

const projects: Project[] = [
  {
    title: "Tri-Pod Residence",
    location: "Ahmedabad",
    year: "2026",
    type: "G+3 Residential",
    category: "Exterior",
    summary: "A controlled balance between vertical emphasis and fluid horizontal movement within a compact G+3 residential form. A continuous louvered element establishes hierarchy and privacy; curved balcony edges soften the mass floor by floor.",
    scope: "Facade · Planning · Visualisation",
    tags: ["Terracotta Cladding", "Vertical Louvers", "Curved Balconies", "Twinmotion"],
    image: render("work/tri-pod-residence/hero/hero.webp"),
    images: gallery("work/tri-pod-residence"),
  },
  {
    title: "Harekrushna Villa",
    location: "Radhanpur",
    year: "2026",
    type: "G+1 Villa",
    category: "Exterior",
    summary: "Classical elements — decorative pediments, symmetrical proportions and columned verandahs — reinterpreted through modern construction, with architecture, structure and interiors resolved as one continuous process.",
    scope: "Architecture · Interior · Structural Design",
    tags: ["Residential Villa", "Structural Design", "Interior Design", "Enscape"],
    image: render("work/harekrushna-villa/hero/hero.webp"),
    images: gallery("work/harekrushna-villa"),
  },
  {
    title: "Residence 03B",
    location: "Bengaluru",
    year: "2025",
    type: "3BHK Residence · Design Proposal",
    category: "Interior",
    summary: "A warm contemporary language of layered timber, muted wall surfaces, soft upholstery, marble accents and controlled architectural lighting — developed from measured drawings to rendered space.",
    scope: "Interior Design · Documentation · Visualisation",
    tags: ["Layered Timber", "Marble Accents", "3ds Max", "Corona"],
    image: render("work/residence-03b/hero/hero.webp"),
    images: gallery("work/residence-03b"),
  },
];

type Viz = { title: string; note: string; summary: string; image: string; images: string[] };

const viz: Viz[] = [
  { title: "Living Room", note: "Interior CGI study", summary: "A controlled study of warm timber, soft daylight and layered seating composition.", image: render("visualisation/living-room/hero/hero.webp"), images: gallery("visualisation/living-room") },
  { title: "Dining Room", note: "Interior CGI study", summary: "Material and artwork variants tested under controlled lighting conditions.", image: render("visualisation/dining-room/gallery-01/01.webp"), images: gallery("visualisation/dining-room") },
  { title: "Bathroom", note: "Interior CGI study", summary: "A compact material study focused on stone, vanity joinery and reflective surfaces.", image: render("visualisation/bath-room/gallery-01/01.webp"), images: gallery("visualisation/bath-room") },
];

const allWork: Project[] = [
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
    images: v.images,
  })),
];

const filters: Filter[] = ["All", "Exterior", "Interior", "Visualisation", "Commercial"];
const nav: { href: string; label: string; filter?: Filter }[] = [
  { href: "#work", label: "Work", filter: "All" },
  { href: "#services", label: "Services" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const filteredWork = filter === "All" ? allWork : allWork.filter((p) => p.category === filter);
  const openProject = (p: Project) => setOpen(filteredWork.indexOf(p));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Cursor />

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-bone/10 bg-espresso/85 backdrop-blur-xl" : "border-b border-transparent"}`}>
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:h-20 md:grid-cols-3 md:px-10">
          <a href="#top" className="flex min-w-0 items-center gap-3 text-bone" aria-label="VR ArchiTechs, back to top">
            <span className="grid h-8 w-8 shrink-0 place-items-center border border-bone/40 text-[11px] font-semibold tracking-tight">VR</span>
            <span className="truncate text-xs font-medium tracking-[0.16em] uppercase sm:text-sm sm:tracking-[0.18em]">VR ArchiTechs</span>
          </a>
          <nav className="hidden justify-center gap-9 md:flex" aria-label="Main navigation">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => { if (n.filter) setFilter(n.filter); }}
                className="link-underline text-xs tracking-[0.2em] text-bone/80 uppercase transition-colors hover:text-bone"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex justify-end">
            <a href="#contact" className="inline-flex shrink-0 items-center gap-2 bg-bone px-3 py-2.5 text-[10px] tracking-[0.16em] text-espresso uppercase transition-colors hover:bg-forest hover:text-bone sm:px-5 sm:text-[11px] sm:tracking-[0.2em]">
              <span className="hidden sm:inline">Start a Project</span><span className="sm:hidden">Inquire</span><ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative h-[100svh] min-h-[540px] overflow-hidden bg-espresso text-bone">
        <img src={hero} alt="Contemporary stone and timber villa at dusk" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-espresso/25" />
        <div className="absolute inset-0 bg-linear-to-t from-espresso/95 via-espresso/15 to-espresso/45" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-12">
          <p className="mb-5 text-[10px] tracking-[0.3em] text-bone/65 uppercase md:text-xs">Architecture · Interiors · Visualisation</p>
          <h1 className="max-w-6xl text-[clamp(3.4rem,7.5vw,8rem)] leading-[0.92] font-light tracking-[-0.055em]">
            We make<br /><span className="font-medium">architecture</span><br />visible.
          </h1>
          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-5 md:mt-12 md:gap-12">
            {[["24+", "Completed Villas"], ["Global", "Projects Worldwide"], ["300+", "Visualisation Studies"]].map(([n, l]) => (
              <div key={l}>
                <dd className="text-2xl font-light md:text-4xl">{n}</dd>
                <dt className="mt-2 text-[8px] leading-relaxed tracking-[0.2em] text-bone/55 uppercase md:text-[10px]">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="services" className="bg-forest-deep text-bone">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-bone/55 uppercase md:text-xs">What we do</p>
            <h2 className="mt-5 text-4xl leading-[1.05] font-light tracking-[-0.03em] md:text-6xl">Precision design<br />for <span className="font-medium text-bone/70">every scale</span></h2>
          </div>
          <div className="grid grid-cols-2 border-bone/15 md:grid-cols-4 lg:border-l">
            {(["Exterior", "Interior", "Visualisation", "Commercial"] as const).map((c, i) => (
              <a key={c} href="#work" onClick={() => setFilter(c)} className="group border-r border-b border-bone/15 px-6 py-6 transition-colors hover:bg-bone/5 md:border-b-0 md:px-9 md:py-8">
                <span className="text-[10px] tabular-nums tracking-[0.25em] text-bone/40">0{i + 1}</span>
                <span className="mt-3 block text-xs font-medium tracking-[0.22em] uppercase transition-colors group-hover:text-bone md:text-sm">{c}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-forest uppercase">Portfolio</p>
              <h2 className="mt-4 text-4xl leading-none font-light tracking-[-0.04em] md:text-6xl">Selected <span className="font-medium">Work</span></h2>
            </div>
            <div className="min-w-0">
              <p aria-live="polite" className="mb-5 text-left text-[10px] tracking-[0.3em] text-muted-foreground uppercase lg:text-right">Showing <span className="font-medium text-foreground">{filteredWork.length}</span> {filteredWork.length === 1 ? "project" : "projects"}</p>
              <div className="scrollbar-none flex overflow-x-auto border-b border-foreground/15" role="group" aria-label="Filter projects">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={filter === item}
                    onClick={() => { setFilter(item); setOpen(null); }}
                    className={`-mb-px shrink-0 border-b-2 px-5 pb-4 text-[10px] font-medium tracking-[0.25em] whitespace-nowrap uppercase transition-colors first:pl-0 md:px-8 md:text-xs lg:first:pl-8 ${filter === item ? "border-forest text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredWork.length > 0 ? (
            <div className="mt-14 columns-1 gap-5 md:mt-16 md:columns-2 md:gap-6">
              {filteredWork.map((p) => <ProjectCard key={p.title} p={p} onOpen={openProject} />)}
            </div>
          ) : (
            <div className="mt-10 border-y border-foreground/15 py-20 text-center" role="status">
              <p className="font-serif text-2xl italic">Commercial projects are coming soon.</p>
              <button type="button" onClick={() => setFilter("All")} className="link-underline mt-5 text-[11px] tracking-[0.22em] text-forest uppercase">View all work</button>
            </div>
          )}
        </div>
      </section>

      <section id="studio" className="bg-linen py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <SectionHead index="02" eyebrow="Studio & Practice" title="One studio, three disciplines" note="From the first massing study to the final lighting scene." />
          <div className="mt-16 grid border-t border-foreground/15 md:grid-cols-3">
            {[
              ["Architecture", "Villas, residences and multi-storey housing — site planning, facade systems and construction documentation."],
              ["Interior Architecture", "Spatial planning, bespoke joinery, material palettes and layered architectural lighting."],
              ["3D Visualisation", "Photorealistic interior and exterior CGI, material studies and walkthroughs for clients and developers."],
            ].map(([t, d], i) => (
              <div key={t} className="border-b border-foreground/15 py-10 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0">
                <span className="text-[11px] tracking-[0.22em] text-forest uppercase">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-24 grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-forest uppercase">Principal</p>
              <h3 className="mt-3 text-4xl font-medium tracking-tight">Vishnu Ahir</h3>
              <p className="mt-2 font-serif italic text-muted-foreground">Architect & Visualisation Lead</p>
              <img src={portrait} alt="Vishnu Ahir, Principal of VR ArchiTechs" loading="lazy" className="mt-8 h-auto w-full max-w-xs" />
            </div>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="font-serif text-2xl leading-snug italic">Design that begins with the hand — stone you want to touch, timber that ages well, light that changes through the day.</p>
              <p className="text-muted-foreground">Vishnu founded VR ArchiTechs to bring architecture and visualisation under one roof. Every project is resolved twice: once as a precise, buildable set of drawings, and once as an image honest enough to live inside. The practice is committed to tactile materials, climate-aware planning and the precision engineering that lets quiet buildings last.</p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Social />

      <footer className="border-t border-bone/10 bg-espresso py-10 text-bone/50">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 text-[10px] tracking-[0.22em] uppercase md:grid-cols-3 md:items-center md:px-10">
          <span className="text-xs font-medium tracking-[0.3em] text-bone/80">VR ArchiTechs</span>
          <nav className="flex flex-wrap gap-6 md:justify-center" aria-label="Footer">
            {[["#work", "Work"], ["#services", "Services"], ["#studio", "Studio"], ["#contact", "Contact"]].map(([h, l]) => <a key={l} href={h} className="transition-colors hover:text-bone">{l}</a>)}
          </nav>
          <span className="md:text-right">© {new Date().getFullYear()} VR ArchiTechs · Gandhinagar</span>
        </div>
      </footer>

      {open !== null && filteredWork[open] && <Viewer items={filteredWork} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}

function SectionHead({ index, eyebrow, title, note }: { index: string; eyebrow: string; title: string; note: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-end">
      <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase"><span className="text-forest">{index}</span> — {eyebrow}</p>
      <div>
        <h2 className="text-3xl leading-tight font-medium tracking-tight md:text-5xl">{title}</h2>
        <p className="mt-4 max-w-xl font-serif text-lg italic text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  return (
    <button type="button" data-cursor="view" onClick={() => onOpen(p)} className="group mb-10 inline-block w-full break-inside-avoid text-left align-top md:mb-12">
      <div className="overflow-hidden bg-linen">
        <img src={p.image} alt={`${p.title}, ${p.location}`} loading="lazy" decoding="async" className="h-auto w-full transition-opacity duration-500 group-hover:opacity-85" />
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-medium tracking-tight md:text-2xl">{p.title}</h3>
          <p className="mt-2 text-[10px] leading-relaxed tracking-[0.18em] text-muted-foreground uppercase">{p.category} · {p.location} · {p.year}</p>
          <p className="mt-2 font-serif text-sm italic text-muted-foreground">{p.images.length} views</p>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-forest transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </button>
  );
}

function Viewer({ items, index, onIndex, onClose }: { items: Project[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const project = items[index]!;
  const { images, title } = project;
  const [view, setView] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const verticalRail = useRef<HTMLDivElement>(null);
  const horizontalRail = useRef<HTMLDivElement>(null);
  const total = items.length;
  const pad = (v: number) => String(v).padStart(2, "0");
  const current = images[view] ?? images[0]!;

  const goProject = useCallback((d: number) => {
    onIndex((index + d + total) % total);
    setView(0);
  }, [index, total, onIndex]);
  const goView = useCallback((d: number) => {
    setView((v) => Math.min(Math.max(v + d, 0), images.length - 1));
  }, [images.length]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goProject(1);
      else if (e.key === "ArrowLeft") goProject(-1);
      else if (e.key === "ArrowDown") goView(1);
      else if (e.key === "ArrowUp") goView(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goProject, goView, onClose]);

  useEffect(() => {
    const vertical = verticalRail.current;
    const verticalThumb = vertical?.querySelector<HTMLElement>(`[data-view="${view}"]`);
    if (vertical && verticalThumb && vertical.offsetParent !== null) {
      vertical.scrollTo({ top: verticalThumb.offsetTop - vertical.clientHeight / 2 + verticalThumb.clientHeight / 2, behavior: "smooth" });
    }
    const horizontal = horizontalRail.current;
    const horizontalThumb = horizontal?.querySelector<HTMLElement>(`[data-view="${view}"]`);
    if (horizontal && horizontalThumb && horizontal.offsetParent !== null) {
      horizontal.scrollTo({ left: horizontalThumb.offsetLeft - horizontal.clientWidth / 2 + horizontalThumb.clientWidth / 2, behavior: "smooth" });
    }
  }, [view, index]);

  const round = "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/20 bg-espresso/40 text-bone transition-colors hover:border-forest hover:bg-forest md:h-12 md:w-12";
  const thumbs = (vertical: boolean) => images.map((src, k) => (
    <button
      data-view={k}
      key={src}
      type="button"
      aria-label={`Show view ${k + 1}`}
      aria-pressed={k === view}
      onClick={() => setView(k)}
      className={`shrink-0 overflow-hidden border bg-bone/5 transition-opacity ${vertical ? "h-14 w-24" : "h-12 w-20"} ${k === view ? "border-forest opacity-100" : "border-transparent opacity-45 hover:opacity-100"}`}
    >
      <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
    </button>
  ));

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[60] flex h-dvh flex-col overflow-hidden bg-espresso/95 text-bone backdrop-blur-xl animate-in fade-in duration-300">
      <header className="flex h-16 shrink-0 items-center justify-between px-5 md:h-20 md:px-10">
        <span className="text-[11px] tabular-nums tracking-[0.25em] text-bone/50">{pad(index + 1)} / {pad(total)}</span>
        <button type="button" onClick={onClose} className="border border-bone/25 px-5 py-2.5 text-[10px] font-medium tracking-[0.28em] uppercase transition-colors hover:border-forest hover:bg-forest md:px-6 md:py-3">Close</button>
      </header>

      <div className="relative mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col">
        <div className="relative hidden min-h-0 flex-1 items-center justify-center gap-6 px-24 md:flex">
          <button type="button" aria-label="Previous project" onClick={() => goProject(-1)} className={`${round} absolute top-1/2 left-6 z-10 -translate-y-1/2`}><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" aria-label="Next project" onClick={() => goProject(1)} className={`${round} absolute top-1/2 right-6 z-10 -translate-y-1/2`}><ChevronRight className="h-5 w-5" /></button>
          <figure className="flex min-w-0 flex-col">
            <img key={current} src={current} alt={`${title} — view ${view + 1} of ${images.length}`} className="h-auto max-h-[calc(100dvh-17rem)] w-auto max-w-[calc(100vw-22rem)] object-contain shadow-2xl animate-in fade-in duration-500" />
            <figcaption className="mt-6 grid w-0 min-w-full grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-10">
              <div className="min-w-0">
                <p className="text-[9px] tracking-[0.3em] text-bone/45 uppercase">{project.category} · {project.type}</p>
                <h3 className="mt-2 truncate text-xl font-medium tracking-[0.14em] uppercase lg:text-2xl">{title}</h3>
                <p className="mt-1 text-[10px] tracking-[0.15em] text-bone/45">{project.year} · {project.location}</p>
              </div>
              <p className="line-clamp-4 text-right text-sm leading-relaxed text-bone/60">{project.summary}</p>
            </figcaption>
          </figure>
          <aside className="flex max-h-[calc(100dvh-17rem)] w-28 shrink-0 flex-col items-center self-center py-2" aria-label="Project views">
            <button type="button" aria-label="Previous view" onClick={() => goView(-1)} disabled={view === 0} className="grid h-8 w-8 shrink-0 place-items-center text-bone/60 hover:text-bone disabled:opacity-20"><ChevronUp className="h-5 w-5" /></button>
            <div className="flex min-h-0 flex-1 items-stretch">
              <div ref={verticalRail} className="scrollbar-none flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-2">
                {thumbs(true)}
              </div>
              <div className="relative w-px shrink-0 bg-bone/10" aria-hidden="true">
                <div className="absolute top-0 left-0 w-px bg-bone/60 transition-transform duration-300" style={{ height: `${100 / images.length}%`, transform: `translateY(${view * 100}%)` }} />
              </div>
            </div>
            <button type="button" aria-label="Next view" onClick={() => goView(1)} disabled={view === images.length - 1} className="grid h-8 w-8 shrink-0 place-items-center text-bone/60 hover:text-bone disabled:opacity-20"><ChevronDown className="h-5 w-5" /></button>
            <span className="mt-2 shrink-0 text-[9px] tracking-[0.28em] whitespace-nowrap text-bone/40 uppercase [writing-mode:vertical-rl]">{view + 1} of {images.length} views</span>
          </aside>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col md:hidden">
          <div
            className="relative min-h-0 min-w-0 flex-1 px-3"
            style={{ touchAction: "pan-y" }}
            onTouchStart={(e) => {
              const point = e.touches[0];
              touch.current = point ? { x: point.clientX, y: point.clientY } : null;
            }}
            onTouchEnd={(e) => {
              const end = e.changedTouches[0];
              const start = touch.current;
              touch.current = null;
              if (!start || !end) return;
              const dx = end.clientX - start.x;
              const dy = end.clientY - start.y;
              if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
              const d = dx < 0 ? 1 : -1;
              if (view + d >= 0 && view + d < images.length) setView(view + d); else goProject(d);
            }}
          >
            <img key={current} src={current} alt={`${title} — view ${view + 1} of ${images.length}`} className="h-full w-full object-contain animate-in fade-in duration-500" />
          </div>

          <div className="shrink-0 px-5 pt-3 pb-2">
            <div className="flex items-center gap-3">
              <div ref={horizontalRail} className="scrollbar-none flex min-w-0 flex-1 gap-2 overflow-x-auto">
                {thumbs(false)}
              </div>
              <span className="shrink-0 text-[9px] tracking-[0.2em] whitespace-nowrap text-bone/45 uppercase">{view + 1} of {images.length} views</span>
            </div>
            <div className="relative mt-3 h-px bg-bone/10" aria-hidden="true">
              <div className="absolute top-0 left-0 h-px bg-bone/60 transition-transform duration-300" style={{ width: `${100 / images.length}%`, transform: `translateX(${view * 100}%)` }} />
            </div>
          </div>
        </div>

        <footer className="shrink-0 px-5 pt-2 pb-4 md:hidden">
          <div className="grid gap-4 border-t border-bone/10 pt-4">
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.25em] text-bone/45 uppercase">{project.category} · {project.type}</p>
              <h3 className="mt-2 truncate text-lg font-medium tracking-[0.1em] uppercase md:text-2xl">{title}</h3>
              <p className="mt-1 text-[10px] tracking-[0.15em] text-bone/45">{project.year} · {project.location}</p>
            </div>
                      </div>
          <div className="mt-3 flex items-center justify-between">
            <button type="button" aria-label="Previous project" onClick={() => goProject(-1)} className={round}><ChevronLeft className="h-5 w-5" /></button>
            <span className="text-[9px] tracking-[0.2em] text-bone/35 uppercase">Swipe image to browse</span>
            <button type="button" aria-label="Next project" onClick={() => goProject(1)} className={round}><ChevronRight className="h-5 w-5" /></button>
          </div>
        </footer>
      </div>
    </div>
  );
}

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/vrarchitechs/", handle: "@vrarchitechs" },
  { label: "Pinterest", href: "https://in.pinterest.com/vr_architechs/", handle: "vr_architechs" },
];

function Contact() {
  const services = ["Architecture", "Interior Architecture", "3D Visualisation", "Commercial"];
  const [sent, setSent] = useState(false);
  const label = "text-[10px] tracking-[0.3em] text-bone/45 uppercase";
  const field = "mt-3 w-full bg-transparent text-base text-bone outline-hidden placeholder:text-bone/35";
  const cell = "block border-b border-bone/15 px-0 py-6 transition-colors focus-within:border-bone/50 md:px-7";

  return (
    <section id="contact" className="relative overflow-hidden bg-forest-deep text-bone">
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-bone/[0.04]">
        <path d="M18 100 L48 20 L78 100 Z M30 100 L48 52 L66 100 Z" fill="none" stroke="currentColor" strokeWidth="5" />
      </svg>
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className={label}>Contact</p>
          <h2 className="mt-5 text-5xl font-light tracking-[-0.03em] md:text-6xl">Start a <span className="font-medium text-bone/70">project</span></h2>
          <p className="mt-7 max-w-md text-base text-bone/60">Tell us what you're working on. We'll get back to you within 24 hours.</p>
          <dl className="mt-12 grid gap-7 sm:grid-cols-2">
            <div><dt className={label}>Email</dt><dd className="mt-2"><a href="mailto:ahirvishnu111@gmail.com" className="link-underline break-all">ahirvishnu111@gmail.com</a></dd></div>
            <div><dt className={label}>Phone</dt><dd className="mt-2"><a href="tel:+919099951391" className="link-underline">+91 90999 51391</a></dd></div>
            <div><dt className={label}>Based in</dt><dd className="mt-2">Gandhinagar, Gujarat</dd></div>
            <div><dt className={label}>Available for</dt><dd className="mt-2">Projects worldwide</dd></div>
          </dl>
        </div>
        {sent ? (
          <div className="flex flex-col justify-center border-t border-bone/20 pt-10" role="status">
            <h3 className="text-3xl font-light">Thank you.</h3>
            <p className="mt-3 font-serif text-lg italic text-bone/60">Your message has been noted — we'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="grid md:grid-cols-2">
              <label className={`${cell} md:border-r md:pl-0`}><span className={label}>Name</span><input required name="name" placeholder="Your name" className={field} /></label>
              <label className={cell}><span className={label}>Email</span><input required type="email" name="email" placeholder="your@email.com" className={field} /></label>
            </div>
            <label className={`${cell} md:pl-0`}><span className={label}>Project type</span>
              <select name="type" defaultValue="" className={`${field} [&>option]:text-espresso`}>
                <option value="" disabled>Select</option>
                {services.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className={`${cell} md:pl-0`}><span className={label}>Tell us about your project</span><textarea name="message" rows={4} placeholder="Location, scale, timeline, any references…" className={`${field} resize-none`} /></label>
            <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
              <span className="text-[10px] tracking-[0.3em] text-bone/40 uppercase">Response within 24h</span>
              <button type="submit" className="inline-flex items-center gap-3 border border-bone/30 px-9 py-4 text-[11px] tracking-[0.28em] uppercase transition-colors hover:border-bone hover:bg-bone hover:text-espresso">Send message <ArrowRight className="h-4 w-4" /></button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Social() {
  return (
    <section id="social" className="border-t border-bone/10 bg-espresso text-bone">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-10">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-bone/45 uppercase">Follow the studio</p>
          <p className="mt-3 font-serif text-2xl italic text-bone/80">New renders and work in progress, as they happen.</p>
        </div>
        <ul className="flex flex-wrap gap-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 border border-bone/20 px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-bone hover:bg-bone hover:text-espresso">
                {s.label === "Instagram" ? <Instagram className="h-4 w-4" /> : <span className="grid h-4 w-4 place-items-center rounded-full border border-current text-[9px] font-bold">P</span>}
                {s.label} <span className="normal-case tracking-normal text-bone/45 group-hover:text-espresso/60">{s.handle}</span>
              </a>
            </li>
          ))}
          <li><a href="mailto:ahirvishnu111@gmail.com" className="inline-flex items-center gap-3 border border-bone/20 px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-bone hover:bg-bone hover:text-espresso"><Mail className="h-4 w-4" />Email</a></li>
          <li><a href="https://wa.me/919099951391" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-bone/20 px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-bone hover:bg-bone hover:text-espresso"><Phone className="h-4 w-4" />WhatsApp</a></li>
        </ul>
      </div>
    </section>
  );
}
