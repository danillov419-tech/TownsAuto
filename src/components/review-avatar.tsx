import Image from "next/image";
import { cn } from "@/lib/format";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

// Deterministic background color from the name (no Math.random for stable SSR).
const palette = [
  "bg-brand-600",
  "bg-success-600",
  "bg-accent-500",
  "bg-ink-700",
  "bg-brand-800",
];

export function ReviewAvatar({
  name,
  src,
  size = 80,
  className,
}: {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
}) {
  const dimension = { width: size, height: size };

  if (src) {
    return (
      <span
        className={cn("relative inline-block overflow-hidden rounded-full bg-ink-100", className)}
        style={dimension}
      >
        <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" />
      </span>
    );
  }

  const color =
    palette[name.split("").reduce((s, c) => s + c.charCodeAt(0), 0) % palette.length];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold text-white",
        color,
        className
      )}
      style={{ ...dimension, fontSize: size * 0.36 }}
      aria-label={name}
    >
      {initials(name)}
    </span>
  );
}
