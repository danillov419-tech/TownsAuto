"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Upload, X, Save, AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { saveVehicle, type AdminFormState } from "@/app/admin/actions";
import type { Vehicle } from "@/lib/types";

const conditions = ["Excellent", "Very Good", "Good", "Fair"];
const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van", "Convertible", "Wagon"];
const fuels = ["Gasoline", "Diesel", "Hybrid", "Electric"];
const transmissions = ["Automatic", "Manual"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

export function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(
    saveVehicle,
    null
  );
  const [images, setImages] = useState<string[]>(vehicle?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadError(null);

    if (!isSupabaseConfigured) {
      setUploadError("Connect Supabase to upload photos.");
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
      const { error } = await supabase.storage
        .from("vehicle-photos")
        .upload(path, file, { upsert: false });
      if (error) {
        setUploadError(error.message);
        continue;
      }
      const { data } = supabase.storage.from("vehicle-photos").getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    setImages((prev) => [...prev, ...uploaded]);
    setUploading(false);
    e.target.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((i) => i !== url));
  }

  return (
    <form action={formAction} className="space-y-8">
      {vehicle && <input type="hidden" name="id" value={vehicle.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {/* Photos */}
      <section className="card p-6">
        <h2 className="text-lg font-bold text-ink-900">Photos</h2>
        <p className="mt-1 text-sm text-ink-500">The first photo is used as the cover.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((url) => (
            <div key={url} className="group relative aspect-square overflow-hidden rounded-xl border border-ink-200">
              <Image src={url} alt="Vehicle" fill sizes="25vw" className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-300 text-ink-400 hover:border-brand-500 hover:text-brand-600">
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Upload className="h-6 w-6" />
            )}
            <span className="text-xs font-medium">{uploading ? "Uploading…" : "Add photos"}</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
          </label>
        </div>
        {uploadError && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {uploadError}
          </p>
        )}
      </section>

      {/* Basics */}
      <section className="card p-6">
        <h2 className="text-lg font-bold text-ink-900">Vehicle Details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Year *">
            <input name="year" type="number" className="input" defaultValue={vehicle?.year} required />
          </Field>
          <Field label="Make *">
            <input name="make" className="input" defaultValue={vehicle?.make} required />
          </Field>
          <Field label="Model *">
            <input name="model" className="input" defaultValue={vehicle?.model} required />
          </Field>
          <Field label="Trim">
            <input name="trim" className="input" defaultValue={vehicle?.trim ?? ""} />
          </Field>
          <Field label="Body type">
            <select name="body_type" className="input" defaultValue={vehicle?.body_type ?? "Sedan"}>
              {bodyTypes.map((b) => <option key={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Condition">
            <select name="condition" className="input" defaultValue={vehicle?.condition ?? "Very Good"}>
              {conditions.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Price (USD) *">
            <input name="price" type="number" className="input" defaultValue={vehicle?.price} required />
          </Field>
          <Field label="Down payment (USD)">
            <input name="down_payment" type="number" className="input" defaultValue={vehicle?.down_payment ?? ""} />
          </Field>
          <Field label="Mileage">
            <input name="mileage" type="number" className="input" defaultValue={vehicle?.mileage} />
          </Field>
          <Field label="Fuel type">
            <select name="fuel_type" className="input" defaultValue={vehicle?.fuel_type ?? "Gasoline"}>
              {fuels.map((f) => <option key={f}>{f}</option>)}
            </select>
          </Field>
          <Field label="Transmission">
            <select name="transmission" className="input" defaultValue={vehicle?.transmission ?? "Automatic"}>
              {transmissions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Drivetrain">
            <input name="drivetrain" className="input" defaultValue={vehicle?.drivetrain ?? ""} placeholder="FWD / AWD / 4WD" />
          </Field>
          <Field label="Exterior color">
            <input name="exterior_color" className="input" defaultValue={vehicle?.exterior_color ?? ""} />
          </Field>
          <Field label="Interior color">
            <input name="interior_color" className="input" defaultValue={vehicle?.interior_color ?? ""} />
          </Field>
          <Field label="VIN">
            <input name="vin" className="input" defaultValue={vehicle?.vin ?? ""} />
          </Field>
          <Field label="Warranty">
            <input name="warranty" className="input" defaultValue={vehicle?.warranty ?? "90-Day Warranty"} />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Features (comma-separated)">
            <input
              name="features"
              className="input"
              defaultValue={vehicle?.features.join(", ") ?? ""}
              placeholder="Apple CarPlay, Sunroof, Backup Camera"
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Description">
            <textarea name="description" rows={5} className="input" defaultValue={vehicle?.description ?? ""} />
          </Field>
        </div>

        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
            <input type="checkbox" name="is_featured" defaultChecked={vehicle?.is_featured} className="h-4 w-4 rounded border-ink-300" />
            Feature on homepage
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
            <input type="checkbox" name="is_sold" defaultChecked={vehicle?.is_sold} className="h-4 w-4 rounded border-ink-300" />
            Mark as sold
          </label>
        </div>
      </section>

      {state && !state.ok && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {state.message}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button type="submit" className="btn-primary" disabled={pending || uploading}>
          <Save className="h-4 w-4" />
          {pending ? "Saving…" : "Save Vehicle"}
        </button>
      </div>
    </form>
  );
}
