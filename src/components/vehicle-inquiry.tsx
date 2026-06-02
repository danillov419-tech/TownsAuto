"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, CreditCard, FileText, Mail } from "lucide-react";
import { LeadForm } from "./forms/lead-form";
import { cn } from "@/lib/format";
import type { LeadType } from "@/lib/types";

type TabKey = "reserve" | "buy" | "finance" | "contact";

const tabs: {
  key: TabKey;
  label: string;
  icon: typeof Lock;
  type: LeadType;
  heading: string;
  blurb: string;
  submitLabel: string;
  message: (title: string) => string;
}[] = [
  {
    key: "reserve",
    label: "Reserve",
    icon: Lock,
    type: "reserve",
    heading: "Reserve this vehicle",
    blurb: "Let us know you're interested and we'll hold it while we get in touch. No payment required to request a hold.",
    submitLabel: "Request to Reserve",
    message: (t) => `I'd like to reserve the ${t}.`,
  },
  {
    key: "buy",
    label: "Buy Outright",
    icon: CreditCard,
    type: "buy",
    heading: "Buy this vehicle outright",
    blurb: "Ready to purchase? Send your details and we'll walk you through the next steps to finalize the sale.",
    submitLabel: "Start Purchase",
    message: (t) => `I'd like to buy the ${t} outright. Please contact me with the next steps.`,
  },
  {
    key: "finance",
    label: "Finance",
    icon: FileText,
    type: "finance",
    heading: "Finance this vehicle",
    blurb: "Tell us a bit about you and we'll reach out with financing options for this vehicle.",
    submitLabel: "Request Financing Info",
    message: (t) => `I'm interested in financing the ${t}.`,
  },
  {
    key: "contact",
    label: "Contact",
    icon: Mail,
    type: "contact",
    heading: "Ask about this vehicle",
    blurb: "Questions about condition, history, or financing? Send a message.",
    submitLabel: "Send Question",
    message: (t) => `I have a question about the ${t}.`,
  },
];

export function VehicleInquiry({
  vehicleId,
  vehicleLabel,
}: {
  vehicleId: string;
  vehicleLabel: string;
}) {
  const [active, setActive] = useState<TabKey>("reserve");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (tabs.some((t) => t.key === hash)) {
        setActive(hash as TabKey);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div className="card overflow-hidden">
      {/* Anchor targets so the card buttons (#reserve/#buy/#finance/#contact) land here */}
      {tabs.map((t) => (
        <span key={t.key} id={t.key} className="block scroll-mt-24" aria-hidden />
      ))}

      <div className="flex flex-wrap border-b border-ink-100">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => {
              setActive(t.key);
              history.replaceState(null, "", `#${t.key}`);
            }}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors",
              active === t.key
                ? "bg-brand-50 text-brand-700"
                : "text-ink-500 hover:bg-ink-50 hover:text-ink-800"
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-ink-900">{current.heading}</h2>
        <p className="mt-1 text-sm text-ink-500">{current.blurb}</p>
        {current.key === "finance" && (
          <p className="mt-2 text-sm text-ink-500">
            Prefer the full form?{" "}
            <Link href="/financing" className="font-medium text-brand-600 hover:text-brand-700">
              Get pre-qualified here
            </Link>
            .
          </p>
        )}
        <div className="mt-5">
          <LeadForm
            key={current.key}
            type={current.type}
            vehicleId={vehicleId}
            vehicleLabel={vehicleLabel}
            submitLabel={current.submitLabel}
            defaultMessage={current.message(vehicleLabel)}
          />
        </div>
      </div>
    </div>
  );
}
