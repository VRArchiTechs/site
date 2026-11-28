export const SITE_URL = "https://main267.lovable.app";

type SeoInput = {
  title: string;
  description: string;
  path: "/" | "/work" | "/services" | "/about" | "/contact";
  image?: string;
  imageAlt?: string;
};

export function seoHead({ title, description, path, image, imageAlt }: SeoInput) {
  const url = `${SITE_URL}${path}`;
  const shareImage = image ? `${SITE_URL}${image}` : undefined;
  const shareImageAlt = imageAlt ?? title;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: shareImage ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(shareImage
        ? [
            { property: "og:image", content: shareImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:image:alt", content: shareImageAlt },
            { name: "twitter:image", content: shareImage },
            { name: "twitter:image:alt", content: shareImageAlt },
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
