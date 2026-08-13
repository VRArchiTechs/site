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
