import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteChrome";
import { AboutSection } from "@/components/site/Sections";
import { seoHead } from "@/lib/seo";

const aboutSeo = seoHead({
  title: "About Vishnu Ahir | VR ArchiTechs",
  description:
    "Meet Vishnu Ahir, an engineer and architecture designer in Gandhinagar who brings planning, structure, interiors, material studies and visualisation together.",
  path: "/about",
  image: "/images/social/about.webp",
  imageAlt: "Vishnu Ahir, engineer and architecture designer at VR ArchiTechs",
});

export const Route = createFileRoute("/about")({
  head: () => aboutSeo,
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-linen px-5 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <AboutSection standalone />
        </div>
      </section>
    </SiteLayout>
  );
}
