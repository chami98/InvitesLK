"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralWreath, FloralDivider, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Floral — wreath behind centered card, deep pinks (Image 4 inspired) */
export function Template3({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const palette = PALETTES.deepPink;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-12 sm:px-8 sm:py-20"
      style={{ backgroundColor: colors.background }}
    >
      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        {/* Wreath sits behind content */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <FloralWreath palette={palette} size={340} gapDeg={110} />
        </div>

        {/* Content on top of wreath */}
        <div className="relative z-[1] w-full px-6 py-2 sm:px-10">
          <AnimatedBlock>
            <p
              className="text-[0.6rem] uppercase tracking-[0.4em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <p className="mt-5 text-sm" style={{ color: colors.muted }}>
              You are cordially invited,
            </p>
            <h1
              className="mt-1 text-3xl font-normal sm:text-4xl"
              style={{ ...headingStyle(theme), color: colors.accent }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.14}>
            <div className="mt-5 flex justify-center">
              <FloralDivider palette={palette} width={200} height={40} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <p className="mt-2 text-xs uppercase tracking-[0.22em]" style={{ color: colors.muted }}>
              The marriage of
            </p>
            <p
              className="mt-4 text-[2.6rem] font-normal leading-none sm:text-[3rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerA}
            </p>
            <p className="mt-2 text-xl" style={{ color: colors.accent }}>
              &amp;
            </p>
            <p
              className="mt-2 text-[2.6rem] font-normal leading-none sm:text-[3rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.28}>
            <div className="mt-5 flex justify-center">
              <FloralDivider palette={palette} width={200} height={40} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.34}>
            <div className="mt-3 space-y-2.5">
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

          <AnimatedBlock delay={0.42} className="mt-8">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="rounded-full px-10 py-2.5 text-xs uppercase tracking-[0.28em] text-white shadow-md transition hover:opacity-90"
              style={{ backgroundColor: colors.accent }}
            >
              RSVP
            </button>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
