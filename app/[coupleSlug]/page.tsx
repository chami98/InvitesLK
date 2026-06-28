import { InvitationClient } from "@/components/InvitationClient";
import {
  decodeInviteParam,
  getCoupleBySlug,
  getCoupleBySlugFromDb,
  getThemeForTemplateId,
} from "@/lib/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ coupleSlug: string }>;
  searchParams: Promise<{ invite?: string | string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { coupleSlug } = await params;
  let couple = getCoupleBySlug(coupleSlug);
  if (!couple) couple = await getCoupleBySlugFromDb(coupleSlug);

  if (!couple) return { title: "Invitation — InvitesLK" };
  return {
    title: `${couple.partnerA} & ${couple.partnerB} — Wedding | InvitesLK`,
    description: `You're invited! Wedding invitation for ${couple.partnerA} and ${couple.partnerB}, crafted by InvitesLK.`,
  };
}

export default async function CoupleInvitePage({ params, searchParams }: PageProps) {
  const { coupleSlug } = await params;
  const sp = await searchParams;

  let couple = getCoupleBySlug(coupleSlug);
  if (!couple) couple = await getCoupleBySlugFromDb(coupleSlug);

  if (!couple) notFound();

  const theme = getThemeForTemplateId(couple.templateId);
  if (!theme) notFound();

  const inviteeName = decodeInviteParam(sp.invite);

  return <InvitationClient couple={couple} theme={theme} inviteeName={inviteeName} />;
}
