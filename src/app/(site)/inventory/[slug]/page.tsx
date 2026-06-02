import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Gauge,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  CreditCard,
  FileText,
  Truck,
  Banknote,
  ShoppingCart,
} from "lucide-react";
import { getAllVehiclesForAdmin, getVehicleBySlug, getRelatedVehicles } from "@/lib/vehicles";
import { formatMileage, formatMoney, vehicleTitle } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import { VehicleGallery } from "@/components/vehicle-gallery";
import { VehicleContactCard } from "@/components/vehicle-contact-card";
import { VehicleCard } from "@/components/vehicle-card";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  const title = vehicleTitle(vehicle);
  return {
    title: `${title} — ${formatMoney(vehicle.price)}`,
    description: vehicle.description,
  };
}

const miniFeatures = [
  { icon: Truck, title: "Nationwide Shipping", desc: "Available to all 50 states", color: "text-brand-600" },
  { icon: DollarSign, title: "Transparent Pricing", desc: "No hidden fees", color: "text-success-600" },
  { icon: ShieldCheck, title: "90-Day Warranty", desc: "Peace of mind included", color: "text-brand-700" },
];

function AvailabilityPill({ sold }: { sold: boolean }) {
  return sold ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-200 px-3 py-1 text-sm font-semibold text-ink-700">
      Sold
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-success-600/10 px-3 py-1 text-sm font-semibold text-success-700">
      <CheckCircle2 className="h-4 w-4" />
      Available
    </span>
  );
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const title = vehicleTitle(vehicle);
  const all = await getAllVehiclesForAdmin();
  const related = getRelatedVehicles(vehicle, all.filter((v) => !v.is_sold));

  const equipment = [
    vehicle.exterior_color && vehicle.interior_color
      ? `Exterior / Interior: ${vehicle.exterior_color} / ${vehicle.interior_color}`
      : null,
    vehicle.vin ? `VIN: ${vehicle.vin}` : null,
    vehicle.drivetrain ? `${vehicle.drivetrain}` : null,
    vehicle.transmission ? `${vehicle.transmission} transmission` : null,
    vehicle.fuel_type ? `${vehicle.fuel_type}` : null,
    ...vehicle.features,
  ].filter(Boolean) as string[];

  return (
    <div className="bg-ink-50">
      <div className="container-page py-8">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Used Car Inventory
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          {/* Gallery — top-left */}
          <div className="order-1 lg:col-span-2 lg:col-start-1 lg:row-start-1">
            <VehicleGallery images={vehicle.images} alt={title} />
          </div>

          {/* Sidebar — right column, spans both rows */}
          <div className="order-2 space-y-6 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <div>
              <h1 className="text-3xl font-extrabold text-ink-900">{title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-600">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-ink-400" />
                  {vehicle.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <Gauge className="h-4 w-4 text-ink-400" />
                  {formatMileage(vehicle.mileage)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-ink-400" />
                  {siteConfig.city}
                </span>
              </div>
              <div className="mt-3">
                <AvailabilityPill sold={vehicle.is_sold} />
              </div>
            </div>

            {/* Price card */}
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <span className="text-3xl font-extrabold text-brand-700">
                  {formatMoney(vehicle.price)}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-success-600">
                  <ShieldCheck className="h-4 w-4" />
                  No Credit Check
                </span>
              </div>
              {vehicle.down_payment != null && (
                <p className="mt-2 text-ink-600">
                  Down payment: <span className="font-bold text-ink-900">{formatMoney(vehicle.down_payment)}</span>
                </p>
              )}

              {vehicle.warranty && (
                <div className="mt-5 flex items-start gap-3 border-t border-ink-100 pt-5">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-purple-500" />
                  <div>
                    <p className="font-bold text-ink-900">{vehicle.warranty}</p>
                    <p className="text-sm text-ink-500">Enjoy peace of mind with every purchase.</p>
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-2">
                <a href="#reserve" className="btn-primary w-full">
                  <DollarSign className="h-4 w-4" />
                  Reserve Now
                </a>
                <a href="#buy" className="btn-success w-full">
                  <CreditCard className="h-4 w-4" />
                  Outright Payment
                </a>
                <Link
                  href="/financing"
                  className="btn w-full border border-success-600/40 text-success-700 hover:bg-success-600/5"
                >
                  <FileText className="h-4 w-4" />
                  Apply for Financing
                </Link>
              </div>
            </div>

            {/* Mini feature cards */}
            <div className="grid grid-cols-3 gap-3">
              {miniFeatures.map((f) => (
                <div key={f.title} className="card p-4 text-center">
                  <f.icon className={`mx-auto h-6 w-6 ${f.color}`} />
                  <p className="mt-2 text-sm font-bold leading-tight text-ink-900">{f.title}</p>
                  <p className="mt-1 text-xs text-ink-500">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Contact card */}
            <VehicleContactCard vehicleId={vehicle.id} vehicleLabel={title} />
          </div>

          {/* Left content — below the gallery */}
          <div className="order-3 space-y-6 lg:col-span-2 lg:col-start-1 lg:row-start-2">
            {/* Availability */}
            <div className="card flex flex-wrap items-center justify-between gap-3 p-6">
              <div>
                <h2 className="text-lg font-bold text-ink-900">Vehicle Availability</h2>
                <p className="mt-1 text-sm text-ink-500">
                  {vehicle.is_sold
                    ? "This vehicle has been sold."
                    : "This vehicle is currently in stock and available for purchase."}
                </p>
              </div>
              <AvailabilityPill sold={vehicle.is_sold} />
            </div>

            {/* Description */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-ink-900">Vehicle Description</h2>
              <p className="mt-3 whitespace-pre-line text-ink-600">{vehicle.description}</p>
            </div>

            {/* Features & Equipment */}
            {equipment.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-ink-900">Features &amp; Equipment</h2>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {equipment.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-ink-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ready to purchase */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-ink-900">Ready to Purchase?</h2>
              <p className="mt-2 text-ink-600">
                Here&apos;s how to secure your new vehicle. The process is simple,
                transparent, and designed to get you on the road quickly.
              </p>

              <ol className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">1</span>
                  <div>
                    <p className="font-bold text-ink-900">Choose Your Purchase Option</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-ink-100 px-3 py-1.5 text-sm font-medium text-ink-700">
                        <FileText className="h-4 w-4 text-success-600" /> Apply for Financing
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-ink-100 px-3 py-1.5 text-sm font-medium text-ink-700">
                        <Banknote className="h-4 w-4 text-brand-600" /> Cash Payment
                      </span>
                    </div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">2</span>
                  <div>
                    <p className="font-bold text-ink-900">Make Your Down Payment</p>
                    <p className="mt-1 text-sm text-ink-600">
                      A down payment of{" "}
                      <span className="font-bold">{formatMoney(vehicle.down_payment ?? 0)}</span>{" "}
                      is required to start the process. We&apos;ll guide you through
                      completing it securely.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">3</span>
                  <div>
                    <p className="font-bold text-ink-900">Arrange Shipping</p>
                    <p className="mt-1 text-sm text-ink-600">
                      We offer insured, door-to-door nationwide shipping. We&apos;ll
                      contact you to confirm details and provide a quote.
                    </p>
                  </div>
                </li>
              </ol>

              <a href="#buy" className="btn-success mt-6 w-full">
                <ShoppingCart className="h-4 w-4" />
                Start Your Purchase
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-2 text-center text-xs text-ink-400">
                We&apos;ll reach out to arrange your down payment securely — no
                payment is taken on this website.
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-center text-3xl font-extrabold text-ink-900">
              Similar Cars You Might Like
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
