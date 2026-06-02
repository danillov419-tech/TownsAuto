"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type AdminFormState = { ok: boolean; message: string } | null;

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function str(form: FormData, key: string): string {
  return (form.get(key) ?? "").toString().trim();
}

function num(form: FormData, key: string): number {
  return Number(str(form, key).replace(/[^0-9.]/g, "")) || 0;
}

function numOrNull(form: FormData, key: string): number | null {
  const v = str(form, key).replace(/[^0-9.]/g, "");
  return v ? Number(v) : null;
}

export async function saveVehicle(
  _prev: AdminFormState,
  form: FormData
): Promise<AdminFormState> {
  if (!isSupabaseConfigured) {
    return { ok: false, message: "Connect Supabase to manage inventory." };
  }

  const id = str(form, "id");
  const year = num(form, "year");
  const make = str(form, "make");
  const model = str(form, "model");
  const trim = str(form, "trim");

  if (!year || !make || !model) {
    return { ok: false, message: "Year, make, and model are required." };
  }

  let images: string[] = [];
  try {
    images = JSON.parse(str(form, "images") || "[]");
  } catch {
    images = [];
  }

  const features = str(form, "features")
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);

  const record = {
    year,
    make,
    model,
    trim: trim || null,
    body_type: str(form, "body_type") || "Sedan",
    price: num(form, "price"),
    down_payment: numOrNull(form, "down_payment"),
    mileage: num(form, "mileage"),
    condition: str(form, "condition") || "Very Good",
    fuel_type: str(form, "fuel_type") || "Gasoline",
    transmission: str(form, "transmission") || "Automatic",
    drivetrain: str(form, "drivetrain") || null,
    exterior_color: str(form, "exterior_color") || null,
    interior_color: str(form, "interior_color") || null,
    vin: str(form, "vin") || null,
    description: str(form, "description"),
    features,
    images,
    warranty: str(form, "warranty") || null,
    is_featured: form.get("is_featured") === "on",
    is_sold: form.get("is_sold") === "on",
    slug: slugify(`${year}-${make}-${model}-${trim}-${Date.now().toString(36)}`),
  };

  const supabase = await createClient();

  if (id) {
    // Keep the existing slug on update.
    const { slug: _slug, ...updates } = record;
    const { error } = await supabase.from("vehicles").update(updates).eq("id", id);
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabase.from("vehicles").insert(record);
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  revalidatePath("/inventory");
  revalidatePath("/");
  redirect("/admin/inventory?saved=1");
}

export async function deleteVehicle(form: FormData): Promise<void> {
  const id = str(form, "id");
  if (!id || !isSupabaseConfigured) return;
  const supabase = await createClient();
  await supabase.from("vehicles").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  revalidatePath("/inventory");
}

export async function saveReview(
  _prev: AdminFormState,
  form: FormData
): Promise<AdminFormState> {
  if (!isSupabaseConfigured) {
    return { ok: false, message: "Connect Supabase to manage reviews." };
  }

  const id = str(form, "id");
  const name = str(form, "name");
  const quote = str(form, "quote");

  if (!name || !quote) {
    return { ok: false, message: "Name and review text are required." };
  }

  const ratingRaw = num(form, "rating") || 5;
  const record = {
    name,
    location: str(form, "location") || null,
    rating: Math.min(5, Math.max(1, ratingRaw)),
    quote,
    avatar_url: str(form, "avatar_url") || null,
    is_published: form.get("is_published") === "on",
    is_featured: form.get("is_featured") === "on",
    sort_order: num(form, "sort_order"),
  };

  const supabase = await createClient();
  if (id) {
    const { error } = await supabase.from("reviews").update(record).eq("id", id);
    if (error) return { ok: false, message: error.message };
  } else {
    const { error } = await supabase.from("reviews").insert(record);
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
  redirect("/admin/reviews?saved=1");
}

export async function deleteReview(form: FormData): Promise<void> {
  const id = str(form, "id");
  if (!id || !isSupabaseConfigured) return;
  const supabase = await createClient();
  await supabase.from("reviews").delete().eq("id", id);
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

export type ImportState =
  | { ok: boolean; message: string; inserted?: number; skipped?: number }
  | null;

/** RFC-4180-ish CSV parser: handles quoted fields, escaped quotes, and newlines inside quotes. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export async function importVehicles(
  _prev: ImportState,
  form: FormData
): Promise<ImportState> {
  if (!isSupabaseConfigured) {
    return { ok: false, message: "Connect Supabase to import inventory." };
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Please choose a CSV file to upload." };
  }
  if (file.size > 5_000_000) {
    return { ok: false, message: "That file is too large (max 5 MB)." };
  }

  const rows = parseCsv(await file.text());
  if (rows.length < 2) {
    return { ok: false, message: "The CSV looks empty — it needs a header row plus at least one vehicle." };
  }

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const cell = (row: string[], name: string) => {
    const i = col(name);
    return i >= 0 ? (row[i] ?? "").trim() : "";
  };
  const toNum = (v: string): number | null => {
    const n = Number(v.replace(/[^0-9.]/g, ""));
    return v.trim() && !Number.isNaN(n) ? n : null;
  };
  const toBool = (v: string) => /^(true|1|yes|y)$/i.test(v.trim());
  const toList = (v: string) =>
    v.split("|").map((s) => s.trim()).filter(Boolean);

  const records: Record<string, unknown>[] = [];
  let skipped = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 1 && row[0].trim() === "") continue; // blank line

    const year = toNum(cell(row, "year"));
    const make = cell(row, "make");
    const model = cell(row, "model");
    const price = toNum(cell(row, "price"));
    if (!year || !make || !model || price == null) {
      skipped++;
      continue;
    }

    const trim = cell(row, "trim");
    records.push({
      year,
      make,
      model,
      trim: trim || null,
      body_type: cell(row, "body_type") || "Sedan",
      price,
      down_payment: toNum(cell(row, "down_payment")),
      mileage: toNum(cell(row, "mileage")) ?? 0,
      condition: cell(row, "condition") || "Very Good",
      fuel_type: cell(row, "fuel_type") || "Gasoline",
      transmission: cell(row, "transmission") || "Automatic",
      drivetrain: cell(row, "drivetrain") || null,
      exterior_color: cell(row, "exterior_color") || null,
      interior_color: cell(row, "interior_color") || null,
      vin: cell(row, "vin") || null,
      description: cell(row, "description"),
      features: toList(cell(row, "features")),
      images: toList(cell(row, "images")),
      warranty: cell(row, "warranty") || null,
      is_featured: toBool(cell(row, "is_featured")),
      is_sold: toBool(cell(row, "is_sold")),
      slug: slugify(
        `${year}-${make}-${model}-${trim}-${r}-${Math.random().toString(36).slice(2, 7)}`
      ),
    });
  }

  if (records.length === 0) {
    return {
      ok: false,
      message: `No valid rows found. ${skipped} row(s) were missing a year, make, model, or price.`,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("vehicles").insert(records);
  if (error) {
    return { ok: false, message: `Import failed: ${error.message}` };
  }

  revalidatePath("/admin/inventory");
  revalidatePath("/inventory");
  revalidatePath("/");
  return {
    ok: true,
    message: `Imported ${records.length} vehicle(s).${
      skipped ? ` Skipped ${skipped} row(s) missing required fields.` : ""
    }`,
    inserted: records.length,
    skipped,
  };
}

export async function signOutAction(): Promise<void> {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
