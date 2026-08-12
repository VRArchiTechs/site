import { AspectImage } from "./AspectImage";
import { Reveal } from "./Reveal";
import { scenes } from "@/lib/portfolio-data";

export function Visualisation() {
  return (
    <section id="visualisation" className="bg-paper-deep text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
        <Reveal className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div>
            <p className="eyebrow text-brass-soft">Chapter — Visualisation</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.8rem)] leading-[1.03] tracking-[-0.015em]">
              Rendering as a way of testing material.
            </h2>
          </div>
          <p className="self-end border-t border-hair-dark pt-6 text-[0.98rem] leading-[1.8] text-ink/70">
            These scenes are grouped by room rather than by client. Each one is a controlled study —
            one light condition, one palette, one question about how a surface behaves before it is
            ever specified.
          </p>
        </Reveal>

        {scenes.map((scene, i) => (
          <Reveal key={scene.id} className="mt-20" delay={i * 40}>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-hair-dark pb-5">
              <h3 className="font-display text-[clamp(1.5rem,3.2vw,2.4rem)]">
                <span className="mr-4 align-middle text-sm tracking-[0.2em] text-brass-soft">
                  {scene.number}
                </span>
                {scene.name}
              </h3>
              <p className="eyebrow text-ink/50">
                {scene.galleryImages.length + (scene.heroImage ? 1 : 0)} renders
              </p>
            </div>

            <p className="mt-6 max-w-[62ch] text-[0.95rem] leading-[1.8] text-ink/65">
              {scene.note}
            </p>

            {scene.heroImage ? (
              <AspectImage
                src={scene.heroImage.src}
                alt={scene.heroImage.alt}
                display="16:9-cover"
                eager={i === 0}
                frameClassName="mt-9 border border-hair-dark"
              />
            ) : null}

            <div className="filmstrip mt-6 flex snap-x snap-proximity gap-5 overflow-x-auto pb-5">
              {scene.galleryImages.map((plate) => (
                <figure
                  key={plate.src + plate.caption}
                  className="group w-[84vw] shrink-0 snap-start sm:w-[46vw] lg:w-[32vw]"
                >
                  <AspectImage
                    src={plate.src}
                    alt={plate.alt}
                    display="3:4-cover"
                    frameClassName="border border-hair-dark"
                    className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  />
                  <figcaption className="mt-3 border-t border-hair-dark pt-2 text-xs leading-relaxed text-ink/55">
                    {plate.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
