import type { Review } from "./types";

/**
 * Sample customer reviews for Towns Auto.
 * Used as the seed source (supabase/seed-reviews.sql is generated from this)
 * and as the offline fallback when Supabase is not configured.
 * Manage real reviews through the /admin dashboard.
 */
type Seed = Omit<Review, "created_at" | "avatar_url" | "sort_order"> & {
  avatar_url?: string | null;
  sort_order?: number;
};

const seed: Seed[] = [
  { id: "22222222-0000-0000-0000-000000000001", name: "Amanda Wilson", location: "Nashville, TN", rating: 5, quote: "No credit check was a lifesaver for me. I'm so grateful for Towns Auto. The car runs perfectly and I couldn't be happier with my purchase.", is_published: true, is_featured: true },
  { id: "22222222-0000-0000-0000-000000000002", name: "Barbara Lewis", location: "Murfreesboro, TN", rating: 5, quote: "The quality of the car for the price is just amazing. I'm so glad I found Towns Auto online. A truly hidden gem in the car market.", is_published: true, is_featured: true },
  { id: "22222222-0000-0000-0000-000000000003", name: "Brian Green", location: "Franklin, TN", rating: 5, quote: "From the initial phone call to driving away in my new truck, the service was exceptional. The team is true to their word. Highly recommended.", is_published: true, is_featured: true },
  { id: "22222222-0000-0000-0000-000000000004", name: "Marcus Taylor", location: "Memphis, TN", rating: 5, quote: "Smoothest car-buying experience I've ever had. No pressure, honest pricing, and the car was exactly as described.", is_published: true, is_featured: true },
  { id: "22222222-0000-0000-0000-000000000005", name: "Priya Sharma", location: "Knoxville, TN", rating: 5, quote: "Found a great SUV at a fair price. They answered all my questions and made the paperwork painless. Will absolutely buy again.", is_published: true, is_featured: true },
  { id: "22222222-0000-0000-0000-000000000006", name: "Jordan White", location: "Chattanooga, TN", rating: 5, quote: "Got pre-qualified online and drove off the same week. Friendly team that actually cares about their customers. Thank you!", is_published: true, is_featured: true },
  { id: "22222222-0000-0000-0000-000000000007", name: "Elena Rodriguez", location: "Clarksville, TN", rating: 4, quote: "Solid selection of clean, reliable cars. The 90-day warranty gave me real peace of mind as a first-time buyer.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000008", name: "Devon Mitchell", location: "Smyrna, TN", rating: 5, quote: "Transparent from start to finish. They let me inspect everything before I committed. Trustworthy people who do honest business.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000009", name: "Aisha Khan", location: "Hendersonville, TN", rating: 5, quote: "Great value and zero surprises. The whole process felt honest and easy. I love my new car!", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000010", name: "Tyler Brooks", location: "Brentwood, TN", rating: 5, quote: "The reservation process made it easy to hold the exact car I wanted. Everything was ready when I arrived for my appointment.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000011", name: "Sofia Martinez", location: "Antioch, TN", rating: 5, quote: "I was nervous about buying a used car, but they walked me through every detail. Best decision I made all year.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000012", name: "James Carter", location: "Gallatin, TN", rating: 5, quote: "Nationwide shipping was a breeze. My truck arrived right on schedule and in perfect condition. Worth every penny.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000013", name: "Hannah Bennett", location: "Lebanon, TN", rating: 4, quote: "Good prices and a no-pressure atmosphere. I appreciated that they were upfront about the down payment from the start.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000014", name: "Carlos Ramirez", location: "Mt. Juliet, TN", rating: 5, quote: "Honest, fair, and friendly. They treated me like family and got me into a reliable car within my budget.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000015", name: "Nicole Adams", location: "Spring Hill, TN", rating: 5, quote: "I shopped around for weeks and Towns Auto had the best deal by far. The car has been flawless. Couldn't recommend them more.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000016", name: "Derrick Johnson", location: "Bowling Green, KY", rating: 5, quote: "Drove down from Kentucky and it was 100% worth the trip. Fair pricing and a car that runs like new.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000017", name: "Megan Foster", location: "Columbia, TN", rating: 5, quote: "The team made financing simple and stress-free. I drove away in my dream SUV the very next day.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000018", name: "Anthony Russo", location: "Huntsville, AL", rating: 4, quote: "Great communication throughout. They held the car for me with the reservation and everything went exactly as promised.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000019", name: "Grace Liu", location: "Cookeville, TN", rating: 5, quote: "Such a refreshing experience compared to big dealerships. No games, just a good car at a fair price.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000020", name: "Robert Hayes", location: "Jackson, TN", rating: 5, quote: "I've bought a lot of cars over the years and this was the easiest by far. Quality vehicle, quality service.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000021", name: "Latoya Simmons", location: "Madison, TN", rating: 5, quote: "They went above and beyond to make sure I was happy. The car was detailed and ready to go. Five stars all the way.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000022", name: "Kevin O'Brien", location: "Bellevue, TN", rating: 5, quote: "Straightforward, professional, and friendly. The 90-day warranty sealed the deal for me. Highly recommend Towns Auto.", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000023", name: "Destiny Coleman", location: "La Vergne, TN", rating: 5, quote: "First time financing a car and they made it painless. Got approved quickly and love my new ride!", is_published: true, is_featured: false },
  { id: "22222222-0000-0000-0000-000000000024", name: "Samuel Nguyen", location: "Goodlettsville, TN", rating: 5, quote: "Everything was exactly as advertised. No hidden fees, no surprises. Just an honest dealership doing right by people.", is_published: true, is_featured: false },
];

export const sampleReviews: Review[] = seed.map((r, i) => ({
  ...r,
  avatar_url: r.avatar_url ?? null,
  sort_order: r.sort_order ?? i,
  created_at: "2026-01-01T00:00:00.000Z",
}));
