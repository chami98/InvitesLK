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
      <div className="min-h-dvh bg-stone-50 text-stone-900">
        {/* Header */}
        <header className="border-b border-stone-200 bg-white px-4 py-5 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-3 flex gap-2">
              <Link
                href={`/rsvp/${coupleSlug}`}
                className="text-xs text-stone-400 transition hover:text-stone-700"
              >
                ← Back to RSVP Dashboard
              </Link>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Seating Arrangement</h1>
              <p className="mt-0.5 text-sm text-stone-500">
                {couple.partnerA} &amp; {couple.partnerB}
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
          <SeatingChart coupleSlug={coupleSlug} rsvpResponses={rsvpResponses} />
        </main>
      </div>
    </RSVPPinGate>
  );
}
