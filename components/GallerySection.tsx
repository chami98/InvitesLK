"use client";

import { GalleryMosaic } from "@/components/GalleryMosaic";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ScrollReveal } from "@/components/ScrollReveal";
import { headingStyle } from "@/components/ThemeWrapper";
import type { CoupleInvite, WeddingTheme } from "@/lib/data";
import { Camera } from "lucide-react";

const variantByTemplate: Record<
  number,
  "classic" | "modern" | "soft" | "dark" | "minimal"
> = {
  1: "classic",
  2: "modern",
  3: "soft",
  4: "dark",
  5: "classic",
  6: "modern",
  7: "soft",
  8: "dark",
  9: "minimal",
  10: "soft",
};

type GallerySectionProps = {
  theme: WeddingTheme;
  templateId: number;
  couple: CoupleInvite;
};

export function GallerySection({ theme, templateId, couple }: GallerySectionProps) {
  const { gallery } = couple;
  if (!gallery.length) return null;

  const variant = variantByTemplate[templateId] ?? "modern";
  const isDark = [4, 8, 12, 14].includes(templateId);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-24 border-t border-black/5 px-5 py-14 sm:px-10 sm:py-20"
      style={{
        backgroundColor: isDark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.02)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal y={28}>
          <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]"
              style={{
                color: theme.colors.accent,
                backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
              }}
            >
              <Camera className="h-3.5 w-3.5" aria-hidden />
              Moments
            </div>
            <h2
              id="gallery-heading"
              className="text-3xl font-normal sm:text-4xl"
              style={headingStyle(theme)}
            >
              Our story in frames
            </h2>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-[color:var(--theme-muted)] sm:text-base">
              Moments with {couple.partnerA} & {couple.partnerB} — swipe, tap the dots, or use the
              arrows to explore.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal y={24} delay={0.08} className="mt-10">
          <ImageCarousel
            images={gallery}
            accentColor={theme.colors.accent}
            mutedColor={
              isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)"
            }
            variant={variant}
          />
        </ScrollReveal>
        <div className="mt-10">
          <GalleryMosaic images={gallery} accentColor={theme.colors.accent} />
        </div>
      </div>
    </section>
  );
}
