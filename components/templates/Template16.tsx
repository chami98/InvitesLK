"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import {
  LotusCornerDecor,
  OilLampSvg,
  TraditionalBorderFrame,
  LOTUS_PALETTES,
} from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Poruwa Gold — warm ivory, saffron & deep maroon, traditional lotus border with oil lamp */
export function Template16({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const lotusPalette = LOTUS_PALETTES.saffronGold;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-14 sm:px-8 sm:py-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Traditional border frame — behind all content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <TraditionalBorderFrame
          accent={border}
          secondary={colors.accent}
          lotusPalette={lotusPalette}
          width={420}
          height={630}
        />
      </div>

      {/* All-four-corner lotus accents */}
      <div className="pointer-events-none absolute left-1 top-1 z-10">
        <LotusCornerDecor lotusPalette={lotusPalette} size={88} />
      </div>
      <div
        className="pointer-events-none absolute right-1 top-1 z-10"
        style={{ transform: "scaleX(-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={88} />
      </div>
      <div
        className="pointer-events-none absolute bottom-1 left-1 z-10"
        style={{ transform: "scaleY(-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={68} />
      </div>
      <div
        className="pointer-events-none absolute bottom-1 right-1 z-10"
        style={{ transform: "scale(-1,-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={68} />
      </div>

      <div className="relative z-[1] flex w-full max-w-sm flex-col items-center text-center">
        {/* Oil lamp */}
        <AnimatedBlock>
          <div className="flex justify-center">
            <OilLampSvg color={border} flame={colors.accent} width={58} height={92} />
          </div>
          <p
            className="mt-2 text-[0.55rem] uppercase tracking-[0.5em]"
            style={{ color: colors.muted }}
          >
            ✦ Poruwa Ceremony ✦
          </p>
          <p
            className="mt-0.5 text-[0.62rem] uppercase tracking-[0.38em]"
            style={{ color: colors.muted }}
          >
            Wedding Invitation
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.08}>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: `${border}50` }} />
            <span className="text-xs" style={{ color: colors.accent }}>
              ❋
            </span>
            <span className="h-px w-10" style={{ backgroundColor: `${border}50` }} />
          </div>
        </AnimatedBlock>

        <AnimatedBlock delay={0.14}>
          <p className="mt-6 text-sm leading-relaxed" style={{ color: colors.muted }}>
            You are joyfully invited,
          </p>
          <h1
            className="mt-1 text-[2.2rem] font-normal leading-tight sm:text-[2.6rem]"
            style={{ ...headingStyle(theme), color: colors.foreground }}
          >
            {inviteeName}
          </h1>
        </AnimatedBlock>

        <AnimatedBlock delay={0.2}>
          <p
            className="mt-7 text-[0.68rem] uppercase tracking-[0.3em]"
            style={{ color: colors.muted }}
          >
            to the auspicious union of
          </p>
          <p
            className="mt-4 text-[3rem] font-normal leading-none sm:text-[3.4rem]"
            style={headingStyle(theme)}
          >
            {couple.partnerA}
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: `${border}40` }} />
            <span className="text-sm" style={{ color: colors.accent }}>
              ❀
            </span>
            <span className="h-px w-8" style={{ backgroundColor: `${border}40` }} />
          </div>
          <p
            className="mt-3 text-[3rem] font-normal leading-none sm:text-[3.4rem]"
            style={headingStyle(theme)}
          >
            {couple.partnerB}
          </p>
        </AnimatedBlock>

        <AnimatedBlock delay={0.3}>
          <div
            className="mx-auto mt-9 space-y-3 border-t border-b py-6"
            style={{ borderColor: `${border}40` }}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: colors.accent }} />
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
            className="border-2 px-10 py-2.5 text-xs uppercase tracking-[0.3em] transition hover:opacity-80"
            style={{ borderColor: border, color: colors.foreground }}
          >
            RSVP
          </button>
        </AnimatedBlock>
      </div>
    </div>
  );
}
