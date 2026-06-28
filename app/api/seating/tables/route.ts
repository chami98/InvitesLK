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

  const { data: tables, error } = await supabase
    .from("seating_tables")
    .select("*")
    .eq("couple_slug", coupleSlug)
    .order("table_number", { ascending: true });

  if (error) {
    console.error("Seating tables fetch error:", error.message);
    return NextResponse.json(
      { error: "Could not fetch seating tables" },
      { status: 500 }
    );
  }

  return NextResponse.json({ tables: tables || [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { coupleSlug, tableNumber, capacity } = body;

  if (!coupleSlug || typeof coupleSlug !== "string") {
    return NextResponse.json({ error: "Missing couple slug" }, { status: 400 });
  }

  if (!getCoupleBySlug(coupleSlug)) {
    return NextResponse.json({ error: "Invalid invitation" }, { status: 404 });
  }

  const tableNum = Number(tableNumber);
  const cap = Number(capacity);

  if (!Number.isInteger(tableNum) || tableNum < 1) {
    return NextResponse.json({ error: "Invalid table number" }, { status: 400 });
  }

  if (!Number.isInteger(cap) || cap < 1 || cap > 20) {
    return NextResponse.json(
      { error: "Capacity must be between 1 and 20" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("seating_tables")
    .insert({
      couple_slug: coupleSlug,
      table_number: tableNum,
      capacity: cap,
    })
    .select()
    .single();

  if (error) {
    console.error("Seating table insert error:", error.message);
    return NextResponse.json(
      { error: "Could not create seating table" },
      { status: 500 }
    );
  }

  return NextResponse.json({ table: data });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const tableId = searchParams.get("tableId");

  if (!tableId || typeof tableId !== "string") {
    return NextResponse.json({ error: "Missing table ID" }, { status: 400 });
  }

  const { error } = await supabase
    .from("seating_tables")
    .delete()
    .eq("id", tableId);

  if (error) {
    console.error("Seating table delete error:", error.message);
    return NextResponse.json(
      { error: "Could not delete seating table" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
