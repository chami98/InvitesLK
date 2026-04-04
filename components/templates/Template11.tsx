"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralWreath, FloralSmallCorner, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Sage & Blush — full botanical wreath, sage green + dusty rose, romantic script */
export function Template11({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const palette = PALETTES.blushPink;
  const border = colors.border ?? colors.accent;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-14 sm:px-8 sm:py-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* All-four-corner small floral accents */}
      <div className="pointer-events-none absolute left-3 top-3 z-10">
        <FloralSmallCorner palette={palette} size={100} />
      </div>
      <div
        className="pointer-events-none absolute right-3 top-3 z-10"
        style={{ transform: "scaleX(-1)" }}
      >
        <FloralSmallCorner palette={palette} size={100} />
      </div>
      <div
        className="pointer-events-none absolute bottom-3 left-3 z-10"
        style={{ transform: "scaleY(-1)" }}
      >
        <FloralSmallCorner palette={palette} size={80} />
      </div>
      <div
        className="pointer-events-none absolute bottom-3 right-3 z-10"
        style={{ transform: "scale(-1,-1)" }}
      >
        <FloralSmallCorner palette={palette} size={80} />
      </div>

      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        {/* Full wreath — no gap at top */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <FloralWreath palette={palette} size={360} gapDeg={0} />
        </div>

        <div className="relative z-[1] w-full px-8 py-4 sm:px-12">
          <AnimatedBlock>
            <p
              className="text-[0.6rem] uppercase tracking-[0.42em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.07}>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="h-px w-6" style={{ backgroundColor: `${border}50` }} />
              <span className="text-[0.55rem]" style={{ color: colors.accent }}>✿</span>
              <span className="h-px w-6" style={{ backgroundColor: `${border}50` }} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.12}>
            <p className="mt-5 text-sm" style={{ color: colors.muted }}>
              you are lovingly invited,
            </p>
            <h1
              className="mt-1 text-3xl sm:text-[2.4rem]"
              style={{ ...headingStyle(theme), color: colors.accent }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.18}>
            <p className="mt-6 text-xs uppercase tracking-[0.22em]" style={{ color: colors.muted }}>
              to celebrate the union of
            </p>
            <p
              className="mt-5 text-[3rem] font-normal leading-none sm:text-[3.4rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerA}
            </p>
            <p className="mt-2 text-sm" style={{ color: colors.accent }}>✿ &amp; ✿</p>
            <p
              className="mt-2 text-[3rem] font-normal leading-none sm:text-[3.4rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.28}>
            <div
              className="mx-auto mt-8 space-y-3 border-t border-b py-6"
              style={{ borderColor: `${border}40` }}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: colors.accent }} />
                <p className="text-sm">{couple.date}</p>
              </div>
              <div className="flex items-start justify-center gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: colors.accent }} />
                <p className="text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.36} className="mt-8">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="rounded-full border-2 px-10 py-2.5 text-xs uppercase tracking-[0.28em] transition hover:opacity-80"
              style={{ borderColor: colors.accent, color: colors.foreground }}
            >
              RSVP
            </button>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
