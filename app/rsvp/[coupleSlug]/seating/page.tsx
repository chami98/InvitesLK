import { SeatingChart } from "@/components/SeatingChart";
import { RSVPPinGate } from "@/components/RSVPPinGate";
import { getCoupleBySlug } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ coupleSlug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { coupleSlug } = await params;
  const couple = getCoupleBySlug(coupleSlug);
  if (!couple) return { title: "Seating Arrangement" };
  return { title: `Seating — ${couple.partnerA} & ${couple.partnerB}` };
}

export default async function SeatingPage({ params }: PageProps) {
  const { coupleSlug } = await params;
  const couple = getCoupleBySlug(coupleSlug);
  if (!couple) notFound();

  const { data: rows } = await supabase
    .from("rsvp_responses")
    .select("*")
    .eq("couple_slug", coupleSlug)
    .order("submitted_at", { ascending: false });

  const rsvpResponses = rows ?? [];

  return (
    <RSVPPinGate
      pin={couple.rsvpPin}
      coupleSlug={coupleSlug}
      coupleNames={`${couple.partnerA} & ${couple.partnerB}`}
    >
      <div className="min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Decorative gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <header className="relative border-b border-slate-700/50 bg-slate-900/80 backdrop-blur px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-3 flex gap-2">
              <Link
                href={`/rsvp/${coupleSlug}`}
                className="text-xs text-slate-400 transition hover:text-slate-300"
              >
                ← Back to RSVP Dashboard
              </Link>
            </div>
            <div>
              <h1 className="text-2xl font-normal tracking-wide text-white">Seating Arrangement</h1>
              <p className="mt-1 text-sm text-slate-400">
                {couple.partnerA} &amp; {couple.partnerB}
              </p>
            </div>
          </div>
        </header>

        <main className="relative mx-auto max-w-5xl px-4 py-8 sm:px-8">
          <SeatingChart coupleSlug={coupleSlug} rsvpResponses={rsvpResponses} />
        </main>
      </div>
    </RSVPPinGate>
  );
}
