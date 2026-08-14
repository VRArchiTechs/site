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
  const scrollFrameRef = useRef<number | null>(null);
  const plateMetricsRef = useRef<Array<{ left: number; right: number }>>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const visiblePlates = plates.filter(Boolean);
  const activePlate = Math.min(activeIndex, Math.max(visiblePlates.length - 1, 0));
  const activePlateLabel = String(activePlate + 1).padStart(2, "0");
  const totalPlateLabel = String(visiblePlates.length).padStart(2, "0");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measurePlates = () => {
      const figures = Array.from(track.querySelectorAll<HTMLElement>("figure"));
      plateMetricsRef.current = figures.map((figure) => ({
        left: figure.offsetLeft,
        right: figure.offsetLeft + figure.offsetWidth,
      }));
    };

    const chooseActivePlate = () => {
      const metrics = plateMetricsRef.current;
      if (!metrics.length) return activeIndexRef.current;

      const viewportLeft = track.scrollLeft;
      const viewportRight = viewportLeft + track.clientWidth;
      const epsilon = 0.5;

      let bestIndex = activeIndexRef.current;
      let bestVisibleWidth = -1;

      metrics.forEach((plate, index) => {
        const visibleWidth = Math.max(0, Math.min(plate.right, viewportRight) - Math.max(plate.left, viewportLeft));

        if (visibleWidth > bestVisibleWidth + epsilon) {
          bestVisibleWidth = visibleWidth;
          bestIndex = index;
          return;
        }

        if (Math.abs(visibleWidth - bestVisibleWidth) <= epsilon && index === activeIndexRef.current) {
          bestIndex = index;
          bestVisibleWidth = visibleWidth;
        }
      });

      return bestIndex;
    };

    const syncActivePlate = () => {
      scrollFrameRef.current = null;

      if (!plateMetricsRef.current.length) return;

      const nextActiveIndex = chooseActivePlate();
      activeIndexRef.current = nextActiveIndex;
      setActiveIndex((current) => (current === nextActiveIndex ? current : nextActiveIndex));
    };

    const scheduleActivePlateSync = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(syncActivePlate);
    };

    const handleResize = () => {
      measurePlates();
      scheduleActivePlateSync();
    };

    measurePlates();
    syncActivePlate();

    track.addEventListener("scroll", scheduleActivePlateSync, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      track.removeEventListener("scroll", scheduleActivePlateSync);
      window.removeEventListener("resize", handleResize);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
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
          <div
            ref={trackRef}
            className="filmstrip flex gap-8 overflow-x-auto pb-5 md:gap-10"
            style={{
              scrollPaddingInline: 0,
            }}
          >
            {visiblePlates.map((plate, i) => {
              const isActive = i === activePlate;

              return (
                <figure
                  key={plate.src + plate.caption}
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
