import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type RSVPRow = {
  id: string;
  couple_slug: string;
  guest_name: string;
  attendance: "attending" | "not_attending" | "maybe";
  party_size: number;
  meal_preference: "vegetarian" | "non_vegetarian" | "no_preference";
  message: string | null;
  submitted_at: string;
};

export type SeatingTable = {
  id: string;
  couple_slug: string;
  table_number: number;
  capacity: number;
  created_at: string;
};

export type GuestSeating = {
  id: string;
  rsvp_id: string;
  seating_table_id: string;
  guest_name: string;
  couple_slug: string;
  created_at: string;
};

export type CoupleRecord = {
  id: string;
  slug: string;
  partner_a: string;
  partner_b: string;
  date: string;
  venue: string;
  template_id: number;
  rsvp_pin: string;
  created_at: string;
};
