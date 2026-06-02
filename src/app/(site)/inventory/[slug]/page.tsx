import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Palette,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  MessageCircle,
  Lock,
  CreditCard,
  FileText,
  Mail,
} from "lucide-react";
import { getAllVehiclesForAdmin, getVehicleBySlug, getRelatedVehicles } from "@/lib/vehicles";
import { formatMileage, formatMoney, vehicleTitle } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import { VehicleImage } from "@/components/vehicle-image";
import { VehicleCard } from "@/components/vehicle-card";
import { VehicleInquiry } from "@/components/vehicle-inquiry";

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

function SpecRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string | number | null;
}) {
  if (value == null || value === "") return null;
  return (
    <div className="flex items-center gap-3 border-b border-ink-100 py-3 last:border-0">
      <Icon className="h-5 w-5 text-brand-600" />
      <span className="text-sm text-ink-500">{label}</span>
      <span className="ml-auto text-sm font-semibold text-ink-900">{value}</span>
    </div>
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

  return (
    <div className="bg-ink-50">
      <div className="container-page py-8">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to inventory
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Left: gallery + details */}
          <div className="lg:col-span-2">
            <VehicleImage
              src={vehicle.images[0]}
              alt={title}
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="aspect-[16/10] w-full rounded-2xl"
            />
            {vehicle.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {vehicle.images.slice(1, 5).map((img, i) => (
                  <VehicleImage
                    key={i}
                    src={img}
                    alt={`${title} photo ${i + 2}`}
                    className="aspect-square w-full rounded-xl"
                    sizes="20vw"
                  />
                ))}
              </div>
            )}

            <div className="card mt-8 p-6">
              <h2 className="text-xl font-bold text-ink-900">Description</h2>
              <p className="mt-3 whitespace-pre-line text-ink-600">{vehicle.description}</p>
            </div>

            {vehicle.features.length > 0 && (
              <div className="card mt-6 p-6">
                <h2 className="text-xl font-bold text-ink-900">Features</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {vehicle.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="h-4 w-4 text-success-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: summary + actions */}
          <div className="space-y-6">
            <div className="card p-6">
              <span className="inline-flex rounded-md bg-success-600 px-2.5 py-1 text-xs font-semibold text-white">
                {vehicle.condition}
              </span>
              <h1 className="mt-3 text-2xl font-extrabold text-ink-900">{title}</h1>
              {vehicle.warranty && (
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-success-600">
                  <ShieldCheck className="h-4 w-4" />
                  {vehicle.warranty}
                </p>
              )}

              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-extrabold text-brand-700">
                  {formatMoney(vehicle.price)}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium text-success-600">
                  <DollarSign className="h-4 w-4" />
                  No Credit Check
                </span>
              </div>
              {vehicle.down_payment != null && (
                <p className="mt-1 text-sm text-ink-500">
                  Down payment from {formatMoney(vehicle.down_payment)}
                </p>
              )}

              <div className="mt-5 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a href="#reserve" className="btn-primary">
                    <Lock className="h-4 w-4" />
                    Reserve
                  </a>
                  <a href="#buy" className="btn-success">
                    <CreditCard className="h-4 w-4" />
                    Buy Outright
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="#finance"
                    className="btn border border-success-600/40 text-success-700 hover:bg-success-600/5"
                  >
                    <FileText className="h-4 w-4" />
                    Finance
                  </a>
                  <a href="#contact" className="btn-outline">
                    <Mail className="h-4 w-4" />
                    Contact
                  </a>
                </div>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full text-success-700 hover:bg-success-600/5"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-bold text-ink-900">Specifications</h2>
              <div className="mt-2">
                <SpecRow icon={Calendar} label="Year" value={vehicle.year} />
                <SpecRow icon={Gauge} label="Mileage" value={formatMileage(vehicle.mileage)} />
                <SpecRow icon={Cog} label="Transmission" value={vehicle.transmission} />
                <SpecRow icon={Fuel} label="Fuel" value={vehicle.fuel_type} />
                <SpecRow icon={Cog} label="Drivetrain" value={vehicle.drivetrain} />
                <SpecRow icon={Palette} label="Exterior" value={vehicle.exterior_color} />
                <SpecRow icon={Palette} label="Interior" value={vehicle.interior_color} />
                <SpecRow icon={ShieldCheck} label="VIN" value={vehicle.vin} />
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry */}
        <div className="mt-12">
          <VehicleInquiry vehicleId={vehicle.id} vehicleLabel={title} />
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-ink-900">Similar Vehicles</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
