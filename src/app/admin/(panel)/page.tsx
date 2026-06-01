import Link from "next/link";
import { PlusCircle, Pencil, Star, CheckCircle2, AlertTriangle } from "lucide-react";
import { getAllVehiclesForAdmin } from "@/lib/vehicles";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { formatMileage, formatMoney, vehicleTitle } from "@/lib/format";
import { DeleteVehicleButton } from "@/components/admin/delete-vehicle-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
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

      <div className="card mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Mileage</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-ink-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 font-medium text-ink-900">
                      {v.is_featured && <Star className="h-4 w-4 fill-accent-400 text-accent-400" />}
                      {vehicleTitle(v)}
                    </div>
                    <div className="text-xs text-ink-400">{v.body_type} · {v.condition}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-700">{formatMoney(v.price)}</td>
                  <td className="px-4 py-3 text-ink-600">{formatMileage(v.mileage)}</td>
                  <td className="px-4 py-3">
                    {v.is_sold ? (
                      <span className="rounded-md bg-ink-200 px-2 py-1 text-xs font-medium text-ink-700">Sold</span>
                    ) : (
                      <span className="rounded-md bg-success-600/10 px-2 py-1 text-xs font-medium text-success-700">Available</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/vehicles/${v.id}/edit`} className="btn-outline px-3 py-1.5 text-xs">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteVehicleButton id={v.id} label={vehicleTitle(v)} />
                    </div>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-ink-500">
                    No vehicles yet. Click “Add Vehicle” to create your first listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
