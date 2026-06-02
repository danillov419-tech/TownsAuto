-- Towns Auto sample reviews (24). Run in the Supabase SQL editor
-- after 0002_reviews.sql. Safe to re-run: upserts by id.
insert into public.reviews (
  id, name, location, rating, quote, avatar_url, is_published, is_featured, sort_order, created_at
) values
  ('22222222-0000-0000-0000-000000000001', 'Amanda Wilson', 'Nashville, TN', 5, 'No credit check was a lifesaver for me. I''m so grateful for Towns Auto. The car runs perfectly and I couldn''t be happier with my purchase.', null, true, true, 0, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000002', 'Barbara Lewis', 'Murfreesboro, TN', 5, 'The quality of the car for the price is just amazing. I''m so glad I found Towns Auto online. A truly hidden gem in the car market.', null, true, true, 1, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000003', 'Brian Green', 'Franklin, TN', 5, 'From the initial phone call to driving away in my new truck, the service was exceptional. The team is true to their word. Highly recommended.', null, true, true, 2, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000004', 'Marcus Taylor', 'Memphis, TN', 5, 'Smoothest car-buying experience I''ve ever had. No pressure, honest pricing, and the car was exactly as described.', null, true, true, 3, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000005', 'Priya Sharma', 'Knoxville, TN', 5, 'Found a great SUV at a fair price. They answered all my questions and made the paperwork painless. Will absolutely buy again.', null, true, true, 4, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000006', 'Jordan White', 'Chattanooga, TN', 5, 'Got pre-qualified online and drove off the same week. Friendly team that actually cares about their customers. Thank you!', null, true, true, 5, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000007', 'Elena Rodriguez', 'Clarksville, TN', 4, 'Solid selection of clean, reliable cars. The 90-day warranty gave me real peace of mind as a first-time buyer.', null, true, false, 6, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000008', 'Devon Mitchell', 'Smyrna, TN', 5, 'Transparent from start to finish. They let me inspect everything before I committed. Trustworthy people who do honest business.', null, true, false, 7, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000009', 'Aisha Khan', 'Hendersonville, TN', 5, 'Great value and zero surprises. The whole process felt honest and easy. I love my new car!', null, true, false, 8, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000010', 'Tyler Brooks', 'Brentwood, TN', 5, 'The reservation process made it easy to hold the exact car I wanted. Everything was ready when I arrived for my appointment.', null, true, false, 9, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000011', 'Sofia Martinez', 'Antioch, TN', 5, 'I was nervous about buying a used car, but they walked me through every detail. Best decision I made all year.', null, true, false, 10, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000012', 'James Carter', 'Gallatin, TN', 5, 'Nationwide shipping was a breeze. My truck arrived right on schedule and in perfect condition. Worth every penny.', null, true, false, 11, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000013', 'Hannah Bennett', 'Lebanon, TN', 4, 'Good prices and a no-pressure atmosphere. I appreciated that they were upfront about the down payment from the start.', null, true, false, 12, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000014', 'Carlos Ramirez', 'Mt. Juliet, TN', 5, 'Honest, fair, and friendly. They treated me like family and got me into a reliable car within my budget.', null, true, false, 13, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000015', 'Nicole Adams', 'Spring Hill, TN', 5, 'I shopped around for weeks and Towns Auto had the best deal by far. The car has been flawless. Couldn''t recommend them more.', null, true, false, 14, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000016', 'Derrick Johnson', 'Bowling Green, KY', 5, 'Drove down from Kentucky and it was 100% worth the trip. Fair pricing and a car that runs like new.', null, true, false, 15, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000017', 'Megan Foster', 'Columbia, TN', 5, 'The team made financing simple and stress-free. I drove away in my dream SUV the very next day.', null, true, false, 16, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000018', 'Anthony Russo', 'Huntsville, AL', 4, 'Great communication throughout. They held the car for me with the reservation and everything went exactly as promised.', null, true, false, 17, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000019', 'Grace Liu', 'Cookeville, TN', 5, 'Such a refreshing experience compared to big dealerships. No games, just a good car at a fair price.', null, true, false, 18, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000020', 'Robert Hayes', 'Jackson, TN', 5, 'I''ve bought a lot of cars over the years and this was the easiest by far. Quality vehicle, quality service.', null, true, false, 19, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000021', 'Latoya Simmons', 'Madison, TN', 5, 'They went above and beyond to make sure I was happy. The car was detailed and ready to go. Five stars all the way.', null, true, false, 20, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000022', 'Kevin O''Brien', 'Bellevue, TN', 5, 'Straightforward, professional, and friendly. The 90-day warranty sealed the deal for me. Highly recommend Towns Auto.', null, true, false, 21, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000023', 'Destiny Coleman', 'La Vergne, TN', 5, 'First time financing a car and they made it painless. Got approved quickly and love my new ride!', null, true, false, 22, '2026-01-01T00:00:00.000Z'),
  ('22222222-0000-0000-0000-000000000024', 'Samuel Nguyen', 'Goodlettsville, TN', 5, 'Everything was exactly as advertised. No hidden fees, no surprises. Just an honest dealership doing right by people.', null, true, false, 23, '2026-01-01T00:00:00.000Z')
on conflict (id) do update set
  name = excluded.name,
  location = excluded.location,
  rating = excluded.rating,
  quote = excluded.quote,
  avatar_url = excluded.avatar_url,
  is_published = excluded.is_published,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;
