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
  const visiblePlates = plates.filter(Boolean);
  const totalPlateLabel = String(visiblePlates.length).padStart(2, "0");

  return (
    <div className="mt-16">
      <div className="mx-auto max-w-[1320px] border-b border-hair px-6 pb-4 md:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <p className="eyebrow truncate text-brass">{title}</p>
          <p className="eyebrow shrink-0 tabular-nums text-ink-muted">PLATES {totalPlateLabel}</p>
        </div>
        {description ? (
          <p className="mt-3 max-w-[62ch] text-sm leading-[1.8] text-ink-muted">{description}</p>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
        <div className="mt-5 border-b border-hair/50 pb-4">
          <div className="filmstrip flex gap-8 overflow-x-auto pb-5 md:gap-10" style={{ scrollPaddingInline: 0 }}>
            {visiblePlates.map((plate, i) => (
              <figure
                key={plate.src + plate.caption}
                className="group w-[82vw] shrink-0 sm:w-[52vw] lg:w-[calc((100%-2.5rem)/2.15)]"
              >
                <figcaption className="mb-4 border-b border-hair/80 pb-3 opacity-95">
                  <span className="eyebrow text-ink-muted">PLATE {String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 max-w-[28ch] text-sm leading-[1.65] text-ink-muted/85">{plate.caption}</p>
                </figcaption>

                <AspectImage
                  src={plate.src}
                  alt={plate.alt}
                  display={display}
                  frameClassName="border border-hair bg-paper-deep"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
