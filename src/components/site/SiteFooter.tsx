import { Reveal } from "./Reveal";
import { studio } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-hair-dark bg-paper text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="eyebrow text-brass-soft">Get in touch</p>
          <h2 className="mt-8 max-w-[24ch] font-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.98] tracking-[-0.02em]">
            Let's design something <em className="text-brass-soft">timeless,</em> together.
          </h2>

          <div className="mt-14 grid gap-8 border-t border-hair-dark pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`mailto:${studio.email}`}
              className="font-display text-[clamp(1.2rem,2.6vw,1.9rem)] text-ink transition-colors hover:text-brass-soft"
            >
              {studio.email}
            </a>
            <a
              href={`tel:${studio.phone.replace(/\s/g, "")}`}
              className="font-display text-[clamp(1.2rem,2.6vw,1.9rem)] text-ink transition-colors hover:text-brass-soft"
            >
              {studio.phone}
            </a>
            <span className="font-display text-[clamp(1.2rem,2.6vw,1.9rem)] text-ink">Instagram</span>
            <span className="font-display text-[clamp(1.2rem,2.6vw,1.9rem)] text-ink">Pinterest</span>
          </div>

          <div className="mt-20 flex flex-col gap-4 border-t border-hair-dark pt-8 text-ink/55 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow">
              {studio.name} — {studio.practice} · {studio.role}
            </p>
            <p className="eyebrow">{studio.city}</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
