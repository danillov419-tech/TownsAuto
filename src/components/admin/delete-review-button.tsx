"use client";

import { Trash2 } from "lucide-react";
import { deleteReview } from "@/app/admin/actions";

export function DeleteReviewButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteReview}
      onSubmit={(e) => {
        if (!confirm(`Delete the review from "${name}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
    </form>
  );
}
