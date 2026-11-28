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

const dimensions: Record<string, readonly [number, number]> = {
  "/images/landing/landing-image.webp": [2560, 1440],
  "/images/profile/vishnu.webp": [2400, 3200],
  "/images/work/tri-pod-residence/hero/hero.webp": [1920, 1080],
  "/images/work/harekrushna-villa/hero/hero.webp": [2500, 1406],
  "/images/work/residence-03b/hero/hero.webp": [2500, 1406],
  "/images/visualisation/living-room/hero/hero.webp": [1980, 1114],
  "/images/visualisation/dining-room/gallery-01/01.webp": [1485, 1980],
  "/images/visualisation/bath-room/gallery-01/01.webp": [1980, 1980],
};

export function render(path: string): string {
  return `/images/${path}`;
}

export function imageSize(src: string): { width: number; height: number } {
  const [width, height] = dimensions[src] ?? [1920, 1440];
  return { width, height };
}

export function gallery(folder: string): string[] {
  return allImages
    .filter((k) => k.startsWith(folder + "/"))
    .sort((a, b) => (a.includes("/hero/") ? -1 : b.includes("/hero/") ? 1 : a.localeCompare(b)))
    .map((k) => `/images/${k}`);
}
