import Image from "next/image";
import { Car } from "lucide-react";
import { cn } from "@/lib/format";

/**
 * Renders a vehicle photo, or a branded placeholder when none is available.
 */
export function VehicleImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-ink-100", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-ink-100 to-ink-200",
        className
      )}
      aria-label={alt}
    >
      <Car className="h-16 w-16 text-ink-400" strokeWidth={1.25} />
    </div>
  );
}
