import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  const visiblePlates = plates.filter(Boolean);
  const maxIndex = Math.max(visiblePlates.length - 1, 0);
  const safeActiveIndex = Math.min(activeIndex, maxIndex);
  const heroPlate = visiblePlates[Math.min(heroIndex, maxIndex)] ?? visiblePlates[0];
  const activePlateLabel = String(safeActiveIndex + 1).padStart(2, "0");
  const totalPlateLabel = String(visiblePlates.length).padStart(2, "0");

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncReducedMotion = () => {
      setReducedMotion(reduceQuery.matches);
    };

    syncReducedMotion();
    reduceQuery.addEventListener("change", syncReducedMotion);

    return () => {
      reduceQuery.removeEventListener("change", syncReducedMotion);
    };
  }, []);

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

  useEffect(() => {
    if (!heroPlate) return;

    if (reducedMotion) {
      setHeroIndex(safeActiveIndex);
      setHeroOpacity(1);
      return;
    }

    if (heroIndex === safeActiveIndex) {
      setHeroOpacity(1);
      return;
    }

    setHeroOpacity(0);
    const timer = window.setTimeout(() => {
      setHeroIndex(safeActiveIndex);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [heroPlate, heroIndex, reducedMotion, safeActiveIndex]);

  const scrollThumbIntoView = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const figures = Array.from(track.querySelectorAll<HTMLElement>("figure"));
    const figure = figures[index];
    if (!figure) return;

    figure.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const activatePlate = (index: number) => {
    if (!visiblePlates.length) return;

    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    setActiveIndex(nextIndex);
    scrollThumbIntoView(nextIndex);
  };

  const handleThumbKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activatePlate(index + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activatePlate(index - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      activatePlate(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      activatePlate(maxIndex);
    }
  };

  if (!heroPlate) return null;

  return (
    <div className="mt-16">
      <div className="mx-auto max-w-[1320px] border-b border-hair px-6 pb-4 md:px-10">
        <div className="mx-auto max-w-[920px] text-center">
          <p className="eyebrow text-brass">PLATE {activePlateLabel} / {totalPlateLabel}</p>
          <h2 className="mt-2 font-display text-[clamp(2.2rem,4.6vw,4.8rem)] leading-[0.95] tracking-[-0.03em]">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-4 max-w-[62ch] text-sm leading-[1.8] text-ink-muted">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
        <div className="mt-8 grid gap-8 lg:gap-10">
          <div className="mx-auto w-full max-w-[1120px]">
            <div
              className="transition-opacity duration-[200ms] motion-reduce:transition-none"
              style={{
                opacity: heroOpacity,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <AspectImage
                key={`${heroPlate.src}-${heroPlate.caption}`}
                src={heroPlate.src}
                alt={heroPlate.alt}
                display={display}
                eager
                frameClassName="border border-hair bg-paper-deep"
                className="motion-reduce:transition-none"
              />
            </div>
          </div>

          <div
            ref={trackRef}
            className="filmstrip flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 lg:gap-5"
            style={{
              scrollPaddingInline: 0,
            }}
          >
            {visiblePlates.map((plate, i) => {
              const isActive = i === safeActiveIndex;

              return (
                <figure
                  key={plate.src + plate.caption}
                  className="group w-[30vw] shrink-0 snap-start snap-always sm:w-[20vw] lg:w-[14vw]"
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`Show plate ${String(i + 1).padStart(2, "0")}: ${plate.caption}`}
                    onClick={() => activatePlate(i)}
                    onKeyDown={(event) => handleThumbKeyDown(event, i)}
                    className="block w-full text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass/30"
                  >
                    <AspectImage
                      src={plate.src}
                      alt={plate.alt}
                      display={display}
                      frameClassName={`border bg-paper-deep transition-colors duration-200 motion-reduce:transition-none ${
                        isActive ? "border-brass/50" : "border-hair"
                      }`}
                      className={`transition-opacity duration-200 motion-reduce:transition-none ${
                        isActive ? "opacity-100" : "opacity-85"
                      }`}
                    />

                    <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-3 border-t border-hair pt-2.5">
                      <span className={`eyebrow shrink-0 ${isActive ? "text-brass" : "text-ink-muted"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-xs leading-relaxed ${isActive ? "font-medium text-ink" : "text-ink-muted"}`}>
                        {plate.caption}
                      </span>
                    </div>
                  </button>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
