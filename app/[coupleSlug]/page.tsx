import { InvitationClient } from "@/components/InvitationClient";
import {
  decodeInviteParam,
  getCoupleBySlug,
  getThemeForTemplateId,
  pickGallery,
  buildDefaultAgenda,
  hashSlug,
} from "@/lib/data";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ coupleSlug: string }>;
  searchParams: Promise<{ invite?: string | string[] }>;
};

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
        gallery: pickGallery(hashSlug(data.slug)),
        agenda: buildDefaultAgenda(data.venue),
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

  if (!couple) return { title: "Invitation — InvitesLK" };
  return {
    title: `${couple.partnerA} & ${couple.partnerB} — Wedding | InvitesLK`,
    description: `You're invited! Wedding invitation for ${couple.partnerA} and ${couple.partnerB}, crafted by InvitesLK.`,
  };
}

export default async function CoupleInvitePage({ params, searchParams }: PageProps) {
  const { coupleSlug } = await params;
  const sp = await searchParams;

  const couple = await fetchCouple(coupleSlug);
  if (!couple) notFound();

  const theme = getThemeForTemplateId(couple.templateId);
  if (!theme) notFound();

  const inviteeName = decodeInviteParam(sp.invite);

  return <InvitationClient couple={couple} theme={theme} inviteeName={inviteeName} />;
}
