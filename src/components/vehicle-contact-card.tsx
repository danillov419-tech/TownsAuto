"use client";

import { useActionState, useEffect, useState } from "react";
import { Send, Phone } from "lucide-react";
import { submitLead, type FormState } from "@/app/actions";
import { FormStatus } from "./forms/form-status";
import { siteConfig } from "@/lib/site-config";
import type { LeadType } from "@/lib/types";

type IntentKey = "contact" | "reserve" | "buy" | "finance";

const intents: Record<
  IntentKey,
  { type: LeadType; subtitle: string; message: (t: string) => string }
> = {
  contact: {
    type: "contact",
    subtitle: `Your trusted car experts — 8+ years of experience`,
    message: () => "",
  },
  reserve: {
    type: "reserve",
    subtitle: "Reserve this vehicle — no payment required to request a hold",
    message: (t) => `I'd like to reserve the ${t}.`,
  },
  buy: {
    type: "buy",
    subtitle: "Buy this vehicle outright — let's finalize the sale",
    message: (t) => `I'd like to buy the ${t} outright. Please contact me with the next steps.`,
  },
  finance: {
    type: "finance",
    subtitle: "Finance this vehicle — we'll reach out with options",
    message: (t) => `I'm interested in financing the ${t}.`,
  },
};

export function VehicleContactCard({
  vehicleId,
  vehicleLabel,
}: {
  vehicleId: string;
  vehicleLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(submitLead, null);
  const [intent, setIntent] = useState<IntentKey>("contact");

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "") as IntentKey;
      setIntent(intents[hash] ? hash : "contact");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const cfg = intents[intent];
  const initial = siteConfig.name.charAt(0).toUpperCase();

  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
      {/* Scroll/intent targets for the price-card buttons */}
      {(["reserve", "buy", "finance", "contact"] as IntentKey[]).map((k) => (
        <span key={k} id={k} className="block scroll-mt-24" aria-hidden />
      ))}

      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-2xl font-extrabold text-white">
          {initial}
        </span>
        <h2 className="mt-3 text-lg font-bold text-ink-900">Contact {siteConfig.name}</h2>
        <p className="mt-1 text-sm text-ink-500">{cfg.subtitle}</p>
      </div>

      <form key={intent} action={formAction} className="mt-5 space-y-3">
        <input type="hidden" name="type" value={cfg.type} />
        <input type="hidden" name="vehicle_id" value={vehicleId} />
        <input type="hidden" name="vehicle_label" value={vehicleLabel} />

        <input name="name" className="input bg-white" required placeholder="Your Name *" />
        <input name="email" type="email" className="input bg-white" required placeholder="Your Email *" />
        <textarea
          name="message"
          rows={4}
          className="input bg-white"
          required
          placeholder="Your Message *"
          defaultValue={cfg.message(vehicleLabel)}
        />

        <p className="text-sm text-ink-500">
          Regarding: <span className="font-semibold text-ink-800">{vehicleLabel}</span>
        </p>

        <FormStatus state={state} />

        <button type="submit" className="btn-primary w-full" disabled={pending}>
          <Send className="h-4 w-4" />
          {pending ? "Sending…" : "Send Message"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-ink-500">Or call directly:</p>
      <a
        href={siteConfig.phoneHref}
        className="btn mt-2 w-full border border-ink-200 bg-white text-ink-800 hover:bg-ink-50"
      >
        <Phone className="h-4 w-4" />
        Call {siteConfig.phone}
      </a>
    </div>
  );
}
