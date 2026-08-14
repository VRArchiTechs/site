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
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const visiblePlates = plates.filter(Boolean);
  const activePlate = Math.min(activeIndex, Math.max(visiblePlates.length - 1, 0));
  const activePlateLabel = String(activePlate + 1).padStart(2, "0");
  const totalPlateLabel = String(visiblePlates.length).padStart(2, "0");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const plateNodes = Array.from(track.querySelectorAll<HTMLElement>("figure[data-plate-index]"));
    if (!plateNodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let nextActiveIndex = activeIndexRef.current;
        let nextActiveLeft = Number.NEGATIVE_INFINITY;
        let sawIntersection = false;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          sawIntersection = true;
          const target = entry.target as HTMLElement;
          const index = Number(target.dataset.plateIndex);
          const left = entry.boundingClientRect.left;

          if (left > nextActiveLeft || (left === nextActiveLeft && index > nextActiveIndex)) {
            nextActiveLeft = left;
            nextActiveIndex = index;
          }
        }

        if (!sawIntersection) return;
        if (nextActiveIndex === activeIndexRef.current) return;

        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      },
      {
        root: track,
        threshold: 0,
        rootMargin: "0px -24.5% 0px -75%",
      },
    );

    plateNodes.forEach((plate) => observer.observe(plate));

    return () => {
      observer.disconnect();
    };
  }, [visiblePlates.length]);

  return (
    <div className="mt-16">
      <div className="mx-auto max-w-[1320px] border-b border-hair px-6 pb-4 md:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <p className="eyebrow truncate text-brass">{title}</p>
          <p className="eyebrow shrink-0 tabular-nums text-ink-muted">
            PLATE {activePlateLabel} / {totalPlateLabel}
          </p>
        </div>
        {description ? (
          <p className="mt-3 max-w-[62ch] text-sm leading-[1.8] text-ink-muted">{description}</p>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
        <div className="mt-5 border-b border-hair/50 pb-4">
          <div ref={trackRef} className="filmstrip flex gap-8 overflow-x-auto pb-5 md:gap-10" style={{ scrollPaddingInline: 0 }}>
            {visiblePlates.map((plate, i) => {
              const isActive = i === activePlate;

              return (
                <figure
                  key={plate.src + plate.caption}
                  data-plate-index={i}
                  className="group w-[82vw] shrink-0 sm:w-[52vw] lg:w-[calc((100%-2.5rem)/2.15)]"
                >
                  <figcaption
                    className={`mb-4 border-b pb-3 transition-[border-color,opacity,color] duration-150 motion-reduce:transition-none ${
                      isActive ? "border-brass/45 opacity-100" : "border-hair/80 opacity-85"
                    }`}
                  >
                    <span
                      className={`eyebrow transition-colors duration-150 motion-reduce:transition-none ${isActive ? "text-brass" : "text-ink-muted/80"}`}
                    >
                      PLATE {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className={`mt-1 max-w-[28ch] text-sm leading-[1.65] transition-colors duration-150 motion-reduce:transition-none ${isActive ? "font-medium text-ink" : "text-ink-muted/85"}`}
                    >
                      {plate.caption}
                    </p>
                  </figcaption>

                  <AspectImage
                    src={plate.src}
                    alt={plate.alt}
                    display={display}
                    frameClassName={`border bg-paper-deep transition-colors duration-150 motion-reduce:transition-none ${
                      isActive ? "border-brass/45" : "border-hair"
                    }`}
                    className={`transition-opacity duration-150 motion-reduce:transition-none ${
                      isActive ? "opacity-100" : "opacity-[0.92]"
                    }`}
                  />
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
