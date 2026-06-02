import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getReviewById } from "@/lib/reviews";
import { ReviewForm } from "@/components/admin/review-form";

export const dynamic = "force-dynamic";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await getReviewById(id);
  if (!review) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/reviews" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" />
        Back to reviews
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-ink-900">Edit Review</h1>
      <p className="text-sm text-ink-500">{review.name}</p>
      <div className="mt-6">
        <ReviewForm review={review} />
      </div>
    </div>
  );
}
