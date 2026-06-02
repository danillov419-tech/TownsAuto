import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { CsvImport } from "@/components/admin/csv-import";

export default function ImportInventoryPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/inventory" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" />
        Back to inventory
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-ink-900">Import Inventory</h1>
      <p className="text-sm text-ink-500">
        Bulk-add vehicles from a CSV file.
      </p>

      {!isSupabaseConfigured && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Connect Supabase to import inventory.</span>
        </div>
      )}

      <div className="mt-6">
        <CsvImport />
      </div>
    </div>
  );
}
