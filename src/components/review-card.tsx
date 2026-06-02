import type { Review } from "@/lib/types";
import { ReviewStars } from "./review-stars";
import { ReviewAvatar } from "./review-avatar";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card flex h-full flex-col items-center p-8 text-center">
      <ReviewAvatar name={review.name} src={review.avatar_url} size={88} />
      <ReviewStars rating={review.rating} className="mt-5" />
      <blockquote className="mt-4 flex-1 italic text-ink-700">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6">
        <p className="font-bold text-ink-900">{review.name}</p>
        {review.location && <p className="text-sm text-ink-500">{review.location}</p>}
      </figcaption>
    </figure>
  );
}
