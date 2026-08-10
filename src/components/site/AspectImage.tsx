import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** extra classes for the <img> (borders, filters, rounding) */
  className?: string;
  /** wrapper classes */
  frameClassName?: string;
  eager?: boolean;
};

/**
 * Renders an image at a fixed editorial ratio based on its own orientation:
 * 16:9 for landscape, 3:4 for portrait. Never squares a portrait.
 */
export function AspectImage({ src, alt, className = "", frameClassName = "", eager }: Props) {
  const [ratio, setRatio] = useState<"16 / 9" | "3 / 4">("16 / 9");

  return (
    <div className={`overflow-hidden ${frameClassName}`} style={{ aspectRatio: ratio }}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onLoad={(e) => {
          const el = e.currentTarget;
          if (el.naturalWidth && el.naturalHeight) {
            setRatio(el.naturalWidth < el.naturalHeight ? "3 / 4" : "16 / 9");
          }
        }}
        className={`h-full w-full object-cover ${className}`}
      />
    </div>
  );
}
