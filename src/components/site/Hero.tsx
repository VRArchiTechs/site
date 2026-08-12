import { studio } from "@/lib/portfolio-data";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <img
        src={studio.landingImage.src}
        alt={studio.landingImage.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-paper/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/45 to-paper/25" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-[-4rem] select-none font-display text-[34vw] leading-none text-ink/[0.045] md:text-[26vw]"
      >
        00
      </span>

      <div className="relative mx-auto w-full max-w-[1240px] px-6 pb-20 pt-36 md:px-10 md:pb-28">
        <p className="eyebrow text-brass">{studio.practice} — Selected Work 2026</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,11vw,7.5rem)] leading-[0.94] tracking-[-0.02em] text-ink">
          {studio.name}
        </h1>
        <div className="mt-8 h-px w-full max-w-[560px] bg-brass/60" />
        <p className="mt-6 max-w-[34ch] font-display text-[clamp(1.15rem,2.4vw,1.75rem)] italic leading-snug text-ink-soft">
          {studio.philosophy}
        </p>
        <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-3">
          <span className="eyebrow text-ink-muted">{studio.role}</span>
          <span className="eyebrow text-ink-muted">{studio.city}</span>
          <a href="#work" className="eyebrow text-brass transition-colors hover:text-ink">
            Scroll to the index ↓
          </a>
        </div>
      </div>
    </section>
  );
}
