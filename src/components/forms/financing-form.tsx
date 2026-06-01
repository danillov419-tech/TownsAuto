"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitFinancing, type FormState } from "@/app/actions";
import { FormStatus } from "./form-status";

export function FinancingForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitFinancing,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fin-name">Full name</label>
          <input id="fin-name" name="full_name" className="input" required placeholder="Jane Doe" />
        </div>
        <div>
          <label className="label" htmlFor="fin-phone">Phone</label>
          <input id="fin-phone" name="phone" type="tel" className="input" required placeholder="(555) 123-4567" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="fin-email">Email</label>
        <input id="fin-email" name="email" type="email" className="input" required placeholder="you@example.com" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fin-employment">Employment status</label>
          <select id="fin-employment" name="employment_status" className="input" defaultValue="Employed full-time">
            <option>Employed full-time</option>
            <option>Employed part-time</option>
            <option>Self-employed</option>
            <option>Retired</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="fin-income">Annual income (USD)</label>
          <input id="fin-income" name="annual_income" inputMode="numeric" className="input" placeholder="45,000" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fin-vehicle">Vehicle of interest</label>
          <input id="fin-vehicle" name="desired_vehicle" className="input" placeholder="2021 Honda Accord" />
        </div>
        <div>
          <label className="label" htmlFor="fin-down">Down payment budget (USD)</label>
          <input id="fin-down" name="down_payment_budget" inputMode="numeric" className="input" placeholder="1,000" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="fin-notes">Anything else?</label>
        <textarea id="fin-notes" name="notes" rows={3} className="input" placeholder="Optional notes" />
      </div>

      <p className="text-xs text-ink-500">
        This is a pre-qualification request, not a credit application or binding
        offer. Submitting does not run a credit check. A team member will contact
        you to discuss financing options.
      </p>

      <FormStatus state={state} />

      <button type="submit" className="btn-primary w-full" disabled={pending}>
        <Send className="h-4 w-4" />
        {pending ? "Submitting…" : "Request Pre-Qualification"}
      </button>
    </form>
  );
}
