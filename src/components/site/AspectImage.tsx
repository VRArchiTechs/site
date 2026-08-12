import { DISPLAY_PRESETS, type DisplayPreset } from "@/lib/display-presets";

type Props = {
  src: string;
  alt: string;
  /** extra classes for the <img> (borders, filters, rounding) */
  className?: string;
  /** wrapper classes */
  frameClassName?: string;
  eager?: boolean;
  /** shared media presentation preset */
  display?: DisplayPreset;
};

/**
 * Renders portfolio imagery through the shared display preset system.
 * The preset controls both the frame aspect ratio and object-fit behavior.
 */
export function AspectImage({
  src,
  alt,
  className = "",
  frameClassName = "",
  eager,
  display = "16:9-contain",
}: Props) {
  const preset = DISPLAY_PRESETS[display];

  return (
    <div
      className={`overflow-hidden ${frameClassName}`}
      style={{ aspectRatio: preset.aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={`h-full w-full object-${preset.objectFit} ${className}`}
      />
    </div>
  );
}
