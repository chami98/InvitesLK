"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Trash2, Eye, MessageCircle, Copy } from "lucide-react";
import type { CoupleRecord } from "@/lib/supabase";

export default function AdminWeddingsPage() {
  const [weddings, setWeddings] = useState<CoupleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

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

  const handleDelete = async (id: string, slug: string) => {
    const confirmed = confirm(
      `Are you sure you want to delete "${slug}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/couples?coupleId=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete wedding");
      }

      // Remove from UI
      setWeddings(weddings.filter((w) => w.id !== id));
    } catch (err) {
      alert(
        `Failed to delete wedding: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleWhatsAppShare = (slug: string, names: string) => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/${slug}`;
    const message = `🎉 You're invited to ${names}'s wedding! Check out our invitation: ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Loading weddings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal tracking-wide text-white">Manage Weddings</h1>
          <p className="mt-2 text-slate-400">
            {weddings.length} wedding{weddings.length !== 1 ? "s" : ""} created
          </p>
        </div>
        <Link
          href="/admin/create-wedding"
          className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-4 py-2 text-sm font-medium text-white transition shadow-lg hover:shadow-blue-500/20"
        >
          + Create New
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Weddings List */}
      {weddings.length === 0 ? (
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-8 py-16 text-center shadow-xl">
          <p className="text-slate-400">No weddings created yet</p>
          <Link
            href="/admin/create-wedding"
            className="mt-4 inline-block text-blue-400 hover:text-blue-300 transition"
          >
            Create your first wedding →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {weddings.map((wedding) => (
            <div
              key={wedding.id}
              className="group rounded-xl border border-slate-700/30 bg-slate-800/30 hover:bg-slate-800/60 p-4 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition">
                    {wedding.partner_a} &amp; {wedding.partner_b}
                  </h3>
                  <div className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                    <p>📅 {wedding.date}</p>
                    <p>📍 {wedding.venue}</p>
                    <p className="font-mono">🔗 /{wedding.slug}</p>
                    <p>🎨 Template {wedding.template_id}</p>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Created {new Date(wedding.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`/${wedding.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition"
                    title="View invitation"
                  >
                    <Eye size={16} />
                  </a>
                  <a
                    href={`/rsvp/${wedding.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition"
                    title="View RSVP dashboard"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => handleCopyLink(wedding.slug)}
                    className={`inline-flex items-center gap-1 rounded-lg p-2.5 transition ${
                      copiedSlug === wedding.slug
                        ? "text-green-400 bg-green-400/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                    }`}
                    title="Copy invitation link"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() =>
                      handleWhatsAppShare(
                        wedding.slug,
                        `${wedding.partner_a} & ${wedding.partner_b}`
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg p-2.5 text-slate-400 hover:text-green-500 hover:bg-green-500/10 transition"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(wedding.id, wedding.slug)}
                    className="inline-flex items-center gap-1 rounded-lg p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition"
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
