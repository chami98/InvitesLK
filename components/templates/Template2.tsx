"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralSmallCorner, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Modern — white card, pink border, peonies at all 4 corners (Image 2 style) */
export function Template2({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const palette = PALETTES.blushPink;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      <div className="relative w-full max-w-[25rem]" style={{ backgroundColor: "#ffffff" }}>
        {/* Pink border */}
        <div className="absolute inset-0 border-[6px]" style={{ borderColor: border }} />

        {/* 4-corner floral accents */}
        <div className="pointer-events-none absolute -right-4 -top-4 z-10">
          <FloralSmallCorner palette={palette} size={110} />
        </div>
        <div
          className="pointer-events-none absolute -bottom-4 -left-4 z-10"
          style={{ transform: "rotate(180deg)" }}
        >
          <FloralSmallCorner palette={palette} size={110} />
        </div>
        <div
          className="pointer-events-none absolute -left-4 -top-4 z-10"
          style={{ transform: "scaleX(-1)" }}
        >
          <FloralSmallCorner palette={palette} size={100} />
        </div>
        <div
          className="pointer-events-none absolute -bottom-4 -right-4 z-10"
          style={{ transform: "scaleY(-1)" }}
        >
          <FloralSmallCorner palette={palette} size={100} />
        </div>

        {/* Card content */}
        <div className="relative z-[1] px-10 pb-12 pt-14 text-center sm:px-12">
          <AnimatedBlock>
            <p
              className="text-[0.62rem] uppercase tracking-[0.32em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: colors.muted }}>
              Mr. &amp; Mrs. [Bride&apos;s parents] request
              <br />
              the honour of your presence
              <br />
              at the marriage of their daughter
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.16}>
            <h1
              className="mt-6 text-[3rem] font-normal leading-none sm:text-[3.4rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerA}
            </h1>
            <p
              className="mt-2 text-sm uppercase tracking-[0.3em]"
              style={{ color: colors.muted }}
            >
              and
            </p>
            <p
              className="mt-2 text-[3rem] font-normal leading-none sm:text-[3.4rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.24}>
            <div
              className="mx-auto mt-8 border-t border-b py-6"
              style={{ borderColor: `${border}40` }}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: border }} />
                <p className="text-sm">{couple.date}</p>
              </div>
              <div className="mt-3 flex items-start justify-center gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: border }} />
                <p className="text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.32}>
            <p className="mt-6 text-sm italic" style={{ color: colors.muted }}>
              You are cordially invited,{" "}
              <span style={{ color: colors.foreground }}>{inviteeName}</span>
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.4} className="mt-8">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="rounded-none border px-10 py-2.5 text-xs uppercase tracking-[0.28em] transition hover:opacity-80"
              style={{ borderColor: border, color: colors.foreground }}
            >
              RSVP
            </button>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
