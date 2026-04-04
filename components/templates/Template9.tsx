"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralDivider, FloralSmallCorner, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Minimal Luxe — ultra-clean white card, delicate single corner bloom, editorial */
export function Template9({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const palette = PALETTES.blushPink;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      <div
        className="relative w-full max-w-[26rem] shadow-sm"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Minimal single border */}
        <div className="absolute inset-0 border" style={{ borderColor: `${border}50` }} />

        {/* Single accent corner — top right only for minimal feel */}
        <div className="pointer-events-none absolute -right-5 -top-5 z-10">
          <FloralSmallCorner palette={palette} size={105} />
        </div>
        {/* Subtle bottom-left */}
        <div
          className="pointer-events-none absolute -bottom-4 -left-4 z-10 opacity-70"
          style={{ transform: "rotate(180deg)" }}
        >
          <FloralSmallCorner palette={palette} size={80} />
        </div>

        <div className="relative z-[1] px-10 pb-14 pt-14 sm:px-12">
          <AnimatedBlock>
            <p
              className="text-[0.58rem] uppercase tracking-[0.45em]"
              style={{ color: colors.muted }}
            >
              — Invitation —
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <p className="mt-8 text-sm" style={{ color: colors.muted }}>
              You are cordially invited,
            </p>
            <h1
              className="mt-2 text-4xl font-bold leading-tight sm:text-5xl"
              style={headingStyle(theme)}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.14}>
            <div
              className="my-8 border-t"
              style={{ borderColor: `${border}30` }}
            />
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <p className="text-sm font-semibold tracking-tight sm:text-base" style={headingStyle(theme)}>
              {couple.partnerA}
              <span className="mx-2 font-light" style={{ color: colors.muted }}>
                ·
              </span>
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.24}>
            <div className="mt-4">
              <FloralDivider palette={palette} width={240} height={40} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.3}>
            <div className="mt-6 space-y-3">
              <div className="flex max-w-xs gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0" style={{ color: colors.muted }} />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest" style={{ color: colors.muted }}>
                    When
                  </p>
                  <p className="mt-0.5 text-sm">{couple.date}</p>
                </div>
              </div>
              <div className="flex max-w-xs gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: colors.muted }} />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest" style={{ color: colors.muted }}>
                    Where
                  </p>
                  <p className="mt-0.5 text-sm">{couple.venue}</p>
                </div>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.38}>
            <div
              className="mt-8 border-t pt-8"
              style={{ borderColor: `${border}30` }}
            >
              <button
                type="button"
                onClick={onOpenRSVP}
                className="border-b-2 pb-0.5 text-sm font-semibold uppercase tracking-widest transition hover:opacity-60"
                style={{ borderColor: colors.foreground }}
              >
                RSVP
              </button>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
