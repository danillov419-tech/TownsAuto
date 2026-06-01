import type { Metadata } from "next";
import Link from "next/link";
import { Award, Users, HandHeart, ShieldCheck, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}, a trusted local used-car seller committed to honesty, value, and great service.`,
};

const values = [
  { icon: Award, title: "Quality First", desc: "Every vehicle is hand-picked and inspected for reliability." },
  { icon: HandHeart, title: "Honest Pricing", desc: "Fair, transparent prices with no surprise fees." },
  { icon: Users, title: "Personal Service", desc: "You deal with real people who care about your experience." },
  { icon: ShieldCheck, title: "Peace of Mind", desc: "Warranty coverage and support after the sale." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${siteConfig.name}`}
        subtitle="A different kind of car-buying experience — built on trust, value, and service."
      />

      <section className="bg-white py-16">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-ink-600">
            <h2 className="text-3xl font-extrabold text-ink-900">Our Story</h2>
            <p>
              {siteConfig.name} was founded on a simple idea: buying a used car
              should be honest, easy, and even enjoyable. After years in the
              industry, we set out to do things differently — putting customers
              first and earning trust one handshake at a time.
            </p>
            <p>
              We hand-pick every vehicle in our inventory, focusing on quality
              and value. By keeping our process lean and transparent, we&apos;re
              able to offer great cars at prices that make sense for real
              budgets — all backed by friendly, no-pressure service.
            </p>
            <p>
              Whether you&apos;re buying your first car or your fifth, we&apos;re
              here to make it smooth from start to finish. Welcome to the family.
            </p>
            <Link href="/inventory" className="btn-primary mt-2">
              Browse Our Inventory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 text-white">
            <div className="px-8 text-center">
              <p className="text-5xl font-extrabold text-accent-400">8+</p>
              <p className="mt-2 text-xl font-semibold">Years of Trusted Service</p>
              <p className="mt-2 text-brand-100">
                Serving {siteConfig.serviceArea.join(", ")} and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-16">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-ink-900">What We Stand For</h2>
            <p className="mt-3 text-ink-500">The values behind every sale.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-bold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
