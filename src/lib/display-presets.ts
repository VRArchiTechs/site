/**
 * DisplayPreset
 *
 * Single source of truth for all image presentation.
 *
 * Format:
 * "<aspect-ratio>-<object-fit>"
 *
 * Examples:
 *   "16:9-cover"
 *   "16:9-contain"
 *   "4:3-cover"
 *   "4:3-contain"
 *   "3:4-cover"
 *   "3:4-contain"
 *   "1:1-cover"
 *   "1:1-contain"
 *
 * aspect-ratio:
 *   Controls the display frame.
 *
 * object-fit:
 *   cover   → Fill the frame (may crop).
 *   contain → Preserve the entire image.
 *
 * Add new presets only in this file.
 * Components must never hardcode aspect ratios or object-fit.
 * This file is the single source of truth for media presentation.
 */

export type DisplayPreset =
  | "16:9-cover"
  | "16:9-contain"
  | "4:3-cover"
  | "4:3-contain"
  | "3:4-cover"
  | "3:4-contain"
  | "1:1-cover"
  | "1:1-contain";

export const DISPLAY_PRESETS: Record<DisplayPreset, { aspectRatio: string; objectFit: "cover" | "contain" }> = {
  "16:9-cover": { aspectRatio: "16 / 9", objectFit: "cover" },
  "16:9-contain": { aspectRatio: "16 / 9", objectFit: "contain" },
  "4:3-cover": { aspectRatio: "4 / 3", objectFit: "cover" },
  "4:3-contain": { aspectRatio: "4 / 3", objectFit: "contain" },
  "3:4-cover": { aspectRatio: "3 / 4", objectFit: "cover" },
  "3:4-contain": { aspectRatio: "3 / 4", objectFit: "contain" },
  "1:1-cover": { aspectRatio: "1 / 1", objectFit: "cover" },
  "1:1-contain": { aspectRatio: "1 / 1", objectFit: "contain" },
} as const;
