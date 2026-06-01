import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VehicleForm } from "@/components/admin/vehicle-form";

export default function NewVehiclePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" />
        Back to inventory
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-ink-900">Add Vehicle</h1>
      <p className="text-sm text-ink-500">Create a new listing for your inventory.</p>
      <div className="mt-6">
        <VehicleForm />
      </div>
    </div>
  );
}
