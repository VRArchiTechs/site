import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { allWork, filters, heroImage, portraitImage, type Filter, type Project } from "@/content/portfolio";
import { imageSize } from "@/content/renders";

const ProjectViewer = lazy(() =>
  import("@/components/site/ProjectViewer").then((module) => ({ default: module.ProjectViewer })),
);
const heroDims = imageSize(heroImage);
const portraitDims = imageSize(portraitImage);

export function HomeHero() {
  return (
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
          ].map(([number, label]) => (
            <div key={label}>
              <dd className="text-3xl font-light md:text-4xl">{number}</dd>
              <dt className="mt-2 text-[9px] leading-relaxed tracking-[0.24em] text-bone/55 uppercase md:text-[10px]">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

type ServicesSectionProps = {
  standalone?: boolean;
  onSelectFilter?: (filter: Filter) => void;
};

export function ServicesSection({ standalone = false, onSelectFilter }: ServicesSectionProps) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="services" className={`bg-forest-deep text-bone ${standalone ? "pt-28 md:pt-36" : ""}`}>
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-bone/55 uppercase md:text-xs">What we do</p>
          <Heading className="mt-5 text-4xl leading-[1.05] font-light tracking-[-0.03em] md:text-6xl">
            Precision design
            <br />
            for <span className="font-medium text-bone/70">every scale</span>
          </Heading>
        </div>
        <div className="grid border-t border-bone/15 sm:grid-cols-3 sm:border-t-0 lg:border-l">
          {(["Exterior", "Interior", "Visualisation"] as const).map((category, index) =>
            standalone ? (
              <Link
                key={category}
                to="/work"
                className="group flex items-baseline gap-5 border-b border-bone/15 py-5 transition-colors hover:bg-bone/5 active:bg-bone/10 sm:block sm:border-r sm:px-6 sm:py-6 md:border-b-0 md:px-9 md:py-8"
              >
                <span className="text-[10px] tabular-nums tracking-[0.25em] text-bone/40">0{index + 1}</span>
                <span className="block text-xs font-medium tracking-[0.22em] uppercase transition-colors group-hover:text-bone sm:mt-3 md:text-sm">{category}</span>
              </Link>
            ) : (
              <a
                key={category}
                href="#work"
                onClick={() => onSelectFilter?.(category)}
                className="group flex items-baseline gap-5 border-b border-bone/15 py-5 transition-colors hover:bg-bone/5 active:bg-bone/10 sm:block sm:border-r sm:px-6 sm:py-6 md:border-b-0 md:px-9 md:py-8"
              >
                <span className="text-[10px] tabular-nums tracking-[0.25em] text-bone/40">0{index + 1}</span>
                <span className="block text-xs font-medium tracking-[0.22em] uppercase transition-colors group-hover:text-bone sm:mt-3 md:text-sm">{category}</span>
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

const disciplines = [
  ["Architectural Design", "Residential planning, facade strategy and elevations — from compact G+3 homes to villas."],
  ["Structural Design", "The frame that holds a house up — structural planning and detailing resolved alongside the architecture."],
  ["Interior Design", "Space planning, custom joinery, elevations and material coordination for rooms people live in."],
  ["Visualisation & Documentation", "Photoreal studies of light and material, with construction drawings carried through to site."],
] as const;

function DisciplineGrid() {
  return (
    <div className="mt-14 grid border-t border-foreground/15 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
      {disciplines.map(([title, description], index) => (
        <div key={title} className="border-b border-foreground/15 py-8 sm:px-6 sm:odd:border-r sm:odd:pl-0 md:py-10 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
          <span className="text-[11px] tracking-[0.22em] text-forest uppercase">0{index + 1}</span>
          <h3 className="mt-4 text-xl font-medium tracking-tight md:text-2xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      ))}
    </div>
  );
}

export function ServicesDetails() {
  return (
    <section className="bg-linen py-20 md:py-28">
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
        <DisciplineGrid />
      </div>
    </section>
  );
}

export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const NameHeading = standalone ? "h1" : "h3";
  return (
    <div
      id="about"
      className={`grid scroll-mt-20 items-start gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-12 lg:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-x-14 ${standalone ? "" : "mt-20 md:mt-28"}`}
    >
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
        <NameHeading className="mt-4 text-5xl leading-[0.95] tracking-tight md:text-6xl">
          <span className="font-light">Vishnu</span>
          <br />
          <span className="font-medium">Ahir</span>
        </NameHeading>
        <p className="mt-5 text-[11px] tracking-[0.22em] text-muted-foreground uppercase">Engineer & Architecture Designer · Gandhinagar</p>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-foreground/15 pt-8 text-left">
          {[
            [String(allWork.length).padStart(2, "0"), "Projects"],
            ["04", "Disciplines"],
            ["GJ", "Gujarat, India"],
          ].map(([number, label]) => (
            <div key={label}>
              <dd className="text-3xl font-light md:text-4xl">{number}</dd>
              <dt className="mt-2 text-[9px] tracking-[0.22em] text-muted-foreground uppercase md:text-[10px]">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <div className="space-y-6 text-base leading-relaxed md:col-span-2 md:text-lg lg:col-span-1">
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
        {standalone ? (
          <Link to="/contact" className="link-underline inline-block text-[11px] font-medium tracking-[0.25em] uppercase">
            Work with me →
          </Link>
        ) : (
          <a href="#contact" className="link-underline inline-block text-[11px] font-medium tracking-[0.25em] uppercase">
            Work with me →
          </a>
        )}
      </div>
    </div>
  );
}

export function StudioSection() {
  return (
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
        <DisciplineGrid />
        <AboutSection />
      </div>
    </section>
  );
}

type WorkSectionProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  standalone?: boolean;
};

export function WorkSection({ filter, onFilterChange, standalone = false }: WorkSectionProps) {
  const Heading = standalone ? "h1" : "h2";
  const [open, setOpen] = useState<number | null>(null);
  const filteredWork = filter === "All" ? allWork : allWork.filter((project) => project.category === filter);
  const openProject = (project: Project) => setOpen(filteredWork.indexOf(project));

  return (
    <section id="work" className={`bg-background ${standalone ? "px-0 pt-28 pb-20 md:pt-36 md:pb-28" : "py-20 md:py-28"}`}>
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-forest uppercase">Portfolio</p>
            <Heading className="mt-4 text-4xl leading-none font-light tracking-[-0.04em] md:text-6xl">
              Selected <span className="font-medium">Work</span>
            </Heading>
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
                    onFilterChange(item);
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
            {filteredWork.map((project, index) => (
              <ProjectCard key={project.title} project={project} number={index + 1} total={filteredWork.length} onOpen={openProject} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border-y border-foreground/15 py-20 text-center" role="status">
            <p className="font-serif text-2xl italic">No projects in this category yet.</p>
            <button type="button" onClick={() => onFilterChange("All")} className="link-underline mt-5 text-[11px] tracking-[0.22em] text-forest uppercase">
              View all work
            </button>
          </div>
        )}
      </div>

      {open !== null && filteredWork[open] && (
        <Suspense fallback={null}>
          <ProjectViewer items={filteredWork} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
        </Suspense>
      )}
    </section>
  );
}

function ProjectCard({ project, number, total, onOpen }: { project: Project; number: number; total: number; onOpen: (project: Project) => void }) {
  const meta = project.location === "Visualisation Studio" ? `${project.category} · ${project.type}` : `${project.category} · ${project.location}`;
  return (
    <button
      type="button"
      data-cursor="view"
      onClick={() => onOpen(project)}
      className="group mb-5 block w-full break-inside-avoid text-left outline-hidden md:mb-6"
    >
      <div className="relative overflow-hidden bg-linen shadow-plate after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-espresso/10 after:transition-shadow after:duration-500 group-hover:after:ring-forest/60 group-focus-visible:after:ring-2 group-focus-visible:after:ring-forest">
        <img
          src={project.image}
          alt={`${project.title}, ${project.location}`}
          width={project.width}
          height={project.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.035]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-espresso/85 via-espresso/35 to-transparent px-5 pb-5 pt-16 opacity-100 transition-opacity duration-300 md:px-6 md:pb-6 md:can-hover:opacity-0 md:can-hover:group-hover:opacity-100 md:can-hover:group-focus-visible:opacity-100">
          <p className="mb-2 text-[10px] tabular-nums tracking-[0.3em] text-bone/60">
            {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h3 className="translate-y-0 text-sm font-medium tracking-[0.14em] text-bone uppercase transition-transform duration-700 ease-premium md:text-base md:can-hover:translate-y-2 md:can-hover:group-hover:translate-y-0">{project.title}</h3>
          <p className="mt-1 text-[10px] tracking-[0.22em] text-bone/70 uppercase">{meta}</p>
        </div>
      </div>
    </button>
  );
}
