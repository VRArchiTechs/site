/**
 * Central image registry.
 *
 * This is the single source of truth for portfolio image paths.
 * Keep content metadata in portfolio-data.ts; keep physical image paths here.
 */
export const images = {
  work: {
    triPodResidence: {
      hero: "/images/work/tri-pod-residence/hero/hero.webp",
      gallery01: [
        "/images/work/tri-pod-residence/gallery-01/01.webp",
        "/images/work/tri-pod-residence/gallery-01/02.webp",
        "/images/work/tri-pod-residence/gallery-01/03.webp",
        "/images/work/tri-pod-residence/gallery-01/04.webp",
      ],
    },
    harekrushnaVilla: {
      hero: "/images/work/harekrushna-villa/hero/hero.webp",
      gallery01: [
        "/images/work/harekrushna-villa/gallery-01/01.webp",
        "/images/work/harekrushna-villa/gallery-01/02.webp",
        "/images/work/harekrushna-villa/gallery-01/03.webp",
        "/images/work/harekrushna-villa/gallery-01/04.webp",
        "/images/work/harekrushna-villa/gallery-01/05.webp",
        "/images/work/harekrushna-villa/gallery-01/06.webp",
        "/images/work/harekrushna-villa/gallery-01/07.webp",
      ],
      gallery02: [
        "/images/work/harekrushna-villa/gallery-02/01.webp",
        "/images/work/harekrushna-villa/gallery-02/02.webp",
        "/images/work/harekrushna-villa/gallery-02/03.webp",
        "/images/work/harekrushna-villa/gallery-02/04.webp",
        "/images/work/harekrushna-villa/gallery-02/05.webp",
      ],
    },
    residence03B: {
      hero: "/images/work/residence-03b/hero/hero.webp",
      gallery01: [
        "/images/work/residence-03b/gallery-01/01.webp",
        "/images/work/residence-03b/gallery-01/02.webp",
        "/images/work/residence-03b/gallery-01/03.webp",
        "/images/work/residence-03b/gallery-01/04.webp",
        "/images/work/residence-03b/gallery-01/05.webp",
      ],
      gallery02: [
        "/images/work/residence-03b/gallery-02/01.webp",
        "/images/work/residence-03b/gallery-02/02.webp",
        "/images/work/residence-03b/gallery-02/03.webp",
        "/images/work/residence-03b/gallery-02/04.webp",
        "/images/work/residence-03b/gallery-02/05.webp",
      ],
    },
  },

  visualisation: {
    livingRoom: {
      hero: "/images/visualisation/living-room/hero/hero.webp",
      gallery01: [
        "/images/visualisation/living-room/gallery-01/01.webp",
        "/images/visualisation/living-room/gallery-01/02.webp",
        "/images/visualisation/living-room/gallery-01/03.webp",
      ],
    },
    diningRoom: {
      gallery01: [
        "/images/visualisation/dining-room/gallery-01/01.webp",
        "/images/visualisation/dining-room/gallery-01/02.webp",
        "/images/visualisation/dining-room/gallery-01/03.webp",
        "/images/visualisation/dining-room/gallery-01/04.webp",
      ],
    },
    bathroom: {
      gallery01: [
        "/images/visualisation/bath-room/gallery-01/01.webp",
        "/images/visualisation/bath-room/gallery-01/02.webp",
        "/images/visualisation/bath-room/gallery-01/03.webp",
      ],
    },
  },
} as const;
