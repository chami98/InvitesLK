import { supabase } from "@/lib/supabase";
import { getCoupleBySlug } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { coupleSlug, guestName, attendance, partySize, mealPreference, message } = body;

  if (!coupleSlug || typeof coupleSlug !== "string") {
    return NextResponse.json({ error: "Missing couple" }, { status: 400 });
  }
  if (!guestName || typeof guestName !== "string" || guestName.trim().length < 1) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!["attending", "not_attending", "maybe"].includes(attendance)) {
    return NextResponse.json({ error: "Invalid attendance value" }, { status: 400 });
  }

  // Validate couple exists
  if (!getCoupleBySlug(coupleSlug)) {
    return NextResponse.json({ error: "Invalid invitation" }, { status: 404 });
  }

  const size = Number(partySize);
  const validSize = Number.isInteger(size) && size >= 1 && size <= 20 ? size : 1;

  const validMeal = ["vegetarian", "non_vegetarian", "no_preference"].includes(mealPreference)
    ? mealPreference
    : "no_preference";

  const { error } = await supabase.from("rsvp_responses").insert({
    couple_slug: coupleSlug,
    guest_name: guestName.trim().slice(0, 120),
    attendance,
    party_size: validSize,
    meal_preference: validMeal,
    message: typeof message === "string" && message.trim() ? message.trim().slice(0, 500) : null,
  });

  if (error) {
    console.error("RSVP insert error:", error.message);
    return NextResponse.json({ error: "Could not save your RSVP. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
