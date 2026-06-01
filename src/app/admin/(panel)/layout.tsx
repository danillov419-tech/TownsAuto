import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, PlusCircle, Inbox, ExternalLink, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signOutAction } from "../actions";
import { Logo } from "@/components/logo";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vehicles/new", label: "Add Vehicle", icon: PlusCircle },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-ink-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-200 bg-white p-5 lg:flex">
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:text-ink-900"
          >
            <ExternalLink className="h-5 w-5" />
            View Site
          </Link>
        </nav>
        <form action={signOutAction}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </form>
      </aside>

      <div className="flex-1">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-ink-200 bg-white px-4 py-3 lg:hidden">
          <Logo />
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="btn-ghost p-2" title={item.label}>
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
            <form action={signOutAction}>
              <button type="submit" className="btn-ghost p-2" title="Sign out">
                <LogOut className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="p-5 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
