"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralCornerCluster, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Classic — white card, double gold border, large burgundy corner roses (Image 1 style) */
export function Template1({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const palette = PALETTES.burgundy;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-[26rem] overflow-visible"
        style={{ backgroundColor: "#fffefb" }}
      >
        {/* Double border frame */}
        <div
          className="absolute inset-0 border-4 border-double"
          style={{ borderColor: border, zIndex: 0 }}
        />
        <div
          className="absolute inset-[10px] border"
          style={{ borderColor: `${border}80`, zIndex: 0 }}
        />

        {/* Top-right floral corner */}
        <div className="pointer-events-none absolute -right-8 -top-8 z-10">
          <FloralCornerCluster palette={palette} size={200} />
        </div>

        {/* Bottom-left floral corner (rotated 180°) */}
        <div
          className="pointer-events-none absolute -bottom-8 -left-8 z-10"
          style={{ transform: "rotate(180deg)" }}
        >
          <FloralCornerCluster palette={palette} size={160} />
        </div>

        {/* Card content */}
        <div className="relative z-[1] px-10 pb-14 pt-12 text-center sm:px-12">
          <AnimatedBlock>
            <p
              className="text-[0.62rem] uppercase tracking-[0.35em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          {/* Ornamental rule */}
          <AnimatedBlock delay={0.06}>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8" style={{ backgroundColor: `${border}60` }} />
              <span className="text-xs" style={{ color: border }}>✦</span>
              <span className="h-px w-8" style={{ backgroundColor: `${border}60` }} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
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

          <AnimatedBlock delay={0.18}>
            <div
              className="mx-auto mt-8 border-t border-b py-8"
              style={{ borderColor: `${border}50` }}
            >
              <p className="text-[0.68rem] uppercase tracking-[0.25em]" style={{ color: colors.muted }}>
                Together with their families
              </p>
              <p className="mt-2 text-[0.8rem] uppercase tracking-[0.18em]" style={{ color: colors.muted }}>
                request the honour of your presence
              </p>
              <p className="mt-1 text-[0.8rem] uppercase tracking-[0.18em]" style={{ color: colors.muted }}>
                at the marriage of
              </p>
              <p
                className="mt-6 text-[2.8rem] font-normal leading-none sm:text-[3.2rem]"
                style={headingStyle(theme)}
              >
                {couple.partnerA}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.4em]" style={{ color: border }}>
                and
              </p>
              <p
                className="mt-2 text-[2.8rem] font-normal leading-none sm:text-[3.2rem]"
                style={headingStyle(theme)}
              >
                {couple.partnerB}
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.26}>
            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: border }} />
                <p className="text-sm">{couple.date}</p>
              </div>
              <div className="flex items-start justify-center gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: border }} />
                <p className="text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.34} className="mt-9">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="border-2 px-10 py-2.5 text-xs uppercase tracking-[0.3em] transition hover:opacity-80"
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
