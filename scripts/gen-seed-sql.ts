/**
 * Generates supabase/seed.sql from the sample inventory so it can be pasted
 * into the Supabase SQL editor (no service-role key required).
 *   npx tsx scripts/gen-seed-sql.ts
 */
import { writeFileSync } from "node:fs";
import { sampleVehicles } from "../src/lib/sample-vehicles";

const q = (s: string | null) =>
  s == null ? "null" : `'${s.replace(/'/g, "''")}'`;

const arr = (items: string[]) =>
  items.length
    ? `ARRAY[${items.map((i) => `'${i.replace(/'/g, "''")}'`).join(", ")}]::text[]`
    : `'{}'::text[]`;

const rows = sampleVehicles
  .map((v) => {
    const cols = [
      q(v.id),
      q(v.slug),
      v.year,
      q(v.make),
      q(v.model),
      q(v.trim),
      q(v.body_type),
      v.price,
      v.down_payment ?? "null",
      v.mileage,
      q(v.condition),
      q(v.fuel_type),
      q(v.transmission),
      q(v.drivetrain),
      q(v.exterior_color),
      q(v.interior_color),
      q(v.vin),
      q(v.description),
      arr(v.features),
      arr(v.images),
      q(v.warranty),
      v.is_featured,
      v.is_sold,
      q(v.created_at),
    ];
    return `  (${cols.join(", ")})`;
  })
  .join(",\n");

const sql = `-- Towns Auto sample inventory. Run in the Supabase SQL editor.
-- Safe to re-run: upserts by id.
insert into public.vehicles (
  id, slug, year, make, model, trim, body_type, price, down_payment, mileage,
  condition, fuel_type, transmission, drivetrain, exterior_color, interior_color,
  vin, description, features, images, warranty, is_featured, is_sold, created_at
) values
${rows}
on conflict (id) do update set
  slug = excluded.slug,
  year = excluded.year,
  make = excluded.make,
  model = excluded.model,
  trim = excluded.trim,
  body_type = excluded.body_type,
  price = excluded.price,
  down_payment = excluded.down_payment,
  mileage = excluded.mileage,
  condition = excluded.condition,
  fuel_type = excluded.fuel_type,
  transmission = excluded.transmission,
  drivetrain = excluded.drivetrain,
  exterior_color = excluded.exterior_color,
  interior_color = excluded.interior_color,
  vin = excluded.vin,
  description = excluded.description,
  features = excluded.features,
  images = excluded.images,
  warranty = excluded.warranty,
  is_featured = excluded.is_featured,
  is_sold = excluded.is_sold;
`;

writeFileSync("supabase/seed.sql", sql);
console.log(`Wrote supabase/seed.sql (${sampleVehicles.length} vehicles)`);
