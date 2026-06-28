import { RSVPPinGate } from "@/components/RSVPPinGate";
import { RSVPRefreshButton } from "@/components/RSVPRefreshButton";
import { getCoupleBySlug, getCoupleBySlugFromDb } from "@/lib/data";
import { supabase, type RSVPRow, type CoupleRecord } from "@/lib/supabase";
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
    const couple = await getCoupleBySlugFromDb(coupleSlug);
    return couple;
  } catch {
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
    <RSVPPinGate
      pin={couple.rsvpPin}
      coupleSlug={coupleSlug}
      coupleNames={`${couple.partnerA} & ${couple.partnerB}`}
    >
    <div className="min-h-dvh bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-4 py-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/${coupleSlug}`}
            className="text-xs text-stone-400 transition hover:text-stone-700"
          >
            ← Back to invitation
          </Link>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">
                {couple.partnerA} &amp; {couple.partnerB}
              </h1>
              <p className="mt-0.5 text-sm text-stone-500">
                {couple.date} &middot; {couple.venue}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/rsvp/${coupleSlug}/seating`}
                className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                <Users size={16} />
                Seating
              </Link>
              <RSVPRefreshButton />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Attending" value={attending.length} pill="bg-green-100 text-green-700" dot="bg-green-500" />
          <StatCard label="Not attending" value={notAttending.length} pill="bg-red-100 text-red-600" dot="bg-red-500" />
          <StatCard label="Maybe" value={maybe.length} pill="bg-amber-100 text-amber-700" dot="bg-amber-500" />
          <StatCard label="Total guests" value={headcount} pill="bg-blue-100 text-blue-700" dot="bg-blue-500" />
        </div>

        {/* Error notice */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <strong>Could not load responses.</strong> Run this SQL in Supabase to enable reads:
            <br />
            <code className="mt-1 block text-xs">
              create policy &quot;Allow anon read&quot; on rsvp_responses for select to anon using (true);
            </code>
          </div>
        )}

        {/* Response list */}
        <div className="mt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400">
            {responses.length === 0
              ? "No responses yet"
              : `${responses.length} response${responses.length === 1 ? "" : "s"}`}
          </p>

          {responses.length === 0 && !error ? (
            <div className="rounded-xl border border-stone-200 bg-white px-6 py-12 text-center text-sm text-stone-400">
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
    <div className="rounded-xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="text-xs text-stone-500">{label}</span>
      </div>
      <p className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-2xl font-bold ${pill}`}>
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
  attending: "bg-green-100 text-green-700",
  not_attending: "bg-red-100 text-red-600",
  maybe: "bg-amber-100 text-amber-700",
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
  const badgeClass = ATTENDANCE_STYLE[r.attendance] ?? "bg-stone-100 text-stone-600";

  return (
    <div className="rounded-xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-600">
          {initials(r.guest_name)}
        </div>

        <div className="min-w-0 flex-1">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{r.guest_name}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
              {ATTENDANCE_LABEL[r.attendance]}
            </span>
          </div>

          {/* Meta row */}
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
            {(r.attendance === "attending" || r.attendance === "maybe") && (
              <span>
                {r.party_size} {r.party_size === 1 ? "guest" : "guests"}
              </span>
            )}
            {r.meal_preference && r.meal_preference !== "no_preference" && (
              <span>{MEAL_LABEL[r.meal_preference]}</span>
            )}
            <span className="ml-auto text-stone-400">{formatDate(r.submitted_at)}</span>
          </div>

          {/* Message */}
          {r.message && (
            <p className="mt-2 rounded-lg bg-stone-50 px-3 py-2 text-sm italic text-stone-600">
              &ldquo;{r.message}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
