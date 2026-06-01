import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/config";
import { sampleVehicles } from "./sample-vehicles";
import type { Vehicle } from "./types";

/**
 * Data access for vehicles. Reads from Supabase when configured, otherwise
 * returns the bundled sample inventory so the site works out of the box.
 */

function sortByNewest(a: Vehicle, b: Vehicle) {
  return b.created_at.localeCompare(a.created_at);
}

export async function getVehicles(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured) {
    return [...sampleVehicles].filter((v) => !v.is_sold);
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_sold", false)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Vehicle[]) ?? [];
  } catch (err) {
    console.error("getVehicles failed, falling back to sample data:", err);
    return [...sampleVehicles].filter((v) => !v.is_sold);
  }
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  const all = await getVehicles();
  const featured = all.filter((v) => v.is_featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  if (!isSupabaseConfigured) {
    return sampleVehicles.find((v) => v.slug === slug) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return (data as Vehicle) ?? null;
  } catch (err) {
    console.error("getVehicleBySlug failed, falling back to sample data:", err);
    return sampleVehicles.find((v) => v.slug === slug) ?? null;
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  if (!isSupabaseConfigured) {
    return sampleVehicles.find((v) => v.id === id) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return (data as Vehicle) ?? null;
  } catch (err) {
    console.error("getVehicleById failed:", err);
    return sampleVehicles.find((v) => v.id === id) ?? null;
  }
}

export async function getAllVehiclesForAdmin(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured) {
    return [...sampleVehicles].sort(sortByNewest);
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Vehicle[]) ?? [];
}

export function getRelatedVehicles(
  vehicle: Vehicle,
  all: Vehicle[],
  limit = 3
): Vehicle[] {
  return all
    .filter((v) => v.id !== vehicle.id && v.body_type === vehicle.body_type)
    .slice(0, limit);
}
