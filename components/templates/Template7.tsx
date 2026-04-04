"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralCornerCluster, FloralDivider, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Sunset — warm cream card with coral/orange corner roses */
export function Template7({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const palette = PALETTES.terracotta;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      {/* Warm gradient wash */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: `linear-gradient(135deg, ${colors.accent}, #fbbf24)` }}
      />

      <div
        className="relative z-[1] w-full max-w-[25rem] overflow-visible shadow-xl"
        style={{ backgroundColor: colors.surface ?? "#fff7ed" }}
      >
        {/* Border */}
        <div
          className="absolute inset-0 border-2"
          style={{ borderColor: `${border}55` }}
        />

        {/* Floral corners */}
        <div className="pointer-events-none absolute -right-8 -top-8 z-10">
          <FloralCornerCluster palette={palette} size={180} />
        </div>
        <div
          className="pointer-events-none absolute -bottom-8 -left-8 z-10"
          style={{ transform: "rotate(180deg)" }}
        >
          <FloralCornerCluster palette={palette} size={145} />
        </div>

        <div className="relative z-[1] px-10 pb-12 pt-12 text-center sm:px-12">
          <AnimatedBlock>
            <p
              className="text-[0.6rem] uppercase tracking-[0.38em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <p className="mt-6 text-sm" style={{ color: colors.muted }}>
              With love, you are invited
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
              <FloralDivider palette={palette} width={200} height={40} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <div
              className="rounded-2xl bg-gradient-to-br px-6 py-7"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}12, ${colors.surface ?? colors.background}cc)`,
              }}
            >
              <p className="text-[0.65rem] uppercase tracking-[0.22em]" style={{ color: colors.muted }}>
                With love
              </p>
              <p
                className="mt-3 text-[2.8rem] font-medium leading-none sm:text-[3.2rem]"
                style={headingStyle(theme)}
              >
                {couple.partnerA}
              </p>
              <p className="mt-2 text-2xl" style={{ color: colors.accent }}>
                &amp;
              </p>
              <p
                className="mt-2 text-[2.8rem] font-medium leading-none sm:text-[3.2rem]"
                style={headingStyle(theme)}
              >
                {couple.partnerB}
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.28}>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${colors.accent}20` }}
                >
                  <Calendar className="h-4 w-4" style={{ color: colors.accent }} />
                </div>
                <p className="text-sm">{couple.date}</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${colors.accent}20` }}
                >
                  <MapPin className="h-4 w-4" style={{ color: colors.accent }} />
                </div>
                <p className="text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.36} className="mt-9">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="w-full rounded-2xl py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition hover:brightness-105 sm:w-auto sm:px-12"
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
