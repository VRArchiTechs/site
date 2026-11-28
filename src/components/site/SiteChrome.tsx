import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { contactEmail, logoMark, socials, type Filter } from "@/content/portfolio";
import { Cursor } from "@/components/site/Cursor";

const pageLinks: { label: string; href: string; to: "/work" | "/services" | "/about"; filter?: Filter }[] = [
  { label: "Work", href: "#work", to: "/work", filter: "All" },
  { label: "Services", href: "#services", to: "/services" },
  { label: "About", href: "#about", to: "/about" },
];

type HeaderProps = {
  home: boolean;
  onSelectFilter: ((filter: Filter) => void) | undefined;
};

function SiteHeader({ home, onSelectFilter }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const selectFilter = (filter?: Filter) => {
    if (filter) onSelectFilter?.(filter);
  };

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 cursor-default outline-hidden md:hidden"
        />
      )}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${menuOpen || !home ? "border-b border-bone/10 bg-espresso" : scrolled ? "border-b border-bone/10 bg-espresso/85 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:h-20 md:grid-cols-3 md:px-10">
          {home ? (
            <a href="#top" className="flex min-w-0 items-center gap-3 text-bone" aria-label="VR ArchiTechs, back to top">
              <img src={logoMark} alt="" width={36} height={36} decoding="async" className="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9" />
              <span className="truncate text-xs font-medium tracking-[0.16em] uppercase sm:text-sm sm:tracking-[0.18em]">VR ArchiTechs</span>
            </a>
          ) : (
            <Link to="/" className="flex min-w-0 items-center gap-3 text-bone" aria-label="VR ArchiTechs, home">
              <img src={logoMark} alt="" width={36} height={36} decoding="async" className="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9" />
              <span className="truncate text-xs font-medium tracking-[0.16em] uppercase sm:text-sm sm:tracking-[0.18em]">VR ArchiTechs</span>
            </Link>
          )}

          <nav className="hidden justify-center gap-9 md:flex" aria-label="Main navigation">
            {pageLinks.map((item) =>
              home ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => selectFilter(item.filter)}
                  className="link-underline text-xs tracking-[0.2em] text-bone/80 uppercase transition-colors hover:text-bone"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="link-underline text-xs tracking-[0.2em] text-bone/80 uppercase transition-colors hover:text-bone"
                  activeProps={{ className: "text-bone" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="-mr-2 p-2 text-bone md:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" strokeWidth={1.25} /> : <Menu className="h-6 w-6" strokeWidth={1.25} />}
            </button>
            {home ? (
              <a
                href="#contact"
                className="hidden shrink-0 items-center gap-2 bg-bone px-3 py-2.5 text-[10px] tracking-[0.16em] text-espresso uppercase transition-colors hover:bg-forest hover:text-bone sm:px-5 sm:text-[11px] sm:tracking-[0.2em] md:inline-flex"
              >
                Start a Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                to="/contact"
                className="hidden shrink-0 items-center gap-2 bg-bone px-3 py-2.5 text-[10px] tracking-[0.16em] text-espresso uppercase transition-colors hover:bg-forest hover:text-bone sm:px-5 sm:text-[11px] sm:tracking-[0.2em] md:inline-flex"
              >
                Start a Project <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {menuOpen && (
          <nav
            className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-bone/10 px-5 pt-3 pb-6 shadow-plate md:hidden"
            aria-label="Main navigation"
          >
            <ul>
              {pageLinks.map((item) => (
                <li key={item.label}>
                  {home ? (
                    <a
                      href={item.href}
                      onClick={() => {
                        selectFilter(item.filter);
                        setMenuOpen(false);
                      }}
                      className="block border-b border-bone/10 py-5 text-[26px] leading-none font-light tracking-[0.14em] text-bone uppercase transition-colors duration-300 hover:text-bone/55"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-bone/10 py-5 text-[26px] leading-none font-light tracking-[0.14em] text-bone uppercase transition-colors duration-300 hover:text-bone/55"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                {home ? (
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-bone/10 py-5 text-[26px] leading-none font-light tracking-[0.14em] text-bone uppercase transition-colors duration-300 hover:text-bone/55"
                  >
                    Contact
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-bone/10 py-5 text-[26px] leading-none font-light tracking-[0.14em] text-bone uppercase transition-colors duration-300 hover:text-bone/55"
                  >
                    Contact
                  </Link>
                )}
              </li>
            </ul>
            <ul className="mt-6 grid grid-cols-3 gap-2.5">
              {[
                ...socials.map((social) => ({ label: social.label, href: social.href, external: true })),
                { label: "Email", href: `mailto:${contactEmail}`, external: false },
              ].map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noreferrer" : undefined}
                    className="flex items-center justify-center border border-bone/20 px-2 py-3 text-[10px] tracking-[0.16em] text-bone/80 uppercase transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-espresso"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            {home ? (
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 bg-bone py-4 text-[11px] tracking-[0.24em] text-espresso uppercase"
              >
                Start a Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 bg-bone py-4 text-[11px] tracking-[0.24em] text-espresso uppercase"
              >
                Start a Project <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </nav>
        )}
      </header>
    </>
  );
}

const footerLinks = [
  ["/work", "Work"],
  ["/services", "Services"],
  ["/about", "About"],
  ["/contact", "Contact"],
] as const;

function SiteFooter() {
  return (
    <footer className="border-t border-bone/10 bg-espresso py-10 text-bone/50">
      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 text-[10px] tracking-[0.22em] uppercase md:grid-cols-3 md:items-center md:px-10">
        <Link to="/" className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.3em] text-bone/80 transition-colors hover:text-bone">
          <img src={logoMark} alt="" width={24} height={24} loading="lazy" decoding="async" className="h-6 w-6 shrink-0 object-contain opacity-90" />
          <span>VR ArchiTechs</span>
        </Link>
        <nav className="flex flex-wrap gap-6 md:justify-center" aria-label="Footer">
          {footerLinks.map(([to, label]) => (
            <Link key={label} to={to} className="transition-colors hover:text-bone">
              {label}
            </Link>
          ))}
        </nav>
        <span className="md:text-right">© {new Date().getFullYear()} VR ArchiTechs · Gandhinagar</span>
      </div>
    </footer>
  );
}

type SiteLayoutProps = {
  children: ReactNode;
  home?: boolean;
  onSelectFilter?: (filter: Filter) => void;
};

export function SiteLayout({ children, home = false, onSelectFilter }: SiteLayoutProps) {
  return (
    <div className="bg-background text-foreground">
      <Cursor />
      <SiteHeader home={home} onSelectFilter={onSelectFilter} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
