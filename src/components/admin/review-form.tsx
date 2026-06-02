"use client";

import { useActionState, useState } from "react";
import { Upload, X, Save, AlertCircle, Loader2, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { saveReview, type AdminFormState } from "@/app/admin/actions";
import { ReviewAvatar } from "@/components/review-avatar";
import type { Review } from "@/lib/types";

export function ReviewForm({ review }: { review?: Review }) {
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(
    saveReview,
    null
  );
  const [avatar, setAvatar] = useState<string | null>(review?.avatar_url ?? null);
  const [rating, setRating] = useState<number>(review?.rating ?? 5);
  const [name, setName] = useState(review?.name ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    if (!isSupabaseConfigured) {
      setUploadError("Connect Supabase to upload photos.");
      return;
    }
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
    const { error } = await supabase.storage
      .from("review-avatars")
      .upload(path, file, { upsert: false });
    if (error) {
      setUploadError(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("review-avatars").getPublicUrl(path);
    setAvatar(data.publicUrl);
    setUploading(false);
    e.target.value = "";
  }

  return (
    <form action={formAction} className="space-y-6">
      {review && <input type="hidden" name="id" value={review.id} />}
      <input type="hidden" name="avatar_url" value={avatar ?? ""} />
      <input type="hidden" name="rating" value={rating} />

      <section className="card p-6">
        <h2 className="text-lg font-bold text-ink-900">Reviewer Photo</h2>
        <p className="mt-1 text-sm text-ink-500">
          Optional. If no photo is added, the reviewer&apos;s initials are shown.
        </p>
        <div className="mt-4 flex items-center gap-5">
          <div className="relative">
            <ReviewAvatar name={name || "New Review"} src={avatar} size={80} />
            {avatar && (
              <button
                type="button"
                onClick={() => setAvatar(null)}
                className="absolute -right-1 -top-1 rounded-full bg-black/70 p-1 text-white"
                aria-label="Remove photo"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <label className="btn-outline cursor-pointer">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Uploading…" : "Upload photo"}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>
        {uploadError && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {uploadError}
          </p>
        )}
      </section>

      <section className="card p-6">
        <h2 className="text-lg font-bold text-ink-900">Review Details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="r-name">Customer name *</label>
            <input
              id="r-name"
              name="name"
              className="input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="label" htmlFor="r-location">Location</label>
            <input id="r-location" name="location" className="input" defaultValue={review?.location ?? ""} placeholder="Nashville, TN" />
          </div>
        </div>

        <div className="mt-4">
          <label className="label">Rating</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                aria-label={`${i + 1} star${i ? "s" : ""}`}
                className="p-0.5"
              >
                <Star
                  className={`h-7 w-7 ${
                    i < rating ? "fill-accent-400 text-accent-400" : "text-ink-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="label" htmlFor="r-quote">Review *</label>
          <textarea id="r-quote" name="quote" rows={4} className="input" required defaultValue={review?.quote ?? ""} placeholder="What did the customer say?" />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="r-sort">Sort order</label>
            <input id="r-sort" name="sort_order" type="number" className="input" defaultValue={review?.sort_order ?? 0} />
            <p className="mt-1 text-xs text-ink-400">Lower numbers appear first.</p>
          </div>
          <div className="flex flex-col justify-center gap-3 pt-2">
            <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
              <input type="checkbox" name="is_published" defaultChecked={review ? review.is_published : true} className="h-4 w-4 rounded border-ink-300" />
              Published (visible on site)
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
              <input type="checkbox" name="is_featured" defaultChecked={review?.is_featured} className="h-4 w-4 rounded border-ink-300" />
              Feature on homepage
            </label>
          </div>
        </div>
      </section>

      {state && !state.ok && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {state.message}
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={pending || uploading}>
          <Save className="h-4 w-4" />
          {pending ? "Saving…" : "Save Review"}
        </button>
      </div>
    </form>
  );
}
