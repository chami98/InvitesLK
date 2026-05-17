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
