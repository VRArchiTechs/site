import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { studio } from "@/lib/portfolio-data";

export function SiteFooter() {
  const taglineRef = useRef<HTMLDivElement>(null);
  const [taglineVisible, setTaglineVisible] = useState(false);

  useEffect(() => {
    const element = taglineRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTaglineVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTaglineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const lineStyle = {
    transform: `scaleX(${taglineVisible ? 1 : 0})`,
    transformOrigin: "center",
  };

  return (
    <footer id="contact" className="border-t border-hair-dark bg-paper text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <div className="text-center">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 text-brass-soft">
              <span
                aria-hidden="true"
                className="h-px w-10 origin-center bg-brass-soft/60 transition-transform duration-700 motion-reduce:transition-none sm:w-16"
                style={{
                  ...lineStyle,
                  transitionTimingFunction:
                    "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
              <p className="eyebrow">Get in touch</p>
            </div>

            {/* Tagline */}
            <div
              ref={taglineRef}
              className="mx-auto mt-8 w-full max-w-[980px]"
            >
              <h2 className="font-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.98] tracking-[-0.02em]">
                <span
                  className="block whitespace-nowrap transition-[opacity,transform] duration-500 motion-reduce:transition-none"
                  style={{
                    opacity: taglineVisible ? 1 : 0,
                    transform: `translateY(${taglineVisible ? 0 : 14}px)`,
                    transitionDelay: taglineVisible ? "120ms" : "0ms",
                    transitionTimingFunction:
                      "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  Let's design something
                </span>

                <span
                  className="block transition-[opacity,transform] duration-500 motion-reduce:transition-none"
                  style={{
                    opacity: taglineVisible ? 1 : 0,
                    transform: `translateY(${taglineVisible ? 0 : 14}px)`,
                    transitionDelay: taglineVisible ? "300ms" : "0ms",
                    transitionTimingFunction:
                      "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <em className="text-brass-soft">timeless,</em>{" "}
                  together.
                </span>
              </h2>
            </div>

            {/* Contact details */}
            <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
              <a
                href={`mailto:${studio.email}`}
                className="font-sans text-sm tracking-[0.04em] text-ink/70 underline decoration-ink/20 underline-offset-8 transition-colors hover:text-brass-soft hover:decoration-brass-soft/60"
              >
                {studio.email}
              </a>

              <a
                href={`tel:${studio.phone.replace(/\s/g, "")}`}
                className="font-sans text-sm tracking-[0.04em] text-ink/70 underline decoration-ink/20 underline-offset-8 transition-colors hover:text-brass-soft hover:decoration-brass-soft/60"
              >
                {studio.phone}
              </a>
            </div>
          </div>

          {/* Footer metadata */}
          <div className="mt-20 flex flex-col gap-5 border-t border-hair-dark pt-8 text-ink/45 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow">
              Vishnu Ahir — Engineer &amp; Architecture Designer
            </p>

            <div
              className="flex items-center gap-4 self-end sm:self-auto"
              aria-label="Social links"
            >
              <a
                href="https://www.instagram.com/vrarchitechs/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-ink/35 transition-colors hover:text-brass-soft"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              <a
                href="https://in.pinterest.com/vr_architechs/"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="text-ink/35 transition-colors hover:text-brass-soft"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 3.5a8.5 8.5 0 0 0-3.1 16.42c-.07-1.4-.01-3.08.35-4.41l1.02-4.32s-.26-.52-.26-1.29c0-1.2.7-2.1 1.57-2.1.74 0 1.1 1.23 1.1 1.23 0 .75-.48 1.87-.73 2.91-.21.87.44 1.58 1.3 1.58 1.56 0 2.76-1.65 2.76-4.03 0-2.11-1.52-3.58-3.69-3.58-2.51 0-3.98 1.88-3.98 3.83 0 .76.29 1.57.66 2.01.07.08.08.15.06.23l-.25 1.02c-.04.17-.14.2-.32.12-1.2-.56-1.95-2.31-1.95-3.71 0-3.02 2.19-5.8 6.32-5.8 3.32 0 5.9 2.37 5.9 5.54 0 3.31-2.09 5.97-4.99 5.97-.97 0-1.88-.5-2.19-1.1l-.6 2.28c-.22.84-.81 1.89-1.21 2.53.91.28 1.86.43 2.84.43A8.5 8.5 0 1 0 12 3.5Z" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
