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
      <div className="min-h-dvh bg-stone-50">
        {/* Header */}
        <header className="border-b border-stone-200 bg-white px-4 py-4 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="/admin"
                  className="text-lg font-semibold text-stone-900 hover:text-blue-600"
                >
                  Admin Panel
                </Link>
                <p className="mt-0.5 text-xs text-stone-400">Manage weddings</p>
              </div>
              <AdminLogoutButton />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </AdminAuthGate>
  );
}
