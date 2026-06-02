import { Mail, Phone, Car, AlertTriangle } from "lucide-react";
import { getApplications, getLeads } from "@/lib/leads";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = {
  contact: "Question",
  reserve: "Reservation",
  buy: "Purchase",
  finance: "Financing",
  test_drive: "Test Drive",
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function LeadsPage() {
  const [leads, applications] = await Promise.all([getLeads(), getApplications()]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Leads &amp; Applications</h1>
        <p className="text-sm text-ink-500">Customer inquiries and financing requests.</p>
      </div>

      {!isSupabaseConfigured && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Connect Supabase to start collecting and viewing leads.</span>
        </div>
      )}

      {/* Inquiries */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-ink-900">
          Inquiries <span className="text-ink-400">({leads.length})</span>
        </h2>
        {leads.length === 0 ? (
          <p className="card p-6 text-sm text-ink-500">No inquiries yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {leads.map((l) => (
              <div key={l.id} className="card p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700">
                    {typeLabels[l.type] ?? l.type}
                  </span>
                  <span className="text-xs text-ink-400">{fmtDate(l.created_at)}</span>
                </div>
                <p className="mt-3 font-semibold text-ink-900">{l.name}</p>
                <div className="mt-1 space-y-1 text-sm text-ink-600">
                  {l.email && (
                    <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 hover:text-brand-700">
                      <Mail className="h-4 w-4" /> {l.email}
                    </a>
                  )}
                  {l.phone && (
                    <a href={`tel:${l.phone}`} className="flex items-center gap-1.5 hover:text-brand-700">
                      <Phone className="h-4 w-4" /> {l.phone}
                    </a>
                  )}
                  {l.vehicle_label && (
                    <p className="flex items-center gap-1.5 text-ink-500">
                      <Car className="h-4 w-4" /> {l.vehicle_label}
                    </p>
                  )}
                </div>
                {l.message && <p className="mt-3 text-sm text-ink-600">{l.message}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Financing */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-ink-900">
          Financing Requests <span className="text-ink-400">({applications.length})</span>
        </h2>
        {applications.length === 0 ? (
          <p className="card p-6 text-sm text-ink-500">No financing requests yet.</p>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Employment</th>
                    <th className="px-4 py-3">Income</th>
                    <th className="px-4 py-3">Vehicle</th>
                    <th className="px-4 py-3">Down</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {applications.map((a) => (
                    <tr key={a.id} className="hover:bg-ink-50">
                      <td className="px-4 py-3 font-medium text-ink-900">{a.full_name}</td>
                      <td className="px-4 py-3 text-ink-600">
                        <a href={`mailto:${a.email}`} className="block hover:text-brand-700">{a.email}</a>
                        <a href={`tel:${a.phone}`} className="block hover:text-brand-700">{a.phone}</a>
                      </td>
                      <td className="px-4 py-3 text-ink-600">{a.employment_status}</td>
                      <td className="px-4 py-3 text-ink-600">{a.annual_income != null ? formatMoney(a.annual_income) : "—"}</td>
                      <td className="px-4 py-3 text-ink-600">{a.desired_vehicle ?? "—"}</td>
                      <td className="px-4 py-3 text-ink-600">{a.down_payment_budget != null ? formatMoney(a.down_payment_budget) : "—"}</td>
                      <td className="px-4 py-3 text-xs text-ink-400">{fmtDate(a.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
