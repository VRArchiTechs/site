import { Filmstrip } from "./Filmstrip";
import { Reveal } from "./Reveal";
import type { Project } from "@/lib/portfolio-data";

export function ProjectSpread({ project }: { project: Project }) {
  return (
    <section id={project.id} className="relative overflow-hidden border-b border-hair py-24 md:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-2 select-none font-display text-[30vw] leading-none text-ink/[0.04] md:text-[18vw]"
      >
        {project.number}
      </span>

      <div className="relative mx-auto max-w-[1240px] px-6 md:px-10">
        <Reveal className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <div>
            <p className="eyebrow text-brass">Project {project.number}</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.015em] text-ink">
              {project.title}
            </h2>
            <p className="eyebrow mt-4 text-ink-muted">{project.location}</p>
          </div>
          <dl className="grid grid-cols-2 gap-6 self-end border-t border-hair pt-6 sm:grid-cols-3">
            {project.meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow text-ink-muted">{m.label}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-12 max-w-[62ch]">
          <p className="dropcap text-[1.02rem] leading-[1.8] text-ink-soft">{project.lede}</p>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10">
          <img
            src={project.hero.src}
            alt={project.hero.alt}
            loading="lazy"
            className="w-full border border-hair object-cover md:aspect-[16/9]"
          />
        </div>
      </Reveal>

      {project.strips.map((strip) => (
        <Filmstrip key={strip.title} title={strip.title} plates={strip.plates} />
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