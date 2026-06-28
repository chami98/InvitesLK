"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Trash2, Eye } from "lucide-react";
import type { CoupleRecord } from "@/lib/supabase";

export default function AdminWeddingsPage() {
  const [weddings, setWeddings] = useState<CoupleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch("/api/couples");
        if (!res.ok) throw new Error("Failed to fetch weddings");

        const { couples } = await res.json();
        // Filter to only show database-created couples (not mock data)
        const dbCouples = couples.filter((c: any) => c.id && !c.gallery);
        setWeddings(dbCouples);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load weddings");
      } finally {
        setLoading(false);
      }
    };

    fetchWeddings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wedding?")) return;

    try {
      // This would need a DELETE endpoint - for now, just remove from UI
      alert("Delete functionality coming soon");
    } catch (err) {
      alert("Failed to delete wedding");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-stone-400">Loading weddings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Manage Weddings</h1>
          <p className="mt-1 text-sm text-stone-500">
            {weddings.length} wedding{weddings.length !== 1 ? "s" : ""} created
          </p>
        </div>
        <Link
          href="/admin/create-wedding"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create New
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Weddings List */}
      {weddings.length === 0 ? (
        <div className="rounded-xl border border-stone-200 bg-white px-6 py-12 text-center">
          <p className="text-stone-400">No weddings created yet</p>
          <Link
            href="/admin/create-wedding"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Create your first wedding →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {weddings.map((wedding) => (
            <div
              key={wedding.id}
              className="rounded-xl border border-stone-200 bg-white p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-stone-900">
                    {wedding.partner_a} &amp; {wedding.partner_b}
                  </h3>
                  <div className="mt-2 grid gap-2 text-sm text-stone-500 sm:grid-cols-2">
                    <p>📅 {wedding.date}</p>
                    <p>📍 {wedding.venue}</p>
                    <p>🔗 /{wedding.slug}</p>
                    <p>🎨 Template {wedding.template_id}</p>
                  </div>
                  <p className="mt-2 text-xs text-stone-400">
                    Created {new Date(wedding.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`/${wedding.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    title="View invitation"
                  >
                    <Eye size={16} />
                  </a>
                  <a
                    href={`/rsvp/${wedding.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    title="View RSVP dashboard"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => handleDelete(wedding.id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    title="Delete wedding"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
