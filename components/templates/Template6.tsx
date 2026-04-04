"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralSmallCorner, FloralDivider, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Ocean — white card, sky-blue border, coral/peach corner flowers */
export function Template6({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const palette = PALETTES.coral;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sky-200/30 to-transparent" />

      <div
        className="relative z-[1] w-full max-w-[26rem] rounded-2xl shadow-lg backdrop-blur-sm"
        style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
      >
        {/* Border */}
        <div
          className="absolute inset-0 rounded-2xl border-2"
          style={{ borderColor: `${border}80` }}
        />

        {/* Corner flowers */}
        <div className="pointer-events-none absolute -right-5 -top-5 z-10">
          <FloralSmallCorner palette={palette} size={105} />
        </div>
        <div
          className="pointer-events-none absolute -bottom-5 -left-5 z-10"
          style={{ transform: "rotate(180deg)" }}
        >
          <FloralSmallCorner palette={palette} size={105} />
        </div>
        <div
          className="pointer-events-none absolute -left-5 -top-5 z-10"
          style={{ transform: "scaleX(-1)" }}
        >
          <FloralSmallCorner palette={palette} size={90} />
        </div>

        <div className="relative z-[1] px-10 pb-12 pt-12 text-center sm:px-12">
          <AnimatedBlock>
            <p
              className="text-[0.6rem] uppercase tracking-[0.38em]"
              style={{ color: colors.muted }}
            >
              Save the Date
            </p>
            <p
              className="mt-0.5 text-[0.6rem] uppercase tracking-[0.38em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <p className="mt-7 text-sm leading-relaxed" style={{ color: colors.muted }}>
              You are cordially invited,
            </p>
            <h1
              className="mt-1 text-3xl font-semibold sm:text-4xl"
              style={{ ...headingStyle(theme), color: colors.accent }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.14}>
            <div className="mt-5 flex justify-center">
              <FloralDivider palette={palette} width={220} height={40} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <p className="text-xs uppercase tracking-[0.22em]" style={{ color: colors.muted }}>
              to the wedding of
            </p>
            <p
              className="mt-4 text-[2.6rem] font-light sm:text-[3rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerA}
            </p>
            <p className="mt-1 text-xl" style={{ color: colors.muted }}>
              &amp;
            </p>
            <p
              className="mt-1 text-[2.6rem] font-light sm:text-[3rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.28}>
            <div
              className="mx-auto mt-7 rounded-xl border p-5"
              style={{
                borderColor: `${border}35`,
                backgroundColor: `${colors.background}99`,
              }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" style={{ color: border }} />
                <p className="text-sm">{couple.date}</p>
              </div>
              <div className="mt-3 flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: border }} />
                <p className="text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.36} className="mt-8">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="rounded-xl px-9 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-md transition hover:brightness-110"
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
