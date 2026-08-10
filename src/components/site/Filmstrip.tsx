import type { Plate } from "@/lib/portfolio-data";

export function Filmstrip({ title, plates }: { title: string; plates: Plate[] }) {
  return (
    <div className="mt-16">
      <div className="mx-auto flex max-w-[1240px] items-baseline justify-between gap-4 px-6 md:px-10">
        <p className="eyebrow text-brass">{title}</p>
        <p className="eyebrow text-ink-muted">{plates.length} plates →</p>
      </div>
      <div
        className="filmstrip mt-5 flex snap-x snap-proximity gap-5 overflow-x-auto pb-5"
        style={{
          paddingInline: "max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem))",
          scrollPaddingInline: "max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem))",
        }}
      >
        {plates.map((plate) => (
          <figure
            key={plate.src + plate.caption}
            className="w-[80vw] shrink-0 snap-start sm:w-[54vw] lg:w-[38vw]"
          >
            <img
              src={plate.src}
              alt={plate.alt}
              loading="lazy"
              className="aspect-[4/3] w-full border border-hair object-cover"
            />
            <figcaption className="mt-3 border-t border-hair pt-2 text-xs leading-relaxed text-ink-muted">
              {plate.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}