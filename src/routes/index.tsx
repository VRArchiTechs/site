import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import { Hero } from "@/components/site/Hero";
import { ProgressRail } from "@/components/site/ProgressRail";
import { ProjectSpread } from "@/components/site/ProjectSpread";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { Studio } from "@/components/site/Studio";
import { Visualisation } from "@/components/site/Visualisation";
import { WorkIndex } from "@/components/site/WorkIndex";
import { projects, sections, studio } from "@/lib/portfolio-data";
import { useActiveSection } from "@/components/site/useActiveSection";

const title = "Vishnu Ahir — Architecture, Structure & Interior Design";
const description =
  "Editorial portfolio of Vishnu Ahir (VR ArchiTechs), Gandhinagar — residential architecture, structural detailing, interiors and photorealistic visualisation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: studio.name,
          jobTitle: studio.role,
          worksFor: { "@type": "Organization", name: studio.practice },
          email: studio.email,
          telephone: studio.phone,
          address: { "@type": "PostalAddress", addressLocality: "Gandhinagar", addressRegion: "Gujarat" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const active = useActiveSection(ids);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <SiteNav active={active} />
      <ProgressRail active={active} />
      <div className="grain" aria-hidden="true" />
      <main>
        <Hero />
        <Visualisation />
        <Studio />
        <WorkIndex />
        {projects.map((project) => (
          <ProjectSpread key={project.id} project={project} />
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
