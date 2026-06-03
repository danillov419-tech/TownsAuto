import Link from "next/link";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-ink-500">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-900">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-ink-600">
            <li><Link href="/inventory" className="hover:text-brand-700">Inventory</Link></li>
            <li><Link href="/financing" className="hover:text-brand-700">Financing</Link></li>
            <li><Link href="/reviews" className="hover:text-brand-700">Reviews</Link></li>
            <li><Link href="/about" className="hover:text-brand-700">About Us</Link></li>
            <li><Link href="/payment" className="hover:text-brand-700">Payment Info</Link></li>
            <li><Link href="/contact" className="hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-900">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm text-ink-600">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-success-600" />
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-700"
              >
                WhatsApp {siteConfig.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-600" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-700">{siteConfig.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand-600" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-900">
            Hours
          </h3>
          <ul className="space-y-2 text-sm text-ink-600">
            {siteConfig.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-600" />
                  {h.day}
                </span>
                <span className="text-ink-500">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-100">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-500 sm:flex-row">
          <p>© {year} {siteConfig.legalName}. All rights reserved.</p>
          <p>
            Serving {siteConfig.serviceArea.join(", ")} and surrounding areas.
          </p>
        </div>
      </div>
    </footer>
  );
}
