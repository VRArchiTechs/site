import { AspectImage } from "./AspectImage";
import type { Plate } from "@/lib/portfolio-data";

export function Filmstrip({ title, plates }: { title: string; plates: Plate[] }) {
  return (
    <div className="mt-16">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-hair px-6 pb-4 md:px-10">
        <p className="eyebrow truncate text-brass">{title}</p>
        <p className="eyebrow shrink-0 text-ink-muted">{plates.length} plates →</p>
      </div>
      <div
        className="filmstrip mt-5 flex snap-x snap-proximity gap-5 overflow-x-auto pb-5"
        style={{
          paddingInline: "max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem))",
          scrollPaddingInline: "max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem))",
        }}
      >
        {plates.map((plate, i) => (
          <figure
            key={plate.src + plate.caption}
            className="group w-[84vw] shrink-0 snap-start sm:w-[54vw] lg:w-[38vw]"
          >
            <AspectImage
              src={plate.src}
              alt={plate.alt}
              frameClassName="border border-hair bg-paper-soft"
              className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            />
            <figcaption className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-3 border-t border-hair pt-2.5">
              <span className="eyebrow shrink-0 text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs leading-relaxed text-ink-muted">{plate.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}