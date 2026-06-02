/**
 * Generates supabase/seed-reviews.sql from the sample reviews so it can be
 * pasted into the Supabase SQL editor (no service-role key required).
 *   npx tsx scripts/gen-seed-reviews.ts
 */
import { writeFileSync } from "node:fs";
import { sampleReviews } from "../src/lib/sample-reviews";

const q = (s: string | null) => (s == null ? "null" : `'${s.replace(/'/g, "''")}'`);

const rows = sampleReviews
  .map((r) => {
    const cols = [
      q(r.id),
      q(r.name),
      q(r.location),
      r.rating,
      q(r.quote),
      q(r.avatar_url),
      r.is_published,
      r.is_featured,
      r.sort_order,
      q(r.created_at),
    ];
    return `  (${cols.join(", ")})`;
  })
  .join(",\n");

const sql = `-- Towns Auto sample reviews (${sampleReviews.length}). Run in the Supabase SQL editor
-- after 0002_reviews.sql. Safe to re-run: upserts by id.
insert into public.reviews (
  id, name, location, rating, quote, avatar_url, is_published, is_featured, sort_order, created_at
) values
${rows}
on conflict (id) do update set
  name = excluded.name,
  location = excluded.location,
  rating = excluded.rating,
  quote = excluded.quote,
  avatar_url = excluded.avatar_url,
  is_published = excluded.is_published,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;
`;

writeFileSync("supabase/seed-reviews.sql", sql);
console.log(`Wrote supabase/seed-reviews.sql (${sampleReviews.length} reviews)`);
