/**
 * Seeds the Supabase `vehicles` table with the sample inventory.
 *
 * Usage (after creating .env.local with your Supabase keys):
 *   npm run seed
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 * Safe to re-run — it upserts by id.
 */
import { createClient } from "@supabase/supabase-js";
import { sampleVehicles } from "../src/lib/sample-vehicles";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log(`Seeding ${sampleVehicles.length} vehicles...`);
  const { error } = await supabase
    .from("vehicles")
    .upsert(sampleVehicles, { onConflict: "id" });

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
  console.log("✓ Done. Sample inventory is in your Supabase project.");
}

main();
