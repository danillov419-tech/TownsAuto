import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let email: string | undefined;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/admin/login");
    email = user.email ?? undefined;
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink-50 lg:flex-row">
      <AdminNav email={email} />
      <div className="flex-1">
        <div className="mx-auto max-w-6xl p-5 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
