"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { GeometricFloralFrame, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Art Deco — geometric gold polygon frame with cream roses (Image 3 style) */
export function Template4({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const gold = colors.border ?? colors.accent;
  const palette = PALETTES.creamGold;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      {/* Geometric frame layer — sits behind text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <GeometricFloralFrame
          accent={gold}
          palette={palette}
          width={440}
          height={580}
        />
      </div>

      {/* Card text — sits on top */}
      <div className="relative z-[1] w-full max-w-xs py-6 text-center sm:max-w-sm">
        <AnimatedBlock>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 opacity-50" style={{ backgroundColor: gold }} />
            <span className="text-[0.58rem] uppercase tracking-[0.45em]" style={{ color: gold }}>
              Invitation
            </span>
            <span className="h-px w-8 opacity-50" style={{ backgroundColor: gold }} />
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.1}>
          <p className="mt-8 text-sm" style={{ color: colors.muted }}>
            You are cordially invited,
          </p>
          <p
            className="mt-1 text-2xl sm:text-3xl"
            style={{ ...headingStyle(theme), color: gold }}
          >
            {inviteeName}
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.18}>
          <div
            className="mx-auto mt-10 border-t border-b py-10"
            style={{ borderColor: `${gold}40` }}
          >
            <p
              className="text-[0.65rem] uppercase tracking-[0.3em]"
              style={{ color: colors.muted }}
            >
              Celebrating the marriage of
            </p>
            <p
              className="mt-5 text-[2.8rem] font-normal uppercase tracking-widest sm:text-[3.2rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerA}
            </p>
            <p className="mt-1 text-sm" style={{ color: gold }}>✦</p>
            <p
              className="mt-1 text-[2.8rem] font-normal uppercase tracking-widest sm:text-[3.2rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerB}
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.26}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-2 border-l-2 pl-3" style={{ borderColor: `${gold}70` }}>
              <Calendar className="mt-0.5 h-4 w-4 shrink-0" style={{ color: gold }} />
              <div className="text-left">
                <p className="text-[0.6rem] uppercase tracking-[0.25em]" style={{ color: colors.muted }}>
                  Date
                </p>
                <p className="mt-0.5 text-xs">{couple.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 border-l-2 pl-3" style={{ borderColor: `${gold}70` }}>
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: gold }} />
              <div className="text-left">
                <p className="text-[0.6rem] uppercase tracking-[0.25em]" style={{ color: colors.muted }}>
                  Venue
                </p>
                <p className="mt-0.5 text-xs">{couple.venue}</p>
              </div>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.34} className="mt-10">
          <button
            type="button"
            onClick={onOpenRSVP}
            className="border-2 px-12 py-3 text-xs uppercase tracking-[0.35em] transition hover:bg-white/5"
            style={{ borderColor: gold, color: colors.foreground }}
          >
            RSVP
          </button>
        </AnimatedBlock>
      </div>
    </div>
  );
}
