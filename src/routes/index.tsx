import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ContactSection } from "@/components/site/ContactSection";
import { Cursor } from "@/components/site/Cursor";
import { allWork, contactEmail, filters, heroImage, logoMark, navLinks, portraitImage, socials, type Filter, type Project } from "@/content/portfolio";
import { imageSize } from "@/content/renders";

const ProjectViewer = lazy(() =>
  import("@/components/site/ProjectViewer").then((m) => ({ default: m.ProjectViewer })),
);
const heroDims = imageSize(heroImage);
const portraitDims = imageSize(portraitImage);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VR ArchiTechs — Architecture & Visualisation Studio" },
      {
        name: "description",
        content: "Portfolio of Vishnu Ahir (VR ArchiTechs), Gandhinagar — residential architecture, structural design, interiors and photorealistic visualisation.",
      },
      { property: "og:title", content: "VR ArchiTechs — Architecture & Visualisation Studio" },
      { property: "og:description", content: "Bespoke residences, interior architecture and photorealistic 3D visualisation by Vishnu Ahir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }],
  }),
  component: Index,
});

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const filteredWork = filter === "All" ? allWork : allWork.filter((p) => p.category === filter);
  const openProject = (p: Project) => setOpen(filteredWork.indexOf(p));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="bg-background text-foreground">
      <Cursor />

      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 cursor-default outline-hidden md:hidden"
        />
      )}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${menuOpen ? "border-b border-bone/10 bg-espresso" : scrolled ? "border-b border-bone/10 bg-espresso/85 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:h-20 md:grid-cols-3 md:px-10">
          <a href="#top" className="flex min-w-0 items-center gap-3 text-bone" aria-label="VR ArchiTechs, back to top">
            <img src={logoMark} alt="" width={36} height={36} decoding="async" className="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9" />
            <span className="truncate text-xs font-medium tracking-[0.16em] uppercase sm:text-sm sm:tracking-[0.18em]">VR ArchiTechs</span>
          </a>
          <nav className="hidden justify-center gap-9 md:flex" aria-label="Main navigation">
            {navLinks.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => {
                  if (n.filter) setFilter(n.filter);
                }}
                className="link-underline text-xs tracking-[0.2em] text-bone/80 uppercase transition-colors hover:text-bone"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="-mr-2 p-2 text-bone md:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" strokeWidth={1.25} /> : <Menu className="h-6 w-6" strokeWidth={1.25} />}
            </button>
            <a
              href="#contact"
              className="hidden shrink-0 md:inline-flex items-center gap-2 bg-bone px-3 py-2.5 text-[10px] tracking-[0.16em] text-espresso uppercase transition-colors hover:bg-forest hover:text-bone sm:px-5 sm:text-[11px] sm:tracking-[0.2em]"
            >
              Start a Project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        {menuOpen && (
          <nav
            className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-bone/10 px-5 pt-3 pb-6 shadow-plate md:hidden"
            aria-label="Main navigation"
          >
              <ul>
                {[...navLinks, { label: "Contact", href: "#contact", filter: undefined }].map((n) => (
                  <li key={n.label}>
                    <a
                      href={n.href}
                      onClick={() => {
                        if (n.filter) setFilter(n.filter);
                        setMenuOpen(false);
                      }}
                      className="block border-b border-bone/10 py-5 text-[26px] leading-none font-light tracking-[0.14em] text-bone uppercase transition-colors duration-300 hover:text-bone/55"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 grid grid-cols-3 gap-2.5">
                {[
                  ...socials.map((s) => ({ label: s.label, href: s.href, external: true })),
                  { label: "Email", href: `mailto:${contactEmail}`, external: false },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.external ? "_blank" : undefined}
                      rel={s.external ? "noreferrer" : undefined}
                      className="flex items-center justify-center border border-bone/20 px-2 py-3 text-[10px] tracking-[0.16em] text-bone/80 uppercase transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-espresso"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 bg-bone py-4 text-[11px] tracking-[0.24em] text-espresso uppercase"
              >
                Start a Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
          </nav>
        )}
      </header>

      <section id="top" className="relative h-[100svh] min-h-[540px] overflow-hidden bg-espresso text-bone">
        <img
          src={heroImage}
          alt="Contemporary stone and timber villa at dusk"
          width={heroDims.width}
          height={heroDims.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-espresso/25" />
        <div className="absolute inset-0 bg-linear-to-t from-espresso/95 via-espresso/15 to-espresso/45" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-12">
          <p className="mb-5 text-[10px] tracking-[0.3em] text-bone/65 uppercase md:text-xs">Architecture · Interiors · Visualisation</p>
          <h1 className="max-w-6xl text-[clamp(3.4rem,7.5vw,8rem)] leading-[0.92] font-light tracking-[-0.055em]">
            We make
            <br />
            <span className="font-medium">architecture</span>
            <br />
            visible.
          </h1>
          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-5 md:mt-12 md:gap-12">
            {[
              [String(allWork.length).padStart(2, "0"), "Projects & Studies"],
              ["04", "Disciplines, One Table"],
              ["Gujarat", "Based in Gandhinagar"],
            ].map(([n, l]) => (
              <div key={l}>
                <dd className="text-3xl font-light md:text-4xl">{n}</dd>
                <dt className="mt-2 text-[9px] leading-relaxed tracking-[0.24em] text-bone/55 uppercase md:text-[10px]">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="services" className="bg-forest-deep text-bone">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-bone/55 uppercase md:text-xs">What we do</p>
            <h2 className="mt-5 text-4xl leading-[1.05] font-light tracking-[-0.03em] md:text-6xl">
              Precision design
              <br />
              for <span className="font-medium text-bone/70">every scale</span>
            </h2>
          </div>
          <div className="grid border-t border-bone/15 sm:grid-cols-3 sm:border-t-0 lg:border-l">
            {(["Exterior", "Interior", "Visualisation"] as const).map((c, i) => (
              <a
                key={c}
                href="#work"
                onClick={() => setFilter(c)}
                className="group flex items-baseline gap-5 border-b border-bone/15 py-5 transition-colors hover:bg-bone/5 active:bg-bone/10 sm:block sm:border-r sm:px-6 sm:py-6 md:border-b-0 md:px-9 md:py-8"
              >
                <span className="text-[10px] tabular-nums tracking-[0.25em] text-bone/40">0{i + 1}</span>
                <span className="block text-xs font-medium sm:mt-3 tracking-[0.22em] uppercase transition-colors group-hover:text-bone md:text-sm">{c}</span>
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
              <h2 className="mt-4 text-4xl leading-none font-light tracking-[-0.04em] md:text-6xl">
                Selected <span className="font-medium">Work</span>
              </h2>
            </div>
            <div className="min-w-0">
              <p aria-live="polite" className="mb-5 text-left text-[10px] tracking-[0.3em] text-muted-foreground uppercase lg:text-right">
                Showing <span className="font-medium text-foreground">{filteredWork.length}</span> {filteredWork.length === 1 ? "project" : "projects"}
              </p>
              <div className="scrollbar-none flex overflow-x-auto border-b border-foreground/15" role="group" aria-label="Filter projects">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={filter === item}
                    onClick={() => {
                      setFilter(item);
                      setOpen(null);
                    }}
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
              {filteredWork.map((p, i) => (
                <ProjectCard key={p.title} p={p} n={i + 1} total={filteredWork.length} onOpen={openProject} />
              ))}
            </div>
          ) : (
            <div className="mt-10 border-y border-foreground/15 py-20 text-center" role="status">
              <p className="font-serif text-2xl italic">No projects in this category yet.</p>
              <button type="button" onClick={() => setFilter("All")} className="link-underline mt-5 text-[11px] tracking-[0.22em] text-forest uppercase">
                View all work
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="studio" className="bg-linen py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-end">
            <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
              <span className="text-forest">02</span> — Studio & Practice
            </p>
            <div>
              <h2 className="text-3xl leading-tight font-medium tracking-tight md:text-5xl">One studio, four disciplines</h2>
              <p className="mt-4 max-w-xl font-serif text-lg italic text-muted-foreground">Nothing is handed off — drawings, structure and interior are resolved together.</p>
            </div>
          </div>
          <div className="mt-14 grid border-t border-foreground/15 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
            {[
              ["Architectural Design", "Residential planning, facade strategy and elevations — from compact G+3 homes to villas."],
              ["Structural Design", "The frame that holds a house up — structural planning and detailing resolved alongside the architecture."],
              ["Interior Design", "Space planning, custom joinery, elevations and material coordination for rooms people live in."],
              ["Visualisation & Documentation", "Photoreal studies of light and material, with construction drawings carried through to site."],
            ].map(([t, d], i) => (
              <div key={t} className="border-b border-foreground/15 py-8 sm:px-6 sm:odd:border-r sm:odd:pl-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 md:py-10">
                <span className="text-[11px] tracking-[0.22em] text-forest uppercase">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-medium tracking-tight md:text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div id="about" className="mt-20 grid scroll-mt-20 items-start gap-10 md:mt-28 md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-12 lg:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-x-14">
            <div className="flex justify-center md:justify-start">
              <div className="aspect-square w-48 overflow-hidden rounded-full border border-foreground/15 bg-card p-1.5 shadow-plate sm:w-56 lg:w-64">
                <img
                  src={portraitImage}
                  alt="Vishnu Ahir, Principal of VR ArchiTechs"
                  width={portraitDims.width}
                  height={portraitDims.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover object-[50%_25%] saturate-[0.85]"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[11px] tracking-[0.3em] text-forest uppercase">About</p>
              <h3 className="mt-4 text-5xl leading-[0.95] tracking-tight md:text-6xl">
                <span className="font-light">Vishnu</span>
                <br />
                <span className="font-medium">Ahir</span>
              </h3>
              <p className="mt-5 text-[11px] tracking-[0.22em] text-muted-foreground uppercase">Engineer & Architecture Designer · Gandhinagar</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-foreground/15 pt-8 text-left">
                {[
                  [String(allWork.length).padStart(2, "0"), "Projects"],
                  ["04", "Disciplines"],
                  ["GJ", "Gujarat, India"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dd className="text-3xl font-light md:text-4xl">{n}</dd>
                    <dt className="mt-2 text-[9px] tracking-[0.22em] text-muted-foreground uppercase md:text-[10px]">{l}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-6 text-base leading-relaxed md:col-span-2 lg:col-span-1 md:text-lg">
              <p className="font-serif text-2xl leading-snug italic">Buildings should be read slowly — material by material, joint by joint.</p>
              <p className="text-muted-foreground">
                Trained as an engineer and practising as a designer, I work across the whole lifecycle of a house — the plan, the frame that holds it up, and the rooms
                people finally live in. Nothing is handed off; drawings, structure and interior are resolved together, on the same table.
              </p>
              <p className="text-muted-foreground">
                My interest sits in material behaviour. How bamboo, steel, brick and concrete meet — and misbehave — decides the character of a space long before finishes
                arrive. Climate and culture set the rest: openings sized for Gujarat's light, thresholds shaped by how a family actually moves through a day.
              </p>
              <p className="text-[11px] tracking-[0.22em] text-forest uppercase">AutoCAD · SketchUp · Twinmotion · Enscape · 3ds Max · Corona</p>
              <a href="#contact" className="link-underline inline-block text-[11px] font-medium tracking-[0.25em] uppercase">Work with me →</a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />

      <footer className="border-t border-bone/10 bg-espresso py-10 text-bone/50">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 text-[10px] tracking-[0.22em] uppercase md:grid-cols-3 md:items-center md:px-10">
          <a href="#top" className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.3em] text-bone/80 transition-colors hover:text-bone">
            <img src={logoMark} alt="" width={24} height={24} loading="lazy" decoding="async" className="h-6 w-6 shrink-0 object-contain opacity-90" />
            <span>VR ArchiTechs</span>
          </a>
          <nav className="flex flex-wrap gap-6 md:justify-center" aria-label="Footer">
            {[
              ["#work", "Work"],
              ["#services", "Services"],
              ["#studio", "Studio"],
              ["#contact", "Contact"],
            ].map(([h, l]) => (
              <a key={l} href={h} className="transition-colors hover:text-bone">
                {l}
              </a>
            ))}
          </nav>
          <span className="md:text-right">© {new Date().getFullYear()} VR ArchiTechs · Gandhinagar</span>
        </div>
      </footer>

      {open !== null && filteredWork[open] && (
        <Suspense fallback={null}>
          <ProjectViewer items={filteredWork} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
        </Suspense>
      )}
    </div>
  );
}

function ProjectCard({ p, n, total, onOpen }: { p: Project; n: number; total: number; onOpen: (p: Project) => void }) {
  const meta = p.location === "Visualisation Studio" ? `${p.category} · ${p.type}` : `${p.category} · ${p.location}`;
  return (
    <button
      type="button"
      data-cursor="view"
      onClick={() => onOpen(p)}
      className="group mb-5 block w-full break-inside-avoid text-left outline-hidden md:mb-6"
    >
      <div className="relative overflow-hidden bg-linen shadow-plate after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-espresso/10 after:transition-shadow after:duration-500 group-hover:after:ring-forest/60 group-focus-visible:after:ring-2 group-focus-visible:after:ring-forest">
        <img
          src={p.image}
          alt={`${p.title}, ${p.location}`}
          width={p.width}
          height={p.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-espresso/85 via-espresso/35 to-transparent px-5 pb-5 pt-16 opacity-100 transition-opacity duration-300 md:px-6 md:pb-6 md:can-hover:opacity-0 md:can-hover:group-hover:opacity-100 md:can-hover:group-focus-visible:opacity-100">
          <p className="mb-2 text-[10px] tabular-nums tracking-[0.3em] text-bone/60">{String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}</p>
          <h3 className="translate-y-0 text-sm font-medium tracking-[0.14em] text-bone uppercase transition-transform duration-700 ease-premium md:text-base md:can-hover:translate-y-2 md:can-hover:group-hover:translate-y-0">{p.title}</h3>
          <p className="mt-1 text-[10px] tracking-[0.22em] text-bone/70 uppercase">{meta}</p>
        </div>
      </div>
    </button>
  );
}
