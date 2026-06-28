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
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl">
        <h1 className="text-4xl font-normal tracking-wide text-white">Welcome to Admin</h1>
        <p className="mt-3 text-slate-400">
          Manage your wedding invitations and RSVPs
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/create-wedding"
          className="group rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 hover:bg-slate-800 transition shadow-xl"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition">
            <Plus size={24} />
          </div>
          <h3 className="text-lg font-semibold text-white">Create Wedding</h3>
          <p className="mt-2 text-sm text-slate-400">
            Set up a new wedding invitation
          </p>
        </Link>

        <Link
          href="/admin/weddings"
          className="group rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 hover:bg-slate-800 transition shadow-xl"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition">
            <Settings size={24} />
          </div>
          <h3 className="text-lg font-semibold text-white">Manage Weddings</h3>
          <p className="mt-2 text-sm text-slate-400">
            View and manage all weddings
          </p>
        </Link>
      </div>

      {/* Info */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl">
        <h3 className="font-semibold text-white text-lg">Getting Started</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-400">
          <li className="flex items-center gap-3"><span className="text-blue-400">✓</span> Create a new wedding using the form</li>
          <li className="flex items-center gap-3"><span className="text-blue-400">✓</span> Share the invitation link with guests</li>
          <li className="flex items-center gap-3"><span className="text-blue-400">✓</span> Manage RSVPs in the RSVP dashboard</li>
          <li className="flex items-center gap-3"><span className="text-blue-400">✓</span> Set up seating arrangements</li>
          <li className="flex items-center gap-3"><span className="text-blue-400">✓</span> Export data for your vendor coordination</li>
        </ul>
      </div>
    </div>
  );
}
