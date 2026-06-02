import Link from "next/link";
import { PlusCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { getAllVehiclesForAdmin } from "@/lib/vehicles";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminInventoryTable } from "@/components/admin/admin-inventory-table";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const vehicles = await getAllVehiclesForAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Inventory</h1>
          <p className="text-sm text-ink-500">{vehicles.length} vehicles</p>
        </div>
        <Link href="/admin/vehicles/new" className="btn-primary">
          <PlusCircle className="h-4 w-4" />
          Add Vehicle
        </Link>
      </div>

      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-success-600/10 p-3 text-sm text-success-700">
          <CheckCircle2 className="h-4 w-4" />
          Vehicle saved successfully.
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Supabase isn&apos;t connected, so you&apos;re viewing read-only sample
            data. Add your Supabase keys to <code>.env.local</code> to add, edit,
            and save real inventory.
          </span>
        </div>
      )}

      <div className="mt-6">
        <AdminInventoryTable vehicles={vehicles} />
      </div>
    </div>
  );
}
