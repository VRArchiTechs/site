import { useEffect, useRef, useState } from "react";

// Brand cursor: forest dot + hairline ring (0.13 lag). Over links the ring grows;
// over project cards ([data-cursor="view"]) it fills into a "View" disc.
// On dark sections ([data-cursor-theme="light"] ancestors or bg-espresso/forest) it turns bone.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0, state = "";
    const tick = () => {
      rx += (x - rx) * 0.13;
      ry += (y - ry) * 0.13;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      const t = e.target as HTMLElement;
      const view = !!t.closest?.("[data-cursor='view']");
      const link = !view && !!t.closest?.("a, button, input, select, textarea, [role='button']");
      const dark = !!t.closest?.(".bg-espresso, .bg-forest-deep, #top");
      const next = `${view ? "v" : link ? "l" : "i"}${dark ? "d" : ""}`;
      if (next !== state && dot.current && ring.current && label.current) {
        state = next;
        const ink = dark ? "var(--bone)" : "var(--forest-deep)";
        const size = view ? 76 : link ? 44 : 30;
        ring.current.style.width = ring.current.style.height = `${size}px`;
        ring.current.style.borderColor = view ? "transparent" : `color-mix(in oklab, ${ink} ${dark ? 60 : 55}%, transparent)`;
        ring.current.style.backgroundColor = view ? "color-mix(in oklab, var(--forest-deep) 88%, transparent)" : "transparent";
        label.current.style.opacity = view ? "1" : "0";
        dot.current.style.backgroundColor = ink;
        dot.current.style.opacity = view ? "0" : "1";
        dot.current.style.width = dot.current.style.height = link ? "4px" : "6px";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  return (
    <>
      <div
        ref={dot}
        aria-hidden
        style={{ width: 6, height: 6, backgroundColor: "var(--bone)", transition: `width .3s ${ease}, height .3s ${ease}, opacity .2s, background-color .3s` }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
      />
      <div
        ref={ring}
        aria-hidden
        style={{
          width: 30,
          height: 30,
          border: "1px solid color-mix(in oklab, var(--bone) 60%, transparent)",
          transition: `width .45s ${ease}, height .45s ${ease}, background-color .35s, border-color .35s`,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full"
      >
        <span ref={label} style={{ opacity: 0, transition: "opacity .25s" }} className="text-[9px] font-medium tracking-[0.25em] text-bone uppercase">
          View
        </span>
      </div>
    </>
  );
}
