"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./vehicle-card";

type SortKey = "newest" | "price-asc" | "price-desc" | "mileage-asc";

export function InventoryBrowser({ vehicles }: { vehicles: Vehicle[] }) {
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const makes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.make))).sort(),
    [vehicles]
  );
  const bodyTypes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.body_type))).sort(),
    [vehicles]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const max = maxPrice ? Number(maxPrice) : Infinity;

    const result = vehicles.filter((v) => {
      const haystack =
        `${v.year} ${v.make} ${v.model} ${v.trim ?? ""} ${v.body_type} ${v.description}`.toLowerCase();
      if (q && !haystack.includes(q)) return false;
      if (make && v.make !== make) return false;
      if (bodyType && v.body_type !== bodyType) return false;
      if (v.price > max) return false;
      return true;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "mileage-asc":
          return a.mileage - b.mileage;
        default:
          return b.created_at.localeCompare(a.created_at);
      }
    });

    return result;
  }, [vehicles, query, make, bodyType, maxPrice, sort]);

  const clearFilters = () => {
    setQuery("");
    setMake("");
    setBodyType("");
    setMaxPrice("");
    setSort("newest");
  };

  const hasActiveFilters = query || make || bodyType || maxPrice || sort !== "newest";

  return (
    <div>
      {/* Search bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by make, model, year, or keywords…"
          className="input py-3.5 pl-12 text-base"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="btn-outline"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <p className="text-sm text-ink-500">
          Showing <span className="font-semibold text-ink-900">{filtered.length}</span> of{" "}
          <span className="font-semibold text-ink-900">{vehicles.length}</span> available cars
        </p>
      </div>

      {showFilters && (
        <div className="mt-4 grid gap-4 rounded-2xl border border-ink-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="label">Make</label>
            <select className="input" value={make} onChange={(e) => setMake(e.target.value)}>
              <option value="">All makes</option>
              {makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Body type</label>
            <select className="input" value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
              <option value="">All types</option>
              {bodyTypes.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Max price</label>
            <select className="input" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
              <option value="">Any price</option>
              <option value="8000">Under $8,000</option>
              <option value="10000">Under $10,000</option>
              <option value="15000">Under $15,000</option>
              <option value="20000">Under $20,000</option>
            </select>
          </div>
          <div>
            <label className="label">Sort by</label>
            <select className="input" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="mileage-asc">Mileage: Low to High</option>
            </select>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <X className="h-4 w-4" />
          Clear filters
        </button>
      )}

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-ink-300 bg-white py-16 text-center">
          <p className="text-lg font-semibold text-ink-900">No vehicles match your search</p>
          <p className="mt-1 text-ink-500">Try adjusting or clearing your filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
