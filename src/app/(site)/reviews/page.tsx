import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ReviewCard } from "@/components/review-card";
import { ReviewStars } from "@/components/review-stars";
import { getPublishedReviews } from "@/lib/reviews";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: `Read what customers say about buying from ${siteConfig.name}.`,
};

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews();
  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

  return (
    <>
      <PageHero
        title="What Our Customers Say"
        subtitle="Real feedback from real buyers. Your trust means everything to us."
      />

      <section className="bg-white py-16">
        <div className="container-page">
          {reviews.length > 0 && (
            <div className="mx-auto mb-12 max-w-md rounded-2xl border border-ink-200 bg-ink-50 p-6 text-center">
              <p className="text-4xl font-extrabold text-ink-900">{avg}</p>
              <div className="mt-2 flex justify-center">
                <ReviewStars rating={Math.round(Number(avg))} />
              </div>
              <p className="mt-2 text-sm text-ink-500">
                Based on {reviews.length} customer review{reviews.length === 1 ? "" : "s"}
              </p>
            </div>
          )}

          {reviews.length === 0 ? (
            <p className="text-center text-ink-500">No reviews yet — check back soon!</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          )}

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
