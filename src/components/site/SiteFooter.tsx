import { Reveal } from "./Reveal";
import { studio } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-hair-dark bg-paper text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="eyebrow text-brass-soft">Contact</p>
          <h2 className="mt-8 max-w-[24ch] font-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.98] tracking-[-0.02em]">
            Let's draw something worth building.
          </h2>
          <p className="mt-8 max-w-[46ch] text-[0.98rem] leading-[1.8] text-ink/65">
            Available for residential architecture, structural documentation, interior fit-outs and
            visualisation commissions.
          </p>

          <div className="mt-14 grid gap-8 border-t border-hair-dark pt-10 sm:grid-cols-2">
            <a
              href={`mailto:${studio.email}`}
              className="font-display text-[clamp(1.2rem,2.6vw,1.9rem)] text-ink transition-colors hover:text-brass-soft"
            >
              {studio.email}
            </a>
            <a
              href={`tel:${studio.phone.replace(/\s/g, "")}`}
              className="font-display text-[clamp(1.2rem,2.6vw,1.9rem)] text-ink transition-colors hover:text-brass-soft sm:text-right"
            >
              {studio.phone}
            </a>
          </div>

          <p className="eyebrow mt-16 text-ink/40">
            {studio.name} — {studio.practice} · {studio.role} · {studio.city}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}