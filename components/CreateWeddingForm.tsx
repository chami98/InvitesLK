"use client";

import { useState } from "react";
import { WEDDING_TEMPLATES } from "@/lib/data";
import Link from "next/link";

function formatDateForDisplay(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate + "T00:00:00");
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function CreateWeddingForm() {
  const [formData, setFormData] = useState({
    partnerA: "",
    partnerB: "",
    date: "", // ISO format: YYYY-MM-DD
    venue: "",
    templateId: "1",
    rsvpPin: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Format date from ISO (YYYY-MM-DD) to display format (Monday, June 14, 2026)
      const formattedDate = formatDateForDisplay(formData.date);

      const res = await fetch("/api/couples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: formattedDate,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create wedding");
      }

      const { couple } = await res.json();
      setSuccess(`✅ Wedding created! Slug: ${couple.slug}`);
      setFormData({
        partnerA: "",
        partnerB: "",
        date: "",
        venue: "",
        templateId: "1",
        rsvpPin: "",
      });

      // Redirect after success
      setTimeout(() => {
        window.location.href = `/${couple.slug}`;
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl">
      <h2 className="mb-2 text-3xl font-normal tracking-wide text-white">Create Wedding</h2>
      <p className="mb-8 text-slate-400">
        Set up a new wedding invitation with your details.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Partner Names */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Partner A Name *
            </label>
            <input
              type="text"
              name="partnerA"
              value={formData.partnerA}
              onChange={handleChange}
              placeholder="e.g., John"
              required
              className="mt-2 w-full rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Partner B Name *
            </label>
            <input
              type="text"
              name="partnerB"
              value={formData.partnerB}
              onChange={handleChange}
              placeholder="e.g., Jane"
              required
              className="mt-2 w-full rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition"
            />
          </div>
        </div>

        {/* Date and Venue */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Wedding Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition"
            />
            {formData.date && (
              <p className="mt-2 text-xs text-slate-400">
                Preview: {formatDateForDisplay(formData.date)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Venue *
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g., Galadari Hotel, Colombo"
              required
              className="mt-2 w-full rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition"
            />
          </div>
        </div>

        {/* Template Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Invitation Template *
          </label>
          <select
            name="templateId"
            value={formData.templateId}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition"
          >
            <option value="">Select a template...</option>
            {Object.entries(WEDDING_TEMPLATES).map(([id, template]) => (
              <option key={id} value={id}>
                {template.name} (Template {id})
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-slate-400">
            Choose the design and color scheme for your invitation
          </p>
        </div>

        {/* RSVP PIN */}
        <div>
          <label className="block text-sm font-medium text-slate-300">
            RSVP Dashboard PIN *
          </label>
          <input
            type="text"
            name="rsvpPin"
            value={formData.rsvpPin}
            onChange={handleChange}
            placeholder="e.g., 1234"
            required
            minLength={4}
            className="mt-2 w-full rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition"
          />
          <p className="mt-2 text-xs text-slate-400">
            Minimum 4 characters. Use this to access your RSVP dashboard.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-4 py-3 text-sm font-medium text-white transition shadow-lg hover:shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Wedding"}
          </button>
          <Link
            href="/admin"
            className="rounded-lg border border-slate-600/50 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Info Box */}
      <div className="mt-8 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
        <h3 className="text-sm font-semibold text-blue-400">After Creating</h3>
        <ul className="mt-3 space-y-2 text-sm text-blue-300">
          <li className="flex items-center gap-2"><span>✓</span> Your invitation will be live at /{formData.partnerA && formData.partnerB ? `${formData.partnerA.toLowerCase()}-${formData.partnerB.toLowerCase()}` : "[slug]"}</li>
          <li className="flex items-center gap-2"><span>✓</span> Share the invitation URL with guests to collect RSVPs</li>
          <li className="flex items-center gap-2"><span>✓</span> Use your PIN to access the RSVP dashboard</li>
          <li className="flex items-center gap-2"><span>✓</span> Set up seating arrangements from the RSVP dashboard</li>
        </ul>
      </div>
    </div>
  );
}
