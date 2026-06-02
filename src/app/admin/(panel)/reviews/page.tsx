import Link from "next/link";
import { PlusCircle, Pencil, Star, CheckCircle2, AlertTriangle, EyeOff } from "lucide-react";
import { getAllReviewsForAdmin } from "@/lib/reviews";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ReviewAvatar } from "@/components/review-avatar";
import { DeleteReviewButton } from "@/components/admin/delete-review-button";

export const dynamic = "force-dynamic";

export default async function AdminReviews({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const reviews = await getAllReviewsForAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Reviews</h1>
          <p className="text-sm text-ink-500">{reviews.length} reviews</p>
        </div>
        <Link href="/admin/reviews/new" className="btn-primary">
          <PlusCircle className="h-4 w-4" />
          Add Review
        </Link>
      </div>

      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-success-600/10 p-3 text-sm text-success-700">
          <CheckCircle2 className="h-4 w-4" />
          Review saved successfully.
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Supabase isn&apos;t connected, so you&apos;re viewing read-only sample
            reviews. Add your Supabase keys to manage real reviews.
          </span>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="card flex items-start gap-4 p-4">
            <ReviewAvatar name={r.name} src={r.avatar_url} size={52} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ink-900">{r.name}</span>
                {r.location && <span className="text-sm text-ink-400">· {r.location}</span>}
                {r.is_featured && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-accent-400/15 px-2 py-0.5 text-xs font-medium text-accent-600">
                    <Star className="h-3 w-3 fill-accent-400 text-accent-400" /> Featured
                  </span>
                )}
                {!r.is_published && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-ink-200 px-2 py-0.5 text-xs font-medium text-ink-600">
                    <EyeOff className="h-3 w-3" /> Hidden
                  </span>
                )}
              </div>
              <div className="mt-1 flex text-accent-400">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent-400" />
                ))}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-ink-600">{r.quote}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/admin/reviews/${r.id}/edit`} className="btn-outline px-3 py-1.5 text-xs">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Link>
              <DeleteReviewButton id={r.id} name={r.name} />
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="card p-12 text-center text-ink-500">
            No reviews yet. Click “Add Review” to create your first one.
          </div>
        )}
      </div>
    </div>
  );
}
