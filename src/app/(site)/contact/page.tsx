import type { Metadata } from "next";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name}. Call, email, or send us a message and we'll respond quickly.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Have a question about a vehicle, financing, or anything else? We'd love to hear from you."
      />

      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-ink-900">Contact Information</h2>
              <p className="mt-2 text-ink-500">
                Reach out any time — we typically respond within a few hours
                during business hours.
              </p>
            </div>

            <ul className="space-y-4">
              <li className="card flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-600/10 text-success-600">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm text-ink-500">WhatsApp</p>
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink-900 hover:text-brand-700"
                  >
                    {siteConfig.whatsapp}
                  </a>
                </div>
              </li>
              <li className="card flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm text-ink-500">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="font-semibold text-ink-900 hover:text-brand-700">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="card flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm text-ink-500">Location</p>
                  <p className="font-semibold text-ink-900">{siteConfig.address}</p>
                </div>
              </li>
              <li className="card flex items-start gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Clock className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm text-ink-500">Hours</p>
                  <ul className="mt-1 space-y-0.5 text-sm font-medium text-ink-900">
                    {siteConfig.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-6">
                        <span>{h.day}</span>
                        <span className="text-ink-500">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="card p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-ink-900">Send Us a Message</h2>
            <p className="mt-1 text-sm text-ink-500">
              Fill out the form and we&apos;ll get back to you shortly.
            </p>
            <div className="mt-6">
              <LeadForm type="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
