const allImages: string[] = [
  "landing/landing-image.webp",
  "profile/vishnu.webp",
  "visualisation/bath-room/gallery-01/01.webp",
  "visualisation/bath-room/gallery-01/02.webp",
  "visualisation/bath-room/gallery-01/03.webp",
  "visualisation/dining-room/gallery-01/01.webp",
  "visualisation/dining-room/gallery-01/02.webp",
  "visualisation/dining-room/gallery-01/03.webp",
  "visualisation/dining-room/gallery-01/04.webp",
  "visualisation/living-room/gallery-01/01.webp",
  "visualisation/living-room/gallery-01/02.webp",
  "visualisation/living-room/gallery-01/03.webp",
  "visualisation/living-room/hero/hero.webp",
  "work/harekrushna-villa/gallery-01/01.webp",
  "work/harekrushna-villa/gallery-01/02.webp",
  "work/harekrushna-villa/gallery-01/03.webp",
  "work/harekrushna-villa/gallery-01/04.webp",
  "work/harekrushna-villa/gallery-01/05.webp",
  "work/harekrushna-villa/gallery-01/06.webp",
  "work/harekrushna-villa/gallery-01/07.webp",
  "work/harekrushna-villa/gallery-02/01.webp",
  "work/harekrushna-villa/gallery-02/02.webp",
  "work/harekrushna-villa/gallery-02/03.webp",
  "work/harekrushna-villa/gallery-02/04.webp",
  "work/harekrushna-villa/gallery-02/05.webp",
  "work/harekrushna-villa/hero/hero.webp",
  "work/residence-03b/gallery-01/01.webp",
  "work/residence-03b/gallery-01/02.webp",
  "work/residence-03b/gallery-01/03.webp",
  "work/residence-03b/gallery-01/04.webp",
  "work/residence-03b/gallery-01/05.webp",
  "work/residence-03b/gallery-02/01.webp",
  "work/residence-03b/gallery-02/02.webp",
  "work/residence-03b/gallery-02/03.webp",
  "work/residence-03b/gallery-02/04.webp",
  "work/residence-03b/gallery-02/05.webp",
  "work/residence-03b/hero/hero.webp",
  "work/tri-pod-residence/gallery-01/01.webp",
  "work/tri-pod-residence/gallery-01/02.webp",
  "work/tri-pod-residence/gallery-01/03.webp",
  "work/tri-pod-residence/gallery-01/04.webp",
  "work/tri-pod-residence/hero/hero.webp",
];

export function render(path: string): string {
  return `/images/${path}`;
}

export function gallery(folder: string): string[] {
  return allImages
    .filter((k) => k.startsWith(folder + "/"))
    .sort((a, b) => (a.includes("/hero/") ? -1 : b.includes("/hero/") ? 1 : a.localeCompare(b)))
    .map((k) => `/images/${k}`);
}
