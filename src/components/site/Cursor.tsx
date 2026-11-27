import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0, scale = 1, target = 1;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor], input, select, textarea");
      target = el ? ((el as HTMLElement).dataset["cursor"] === "view" ? 2.6 : 1.8) : 1;
    };
    const tick = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15; scale += (target - scale) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-forest mix-blend-normal" />
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border border-forest/70" />
    </>
  );
}
