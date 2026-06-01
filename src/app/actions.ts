"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { LeadType } from "@/lib/types";

export type FormState = {
  ok: boolean;
  message: string;
} | null;

function str(form: FormData, key: string): string {
  return (form.get(key) ?? "").toString().trim();
}

function numOrNull(form: FormData, key: string): number | null {
  const v = str(form, key).replace(/[^0-9.]/g, "");
  return v ? Number(v) : null;
}

const NOT_CONFIGURED: FormState = {
  ok: false,
  message:
    "This site isn't connected to a database yet. Add your Supabase keys to enable form submissions.",
};

/** Handles contact / reserve / buy / test-drive lead forms. */
export async function submitLead(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = str(formData, "name");
  const email = str(formData, "email");
  const phone = str(formData, "phone");

  if (!name || (!email && !phone)) {
    return { ok: false, message: "Please provide your name and a way to reach you." };
  }

  if (!isSupabaseConfigured) return NOT_CONFIGURED;

  const lead = {
    type: (str(formData, "type") || "contact") as LeadType,
    name,
    email,
    phone,
    message: str(formData, "message") || null,
    vehicle_id: str(formData, "vehicle_id") || null,
    vehicle_label: str(formData, "vehicle_label") || null,
  };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw error;
    return {
      ok: true,
      message: "Thanks! We received your request and will reach out shortly.",
    };
  } catch (err) {
    console.error("submitLead failed:", err);
    return { ok: false, message: "Something went wrong. Please call us instead." };
  }
}

/** Handles the financing pre-qualification form. */
export async function submitFinancing(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const full_name = str(formData, "full_name");
  const email = str(formData, "email");
  const phone = str(formData, "phone");

  if (!full_name || !email || !phone) {
    return { ok: false, message: "Please complete your name, email, and phone." };
  }

  if (!isSupabaseConfigured) return NOT_CONFIGURED;

  const application = {
    full_name,
    email,
    phone,
    employment_status: str(formData, "employment_status") || "Not specified",
    annual_income: numOrNull(formData, "annual_income"),
    desired_vehicle: str(formData, "desired_vehicle") || null,
    down_payment_budget: numOrNull(formData, "down_payment_budget"),
    notes: str(formData, "notes") || null,
  };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("financing_applications").insert(application);
    if (error) throw error;
    return {
      ok: true,
      message:
        "Your pre-qualification request was submitted! A team member will contact you to discuss options.",
    };
  } catch (err) {
    console.error("submitFinancing failed:", err);
    return { ok: false, message: "Something went wrong. Please call us instead." };
  }
}
