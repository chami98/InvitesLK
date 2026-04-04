"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralWreath, FloralDivider, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Garden — green botanical wreath, white roses with lush greenery */
export function Template10({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const palette = PALETTES.botanical;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12 sm:px-8 sm:py-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Radial gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent" />

      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        {/* Botanical wreath centered behind content */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <FloralWreath palette={palette} size={360} gapDeg={100} />
        </div>

        <div className="relative z-[1] w-full px-6 py-4 sm:px-10">
          {/* Sprout / garden badge */}
          <AnimatedBlock>
            <div className="flex justify-center">
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2"
                style={{ borderColor: `${border}40`, backgroundColor: "rgba(255,255,255,0.8)" }}
              >
                <span className="text-xl" style={{ color: colors.accent }}>
                  ✿
                </span>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.07}>
            <p
              className="mt-4 text-[0.6rem] uppercase tracking-[0.4em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.12}>
            <p className="mt-5 text-sm" style={{ color: colors.muted }}>
              You are cordially invited,
            </p>
            <h1
              className="mt-1 text-3xl font-normal sm:text-4xl"
              style={{ ...headingStyle(theme), color: colors.foreground }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.18}>
            <div className="mt-4 flex justify-center">
              <FloralDivider palette={palette} width={200} height={40} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.24}>
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: colors.muted }}>
              Together with family &amp; friends
            </p>
            <p
              className="mt-4 text-[2.6rem] font-normal leading-none sm:text-[3rem]"
              style={{ ...headingStyle(theme), color: colors.accent }}
            >
              {couple.partnerA}
            </p>
            <p className="mt-2 text-xl" style={{ color: colors.muted }}>
              &amp;
            </p>
            <p
              className="mt-2 text-[2.6rem] font-normal leading-none sm:text-[3rem]"
              style={{ ...headingStyle(theme), color: colors.accent }}
            >
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.3}>
            <div className="mt-4 flex justify-center">
              <FloralDivider palette={palette} width={200} height={40} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.36}>
            <div
              className="mt-4 space-y-3 rounded-2xl border p-5 backdrop-blur-sm"
              style={{
                borderColor: `${border}30`,
                backgroundColor: "rgba(255,255,255,0.72)",
              }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" style={{ color: colors.accent }} />
                <p className="text-sm">{couple.date}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: colors.accent }} />
                <p className="text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.44} className="mt-8">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="rounded-full px-10 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-white shadow-md transition hover:brightness-105"
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
