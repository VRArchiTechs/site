import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/site/ContactSection";
import { SiteLayout } from "@/components/site/SiteChrome";
import { seoHead } from "@/lib/seo";

const contactSeo = seoHead({
  title: "Contact VR ArchiTechs | Start a Project",
  description:
    "Discuss your home, facade, interior or visualisation project with Vishnu Ahir at VR ArchiTechs in Gandhinagar, Gujarat. Project inquiries are welcomed worldwide.",
  path: "/contact",
  image: "/images/social/contact.webp",
  imageAlt: "VR ArchiTechs — start an architecture or design project",
});

export const Route = createFileRoute("/contact")({
  head: () => contactSeo,
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <ContactSection standalone />
    </SiteLayout>
  );
}
