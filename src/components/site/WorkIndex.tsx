import { Reveal } from "./Reveal";
import { getWorkProjects } from "@/lib/work";

export function WorkIndex() {
  const projects = getWorkProjects();

  return (
    <section id="work" className="border-y border-hair bg-paper-deep/60">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hair pb-6">
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] tracking-[-0.01em] text-ink">
            Index of Work
          </h2>
          <p className="eyebrow text-ink-muted">Six projects · Gujarat & Delhi NCR</p>
        </Reveal>

        <ul>
          {projects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 60}>
              <a
                href={`#${p.id}`}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 gap-y-1 border-b border-hair py-6 md:grid-cols-[auto_minmax(0,1fr)_auto_auto] md:gap-x-10 md:py-8"
              >
                <span className="eyebrow text-brass">{p.displayNumber}</span>
                <span className="min-w-0 font-display text-[clamp(1.4rem,3.2vw,2.4rem)] leading-tight text-ink transition-all duration-500 group-hover:translate-x-2 group-hover:text-brass">
                  {p.indexTitle}
                </span>
                <span className="eyebrow col-start-2 text-ink-muted md:col-start-3">
                  {p.location}
                </span>
                <span className="eyebrow col-start-2 text-brass opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:col-start-4">
                  View project →
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
