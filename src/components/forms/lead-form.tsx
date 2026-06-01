"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitLead, type FormState } from "@/app/actions";
import { FormStatus } from "./form-status";
import type { LeadType } from "@/lib/types";

export function LeadForm({
  type = "contact",
  vehicleId,
  vehicleLabel,
  defaultMessage,
  submitLabel = "Send Message",
}: {
  type?: LeadType;
  vehicleId?: string;
  vehicleLabel?: string;
  defaultMessage?: string;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitLead,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="type" value={type} />
      {vehicleId && <input type="hidden" name="vehicle_id" value={vehicleId} />}
      {vehicleLabel && (
        <input type="hidden" name="vehicle_label" value={vehicleLabel} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="lead-name">Full name</label>
          <input id="lead-name" name="name" className="input" required placeholder="Jane Doe" />
        </div>
        <div>
          <label className="label" htmlFor="lead-phone">Phone</label>
          <input id="lead-phone" name="phone" type="tel" className="input" placeholder="(555) 123-4567" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="lead-email">Email</label>
        <input id="lead-email" name="email" type="email" className="input" placeholder="you@example.com" />
      </div>

      <div>
        <label className="label" htmlFor="lead-message">Message</label>
        <textarea
          id="lead-message"
          name="message"
          rows={4}
          className="input"
          defaultValue={defaultMessage}
          placeholder="How can we help?"
        />
      </div>

      <FormStatus state={state} />

      <button type="submit" className="btn-primary w-full" disabled={pending}>
        <Send className="h-4 w-4" />
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
