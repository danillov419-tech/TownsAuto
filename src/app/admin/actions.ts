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

export async function signOutAction(): Promise<void> {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
