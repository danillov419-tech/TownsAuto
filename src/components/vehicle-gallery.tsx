"use client";

import { useState } from "react";
import { VehicleImage } from "./vehicle-image";
import { cn } from "@/lib/format";

export function VehicleGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <VehicleImage src={null} alt={alt} priority className="aspect-[16/10] w-full rounded-2xl" />
    );
  }

  return (
    <div>
      <VehicleImage
        src={images[active]}
        alt={alt}
        priority
        sizes="(max-width: 1024px) 100vw, 66vw"
        className="aspect-[16/10] w-full rounded-2xl"
      />
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative overflow-hidden rounded-lg border-2 transition-colors",
                i === active ? "border-brand-600" : "border-transparent hover:border-ink-300"
              )}
              aria-label={`View photo ${i + 1}`}
            >
              <VehicleImage src={img} alt={`${alt} photo ${i + 1}`} sizes="20vw" className="aspect-square w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
