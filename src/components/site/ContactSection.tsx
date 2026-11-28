import { useState } from "react";
import { ArrowRight, Instagram, Mail, Phone } from "lucide-react";
import { socials } from "@/content/portfolio";

export function ContactSection() {
  const services = ["Architecture", "Interior Architecture", "3D Visualisation", "Commercial"];
  const [sent, setSent] = useState(false);
  const label = "text-[10px] tracking-[0.3em] text-bone/45 uppercase";
  const field = "mt-3 w-full bg-transparent text-base text-bone outline-hidden placeholder:text-bone/35";
  const cell = "block border-b border-bone/15 px-0 py-6 transition-colors focus-within:border-bone/50 md:px-7";

  return (
    <section id="contact" className="relative overflow-hidden bg-forest-deep text-bone">
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-bone/[0.04]">
        <path d="M18 100 L48 20 L78 100 Z M30 100 L48 52 L66 100 Z" fill="none" stroke="currentColor" strokeWidth="5" />
      </svg>
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className={label}>Contact</p>
          <h2 className="mt-5 text-5xl font-light tracking-[-0.03em] md:text-6xl">
            Start a <span className="font-medium text-bone/70">project</span>
          </h2>
          <p className="mt-7 max-w-md text-base text-bone/60">Tell us what you're working on. We'll get back to you within 24 hours.</p>
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

export function SocialStrip() {
  return (
    <section id="social" className="border-t border-bone/10 bg-espresso text-bone">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-10">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-bone/45 uppercase">Follow the studio</p>
          <p className="mt-3 font-serif text-2xl italic text-bone/80">New renders and work in progress, as they happen.</p>
        </div>
        <ul className="flex flex-wrap gap-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border border-bone/20 px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-bone hover:bg-bone hover:text-espresso"
              >
                {s.label === "Instagram" ? (
                  <Instagram className="h-4 w-4" />
                ) : (
                  <span className="grid h-4 w-4 place-items-center rounded-full border border-current text-[9px] font-bold">P</span>
                )}
                {s.label} <span className="normal-case tracking-normal text-bone/45 group-hover:text-espresso/60">{s.handle}</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:ahirvishnu111@gmail.com"
              className="inline-flex items-center gap-3 border border-bone/20 px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-bone hover:bg-bone hover:text-espresso"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/919099951391"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-bone/20 px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-bone hover:bg-bone hover:text-espresso"
            >
              <Phone className="h-4 w-4" />
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
