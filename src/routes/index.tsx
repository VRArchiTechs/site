import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { projects, scenes, studio } from "@/lib/portfolio-data";

const title = "VR ArchiTechs — Architecture, Interior & Visualization";
const description =
  "Architecture, interiors and visualization by Vishnu Ahir and VR ArchiTechs, based in Gandhinagar, Gujarat.";

type PortfolioCard = {
  id: string;
  title: string;
  subtitle: string;
  category: "Architecture" | "Interior" | "Visualization";
  image: string;
  alt: string;
  description: string;
  year: number;
  location: string;
  gallery: string[];
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "theme-color", content: "#27302d" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", href: "/favicon/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon/favicon-96x96.png" },
      { rel: "apple-touch-icon", href: "/favicon/apple-touch-icon.png" },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<PortfolioCard | null>(null);

  const cards = useMemo<PortfolioCard[]>(() => [
    ...projects.map((project) => ({
      id: project.id,
      title: project.title,
      subtitle: project.sub,
      category: project.id === "residence-03b" ? "Interior" as const : "Architecture" as const,
      image: project.heroImage?.src ?? "",
      alt: project.heroImage?.alt ?? project.title,
      description: project.notes.join("\n\n"),
      year: project.year,
      location: project.location,
      gallery: [
        ...(project.heroImage?.src ? [project.heroImage.src] : []),
        ...project.galleries.flatMap((gallery) => gallery.plates.map((plate) => plate.src)),
      ],
    })),
    ...scenes.map((scene) => ({
      id: scene.id,
      title: scene.title,
      subtitle: scene.description,
      category: "Visualization" as const,
      image: scene.heroImage?.src ?? scene.galleryImages[0]?.src ?? "",
      alt: scene.heroImage?.alt ?? scene.galleryImages[0]?.alt ?? scene.title,
      description: scene.description,
      year: scene.year,
      location: studio.city,
      gallery: [
        ...(scene.heroImage?.src ? [scene.heroImage.src] : []),
        ...scene.galleryImages.map((image) => image.src),
      ],
    })),
  ], []);

  const visibleCards = cards.filter((card) => filter === "All" || card.category === filter);

  function submitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Project enquiry — VR ArchiTechs");
    const body = encodeURIComponent(
      "Name: " + form.get("name") +
      "\nEmail: " + form.get("email") +
      "\nProject type: " + form.get("type") +
      "\n\n" + form.get("message"),
    );
    window.location.href = "mailto:" + studio.email + "?subject=" + subject + "&body=" + body;
  }

  return (
    <div className="redesign">
      <header className="rv-nav">
        <a className="rv-brand" href="#home" aria-label="VR ArchiTechs home">
          <span className="rv-monogram">VR</span>
          <span>VR ARCHITECHS</span>
        </a>
        <div className="rv-nav-right">
          <span className="rv-language">EN</span>
          <button
            className={"rv-menu-button" + (menuOpen ? " is-open" : "")}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>
        {menuOpen && (
          <nav className="rv-menu" aria-label="Main navigation">
            {[
              ["Work", "#work"],
              ["Services", "#services"],
              ["Studio", "#studio"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a className="rv-menu-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a project ↗</a>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="rv-hero">
          <img className="rv-hero-image" src={studio.landingImage.src} alt={studio.landingImage.alt} />
          <div className="rv-hero-shade" />
          <div className="rv-hero-content">
            <p className="rv-kicker">Architecture · Interiors · Visualization</p>
            <h1>Spaces with<br /><strong>purpose,</strong><br />made tangible.</h1>
            <div className="rv-hero-bottom">
              <a className="rv-round-link" href="#work" aria-label="Explore selected work">↓</a>
              <div className="rv-hero-stats">
                <div><strong>{projects.length}</strong><span>PROJECTS</span></div>
                <div><strong>{scenes.length}</strong><span>VISUAL STUDIES</span></div>
                <div><strong>IN</strong><span>GUJARAT, INDIA</span></div>
              </div>
            </div>
          </div>
          <span className="rv-hero-index">01 / 04</span>
        </section>

        <section id="services" className="rv-services rv-section">
          <div className="rv-section-top">
            <p className="rv-kicker rv-dark-kicker">WHAT WE DO</p>
            <p className="rv-section-index">01 — SERVICES</p>
          </div>
          <h2>Thoughtful design<br />from <em>plan to place.</em></h2>
          <div className="rv-service-grid">
            {[
              ["01", "ARCHITECTURE", "Homes shaped around people, place and climate."],
              ["02", "INTERIORS", "Warm, useful spaces resolved down to the detail."],
              ["03", "STRUCTURE", "Buildable structural design, integrated from the start."],
              ["04", "VISUALIZATION", "Clear imagery to help you see a design before it is built."],
            ].map(([number, name, detail]) => (
              <article key={number} className="rv-service">
                <span className="rv-service-number">{number}</span>
                <h3>{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="rv-work rv-section">
          <div className="rv-section-top">
            <p className="rv-kicker rv-dark-kicker">SELECTED PROJECTS</p>
            <p className="rv-section-index">{String(visibleCards.length).padStart(2, "0")} / {String(cards.length).padStart(2, "0")} WORKS</p>
          </div>
          <div className="rv-work-heading">
            <h2>Made with <em>intention.</em></h2>
            <p>Architecture, interiors and visual studies from Gujarat and beyond.</p>
          </div>
          <div className="rv-filters" aria-label="Filter projects">
            {["All", "Architecture", "Interior", "Visualization"].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "is-active" : ""}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >{item}</button>
            ))}
          </div>
          <div className="rv-project-grid">
            {visibleCards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={"rv-project-card" + (index % 3 === 1 ? " rv-project-card-offset" : "")}
                onClick={() => setSelected(card)}
              >
                <span className="rv-project-image">
                  <img src={card.image} alt={card.alt} loading={index > 1 ? "lazy" : "eager"} />
                  <span className="rv-project-open" aria-hidden="true">↗</span>
                </span>
                <span className="rv-project-caption">
                  <span><strong>{card.title}</strong><small>{card.category.toUpperCase()} · {card.location.toUpperCase()}</small></span>
                  <span className="rv-project-year">{card.year}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="studio" className="rv-studio rv-section">
          <div className="rv-section-top">
            <p className="rv-kicker">THE STUDIO</p>
            <p className="rv-section-index">02 — APPROACH</p>
          </div>
          <div className="rv-studio-grid">
            <div className="rv-studio-copy">
              <h2>Good design begins with <em>understanding.</em></h2>
              <p className="rv-studio-lead">{studio.bio[0]}</p>
              <p>{studio.bio[1]}</p>
              <a className="rv-text-link" href="#contact">WORK WITH ME <span>↗</span></a>
              <div className="rv-studio-facts">
                <div><strong>{projects.length}</strong><span>PROJECTS</span></div>
                <div><strong>{scenes.length}</strong><span>VISUAL STUDIES</span></div>
                <div><strong>GJ</strong><span>BASED IN GUJARAT</span></div>
              </div>
            </div>
            <figure className="rv-portrait">
              <img src={studio.portrait.src} alt={studio.portrait.alt} loading="lazy" />
              <figcaption><span>{studio.name}</span><span>{studio.role}</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="rv-statement">
          <p className="rv-kicker">OUR BELIEF</p>
          <blockquote>“{studio.philosophy}”</blockquote>
        </section>

        <section id="contact" className="rv-contact rv-section">
          <div className="rv-contact-info">
            <div className="rv-section-top">
              <p className="rv-kicker rv-dark-kicker">LET'S TALK</p>
              <p className="rv-section-index">03 — CONTACT</p>
            </div>
            <h2>Have a place<br />in <em>mind?</em></h2>
            <p className="rv-contact-intro">Tell me what you are working on. I’ll be glad to hear about it.</p>
            <a className="rv-contact-email" href={"mailto:" + studio.email}>{studio.email}<span>↗</span></a>
            <div className="rv-contact-details">
              <div><span>BASED IN</span><strong>{studio.city}</strong></div>
              <div><span>PHONE</span><a href={"tel:" + studio.phone.replace(/\s/g, "")}>{studio.phone}</a></div>
              <div><span>PRACTICE</span><strong>Architecture · Interiors · Structure</strong></div>
            </div>
          </div>
          <form className="rv-contact-form" onSubmit={submitProject}>
            <label>YOUR NAME<input name="name" type="text" autoComplete="name" required /></label>
            <label>EMAIL ADDRESS<input name="email" type="email" autoComplete="email" required /></label>
            <label>PROJECT TYPE
              <select name="type" defaultValue="" required>
                <option value="" disabled>Select a service</option>
                <option>Architecture</option>
                <option>Interior design</option>
                <option>Structural design</option>
                <option>Visualization</option>
                <option>Other</option>
              </select>
            </label>
            <label>ABOUT YOUR PROJECT<textarea name="message" rows={4} required /></label>
            <div className="rv-form-bottom">
              <span>REPLY BY EMAIL</span>
              <button type="submit">SEND ENQUIRY <span>↗</span></button>
            </div>
          </form>
        </section>
      </main>

      <footer className="rv-footer">
        <a className="rv-brand" href="#home"><span className="rv-monogram">VR</span><span>VR ARCHITECHS</span></a>
        <p>© {new Date().getFullYear()} VR ArchiTechs · {studio.city}</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>

      {selected && (
        <div className="rv-modal-backdrop" role="presentation" onClick={() => setSelected(null)}>
          <section className="rv-modal" role="dialog" aria-modal="true" aria-labelledby="rv-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="rv-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close project details">×</button>
            <p className="rv-kicker rv-dark-kicker">{selected.category} · {selected.location} · {selected.year}</p>
            <h2 id="rv-modal-title">{selected.title}</h2>
            <p className="rv-modal-description">{selected.description}</p>
            <div className="rv-modal-gallery">
              {selected.gallery.map((image, index) => <img key={image + index} src={image} alt={selected.title + " study " + (index + 1)} loading="lazy" />)}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
