import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteChrome";
import { WorkSection } from "@/components/site/Sections";
import type { Filter } from "@/content/portfolio";
import { seoHead } from "@/lib/seo";

const workSeo = seoHead({
  title: "Selected Work | VR ArchiTechs",
  description:
    "View selected residential architecture, villa, interior and 3D visualisation projects by VR ArchiTechs, including Tri-Pod Residence and Harekrushna Villa.",
  path: "/work",
  image: "/images/social/work.webp",
  imageAlt: "Tri-Pod Residence by VR ArchiTechs in Ahmedabad",
});

export const Route = createFileRoute("/work")({
  head: () => workSeo,
  component: WorkPage,
});

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  return (
    <SiteLayout>
      <WorkSection filter={filter} onFilterChange={setFilter} standalone />
    </SiteLayout>
  );
}
