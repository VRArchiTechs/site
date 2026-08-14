import { useEffect, useRef, useState } from "react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visiblePlates = plates.filter(Boolean);
  const activePlate = Math.min(activeIndex, Math.max(visiblePlates.length - 1, 0));
  const activePlateLabel = String(activePlate + 1).padStart(2, "0");
  const totalPlateLabel = String(visiblePlates.length).padStart(2, "0");

  useEffect(() => {
    const updateActivePlate = () => {
      const track = trackRef.current;
      if (!track) return;

      const figures = Array.from(track.querySelectorAll<HTMLElement>("figure"));
      if (!figures.length) return;

      const scrollLeft = track.scrollLeft;
      let nextActiveIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      figures.forEach((figure, index) => {
        const distance = Math.abs(figure.offsetLeft - scrollLeft);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextActiveIndex = index;
        }
      });

      setActiveIndex((current) => (current === nextActiveIndex ? current : nextActiveIndex));
    };

    updateActivePlate();

    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateActivePlate, { passive: true });
    window.addEventListener("resize", updateActivePlate);

    return () => {
      track.removeEventListener("scroll", updateActivePlate);
      window.removeEventListener("resize", updateActivePlate);
    };
  }, [visiblePlates.length]);

  return (
    <div className="mt-16">
      <div className="mx-auto max-w-[1320px] border-b border-hair px-6 pb-4 md:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
          <p className="eyebrow truncate text-brass">{title}</p>
          <p className="eyebrow shrink-0 text-ink-muted">
            PLATE {activePlateLabel} / {totalPlateLabel}
          </p>
        </div>
        {description ? (
          <p className="mt-3 max-w-[62ch] text-sm leading-[1.8] text-ink-muted">{description}</p>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
        <div
          ref={trackRef}
          className="filmstrip mt-5 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-5 md:gap-10"
          style={{
            scrollPaddingInline: 0,
          }}
        >
          {visiblePlates.map((plate, i) => {
            const isActive = i === activePlate;

            return (
              <figure
                key={plate.src + plate.caption}
                className="group w-[82vw] shrink-0 snap-start snap-always sm:w-[52vw] lg:w-[calc((100%-2.5rem)/2.15)]"
              >
                <figcaption
                  className={`mb-4 border-b pb-3 transition-[border-color,opacity] duration-300 motion-reduce:transition-none ${
                    isActive ? "border-brass/45 opacity-100" : "border-hair/80 opacity-90"
                  }`}
                >
                  <span className={`eyebrow ${isActive ? "text-brass" : "text-ink-muted"}`}>
                    PLATE {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={`mt-1 max-w-[28ch] text-sm leading-[1.65] ${isActive ? "text-ink" : "text-ink-muted"}`}>
                    {plate.caption}
                  </p>
                </figcaption>

                <AspectImage
                  src={plate.src}
                  alt={plate.alt}
                  display={display}
                  frameClassName={`border bg-paper-deep transition-colors duration-300 motion-reduce:transition-none ${
                    isActive ? "border-brass/45" : "border-hair"
                  }`}
                  className={`transition-opacity duration-300 motion-reduce:transition-none ${
                    isActive ? "opacity-100" : "opacity-90"
                  }`}
                />
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
