import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** extra classes for the <img> (borders, filters, rounding) */
  className?: string;
  /** wrapper classes */
  frameClassName?: string;
  eager?: boolean;
  /** keep the image's own ratio instead of snapping to an editorial ratio */
  natural?: boolean;
  /** explicit editorial ratio for this image frame */
  ratio?: "16 / 9" | "3 / 4";
};

/**
 * Renders portfolio imagery with an explicit editorial ratio.
 * Hero images use 16:9; gallery images use 3:4.
 * Images are contained so the full render remains visible without cropping.
 */
export function AspectImage({
  src,
  alt,
  className = "",
  frameClassName = "",
  eager,
  natural,
  ratio,
}: Props) {
  const [loadedRatio, setLoadedRatio] = useState<string | null>(null);
  const frameRatio = natural ? loadedRatio ?? "4 / 3" : ratio ?? "16 / 9";

  return (
    <div className={`overflow-hidden ${frameClassName}`} style={{ aspectRatio: frameRatio ?? undefined }}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={(e) => {
          if (!natural) return;
          const el = e.currentTarget;
          if (el.naturalWidth && el.naturalHeight) {
            setLoadedRatio(`${el.naturalWidth} / ${el.naturalHeight}`);
          }
        }}
        className={`h-full w-full ${natural ? "object-contain" : "object-contain"} ${className}`}
      />
    </div>
  );
}
