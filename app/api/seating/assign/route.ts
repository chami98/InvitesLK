import { supabase } from "@/lib/supabase";
import { getCoupleBySlug } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coupleSlug = searchParams.get("coupleSlug");

  if (!coupleSlug || typeof coupleSlug !== "string") {
    return NextResponse.json({ error: "Missing couple slug" }, { status: 400 });
  }

  if (!getCoupleBySlug(coupleSlug)) {
    return NextResponse.json({ error: "Invalid invitation" }, { status: 404 });
  }

  const { data: seating, error } = await supabase
    .from("guest_seating")
    .select("*")
    .eq("couple_slug", coupleSlug);

  if (error) {
    console.error("Guest seating fetch error:", error.message);
    return NextResponse.json(
      { error: "Could not fetch guest seating" },
      { status: 500 }
    );
  }

  return NextResponse.json({ seating: seating || [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { coupleSlug, rsvpId, tableId } = body;

  if (!coupleSlug || typeof coupleSlug !== "string") {
    return NextResponse.json({ error: "Missing couple slug" }, { status: 400 });
  }

  if (!getCoupleBySlug(coupleSlug)) {
    return NextResponse.json({ error: "Invalid invitation" }, { status: 404 });
  }

  if (!rsvpId || typeof rsvpId !== "string") {
    return NextResponse.json({ error: "Missing RSVP ID" }, { status: 400 });
  }

  if (tableId && typeof tableId !== "string") {
    return NextResponse.json({ error: "Invalid table ID" }, { status: 400 });
  }

  // Get guest name from RSVP
  const { data: rsvp, error: rsvpError } = await supabase
    .from("rsvp_responses")
    .select("guest_name")
    .eq("id", rsvpId)
    .single();

  if (rsvpError || !rsvp) {
    return NextResponse.json({ error: "Guest not found" }, { status: 404 });
  }

  // Delete existing seating if exists
  await supabase
    .from("guest_seating")
    .delete()
    .eq("rsvp_id", rsvpId);

  // If tableId provided, create new seating
  if (tableId) {
    const { error } = await supabase.from("guest_seating").insert({
      rsvp_id: rsvpId,
      seating_table_id: tableId,
      guest_name: rsvp.guest_name,
      couple_slug: coupleSlug,
    });

    if (error) {
      console.error("Guest seating insert error:", error.message);
      return NextResponse.json(
        { error: "Could not assign guest to table" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
