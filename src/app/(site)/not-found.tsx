import Link from "next/link";
import { Car } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Car className="h-16 w-16 text-ink-300" />
      <h1 className="mt-6 text-4xl font-extrabold text-ink-900">Page not found</h1>
      <p className="mt-2 text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-outline">Go Home</Link>
        <Link href="/inventory" className="btn-primary">Browse Inventory</Link>
      </div>
    </div>
  );
}
