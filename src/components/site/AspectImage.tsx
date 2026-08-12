type Props = {
  src: string;
  alt: string;
  /** extra classes for the <img> (borders, filters, rounding) */
  className?: string;
  /** wrapper classes */
  frameClassName?: string;
  eager?: boolean;
  /** explicit editorial ratio for the image frame */
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
  ratio = "16 / 9",
}: Props) {
  return (
    <div
      className={`overflow-hidden ${frameClassName}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={`h-full w-full object-contain ${className}`}
      />
    </div>
  );
}
