import Link from "next/link";
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

export default async function HomePage() {
  const featured = await getFeaturedVehicles(6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-brand-900" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(37,99,235,0.4), transparent 45%)",
          }}
        />
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
