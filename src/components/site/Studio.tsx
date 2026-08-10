import { Reveal } from "./Reveal";
import { studio } from "@/lib/portfolio-data";

export function Studio() {
  return (
    <section id="studio" className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-36">
      <Reveal className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <div>
          <p className="eyebrow text-brass">The Studio</p>
          <div className="mt-6 border-t border-hair pt-6">
            <img
              src={studio.portrait.src}
              alt={studio.portrait.alt}
              loading="lazy"
              className="w-full object-cover grayscale-[0.15] md:aspect-[4/5]"
            />
            <p className="eyebrow mt-3 text-ink-muted">
              {studio.name} — {studio.practice}
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.01em] text-ink">
            An engineer's discipline, kept in service of a room.
          </h2>

          <div className="mt-10 columns-1 gap-12 lg:columns-2">
            <p className="dropcap text-[0.98rem] leading-[1.75] text-ink-soft">{studio.bio[0]}</p>
            <p className="mt-5 text-[0.98rem] leading-[1.75] text-ink-soft">{studio.bio[1]}</p>
          </div>

          <blockquote className="mt-12 border-l border-brass pl-6 font-display text-[clamp(1.3rem,2.6vw,1.9rem)] italic leading-snug text-ink">
            {studio.pullQuote}
          </blockquote>

          <dl className="mt-14 grid gap-8 border-t border-hair pt-8 sm:grid-cols-3">
            {studio.facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow text-brass">{f.label}</dt>
                <dd className="mt-2 pr-6 text-sm leading-relaxed text-ink-soft">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}