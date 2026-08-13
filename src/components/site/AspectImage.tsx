import { useState } from "react";
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
 * Shared portfolio image renderer.
 * Handles aspect ratio, lazy loading and restrained editorial motion so
 * every current and future project gets the same visual treatment.
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
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`media-frame group relative overflow-hidden ${frameClassName}`}
      style={{ aspectRatio: preset.aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`media-image h-full w-full object-${preset.objectFit} ${loaded ? "is-loaded" : ""} ${className}`}
      />
      <span aria-hidden="true" className="media-scan" />
    </div>
  );
}
