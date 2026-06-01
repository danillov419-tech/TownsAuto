import { CheckCircle2, AlertCircle } from "lucide-react";
import type { FormState } from "@/app/actions";

export function FormStatus({ state }: { state: FormState }) {
  if (!state) return null;
  return (
    <div
      className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
        state.ok
          ? "bg-success-600/10 text-success-700"
          : "bg-red-50 text-red-700"
      }`}
      role="status"
    >
      {state.ok ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{state.message}</span>
    </div>
  );
}
