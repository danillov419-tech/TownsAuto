import Link from "next/link";
import {
  Car,
  CheckCircle2,
  Star,
  Inbox,
  FileText,
  PlusCircle,
  ArrowRight,
  AlertTriangle,
  Tag,
} from "lucide-react";
import { getAllVehiclesForAdmin } from "@/lib/vehicles";
import { getAllReviewsForAdmin } from "@/lib/reviews";
import { getLeads, getApplications } from "@/lib/leads";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

const leadTypeLabels: Record<string, string> = {
  contact: "Question",
  reserve: "Reservation",
  buy: "Purchase",
  test_drive: "Test Drive",
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function StatCard({
  label,
  value,
  icon: Icon,
  href,
  accent,
}: {
  label: string;
  value: number;
  icon: typeof Car;
  href: string;
  accent: string;
}) {
  return (
    <Link href={href} className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-2xl font-extrabold text-ink-900">{value}</p>
        <p className="text-sm text-ink-500">{label}</p>
      </div>
    </Link>
  );
}

export default async function AdminOverview() {
  const [vehicles, reviews, leads, applications] = await Promise.all([
    getAllVehiclesForAdmin(),
    getAllReviewsForAdmin(),
    getLeads(),
    getApplications(),
  ]);

  const available = vehicles.filter((v) => !v.is_sold).length;
  const sold = vehicles.filter((v) => v.is_sold).length;
  const featured = vehicles.filter((v) => v.is_featured).length;
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Dashboard</h1>
          <p className="text-sm text-ink-500">
            Welcome back — here&apos;s what&apos;s happening at your dealership.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/vehicles/new" className="btn-primary">
            <PlusCircle className="h-4 w-4" />
            Add Vehicle
          </Link>
          <Link href="/admin/reviews/new" className="btn-outline">
            <Star className="h-4 w-4" />
            Add Review
          </Link>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Supabase isn&apos;t connected, so these numbers reflect sample data.
            Add your Supabase keys to manage real data.
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Vehicles" value={vehicles.length} icon={Car} href="/admin/inventory" accent="bg-brand-50 text-brand-600" />
        <StatCard label="Available" value={available} icon={CheckCircle2} href="/admin/inventory" accent="bg-success-600/10 text-success-600" />
        <StatCard label="Sold" value={sold} icon={Tag} href="/admin/inventory" accent="bg-ink-100 text-ink-600" />
        <StatCard label="Featured" value={featured} icon={Star} href="/admin/inventory" accent="bg-accent-400/15 text-accent-600" />
        <StatCard label="Reviews" value={reviews.length} icon={Star} href="/admin/reviews" accent="bg-brand-50 text-brand-600" />
        <StatCard label="Leads" value={leads.length} icon={Inbox} href="/admin/leads" accent="bg-success-600/10 text-success-600" />
      </div>

      {/* Recent leads + financing */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink-900">Recent Inquiries</h2>
            <Link href="/admin/leads" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="mt-4 text-sm text-ink-500">
              No inquiries yet. Customer messages and reservations will appear here.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink-100">
              {recentLeads.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink-900">{l.name}</p>
                    <p className="truncate text-sm text-ink-500">
                      {l.vehicle_label ?? l.email ?? l.phone}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">
                      {leadTypeLabels[l.type] ?? l.type}
                    </span>
                    <span className="text-xs text-ink-400">{fmtDate(l.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card flex flex-col p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-ink-900">{applications.length}</p>
              <p className="text-sm text-ink-500">Financing Requests</p>
            </div>
          </div>
          <p className="mt-4 flex-1 text-sm text-ink-500">
            Pre-qualification requests submitted through the financing page.
          </p>
          <Link href="/admin/leads" className="btn-outline mt-4 w-full">
            View Requests
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
