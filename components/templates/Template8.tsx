"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralGarland, FloralCornerCluster, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Royal — dark backdrop, lavender wreath garland at bottom (Image 4 style) */
export function Template8({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const accent = colors.accent;
  const palette = PALETTES.lavender;

  // Build couple initials monogram
  const mono = `${couple.partnerA[0]}${couple.partnerB[0]}`;

  return (
    <div
      className="relative flex min-h-dvh flex-col items-center px-4 py-10 sm:px-8 sm:py-14"
      style={{ backgroundColor: colors.background }}
    >
      {/* Top small corner accent */}
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <FloralCornerCluster palette={palette} size={130} />
      </div>

      {/* Bottom garland */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 flex justify-center overflow-hidden">
        <FloralGarland palette={palette} width={640} size={170} />
      </div>

      {/* Card */}
      <div
        className="relative z-[1] mx-auto w-full max-w-[26rem] flex-1 rounded-[2rem] border shadow-2xl backdrop-blur-sm"
        style={{
          borderColor: `${accent}35`,
          backgroundColor: `${colors.surface ?? colors.background}cc`,
        }}
      >
        <div className="px-10 pb-12 pt-12 text-center sm:px-12">
          <AnimatedBlock>
            {/* Monogram */}
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2"
              style={{ borderColor: accent, backgroundColor: `${accent}15` }}
            >
              <span
                className="text-xl font-normal"
                style={{ ...headingStyle(theme), color: accent }}
              >
                {mono}
              </span>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <p
              className="mt-5 text-[0.6rem] uppercase tracking-[0.45em]"
              style={{ color: colors.muted }}
            >
              Formal Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.14}>
            <p className="mt-8 text-sm" style={{ color: colors.muted }}>
              You are cordially invited,
            </p>
            <h1
              className="mt-1 text-3xl font-normal sm:text-4xl"
              style={{ ...headingStyle(theme), color: accent }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <div
              className="mx-auto mt-10 border-t border-b py-10"
              style={{ borderColor: `${accent}30` }}
            >
              <p
                className="text-[0.65rem] uppercase tracking-[0.3em]"
                style={{ color: colors.muted }}
              >
                The marriage of
              </p>
              <p
                className="mt-5 text-[2.8rem] font-light sm:text-[3.2rem]"
                style={headingStyle(theme)}
              >
                {couple.partnerA}
              </p>
              <p className="my-2 text-2xl" style={{ color: accent }}>
                &amp;
              </p>
              <p
                className="text-[2.8rem] font-light sm:text-[3.2rem]"
                style={headingStyle(theme)}
              >
                {couple.partnerB}
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.28}>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="text-center">
                <div
                  className="flex items-center justify-center gap-1.5"
                  style={{ color: accent }}
                >
                  <Calendar className="h-4 w-4" />
                  <span className="text-[0.6rem] uppercase tracking-widest">Date</span>
                </div>
                <p className="mt-1.5 text-sm">{couple.date}</p>
              </div>
              <div className="text-center">
                <div
                  className="flex items-center justify-center gap-1.5"
                  style={{ color: accent }}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="text-[0.6rem] uppercase tracking-widest">Venue</span>
                </div>
                <p className="mt-1.5 text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.36} className="mt-10">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="rounded-full border px-10 py-2.5 text-xs uppercase tracking-[0.3em] transition hover:bg-white/10"
              style={{ borderColor: accent, color: accent }}
            >
              RSVP
            </button>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
