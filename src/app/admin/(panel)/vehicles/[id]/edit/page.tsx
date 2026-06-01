import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getVehicleById } from "@/lib/vehicles";
import { vehicleTitle } from "@/lib/format";
import { VehicleForm } from "@/components/admin/vehicle-form";

export const dynamic = "force-dynamic";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" />
        Back to inventory
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-ink-900">Edit Vehicle</h1>
      <p className="text-sm text-ink-500">{vehicleTitle(vehicle)}</p>
      <div className="mt-6">
        <VehicleForm vehicle={vehicle} />
      </div>
    </div>
  );
}
