import type { Metadata } from "next";
import { Lightbulb, Info, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { FinancingForm } from "@/components/forms/financing-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Financing — Get Pre-Qualified",
  description:
    "Apply to get pre-qualified for financing on your next used car. Simple, no-obligation, and no credit check to request options.",
};

const steps = [
  "Submit the short pre-qualification form below.",
  "A team member reviews it and contacts you to discuss options.",
  "We help you choose a vehicle and walk you through the paperwork.",
  "Finalize the deal and drive away with confidence.",
];

export default function FinancingPage() {
  return (
    <>
      <PageHero
        title="Simple Financing, Real People"
        subtitle="Get pre-qualified in minutes. No obligation, and requesting options never affects your credit."
      />

      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-ink-900">
                <Lightbulb className="h-6 w-6 text-accent-500" />
                Before You Apply
              </h2>
              <p className="mt-3 text-ink-600">
                Thanks for your interest! Once you submit the form, a member of
                our team will reach out personally to guide you through your
                options and answer any questions. There&apos;s no pressure and no
                obligation.
              </p>
              <ul className="mt-5 space-y-3">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-ink-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink-900">
                <Info className="h-5 w-5 text-brand-600" />
                Good to Know
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                  This form is a pre-qualification request, not a binding loan
                  application.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                  We&apos;ll never ask for full bank or card details over the
                  website — payment is always handled securely in person or
                  through a verified processor.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                  Questions? Call us at {siteConfig.phone}.
                </li>
              </ul>
            </div>
          </div>

          <div className="card p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-ink-900">Pre-Qualification Request</h2>
            <p className="mt-1 text-sm text-ink-500">
              Tell us a little about you and we&apos;ll take it from there.
            </p>
            <div className="mt-6">
              <FinancingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
