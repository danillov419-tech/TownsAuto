import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/config";
import { sampleReviews } from "./sample-reviews";
import type { Review } from "./types";

/**
 * Data access for reviews. Reads from Supabase when configured, otherwise
 * returns the bundled sample reviews so the site looks complete out of the box.
 */

function bySort(a: Review, b: Review) {
  if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
  return b.created_at.localeCompare(a.created_at);
}

export async function getPublishedReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured) {
    return sampleReviews.filter((r) => r.is_published).sort(bySort);
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Review[]) ?? [];
  } catch (err) {
    console.error("getPublishedReviews failed, using sample data:", err);
    return sampleReviews.filter((r) => r.is_published).sort(bySort);
  }
}

export async function getFeaturedReviews(limit = 3): Promise<Review[]> {
  const all = await getPublishedReviews();
  const featured = all.filter((r) => r.is_featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getAllReviewsForAdmin(): Promise<Review[]> {
  if (!isSupabaseConfigured) {
    return [...sampleReviews].sort(bySort);
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Review[]) ?? [];
  } catch (err) {
    console.error("getAllReviewsForAdmin failed, using sample data:", err);
    return [...sampleReviews].sort(bySort);
  }
}

export async function getReviewById(id: string): Promise<Review | null> {
  if (!isSupabaseConfigured) {
    return sampleReviews.find((r) => r.id === id) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return (data as Review) ?? null;
  } catch (err) {
    console.error("getReviewById failed:", err);
    return sampleReviews.find((r) => r.id === id) ?? null;
  }
}
