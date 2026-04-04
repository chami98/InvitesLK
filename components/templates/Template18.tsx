"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import {
  GeometricKolaamFrame,
  LotusCornerDecor,
  LOTUS_PALETTES,
} from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Jasmine & Saffron — honey-cream, deep crimson & turmeric gold, kolam frame & lotus corners */
export function Template18({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const lotusPalette = LOTUS_PALETTES.jasminePink;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-14 sm:px-8 sm:py-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Geometric kolam frame behind content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <GeometricKolaamFrame
          color1={colors.accent}
          color2={border}
          width={430}
          height={630}
        />
      </div>

      {/* Corner lotus decorations */}
      <div className="pointer-events-none absolute left-1 top-1 z-10">
        <LotusCornerDecor lotusPalette={lotusPalette} size={84} />
      </div>
      <div
        className="pointer-events-none absolute right-1 top-1 z-10"
        style={{ transform: "scaleX(-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={84} />
      </div>
      <div
        className="pointer-events-none absolute bottom-1 left-1 z-10"
        style={{ transform: "scaleY(-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={64} />
      </div>
      <div
        className="pointer-events-none absolute bottom-1 right-1 z-10"
        style={{ transform: "scale(-1,-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={64} />
      </div>

      <div className="relative z-[1] flex w-full max-w-sm flex-col items-center px-6 py-4 text-center">
        <AnimatedBlock>
          <p
            className="text-[0.55rem] uppercase tracking-[0.52em]"
            style={{ color: colors.muted }}
          >
            ✿ Thali Ceremony ✿
          </p>
          <p
            className="mt-0.5 text-[0.62rem] uppercase tracking-[0.38em]"
            style={{ color: colors.muted }}
          >
            Wedding Invitation
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.08}>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-10" style={{ backgroundColor: `${border}50` }} />
            <span className="text-xs" style={{ color: border }}>
              ✦
            </span>
            <span className="h-px w-10" style={{ backgroundColor: `${border}50` }} />
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.14}>
          <p className="mt-6 text-sm leading-relaxed" style={{ color: colors.muted }}>
            With blessings, we invite
          </p>
          <h1
            className="mt-1 text-[2.6rem] font-normal leading-tight sm:text-[3.1rem]"
            style={{ ...headingStyle(theme), color: colors.foreground }}
          >
            {inviteeName}
          </h1>
        </AnimatedBlock>

        <AnimatedBlock delay={0.2}>
          <p
            className="mt-6 text-xs uppercase tracking-[0.25em]"
            style={{ color: colors.muted }}
          >
            to the joyous union of
          </p>
          <p
            className="mt-4 text-[3rem] font-normal leading-none sm:text-[3.5rem]"
            style={headingStyle(theme)}
          >
            {couple.partnerA}
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: `${border}45` }} />
            <span style={{ color: colors.accent }}>❀</span>
            <span className="h-px w-8" style={{ backgroundColor: `${border}45` }} />
          </div>
          <p
            className="mt-3 text-[3rem] font-normal leading-none sm:text-[3.5rem]"
            style={headingStyle(theme)}
          >
            {couple.partnerB}
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.3}>
          <div
            className="mx-auto mt-9 w-full space-y-3 border-t border-b py-6"
            style={{ borderColor: `${border}40` }}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: colors.accent }}
              />
              <p className="text-sm" style={{ color: colors.foreground }}>
                {couple.date}
              </p>
            </div>
            <div className="flex items-start justify-center gap-2">
              <MapPin
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                style={{ color: colors.accent }}
              />
              <p className="text-sm" style={{ color: colors.foreground }}>
                {couple.venue}
              </p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.38} className="mt-8">
          <button
            type="button"
            onClick={onOpenRSVP}
            className="rounded-full border-2 px-10 py-2.5 text-xs uppercase tracking-[0.3em] transition hover:opacity-80"
            style={{ borderColor: border, color: colors.foreground }}
          >
            RSVP
          </button>
        </AnimatedBlock>
      </div>
    </div>
  );
}
