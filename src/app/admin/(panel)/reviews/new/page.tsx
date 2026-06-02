import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReviewForm } from "@/components/admin/review-form";

export default function NewReviewPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/reviews" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" />
        Back to reviews
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-ink-900">Add Review</h1>
      <p className="text-sm text-ink-500">Add a customer testimonial.</p>
      <div className="mt-6">
        <ReviewForm />
      </div>
    </div>
  );
}
