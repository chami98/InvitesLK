"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { GeometricFloralFrame, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Boho Gold — warm amber background, geometric diamond frame with cream-gold florals, Great Vibes script */
export function Template15({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const palette = PALETTES.creamGold;
  const amber = colors.accent;
  const border = colors.border ?? colors.accent;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12 sm:px-8 sm:py-16"
      style={{
        backgroundColor: colors.background,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23c47c20' stroke-opacity='0.05' stroke-width='0.8'%3E%3Cpath d='M0 30h60M30 0v60M0 0l60 60M60 0L0 60'/%3E%3C/g%3E%3C/svg%3E\")",
      }}
    >
      {/* Geometric floral frame — positioned dead-centre behind text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <GeometricFloralFrame
          accent={border}
          palette={palette}
          width={460}
          height={600}
        />
      </div>

      {/* Content */}
      <div className="relative z-[1] w-full max-w-xs py-8 text-center sm:max-w-sm">
        <AnimatedBlock>
          <p
            className="text-[0.6rem] uppercase tracking-[0.42em]"
            style={{ color: colors.muted }}
          >
            Together With Their Families
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.08}>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 opacity-40" style={{ backgroundColor: amber }} />
            <span className="text-base" style={{ color: amber }}>◆</span>
            <span className="h-px w-8 opacity-40" style={{ backgroundColor: amber }} />
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.14}>
          <p className="mt-6 text-sm" style={{ color: colors.muted }}>
            invite you,
          </p>
          <h1
            className="mt-1 text-3xl sm:text-[2.5rem]"
            style={{ ...headingStyle(theme), color: amber }}
          >
            {inviteeName}
          </h1>
        </AnimatedBlock>

        <AnimatedBlock delay={0.2}>
          <p
            className="mt-8 text-[0.65rem] uppercase tracking-[0.25em]"
            style={{ color: colors.muted }}
          >
            to witness the marriage of
          </p>

          <p
            className="mt-5 text-[3rem] font-normal leading-none sm:text-[3.5rem]"
            style={headingStyle(theme)}
          >
            {couple.partnerA}
          </p>
          <p className="mt-1 text-2xl" style={{ color: amber }}>
            &amp;
          </p>
          <p
            className="mt-1 text-[3rem] font-normal leading-none sm:text-[3.5rem]"
            style={headingStyle(theme)}
          >
            {couple.partnerB}
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.28}>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 opacity-40" style={{ backgroundColor: amber }} />
            <span className="text-base" style={{ color: amber }}>◆</span>
            <span className="h-px w-8 opacity-40" style={{ backgroundColor: amber }} />
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.34}>
          <div className="mt-7 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: amber }} />
              <p className="text-sm">{couple.date}</p>
            </div>
            <div className="flex items-start justify-center gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: amber }} />
              <p className="text-sm">{couple.venue}</p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.42} className="mt-10">
          <button
            type="button"
            onClick={onOpenRSVP}
            className="rounded-sm border-2 px-10 py-2.5 text-xs uppercase tracking-[0.3em] transition hover:opacity-80"
            style={{ borderColor: border, color: colors.foreground }}
          >
            RSVP
          </button>
        </AnimatedBlock>
      </div>
    </div>
  );
}
