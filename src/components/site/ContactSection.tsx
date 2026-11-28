import { useState } from "react";
import { ArrowRight, Instagram, Mail } from "lucide-react";
import { socials } from "@/content/portfolio";

/** Angled shadow facet: soft light and shadow planes following the V's diagonal, giving the wall depth with no literal letters. */
function MonogramBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(112deg, transparent 0%, transparent 48%, color-mix(in oklab, var(--bone) 4.5%, transparent) 48.4%, color-mix(in oklab, var(--bone) 1.5%, transparent) 72%, transparent 92%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(112deg, transparent 0%, transparent 78%, color-mix(in oklab, var(--espresso) 18%, transparent) 78.4%, color-mix(in oklab, var(--espresso) 28%, transparent) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 15% 20%, color-mix(in oklab, var(--bone) 4%, transparent), transparent 60%)" }}
      />
    </div>
  );
}

export function ContactSection() {
  const services = ["Architecture", "Structural Design", "Interior Design", "Visualisation"];
  const [sent, setSent] = useState(false);
  const label = "text-[10px] tracking-[0.3em] text-bone/45 uppercase";
  const field = "mt-3 w-full bg-transparent text-base text-bone outline-hidden placeholder:text-bone/35";
  const cell = "block border-b border-bone/15 px-0 py-6 transition-colors focus-within:border-bone/50 md:px-7";
  const links = [
    ...socials.map((s) => ({ label: s.label, href: s.href, Icon: s.label === "Instagram" ? Instagram : null })),
    { label: "Email", href: "mailto:ahirvishnu111@gmail.com", Icon: Mail },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-forest-deep text-bone">
      <MonogramBackdrop />
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className={label}>Contact</p>
          <h2 className="mt-5 text-5xl font-light tracking-[-0.03em] md:text-6xl">
            Start a <span className="font-medium text-bone/70">project</span>
          </h2>
          <p className="mt-7 max-w-md text-base text-bone/60">Planning a home, a facade or an interior? Share the site, scale and timeline — every project is resolved from plan to handover.</p>
          <dl className="mt-12 grid gap-7 sm:grid-cols-2">
            <div>
              <dt className={label}>Email</dt>
              <dd className="mt-2">
                <a href="mailto:ahirvishnu111@gmail.com" className="link-underline break-all">
                  ahirvishnu111@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Phone</dt>
              <dd className="mt-2">
                <a href="tel:+919099951391" className="link-underline">
                  +91 90999 51391
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Based in</dt>
              <dd className="mt-2">Gandhinagar, Gujarat</dd>
            </div>
            <div>
              <dt className={label}>Available for</dt>
              <dd className="mt-2">Projects worldwide</dd>
            </div>
          </dl>
          <div className="mt-10">
            <p className={label}>Follow</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {links.map(({ label: name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 border border-bone/20 px-4 py-2.5 text-[12px] tracking-[0.12em] text-bone/85 transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-forest-deep"
                  >
                    {Icon ? <Icon className="h-3.5 w-3.5" /> : <span className="text-[11px] font-bold">P</span>}
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {sent ? (
          <div className="flex flex-col justify-center border-t border-bone/20 pt-10" role="status">
            <h3 className="text-3xl font-light">Thank you.</h3>
            <p className="mt-3 font-serif text-lg italic text-bone/60">Your message has been noted — we'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid md:grid-cols-2">
              <label className={`${cell} md:border-r md:pl-0`}>
                <span className={label}>Name</span>
                <input required name="name" placeholder="Your name" className={field} />
              </label>
              <label className={cell}>
                <span className={label}>Email</span>
                <input required type="email" name="email" placeholder="your@email.com" className={field} />
              </label>
            </div>
            <label className={`${cell} md:pl-0`}>
              <span className={label}>Project type</span>
              <select name="type" defaultValue="" className={`${field} [&>option]:text-espresso`}>
                <option value="" disabled>
                  Select
                </option>
                {services.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className={`${cell} md:pl-0`}>
              <span className={label}>Tell us about your project</span>
              <textarea name="message" rows={4} placeholder="Location, scale, timeline, any references…" className={`${field} resize-none`} />
            </label>
            <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
              <span className="text-[10px] tracking-[0.3em] text-bone/40 uppercase">Response within 24h</span>
              <button
                type="submit"
                className="inline-flex items-center gap-3 border border-bone/30 px-9 py-4 text-[11px] tracking-[0.28em] uppercase transition-colors hover:border-bone hover:bg-bone hover:text-espresso"
              >
                Send message <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
