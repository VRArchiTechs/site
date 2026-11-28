import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import type { Project } from "@/content/portfolio";

type ViewerProps = {
  items: Project[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
};

export function ProjectViewer({ items, index, onIndex, onClose }: ViewerProps) {
  const project = items[index]!;
  const { images, title } = project;
  const [view, setView] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const verticalRail = useRef<HTMLDivElement>(null);
  const horizontalRail = useRef<HTMLDivElement>(null);
  const total = items.length;
  const pad = (v: number) => String(v).padStart(2, "0");
  const current = images[view] ?? images[0]!;

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    for (const next of [images[view + 1], images[view - 1]]) {
      if (!next) continue;
      const preload = new Image();
      preload.decoding = "async";
      preload.src = next;
    }
  }, [images, view]);

  const goProject = useCallback(
    (d: number) => {
      onIndex((index + d + total) % total);
      setView(0);
    },
    [index, total, onIndex],
  );

  const goView = useCallback(
    (d: number) => {
      setView((v) => Math.min(Math.max(v + d, 0), images.length - 1));
    },
    [images.length],
  );

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goProject(1);
      else if (e.key === "ArrowLeft") goProject(-1);
      else if (e.key === "ArrowDown") goView(1);
      else if (e.key === "ArrowUp") goView(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goProject, goView, onClose]);

  useEffect(() => {
    const vertical = verticalRail.current;
    const verticalThumb = vertical?.querySelector<HTMLElement>(`[data-view="${view}"]`);
    if (vertical && verticalThumb && vertical.offsetParent !== null) {
      vertical.scrollTo({
        top: verticalThumb.offsetTop - vertical.clientHeight / 2 + verticalThumb.clientHeight / 2,
        behavior: "smooth",
      });
    }
    const horizontal = horizontalRail.current;
    const horizontalThumb = horizontal?.querySelector<HTMLElement>(`[data-view="${view}"]`);
    if (horizontal && horizontalThumb && horizontal.offsetParent !== null) {
      horizontal.scrollTo({
        left: horizontalThumb.offsetLeft - horizontal.clientWidth / 2 + horizontalThumb.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [view, index]);

  const round =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/20 bg-espresso/40 text-bone transition-colors hover:border-forest hover:bg-forest md:h-12 md:w-12";

  const thumbs = (vertical: boolean) =>
    images.map((src, k) => (
      <button
        data-view={k}
        key={src}
        type="button"
        aria-label={`Show view ${k + 1}`}
        aria-pressed={k === view}
        onClick={() => setView(k)}
        className={`shrink-0 overflow-hidden border bg-bone/5 transition-opacity ${vertical ? "h-14 w-24" : "h-12 w-20"} ${k === view ? "border-forest opacity-100" : "border-transparent opacity-45 hover:opacity-100"}`}
      >
        <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
      </button>
    ));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex h-dvh flex-col overflow-hidden bg-espresso/95 text-bone backdrop-blur-xl animate-in fade-in duration-300"
    >
      <header className="flex h-16 shrink-0 items-center justify-between px-5 md:h-20 md:px-10">
        <span className="text-[11px] tabular-nums tracking-[0.25em] text-bone/50">
          {pad(index + 1)} / {pad(total)}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="border border-bone/25 px-5 py-2.5 text-[10px] font-medium tracking-[0.28em] uppercase transition-colors hover:border-forest hover:bg-forest md:px-6 md:py-3"
        >
          Close
        </button>
      </header>

      <div className="relative mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col">
        {!isMobile ? (
        <div className="relative flex min-h-0 flex-1 items-center justify-center gap-6 px-24">
          <button type="button" aria-label="Previous project" onClick={() => goProject(-1)} className={`${round} absolute top-1/2 left-6 z-10 -translate-y-1/2`}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Next project" onClick={() => goProject(1)} className={`${round} absolute top-1/2 right-6 z-10 -translate-y-1/2`}>
            <ChevronRight className="h-5 w-5" />
          </button>
          <figure className="flex min-w-0 flex-col">
            <img
              key={current}
              src={current}
              alt={`${title} — view ${view + 1} of ${images.length}`}
              decoding="async"
              className="h-auto max-h-[calc(100dvh-17rem)] w-auto max-w-[calc(100vw-22rem)] object-contain shadow-2xl animate-in fade-in duration-500"
            />
            <figcaption className="mt-6 grid w-0 min-w-full grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-10">
              <div className="min-w-0">
                <p className="text-[9px] tracking-[0.3em] text-bone/45 uppercase">
                  {project.category} · {project.type}
                </p>
                <h3 className="mt-2 truncate text-xl font-medium tracking-[0.14em] uppercase lg:text-2xl">{title}</h3>
                <p className="mt-1 text-[10px] tracking-[0.15em] text-bone/45">
                  {project.year} · {project.location}
                </p>
              </div>
              <p className="line-clamp-4 text-right text-sm leading-relaxed text-bone/60">{project.summary}</p>
            </figcaption>
          </figure>
          <aside className="flex max-h-[calc(100dvh-17rem)] w-28 shrink-0 flex-col items-center self-center py-2" aria-label="Project views">
            <button
              type="button"
              aria-label="Previous view"
              onClick={() => goView(-1)}
              disabled={view === 0}
              className="grid h-8 w-8 shrink-0 place-items-center text-bone/60 hover:text-bone disabled:opacity-20"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <div className="flex min-h-0 flex-1 items-stretch">
              <div ref={verticalRail} className="scrollbar-none flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-2">
                {thumbs(true)}
              </div>
              <div className="relative w-px shrink-0 bg-bone/10" aria-hidden="true">
                <div
                  className="absolute top-0 left-0 w-px bg-bone/60 transition-transform duration-300"
                  style={{ height: `${100 / images.length}%`, transform: `translateY(${view * 100}%)` }}
                />
              </div>
            </div>
            <button
              type="button"
              aria-label="Next view"
              onClick={() => goView(1)}
              disabled={view === images.length - 1}
              className="grid h-8 w-8 shrink-0 place-items-center text-bone/60 hover:text-bone disabled:opacity-20"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
            <span className="mt-2 shrink-0 text-[9px] tracking-[0.28em] whitespace-nowrap text-bone/40 uppercase [writing-mode:vertical-rl]">
              {view + 1} of {images.length} views
            </span>
          </aside>
        </div>
        ) : (
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div
            className="relative min-h-0 min-w-0 flex-1 px-3"
            style={{ touchAction: "pan-y" }}
            onTouchStart={(e) => {
              const point = e.touches[0];
              touch.current = point ? { x: point.clientX, y: point.clientY } : null;
            }}
            onTouchEnd={(e) => {
              const end = e.changedTouches[0];
              const start = touch.current;
              touch.current = null;
              if (!start || !end) return;
              const dx = end.clientX - start.x;
              const dy = end.clientY - start.y;
              if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
              const d = dx < 0 ? 1 : -1;
              if (view + d >= 0 && view + d < images.length) setView(view + d);
              else goProject(d);
            }}
          >
            <img key={current} src={current} alt={`${title} — view ${view + 1} of ${images.length}`} decoding="async" className="h-full w-full object-contain animate-in fade-in duration-500" />
          </div>

          <div className="shrink-0 px-5 pt-3 pb-2">
            <div className="flex items-center gap-3">
              <div ref={horizontalRail} className="scrollbar-none flex min-w-0 flex-1 gap-2 overflow-x-auto">
                {thumbs(false)}
              </div>
              <span className="shrink-0 text-[9px] tracking-[0.2em] whitespace-nowrap text-bone/45 uppercase">
                {view + 1} of {images.length} views
              </span>
            </div>
            <div className="relative mt-3 h-px bg-bone/10" aria-hidden="true">
              <div
                className="absolute top-0 left-0 h-px bg-bone/60 transition-transform duration-300"
                style={{ width: `${100 / images.length}%`, transform: `translateX(${view * 100}%)` }}
              />
            </div>
          </div>
        </div>
        )}

        {isMobile && (
        <footer className="shrink-0 px-5 pt-2 pb-4">
          <div className="grid gap-4 border-t border-bone/10 pt-4">
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.25em] text-bone/45 uppercase">
                {project.category} · {project.type}
              </p>
              <h3 className="mt-2 truncate text-lg font-medium tracking-[0.1em] uppercase md:text-2xl">{title}</h3>
              <p className="mt-1 text-[10px] tracking-[0.15em] text-bone/45">
                {project.year} · {project.location}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <button type="button" aria-label="Previous project" onClick={() => goProject(-1)} className={round}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-[9px] tracking-[0.2em] text-bone/35 uppercase">Swipe image to browse</span>
            <button type="button" aria-label="Next project" onClick={() => goProject(1)} className={round}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </footer>
        )}
      </div>
    </div>
  );
}