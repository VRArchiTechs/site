import { useEffect, useRef, useState, type WheelEvent } from "react";
import { AspectImage } from "./AspectImage";
import type { DisplayPreset } from "@/lib/display-presets";
import type { Plate } from "@/lib/portfolio-data";

type Props = {
  title: string;
  description?: string | undefined;
  display: DisplayPreset;
  plates: Plate[];
};

function createCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDerivativeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  const solveX = (x: number) => {
    let t = x;

    for (let i = 0; i < 8; i += 1) {
      const x2 = sampleX(t) - x;
      if (Math.abs(x2) < 1e-6) return t;
      const derivative = sampleDerivativeX(t);
      if (Math.abs(derivative) < 1e-6) break;
      t -= x2 / derivative;
    }

    let t0 = 0;
    let t1 = 1;
    t = x;

    while (t0 < t1) {
      const x2 = sampleX(t);
      if (Math.abs(x2 - x) < 1e-6) return t;
      if (x > x2) t0 = t;
      else t1 = t;
      t = (t0 + t1) / 2;
    }

    return t;
  };

  return (x: number) => sampleY(solveX(x));
}

export function Filmstrip({ title, description, display, plates }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const firstGlideTimerRef = useRef<number | null>(null);
  const secondGlideTimerRef = useRef<number | null>(null);
  const hintTimerRef = useRef<number | null>(null);
  const autoScrollingRef = useRef(false);
  const interactedRef = useRef(false);
  const hintSeenRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const reducedMotionRef = useRef(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const clearTimers = () => {
      if (firstGlideTimerRef.current !== null) {
        window.clearTimeout(firstGlideTimerRef.current);
        firstGlideTimerRef.current = null;
      }
      if (secondGlideTimerRef.current !== null) {
        window.clearTimeout(secondGlideTimerRef.current);
        secondGlideTimerRef.current = null;
      }
      if (hintTimerRef.current !== null) {
        window.clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
    };

    const stopAnimation = () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      autoScrollingRef.current = false;
    };

    const animateScrollTo = (targetLeft: number, duration: number, onComplete?: () => void) => {
      const element = trackRef.current;
      if (!element) return;

      const startLeft = element.scrollLeft;
      const distance = targetLeft - startLeft;
      if (Math.abs(distance) < 1) {
        onComplete?.();
        return;
      }

      stopAnimation();
      autoScrollingRef.current = true;
      const ease = createCubicBezier(0.16, 1, 0.3, 1);
      const startTime = performance.now();

      const step = (time: number) => {
        if (interactedRef.current) {
          stopAnimation();
          return;
        }

        const progress = Math.min((time - startTime) / duration, 1);
        element.scrollLeft = startLeft + distance * ease(progress);

        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(step);
          return;
        }

        stopAnimation();
        onComplete?.();
      };

      rafRef.current = window.requestAnimationFrame(step);
    };

    const glideBy = (distance: number, duration: number, onComplete?: () => void) => {
      const element = trackRef.current;
      if (!element) return;

      const maxScrollLeft = Math.max(0, element.scrollWidth - element.clientWidth);
      if (maxScrollLeft <= 0) {
        onComplete?.();
        return;
      }

      const targetLeft = Math.min(element.scrollLeft + distance, maxScrollLeft);
      if (targetLeft <= element.scrollLeft + 1) {
        onComplete?.();
        return;
      }

      animateScrollTo(targetLeft, duration, onComplete);
    };

    const scheduleSecondGlide = () => {
      if (reducedMotionRef.current || interactedRef.current) return;
      if (secondGlideTimerRef.current !== null) return;

      secondGlideTimerRef.current = window.setTimeout(() => {
        secondGlideTimerRef.current = null;
        if (reducedMotionRef.current || interactedRef.current) return;
        glideBy(200, 2600);
      }, 8000);
    };

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotionRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || interactedRef.current) return;
          if (firstGlideTimerRef.current !== null) return;

          firstGlideTimerRef.current = window.setTimeout(() => {
            firstGlideTimerRef.current = null;
            if (interactedRef.current || reducedMotionRef.current) return;

            if (!hintSeenRef.current) {
              hintSeenRef.current = true;
              setShowHint(true);
              hintTimerRef.current = window.setTimeout(() => {
                hintTimerRef.current = null;
                setShowHint(false);
              }, 2000);
            }

            glideBy(300, 5000, scheduleSecondGlide);
          }, 120);
        },
        { threshold: 0.25 },
      );

      observerRef.current.observe(viewport);
    }

    return () => {
      clearTimers();
      stopAnimation();
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  const handleManualInteraction = () => {
    if (reducedMotionRef.current || interactedRef.current) return;
    interactedRef.current = true;
    setShowHint(false);

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (firstGlideTimerRef.current !== null) {
      window.clearTimeout(firstGlideTimerRef.current);
      firstGlideTimerRef.current = null;
    }

    if (secondGlideTimerRef.current !== null) {
      window.clearTimeout(secondGlideTimerRef.current);
      secondGlideTimerRef.current = null;
    }

    if (hintTimerRef.current !== null) {
      window.clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }

    autoScrollingRef.current = false;
  };

  const handleScroll = () => {
    if (!autoScrollingRef.current) handleManualInteraction();
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    handleManualInteraction();
    track.scrollLeft += Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    event.preventDefault();
  };

  return (
    <div ref={viewportRef} className="mt-16">
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
        <div className="relative mt-5">
          <div
            ref={trackRef}
            className="filmstrip flex snap-x snap-proximity gap-5 overflow-x-auto pb-5"
            style={{
              scrollPaddingInline: 0,
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)",
            }}
            onMouseEnter={handleManualInteraction}
            onPointerDown={handleManualInteraction}
            onTouchStart={handleManualInteraction}
            onScroll={handleScroll}
            onWheel={handleWheel}
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
                  <span className="eyebrow shrink-0 text-brass">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xs leading-relaxed text-ink-muted">{plate.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {!reducedMotionRef.current && showHint ? (
            <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-hair/70 bg-paper/80 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-brass-soft/80 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none">
              ← Drag →
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
