import { AdminAuthGate } from "@/components/AdminAuthGate";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGate>
      <div className="min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Decorative gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <header className="relative border-b border-slate-700/50 bg-slate-900/80 backdrop-blur px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="/admin"
                  className="text-xl font-semibold text-white hover:text-blue-400 transition"
                >
                  Admin Panel
                </Link>
                <p className="mt-1 text-xs text-slate-400">Manage weddings</p>
              </div>
              <AdminLogoutButton />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-8">
          {children}
        </main>
      </div>
    </AdminAuthGate>
  );
}
