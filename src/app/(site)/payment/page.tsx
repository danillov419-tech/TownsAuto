import type { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Payment Information",
  description: `How payments work at ${siteConfig.name} — accepted methods, what to expect, and how we keep your money safe.`,
};

const methods = [
  { icon: Banknote, title: "Cash or Cashier's Check", desc: "Paid securely in person when you pick up your vehicle." },
  { icon: CreditCard, title: "Debit / Credit Card", desc: "Processed through a verified, secure payment terminal." },
  { icon: ShieldCheck, title: "Approved Financing", desc: "Through a reputable lender once you're pre-qualified." },
];

export default function PaymentPage() {
  return (
    <>
      <PageHero
        title="Payment Information"
        subtitle="Clear, honest, and secure. Here's exactly how paying for your vehicle works."
      />

      <section className="bg-white py-16">
        <div className="container-page max-w-4xl">
          <h2 className="text-2xl font-bold text-ink-900">Accepted Payment Methods</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {methods.map((m) => (
              <div key={m.title} className="card p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <m.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-bold text-ink-900">{m.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-success-600/20 bg-success-600/5 p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink-900">
                <CheckCircle2 className="h-5 w-5 text-success-600" />
                What to Expect
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li>Reserve a vehicle online with no payment required.</li>
                <li>Inspect or test drive before you commit to buying.</li>
                <li>Pay securely in person or through a verified processor.</li>
                <li>Receive a written bill of sale and all paperwork.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink-900">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Your Safety
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-700">
                <li>
                  We will <strong>never</strong> ask you to wire money, send gift
                  cards, or pay before you&apos;ve seen the vehicle and paperwork.
                </li>
                <li>
                  We don&apos;t collect bank or full card numbers through this
                  website.
                </li>
                <li>
                  If anyone claims to be us and asks for an upfront wire transfer,
                  it&apos;s a scam — please call us directly at {siteConfig.phone}.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-ink-900 p-8 text-center text-white">
            <h3 className="text-2xl font-bold">Ready to move forward?</h3>
            <p className="mt-2 text-ink-200">
              Get pre-qualified or reach out with any payment questions.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/financing" className="btn-accent px-6 py-3">
                Get Pre-Qualified
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn bg-white px-6 py-3 text-ink-900 hover:bg-ink-100">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
