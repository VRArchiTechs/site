import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ContactSection } from "@/components/site/ContactSection";
import { SiteLayout } from "@/components/site/SiteChrome";
import { HomeHero, ServicesSection, StudioSection, WorkSection } from "@/components/site/Sections";
import { heroImage, type Filter } from "@/content/portfolio";
import { seoHead } from "@/lib/seo";

const homeSeo = seoHead({
  title: "VR ArchiTechs | Architecture, Interiors & 3D Visualisation",
  description:
    "Explore VR ArchiTechs, Vishnu Ahir’s Gandhinagar studio for residential architecture, structural design, interiors and photorealistic 3D visualisation.",
  path: "/",
  image: "/images/social/home.webp",
  imageAlt: "Contemporary stone and timber villa designed by VR ArchiTechs",
});

export const Route = createFileRoute("/")({
  head: () => ({
    ...homeSeo,
    links: [...homeSeo.links, { rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "VR ArchiTechs",
          url: "https://main267.lovable.app/",
          image: "https://main267.lovable.app/images/social/home.webp",
          description: homeSeo.meta[1]?.content,
          founder: { "@type": "Person", name: "Vishnu Ahir" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Gandhinagar",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<Filter>("All");

  return (
    <SiteLayout home onSelectFilter={setFilter}>
      <HomeHero />
      <ServicesSection onSelectFilter={setFilter} />
      <WorkSection filter={filter} onFilterChange={setFilter} />
      <StudioSection />
      <ContactSection />
    </SiteLayout>
  );
}
