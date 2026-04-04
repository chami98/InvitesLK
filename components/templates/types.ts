import type { CoupleInvite, WeddingTheme } from "@/lib/data";

export type TemplateProps = {
  theme: WeddingTheme;
  inviteeName: string;
  couple: CoupleInvite;
  onOpenRSVP: () => void;
};
