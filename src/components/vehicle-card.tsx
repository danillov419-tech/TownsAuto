import Link from "next/link";
import { Calendar, Gauge, ShieldCheck, DollarSign } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { formatMileage, formatMoney, vehicleTitle } from "@/lib/format";
import { VehicleImage } from "./vehicle-image";
import { VehicleActions } from "./vehicle-actions";

const conditionColors: Record<string, string> = {
  Excellent: "bg-success-600",
  "Very Good": "bg-brand-600",
  Good: "bg-accent-600",
  Fair: "bg-ink-500",
};

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const title = vehicleTitle(vehicle);
  const href = `/inventory/${vehicle.slug}`;

  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link href={href} className="relative block">
        <VehicleImage src={vehicle.images[0]} alt={title} className="aspect-[4/3] w-full" />
        <span
          className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold text-white ${
            conditionColors[vehicle.condition] ?? "bg-ink-600"
          }`}
        >
          {vehicle.condition}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={href}>
          <h3 className="text-lg font-bold text-ink-900 transition-colors group-hover:text-brand-700">
            {title}
          </h3>
        </Link>

        {vehicle.warranty && (
          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-success-600">
            <ShieldCheck className="h-4 w-4" />
            {vehicle.warranty}
          </p>
        )}

        <div className="mt-3 flex items-center gap-6 text-sm text-ink-600">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-ink-400" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-ink-400" />
            {formatMileage(vehicle.mileage)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-ink-500">{vehicle.description}</p>

        <div className="mt-4 flex items-end justify-between">
          <span className="text-2xl font-extrabold text-brand-700">
            {formatMoney(vehicle.price)}
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-success-600">
            <DollarSign className="h-4 w-4" />
            No Credit Check
          </span>
        </div>
        {vehicle.down_payment != null && (
          <p className="mt-1 text-sm text-ink-500">
            Down payment: {formatMoney(vehicle.down_payment)}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <Link href={href} className="btn-primary w-full">
            View Details
          </Link>
          <VehicleActions
            vehicle={{
              id: vehicle.id,
              title,
              price: vehicle.price,
              down_payment: vehicle.down_payment,
              vin: vehicle.vin,
            }}
          />
        </div>
      </div>
    </article>
  );
}
