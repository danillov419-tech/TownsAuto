import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  DollarSign,
  ShieldCheck,
  Truck,
  Award,
  CalendarCheck,
  Car,
  CheckCircle2,
  Star,
  Wallet,
  Euro,
  Calendar,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getFeaturedVehicles } from "@/lib/vehicles";
import { VehicleCard } from "@/components/vehicle-card";

const features = [
  { icon: DollarSign, title: "Auction Prices", desc: "Quality used cars at honest, below-market prices." },
  { icon: ShieldCheck, title: "Simple Financing", desc: "Flexible options for buyers of all backgrounds." },
  { icon: Truck, title: "Nationwide Delivery", desc: `Serving ${siteConfig.serviceArea.join(", ")} & more.` },
  { icon: Award, title: "8+ Years Experience", desc: "A trusted seller with a track record." },
];

const pricingReasons = [
  {
    icon: DollarSign,
    title: "Direct Sourcing",
    desc: "We source directly from dealer-only auctions, bypassing traditional dealership markups and ensuring you get wholesale prices.",
    iconColor: "text-brand-600",
    cardBg: "bg-brand-50",
  },
  {
    icon: Wallet,
    title: "Low Overhead",
    desc: "Our low overhead means we don't have expensive showrooms or large sales teams. These savings are passed directly to you.",
    iconColor: "text-success-600",
    cardBg: "bg-green-50",
  },
  {
    icon: Euro,
    title: "Fair Pricing",
    desc: "Fair pricing is our commitment. We provide transparent, competitive prices without hidden fees, so you always get a great deal.",
    iconColor: "text-accent-600",
    cardBg: "bg-amber-50",
  },
];

const buyingPolicy = [
  {
    icon: Calendar,
    title: "Appointments Required",
    desc: "All vehicle viewings and purchases are by appointment only. This ensures personalized attention and efficient service.",
  },
  {
    icon: Car,
    title: "Reservation Required for Viewing",
    desc: "If you are interested in viewing a vehicle, you must reserve it in advance. This guarantees the vehicle is held exclusively for you at the scheduled time.",
  },
  {
    icon: DollarSign,
    title: "Reservation Fee: $300",
    desc: "A $300 reservation fee is required to hold the vehicle. This fee is part of the down payment if you proceed with the purchase. If you choose not to proceed, the fee is fully refundable. This policy helps us prioritize serious buyers while maintaining flexibility and fairness.",
  },
];

const policies = [
  {
    icon: CalendarCheck,
    title: "Appointments Welcome",
    desc: "Schedule a visit or test drive so we can give you our full attention.",
  },
  {
    icon: Car,
    title: "Inspect Before You Buy",
    desc: "Every vehicle can be viewed and inspected before any commitment.",
  },
  {
    icon: ShieldCheck,
    title: "90-Day Warranty",
    desc: "Drive with peace of mind — our vehicles come with warranty coverage.",
  },
];

const trustPoints = [
  {
    title: "Your Satisfaction is Our Success",
    desc: "We hand-pick every vehicle for quality and reliability. Our goal is for you to drive away happy and confident.",
  },
  {
    title: "Savings Without Sacrifice",
    desc: "By sourcing smartly and keeping overhead low, we offer great cars at prices that make sense for your budget.",
  },
  {
    title: "A Process Built on Trust",
    desc: "From the first conversation to handing over the keys, expect transparency, fair dealing, and zero pressure.",
  },
];

// Render on demand so featured cars reflect live Supabase inventory.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeaturedVehicles(6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <Image
          src="/hero.png"
          alt="Towns Auto dealership lineup at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/75 to-ink-900/60" />
        <div className="container-page relative py-24 text-center sm:py-32">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Affordable Used Cars for Sale
            <span className="mt-2 block text-accent-400">Your Dream Car is Here.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-100">
            Browse quality pre-owned cars, SUVs, and trucks from trusted brands.
            Honest prices, simple financing, and friendly service in {siteConfig.city}.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/inventory" className="btn-accent px-7 py-3 text-base">
              Find Your Car Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-success px-7 py-3 text-base"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <f.icon className="mx-auto h-8 w-8 text-accent-400" />
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-200">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why our prices are affordable */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">
              Why Our Prices Are So Affordable
            </h2>
            <p className="mt-4 text-ink-500">
              We believe everyone deserves a great car at a fair price. Here&apos;s
              how we make it happen:
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingReasons.map((r) => (
              <div key={r.title} className={`rounded-2xl p-8 text-center ${r.cardBg}`}>
                <r.icon className={`mx-auto h-9 w-9 ${r.iconColor}`} strokeWidth={2.25} />
                <h3 className="mt-4 text-lg font-bold text-ink-900">{r.title}</h3>
                <p className="mt-3 text-ink-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our vehicle buying policy */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">
              Our Vehicle Buying Policy
            </h2>
            <p className="mt-4 text-ink-500">
              To ensure a smooth and professional buying experience, please review
              the following policy:
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {buyingPolicy.map((p) => (
              <div key={p.title} className="rounded-2xl bg-ink-50 p-8 text-center shadow-sm">
                <p.icon className="mx-auto h-9 w-9 text-brand-600" strokeWidth={2.25} />
                <h3 className="mt-5 text-lg font-bold text-ink-900">{p.title}</h3>
                <p className="mt-3 text-ink-600">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center font-semibold text-ink-800">
            Thank you for your cooperation and understanding. We look forward to
            assisting you!
          </p>
        </div>
      </section>

      {/* Buying policy */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-ink-900">How Buying Works</h2>
            <p className="mt-3 text-ink-500">
              A straightforward, no-pressure process designed around you.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {policies.map((p) => (
              <div key={p.title} className="card p-7 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <p.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-ink-50 py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Why {siteConfig.name}
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-ink-900">
              More Than a Sale — A Commitment.
            </h2>
            <p className="mt-4 text-ink-600">
              We bring honesty and value to every car sale. When you buy from us,
              you&apos;re not just getting a car — you&apos;re getting a partner who
              wants you to drive away happy.
            </p>
            <ul className="mt-6 space-y-5">
              {trustPoints.map((t) => (
                <li key={t.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-success-600" />
                  <div>
                    <h3 className="font-semibold text-ink-900">{t.title}</h3>
                    <p className="text-sm text-ink-500">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-primary mt-8">
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="card flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 text-white">
              <div className="text-center">
                <Star className="mx-auto h-12 w-12 text-accent-400" />
                <p className="mt-4 text-2xl font-bold">Trusted by Local Buyers</p>
                <p className="mt-1 text-brand-100">Quality cars. Fair prices. Real service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured cars */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-ink-900">Featured Cars</h2>
              <p className="mt-2 text-ink-500">Drive your dream today.</p>
            </div>
            <Link href="/inventory" className="btn-outline">
              View All Inventory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-700 py-16 text-white">
        <div className="container-page flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to find your next car?</h2>
            <p className="mt-2 text-brand-100">
              Get pre-qualified in minutes or reach out with any questions.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/financing" className="btn-accent px-6 py-3">Get Pre-Qualified</Link>
            <Link href="/contact" className="btn bg-white px-6 py-3 text-brand-700 hover:bg-ink-100">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
