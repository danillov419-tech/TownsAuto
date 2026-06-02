"use client";

import { useActionState, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  CreditCard,
  FileText,
  Mail,
  X,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { submitLead, type FormState } from "@/app/actions";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/format";

type ActionKey = "reserve" | "buy" | "finance" | "contact";

type VehicleLite = {
  id: string;
  title: string;
  price: number;
  down_payment: number | null;
  vin: string | null;
};

function stockNo(v: VehicleLite) {
  return v.id.slice(0, 8);
}

const CONFIG: Record<
  ActionKey,
  {
    label: string;
    detailLabel: string;
    icon: typeof Lock;
    btnClass: string;
    title: string;
    subtitle: string;
    info?: string;
    showDeposit?: boolean;
    showPreferred?: boolean;
    phoneRequired?: boolean;
    messageRequired?: boolean;
    submitLabel: string;
    readonly: (v: VehicleLite) => [string, string][];
    financingLink?: boolean;
  }
> = {
  reserve: {
    label: "Reserve",
    detailLabel: "Reserve Now",
    icon: Lock,
    btnClass: "btn-primary",
    title: "Reserve This Vehicle",
    subtitle:
      "Complete the form below to initiate your reservation. We'll secure this vehicle for you pending confirmation.",
    info: "Submitting this form places a temporary hold on the vehicle. No payment is taken right now — we'll contact you to finalize the details.",
    showDeposit: true,
    showPreferred: true,
    phoneRequired: true,
    submitLabel: "Submit Reservation",
    readonly: (v) => [
      ["Vehicle", v.title],
      ["Stock #", stockNo(v)],
    ],
  },
  buy: {
    label: "Buy Outright",
    detailLabel: "Outright Payment",
    icon: CreditCard,
    btnClass: "btn-success",
    title: "Outright Payment Inquiry",
    subtitle:
      "Interested in buying this vehicle outright? Fill out the form below and we'll send you the payment details and next steps.",
    showPreferred: true,
    submitLabel: "Send Inquiry",
    readonly: (v) => [
      ["Vehicle", v.title],
      ["Price", formatMoney(v.price)],
      ["VIN / Stock #", v.vin || stockNo(v)],
    ],
  },
  finance: {
    label: "Finance",
    detailLabel: "Apply for Financing",
    icon: FileText,
    btnClass: "btn border border-success-600/40 text-success-700 hover:bg-success-600/5",
    title: "Apply for Financing",
    subtitle:
      "Tell us a bit about you and we'll reach out with financing options for this vehicle.",
    showPreferred: true,
    submitLabel: "Request Financing",
    financingLink: true,
    readonly: (v) => [
      ["Vehicle", v.title],
      ["Price", formatMoney(v.price)],
    ],
  },
  contact: {
    label: "Contact",
    detailLabel: "Contact",
    icon: Mail,
    btnClass: "btn-outline",
    title: "Contact Us About This Vehicle",
    subtitle: "Have a question? Send us a message and we'll get right back to you.",
    messageRequired: true,
    submitLabel: "Send Message",
    readonly: (v) => [["Vehicle", v.title]],
  },
};

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        readOnly
        value={value}
        className="input cursor-default bg-ink-100 text-ink-600"
        tabIndex={-1}
      />
    </div>
  );
}

function ActionModal({
  action,
  vehicle,
  onClose,
}: {
  action: ActionKey;
  vehicle: VehicleLite;
  onClose: () => void;
}) {
  const cfg = CONFIG[action];
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitLead,
    null
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const fields = cfg.readonly(vehicle);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div className="relative z-10 my-8 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="pr-8 text-2xl font-extrabold text-brand-700">{cfg.title}</h2>
        <p className="mt-1 text-sm text-ink-500">{cfg.subtitle}</p>

        {state?.ok ? (
          <div className="mt-6 rounded-xl bg-success-600/10 p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-success-600" />
            <p className="mt-3 font-semibold text-ink-900">{state.message}</p>
            <button type="button" onClick={onClose} className="btn-primary mt-5">
              Close
            </button>
          </div>
        ) : (
          <form action={formAction} className="mt-5 space-y-4">
            <input type="hidden" name="type" value={action} />
            <input type="hidden" name="vehicle_id" value={vehicle.id} />
            <input type="hidden" name="vehicle_label" value={vehicle.title} />

            {cfg.info && (
              <div className="flex items-start gap-2 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <p>
                  <span className="font-semibold">Secure Reservation Process. </span>
                  {cfg.info}
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map(([label, value]) => (
                <ReadonlyField key={label} label={label} value={value} />
              ))}
            </div>

            <div>
              <label className="label">Full Name *</label>
              <input name="name" className="input" required placeholder="John Doe" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Email Address *</label>
                <input name="email" type="email" className="input" required placeholder="john@example.com" />
              </div>
              <div>
                <label className="label">Phone Number{cfg.phoneRequired ? " *" : ""}</label>
                <input
                  name="phone"
                  type="tel"
                  className="input"
                  required={cfg.phoneRequired}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {(cfg.showDeposit || cfg.showPreferred) && (
              <div className="grid gap-4 sm:grid-cols-2">
                {cfg.showDeposit && (
                  <div>
                    <label className="label">Deposit Amount ($) *</label>
                    <input
                      name="deposit_amount"
                      type="number"
                      min={300}
                      defaultValue={300}
                      className="input"
                      required
                    />
                    <p className="mt-1 text-xs text-ink-400">Minimum $300 required</p>
                  </div>
                )}
                {cfg.showPreferred && (
                  <div>
                    <label className="label">Preferred Contact</label>
                    <select name="preferred_contact" className="input" defaultValue="Email">
                      <option>Email</option>
                      <option>Phone</option>
                      <option>WhatsApp</option>
                      <option>Text</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="label">
                {cfg.messageRequired ? "Your Message *" : "Additional Notes"}
              </label>
              <textarea
                name="message"
                rows={3}
                className="input"
                required={cfg.messageRequired}
                placeholder={
                  cfg.messageRequired
                    ? "How can we help?"
                    : "Any specific questions or preferred call times?"
                }
              />
            </div>

            {cfg.financingLink && (
              <p className="text-sm text-ink-500">
                Prefer the full application?{" "}
                <Link href="/financing" className="font-medium text-brand-600 hover:text-brand-700">
                  Open the financing page
                </Link>
                .
              </p>
            )}

            {state && !state.ok && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {state.message}
              </div>
            )}

            <button type="submit" className="btn-primary w-full" disabled={pending}>
              <Send className="h-4 w-4" />
              {pending ? "Sending…" : cfg.submitLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function VehicleActions({
  vehicle,
  actions = ["reserve", "buy", "finance", "contact"],
  variant = "card",
  labels,
  contactHref,
}: {
  vehicle: VehicleLite;
  actions?: ActionKey[];
  variant?: "card" | "detail";
  labels?: Partial<Record<ActionKey, string>>;
  /** If set, the "contact" action links here instead of opening a modal. */
  contactHref?: string;
}) {
  const [open, setOpen] = useState<ActionKey | null>(null);
  // Bump on each open so the modal remounts with fresh form state.
  const [, setNonce] = useState(0);

  const openModal = (a: ActionKey) => {
    setOpen(a);
    setNonce((n) => n + 1);
  };

  return (
    <>
      {variant === "card" ? (
        <div className="grid grid-cols-2 gap-2">
          {actions.map((a) => {
            const c = CONFIG[a];
            if (a === "contact" && contactHref) {
              return (
                <Link key={a} href={contactHref} className={c.btnClass}>
                  <c.icon className="h-4 w-4" />
                  {c.label}
                </Link>
              );
            }
            return (
              <button key={a} type="button" onClick={() => openModal(a)} className={c.btnClass}>
                <c.icon className="h-4 w-4" />
                {c.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {actions.map((a) => {
            const c = CONFIG[a];
            return (
              <button
                key={a}
                type="button"
                onClick={() => openModal(a)}
                className={cn(c.btnClass, "w-full")}
              >
                <c.icon className="h-4 w-4" />
                {labels?.[a] ?? c.detailLabel}
              </button>
            );
          })}
        </div>
      )}

      {open && (
        <ActionModal action={open} vehicle={vehicle} onClose={() => setOpen(null)} />
      )}
    </>
  );
}
