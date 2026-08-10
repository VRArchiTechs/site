import { sections } from "@/lib/portfolio-data";

export function ProgressRail({ active }: { active: string }) {
  return (
    <nav
      aria-label="Section progress"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {sections.map((s) => {
        const on = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={on ? "true" : undefined}
            className="group flex h-3 w-3 items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                on
                  ? "h-[7px] w-[7px] bg-brass"
                  : "h-[3px] w-[3px] bg-ink/25 group-hover:bg-brass-soft"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}