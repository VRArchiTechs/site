import { Filmstrip } from "./Filmstrip";
import { Reveal } from "./Reveal";
import { AspectImage } from "./AspectImage";
import type { WorkProject } from "@/lib/work";

type Props = {
  project: WorkProject;
  total: number;
};

export function ProjectSpread({ project, total }: Props) {
  return (
    <section id={project.id} className="relative overflow-hidden border-b border-hair py-24 md:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-2 select-none font-display text-[30vw] leading-none text-ink/[0.04] md:text-[18vw]"
      >
        {project.displayNumber}
      </span>

      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="eyebrow shrink-0 text-brass">
              {project.displayNumber} / {String(total).padStart(2, "0")}
            </span>
            <span className="relative h-px w-[140px] bg-hair before:absolute before:-top-[5px] before:left-0 before:h-[11px] before:w-px before:bg-brass/60 after:absolute after:-top-[5px] after:right-0 after:h-[11px] after:w-px after:bg-brass/60" />
          </div>
          <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.98] tracking-[-0.015em] text-ink">
            {project.title}
          </h2>
          <p className="eyebrow mt-4 text-ink-muted">{project.sub}</p>
        </Reveal>
      </div>

      {project.heroImage ? (
        <Reveal className="relative mx-auto mt-12 w-full max-w-[1320px] px-6 md:px-10">
          <div className="project-hero-entry">
            <AspectImage
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              display={project.heroImage.display}
              eager
              frameClassName="border border-hair"
            />

            <div className="project-hero-drawing" aria-hidden="true">
              <span className="project-hero-registration-sweep" />
              <span className="project-hero-registration-line project-hero-registration-line-x" />
              <span className="project-hero-registration-line project-hero-registration-line-y" />
              <span className="project-hero-registration-cross" />
              <span className="project-hero-coordinate project-hero-coordinate-tl">A-01 / 00.00</span>
            </div>
          </div>

          {project.heroTag ? (
            <span className="eyebrow absolute bottom-5 left-5 border border-hair bg-paper/70 px-3.5 py-2 text-ink backdrop-blur-md md:left-10">
              {project.heroTag}
            </span>
          ) : null}
        </Reveal>
      ) : null}

      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal className={`${project.heroImage ? "pt-12" : "pt-10"} grid gap-9 md:grid-cols-[0.85fr_1.15fr] md:gap-[70px]`}>
          <div className="space-y-4 text-[0.98rem] leading-[1.85] text-ink-soft">
            {project.notes.map((n) => (
              <p key={n.slice(0, 24)}>{n}</p>
            ))}
          </div>
          {project.pull ? (
            <p className="border-l-2 border-brass/50 pl-5 font-display text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.3] text-brass">
              &ldquo;{project.pull}&rdquo;
            </p>
          ) : null}
        </Reveal>

        <Reveal className="mt-14 flex flex-wrap border-y border-hair">
          {project.meta.map((m, i) => (
            <div
              key={m.label}
              className={`relative flex-[1_1_160px] px-6 py-5 before:absolute before:left-[-1px] before:top-0 before:h-px before:w-[9px] before:bg-brass/60 ${i === 0 ? "" : "border-l border-hair"}`}
            >
              <span className="eyebrow block text-ink-muted">{m.label}</span>
              <span className="mt-1.5 block text-[0.95rem] font-semibold text-ink">{m.value}</span>
            </div>
          ))}
        </Reveal>
      </div>

      {project.galleries.map((gallery) => (
        <Filmstrip
          key={gallery.title}
          title={gallery.title}
          description={gallery.description}
          display={gallery.display}
          plates={gallery.plates}
        />
      ))}

      <div className="mx-auto mt-14 max-w-[1240px] px-6 md:px-10">
        <ul className="flex flex-wrap gap-x-3 gap-y-3 border-t border-hair pt-7">
          {project.tags.map((t) => (
            <li
              key={t}
              className="eyebrow border border-hair px-3 py-1.5 text-ink-soft transition-colors hover:border-brass hover:text-brass"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
