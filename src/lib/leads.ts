import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/config";
import type { FinancingApplication, Lead } from "./types";

export async function getLeads(): Promise<Lead[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getLeads failed:", error.message);
    return [];
  }
  return (data as Lead[]) ?? [];
}

export async function getApplications(): Promise<FinancingApplication[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("financing_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getApplications failed:", error.message);
    return [];
  }
  return (data as FinancingApplication[]) ?? [];
}
