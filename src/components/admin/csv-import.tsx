"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { importVehicles, type ImportState } from "@/app/admin/actions";

export function CsvImport() {
  const [state, formAction, pending] = useActionState<ImportState, FormData>(
    importVehicles,
    null
  );
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-bold text-ink-900">Upload a CSV</h2>
        <p className="mt-1 text-sm text-ink-500">
          Add many vehicles at once. Each row becomes a listing. Need the format?{" "}
          <Link href="/inventory-template.csv" className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700" download>
            <Download className="h-3.5 w-3.5" />
            Download template
          </Link>
        </p>

        <form action={formAction} className="mt-5 space-y-4">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink-300 px-6 py-10 text-center hover:border-brand-500 hover:bg-brand-50/40">
            {fileName ? (
              <>
                <FileSpreadsheet className="h-8 w-8 text-brand-600" />
                <span className="font-medium text-ink-800">{fileName}</span>
                <span className="text-xs text-ink-400">Click to choose a different file</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-8 w-8 text-ink-400" />
                <span className="font-medium text-ink-700">Choose a .csv file</span>
                <span className="text-xs text-ink-400">or drag it onto this box</span>
              </>
            )}
            <input
              type="file"
              name="file"
              accept=".csv,text/csv"
              required
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>

          {state && (
            <div
              className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
                state.ok ? "bg-success-600/10 text-success-700" : "bg-red-50 text-red-700"
              }`}
            >
              {state.ok ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <div>
                <p>{state.message}</p>
                {state.ok && (
                  <Link href="/admin/inventory" className="mt-1 inline-block font-medium underline">
                    View inventory →
                  </Link>
                )}
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={pending}>
            <UploadCloud className="h-4 w-4" />
            {pending ? "Importing…" : "Import Vehicles"}
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold text-ink-900">Tips</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-600">
          <li>• Build the CSV in Google Sheets or Excel, then export as CSV.</li>
          <li>• Required columns: <code>year</code>, <code>make</code>, <code>model</code>, <code>price</code>. Rows missing these are skipped.</li>
          <li>• In the <code>features</code> and <code>images</code> columns, separate multiple values with a pipe <code>|</code>.</li>
          <li>• <code>images</code> should be public URLs (e.g. from your <code>vehicle-photos</code> Storage bucket). Leave blank to add photos later.</li>
          <li>• <code>is_featured</code> / <code>is_sold</code> accept <code>true</code> or <code>false</code>.</li>
        </ul>
      </div>
    </div>
  );
}
