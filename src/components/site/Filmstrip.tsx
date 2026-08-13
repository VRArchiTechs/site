import { AspectImage } from "./AspectImage";
import type { DisplayPreset } from "@/lib/display-presets";
import type { Plate } from "@/lib/portfolio-data";

type Props = {
  title: string;
  description?: string | undefined;
  display: DisplayPreset;
  plates: Plate[];
};

export function Filmstrip({ title, description, display, plates }: Props) {
  return (
    <div className="mt-16">
      <div className="mx-auto max-w-[1320px] border-b border-hair px-6 pb-4 md:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
          <p className="eyebrow truncate text-brass">{title}</p>
          <p className="eyebrow shrink-0 text-ink-muted">{plates.length} PLATES</p>
        </div>
        {description ? (
          <p className="mt-3 max-w-[62ch] text-sm leading-[1.8] text-ink-muted">{description}</p>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
        <div
          className="filmstrip mt-5 flex snap-x snap-proximity gap-5 overflow-x-auto pb-5"
          style={{
            scrollPaddingInline: 0,
          }}
        >
          {plates.filter(Boolean).map((plate, i) => (
            <figure
              key={plate.src + plate.caption}
              className="group w-[84vw] shrink-0 snap-start sm:w-[54vw] lg:w-[38vw]"
            >
              <AspectImage
                src={plate.src}
                alt={plate.alt}
                display={display}
                frameClassName="border border-hair bg-paper-deep"
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
    </div>
  );
}
