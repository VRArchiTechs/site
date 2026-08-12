import { useState } from "react";
import { studio } from "@/lib/portfolio-data";

const links = [
  { id: "studio", label: "Studio" },
  { id: "visualisation", label: "Visualisation" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function SiteNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hair bg-paper/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 md:px-10">
        <a
          href="#top"
          className="min-w-0 truncate font-display text-[1.05rem] tracking-[0.06em] text-ink"
        >
          Vishnu <span className="text-brass">Ahir</span>
        </a>

        <nav className="hidden shrink-0 items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="eyebrow relative py-1 text-ink-soft transition-colors hover:text-brass"
            >
              {l.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-brass transition-all duration-500"
                style={{ width: active === l.id ? "100%" : "0%" }}
              />
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 md:hidden"
        >
          <span className="eyebrow text-ink-soft">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-hair bg-paper px-6 pb-7 pt-5 md:hidden">
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 eyebrow text-ink-muted">{studio.practice}</p>
        </div>
      ) : null}
    </header>
  );
}
