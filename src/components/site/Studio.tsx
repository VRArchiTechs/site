import { AspectImage } from "./AspectImage";
import { Reveal } from "./Reveal";
import { studio } from "@/lib/portfolio-data";

export function Studio() {
  return (
    <section id="studio" className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-36">
        <Reveal className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-hair pb-5">
          <p className="eyebrow text-brass">The Studio</p>
          <p className="eyebrow text-ink-muted">01 — Practice</p>
        </Reveal>

        <Reveal className="mt-10 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          {/* Portrait — kept at 3:4, never cropped square */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 h-full w-full border border-brass/45"
              />
              <AspectImage
                src={studio.portrait.src}
                alt={studio.portrait.alt}
                frameClassName="relative border border-hair bg-paper-soft"
                className="grayscale-[0.12] transition-transform duration-[900ms] ease-out hover:scale-[1.02]"
              />
            </div>
            <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 border-t border-hair pt-3">
              <p className="eyebrow truncate text-ink">{studio.name}</p>
              <p className="eyebrow shrink-0 text-ink-muted">{studio.practice}</p>
            </div>
          </div>

          <div>
            <h2 className="max-w-[24ch] font-display text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-ink">
              An engineer's discipline, kept in service of a room.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10">
              <p className="dropcap text-[1rem] leading-[1.8] text-ink-soft">{studio.bio[0]}</p>
              <p className="text-[1rem] leading-[1.8] text-ink-soft">{studio.bio[1]}</p>
            </div>

            <blockquote className="mt-14 border-t border-hair pt-8 font-display text-[clamp(1.4rem,3.4vw,2.15rem)] italic leading-[1.25] text-ink">
              <span className="mr-2 not-italic text-brass">“</span>
              {studio.pullQuote}
            </blockquote>

            <dl className="mt-14 grid gap-px overflow-hidden border border-hair bg-hair sm:grid-cols-3">
              {studio.facts.map((f) => (
                <div key={f.label} className="bg-paper p-5">
                  <dt className="eyebrow text-brass">{f.label}</dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-ink-soft">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}