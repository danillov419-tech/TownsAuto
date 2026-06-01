import type { Metadata } from "next";
import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: `Read what customers say about buying from ${siteConfig.name}.`,
};

// Sample testimonials — replace with real customer reviews before launch.
const reviews = [
  { name: "Marcus T.", location: "Dallas, TX", rating: 5, text: "Smoothest car-buying experience I've had. No pressure, honest pricing, and the car was exactly as described. Highly recommend." },
  { name: "Priya S.", location: "Atlanta, GA", rating: 5, text: "Found a great SUV at a fair price. They answered all my questions and made the paperwork painless. Will buy again." },
  { name: "Jordan W.", location: "Chicago, IL", rating: 5, text: "Got pre-qualified online and drove off the same week. Friendly team that actually cares. Thank you!" },
  { name: "Elena R.", location: "Dallas, TX", rating: 4, text: "Solid selection of clean, reliable cars. The 90-day warranty gave me real peace of mind as a first-time buyer." },
  { name: "Devon M.", location: "Atlanta, GA", rating: 5, text: "Transparent from start to finish. They let me inspect everything before I committed. Trustworthy folks." },
  { name: "Aisha K.", location: "Chicago, IL", rating: 5, text: "Great value and zero surprises. The whole process felt honest and easy. Love my new car!" },
];

const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-accent-400 text-accent-400" : "text-ink-200"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        title="What Our Customers Say"
        subtitle="Real feedback from real buyers. Your trust means everything to us."
      />

      <section className="bg-white py-16">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-md rounded-2xl border border-ink-200 bg-ink-50 p-6 text-center">
            <p className="text-4xl font-extrabold text-ink-900">{avg}</p>
            <div className="mt-2 flex justify-center">
              <Stars rating={Math.round(Number(avg))} />
            </div>
            <p className="mt-2 text-sm text-ink-500">
              Based on {reviews.length} customer reviews
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="card flex flex-col p-6">
                <Quote className="h-8 w-8 text-brand-200" />
                <blockquote className="mt-3 flex-1 text-ink-700">{r.text}</blockquote>
                <figcaption className="mt-5 border-t border-ink-100 pt-4">
                  <Stars rating={r.rating} />
                  <p className="mt-2 font-semibold text-ink-900">{r.name}</p>
                  <p className="text-sm text-ink-500">{r.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-lg font-semibold text-ink-900">
              Ready to join our happy customers?
            </p>
            <Link href="/inventory" className="btn-primary mt-4">
              Browse Inventory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
