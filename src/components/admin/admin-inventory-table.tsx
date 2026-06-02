"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Star, Search } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { formatMileage, formatMoney, vehicleTitle } from "@/lib/format";
import { DeleteVehicleButton } from "./delete-vehicle-button";

export function AdminInventoryTable({ vehicles }: { vehicles: Vehicle[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter((v) =>
      `${vehicleTitle(v)} ${v.body_type} ${v.condition} ${v.vin ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [vehicles, query]);

  return (
    <div>
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search inventory…"
          className="input py-2 pl-10"
        />
      </div>

      <div className="card mt-4 overflow-hidden">
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
              {filtered.map((v) => (
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
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-ink-500">
                    {vehicles.length === 0
                      ? "No vehicles yet. Click “Add Vehicle” to create your first listing."
                      : "No vehicles match your search."}
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
