import { supabase } from "@/lib/supabase";
import { MOCK_COUPLES, WEDDING_TEMPLATES } from "@/lib/data";
import { NextResponse } from "next/server";

function generateSlug(partnerA: string, partnerB: string): string {
  const slugA = partnerA.toLowerCase().replace(/\s+/g, "-");
  const slugB = partnerB.toLowerCase().replace(/\s+/g, "-");
  return `${slugA}-${slugB}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    // If slug is provided, fetch specific couple
    if (slug) {
      const { data, error } = await supabase
        .from("couples")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = not found
        console.error("Couple fetch error:", error.message);
        return NextResponse.json(
          { error: "Could not fetch couple" },
          { status: 500 }
        );
      }

      if (data) {
        return NextResponse.json({ couple: data });
      }

      // Check mock data as fallback
      const mockCouple = MOCK_COUPLES.find((c) => c.slug === slug);
      if (mockCouple) {
        return NextResponse.json({ couple: mockCouple, isMockData: true });
      }

      return NextResponse.json({ error: "Couple not found" }, { status: 404 });
    }

    // Fetch all couples (database + mock)
    const { data: dbCouples, error } = await supabase
      .from("couples")
      .select("*")
      .order("created_at", { ascending: false });

    if (error && error.code !== "PGRST116") {
      console.error("Couples fetch error:", error.message);
      return NextResponse.json(
        { error: "Could not fetch couples" },
        { status: 500 }
      );
    }

    const allCouples = [...(dbCouples || []), ...MOCK_COUPLES];
    return NextResponse.json({ couples: allCouples });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { partnerA, partnerB, date, venue, templateId, rsvpPin } = body;

  // Validation
  if (!partnerA || typeof partnerA !== "string" || partnerA.trim().length < 1) {
    return NextResponse.json(
      { error: "Partner A name is required" },
      { status: 400 }
    );
  }

  if (!partnerB || typeof partnerB !== "string" || partnerB.trim().length < 1) {
    return NextResponse.json(
      { error: "Partner B name is required" },
      { status: 400 }
    );
  }

  if (!date || typeof date !== "string" || date.trim().length < 1) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  if (!venue || typeof venue !== "string" || venue.trim().length < 1) {
    return NextResponse.json({ error: "Venue is required" }, { status: 400 });
  }

  const templateNum = Number(templateId);
  if (!Number.isInteger(templateNum) || !WEDDING_TEMPLATES[templateNum]) {
    return NextResponse.json(
      { error: "Invalid template ID" },
      { status: 400 }
    );
  }

  if (!rsvpPin || typeof rsvpPin !== "string" || rsvpPin.trim().length < 4) {
    return NextResponse.json(
      { error: "RSVP PIN must be at least 4 characters" },
      { status: 400 }
    );
  }

  const slug = generateSlug(partnerA, partnerB);

  // Check if slug already exists
  const { data: existing } = await supabase
    .from("couples")
    .select("slug")
    .eq("slug", slug)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "A couple with this name combination already exists" },
      { status: 409 }
    );
  }

  // Check mock data
  if (MOCK_COUPLES.find((c) => c.slug === slug)) {
    return NextResponse.json(
      { error: "This couple name is already reserved" },
      { status: 409 }
    );
  }

  // Create new couple
  const { data, error } = await supabase
    .from("couples")
    .insert({
      slug,
      partner_a: partnerA.trim(),
      partner_b: partnerB.trim(),
      date: date.trim(),
      venue: venue.trim(),
      template_id: templateNum,
      rsvp_pin: rsvpPin.trim(),
    })
    .select()
    .single();

  if (error) {
    console.error("Couple insert error:", error.message);
    return NextResponse.json(
      { error: "Could not create couple" },
      { status: 500 }
    );
  }

  return NextResponse.json({ couple: data }, { status: 201 });
}
