import Link from "next/link";
import { Car, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm transition-transform group-hover:scale-105">
        <Car className="h-6 w-6" strokeWidth={2.25} />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`text-lg font-extrabold tracking-tight ${
            light ? "text-white" : "text-ink-900"
          }`}
        >
          {siteConfig.name}
        </span>
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            light ? "text-brand-100" : "text-success-600"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}
