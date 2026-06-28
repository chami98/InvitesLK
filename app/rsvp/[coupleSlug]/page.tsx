import { RSVPPinGate } from "@/components/RSVPPinGate";
import { RSVPRefreshButton } from "@/components/RSVPRefreshButton";
import { getCoupleBySlug } from "@/lib/data";
import { supabase, type RSVPRow } from "@/lib/supabase";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ coupleSlug: string }> };

async function fetchCouple(coupleSlug: string) {
  // Check mock data first
  let couple = getCoupleBySlug(coupleSlug);
  if (couple) return couple;

  // Try database
  try {
    const { data } = await supabase
      .from("couples")
      .select("*")
      .eq("slug", coupleSlug)
      .single();

    if (data) {
      return {
        slug: data.slug,
        partnerA: data.partner_a,
        partnerB: data.partner_b,
        date: data.date,
        venue: data.venue,
        templateId: data.template_id,
        gallery: [],
        agenda: [],
        rsvpPin: data.rsvp_pin,
      };
    }
    return undefined;
  } catch (err) {
    console.error(`Error fetching couple ${coupleSlug}:`, err);
    return undefined;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { coupleSlug } = await params;
  const couple = await fetchCouple(coupleSlug);
  if (!couple) return { title: "RSVP Responses" };
  return { title: `RSVP — ${couple.partnerA} & ${couple.partnerB}` };
}

export default async function RSVPDashboardPage({ params }: PageProps) {
  const { coupleSlug } = await params;
  const couple = await fetchCouple(coupleSlug);
  if (!couple) notFound();

  const { data: rows, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .eq("couple_slug", coupleSlug)
    .order("submitted_at", { ascending: false });

  const responses: RSVPRow[] = rows ?? [];

  const attending = responses.filter((r) => r.attendance === "attending");
  const notAttending = responses.filter((r) => r.attendance === "not_attending");
  const maybe = responses.filter((r) => r.attendance === "maybe");
  const headcount =
    attending.reduce((s, r) => s + r.party_size, 0) +
    maybe.reduce((s, r) => s + r.party_size, 0);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RSVPPinGate
        pin={couple.rsvpPin}
        coupleSlug={coupleSlug}
        coupleNames={`${couple.partnerA} & ${couple.partnerB}`}
      >
        <div>
      {/* Decorative gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-700/50 bg-slate-900/80 backdrop-blur px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/${coupleSlug}`}
            className="text-xs text-slate-400 transition hover:text-slate-300"
          >
            ← Back to invitation
          </Link>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-normal tracking-wide text-white">
                {couple.partnerA} &amp; {couple.partnerB}
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {couple.date} &middot; {couple.venue}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/rsvp/${coupleSlug}/seating`}
                className="flex items-center gap-2 rounded-lg border border-slate-600/50 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition"
              >
                <Users size={16} />
                Seating
              </Link>
              <RSVPRefreshButton />
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-3xl px-4 py-8 sm:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Attending" value={attending.length} pill="bg-green-500/20 text-green-400" dot="bg-green-500" />
          <StatCard label="Not attending" value={notAttending.length} pill="bg-red-500/20 text-red-400" dot="bg-red-500" />
          <StatCard label="Maybe" value={maybe.length} pill="bg-amber-500/20 text-amber-400" dot="bg-amber-500" />
          <StatCard label="Total guests" value={headcount} pill="bg-blue-500/20 text-blue-400" dot="bg-blue-500" />
        </div>

        {/* Error notice */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <strong>Could not load responses.</strong> Run this SQL in Supabase to enable reads:
            <br />
            <code className="mt-1 block text-xs font-mono">
              create policy &quot;Allow anon read&quot; on rsvp_responses for select to anon using (true);
            </code>
          </div>
        )}

        {/* Response list */}
        <div className="mt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            {responses.length === 0
              ? "No responses yet"
              : `${responses.length} response${responses.length === 1 ? "" : "s"}`}
          </p>

          {responses.length === 0 && !error ? (
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-8 py-12 text-center text-sm text-slate-400 shadow-xl">
              No RSVPs yet — share the invitation link with your guests to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {responses.map((r) => (
                <ResponseCard key={r.id} r={r} />
              ))}
            </div>
          )}
        </div>
      </main>
        </div>
      </RSVPPinGate>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  pill,
  dot,
}: {
  label: string;
  value: number;
  pill: string;
  dot: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-4 shadow-lg">
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className={`mt-3 inline-block rounded-full px-3 py-1 text-2xl font-bold ${pill}`}>
        {value}
      </p>
    </div>
  );
}

const ATTENDANCE_LABEL: Record<string, string> = {
  attending: "Attending",
  not_attending: "Not attending",
  maybe: "Maybe",
};

const ATTENDANCE_STYLE: Record<string, string> = {
  attending: "bg-green-500/20 text-green-400",
  not_attending: "bg-red-500/20 text-red-400",
  maybe: "bg-amber-500/20 text-amber-400",
};

const MEAL_LABEL: Record<string, string> = {
  no_preference: "No preference",
  vegetarian: "Vegetarian",
  non_vegetarian: "Non-vegetarian",
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function ResponseCard({ r }: { r: RSVPRow }) {
  const badgeClass = ATTENDANCE_STYLE[r.attendance] ?? "bg-slate-700/50 text-slate-300";

  return (
    <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 hover:bg-slate-800/60 px-5 py-4 transition">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700/50 text-xs font-semibold text-slate-300">
          {initials(r.guest_name)}
        </div>

        <div className="min-w-0 flex-1">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-white">{r.guest_name}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
              {ATTENDANCE_LABEL[r.attendance]}
            </span>
          </div>

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            {(r.attendance === "attending" || r.attendance === "maybe") && (
              <span>
                {r.party_size} {r.party_size === 1 ? "guest" : "guests"}
              </span>
            )}
            {r.meal_preference && r.meal_preference !== "no_preference" && (
              <span>{MEAL_LABEL[r.meal_preference]}</span>
            )}
            <span className="ml-auto text-slate-500">{formatDate(r.submitted_at)}</span>
          </div>

          {/* Message */}
          {r.message && (
            <p className="mt-3 rounded-lg bg-slate-700/30 px-3 py-2 text-sm italic text-slate-300">
              &ldquo;{r.message}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
