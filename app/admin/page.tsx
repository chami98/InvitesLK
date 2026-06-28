import Link from "next/link";
import { Plus, Settings } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - InvitesLK",
  robots: "noindex,nofollow",
};

export default async function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-stone-900">Welcome to Admin</h1>
        <p className="mt-2 text-stone-600">
          Manage your wedding invitations and RSVPs
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/create-wedding"
          className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 hover:shadow-lg transition"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white mb-3">
            <Plus size={20} />
          </div>
          <h3 className="text-lg font-semibold text-stone-900">Create Wedding</h3>
          <p className="mt-1 text-sm text-stone-600">
            Set up a new wedding invitation
          </p>
        </Link>

        <Link
          href="/admin/weddings"
          className="rounded-xl border border-stone-200 bg-white p-6 hover:shadow-lg transition"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-stone-200 text-stone-700 mb-3">
            <Settings size={20} />
          </div>
          <h3 className="text-lg font-semibold text-stone-900">Manage Weddings</h3>
          <p className="mt-1 text-sm text-stone-600">
            View and manage all weddings
          </p>
        </Link>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <h3 className="font-semibold text-stone-900">Getting Started</h3>
        <ul className="mt-3 space-y-2 text-sm text-stone-600">
          <li>✓ Create a new wedding using the form</li>
          <li>✓ Share the invitation link with guests</li>
          <li>✓ Manage RSVPs in the RSVP dashboard</li>
          <li>✓ Set up seating arrangements</li>
          <li>✓ Export data for your vendor coordination</li>
        </ul>
      </div>
    </div>
  );
}
