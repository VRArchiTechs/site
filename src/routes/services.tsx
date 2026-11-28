import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { ServicesDetails, ServicesSection } from "@/components/site/Sections";
import { seoHead } from "@/lib/seo";

const servicesSeo = seoHead({
  title: "Architecture & Design Services | VR ArchiTechs",
  description:
    "Residential architecture, structural design, interior design, photorealistic visualisation and construction documentation, resolved together by VR ArchiTechs.",
  path: "/services",
  image: "/images/social/services.webp",
  imageAlt: "Harekrushna Villa architecture and interior project by VR ArchiTechs",
});

export const Route = createFileRoute("/services")({
  head: () => servicesSeo,
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <ServicesSection standalone />
      <ServicesDetails />
    </SiteLayout>
  );
}
