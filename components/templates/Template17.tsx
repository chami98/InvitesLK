"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { LotusCornerDecor, LotusWreath, LOTUS_PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Kandyan Heritage — deep lacquer red & gold, lotus wreaths, regal opulence */
export function Template17({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const lotusPalette = LOTUS_PALETTES.kandyanRed;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-12 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      {/* Corner lotus decorations */}
      <div className="pointer-events-none absolute left-2 top-2 z-10">
        <LotusCornerDecor lotusPalette={lotusPalette} size={100} />
      </div>
      <div
        className="pointer-events-none absolute right-2 top-2 z-10"
        style={{ transform: "scaleX(-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={100} />
      </div>
      <div
        className="pointer-events-none absolute bottom-2 left-2 z-10"
        style={{ transform: "scaleY(-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={78} />
      </div>
      <div
        className="pointer-events-none absolute bottom-2 right-2 z-10"
        style={{ transform: "scale(-1,-1)" }}
      >
        <LotusCornerDecor lotusPalette={lotusPalette} size={78} />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-[28rem] overflow-visible">
        {/* Double gold border */}
        <div
          className="absolute inset-0 border-2"
          style={{ borderColor: border, zIndex: 0 }}
        />
        <div
          className="absolute inset-[10px] border"
          style={{ borderColor: `${border}70`, zIndex: 0 }}
        />

        {/* Very faint lotus wreath — decorative only, not over names */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
          <LotusWreath lotusPalette={lotusPalette} size={360} />
        </div>

        <div className="relative z-[1] px-10 pb-14 pt-10 text-center sm:px-12">
          {/* ── Header label ── */}
          <AnimatedBlock>
            <p
              className="text-[0.72rem] font-semibold uppercase tracking-[0.35em]"
              style={{ color: colors.accent }}
            >
              Kandyan Wedding
            </p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ backgroundColor: `${colors.accent}70` }} />
              <span style={{ color: colors.accent }}>✦</span>
              <span className="h-px w-10" style={{ backgroundColor: `${colors.accent}70` }} />
            </div>
          </AnimatedBlock>

          {/* ── Invitee ── */}
          <AnimatedBlock delay={0.1}>
            <p
              className="mt-7 text-[0.82rem] uppercase tracking-[0.22em]"
              style={{ color: `${colors.foreground}cc` }}
            >
              With great honour, we invite
            </p>
            <h1
              className="mt-2 text-[2.1rem] font-normal leading-tight sm:text-[2.6rem]"
              style={{ ...headingStyle(theme), color: colors.accent }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          {/* ── Couple names ── */}
          <AnimatedBlock delay={0.18}>
            <div
              className="mx-auto mt-8 border-t border-b py-8"
              style={{ borderColor: `${colors.accent}65` }}
            >
              <p
                className="text-[0.72rem] uppercase tracking-[0.18em]"
                style={{ color: colors.accent }}
              >
                Poruwa Ceremony of
              </p>
              <p
                className="mt-5 text-[3rem] font-normal leading-none sm:text-[3.4rem]"
                style={{ ...headingStyle(theme), color: colors.foreground }}
              >
                {couple.partnerA}
              </p>
              <div className="mt-3 flex items-center justify-center gap-3">
                <span className="h-px w-8" style={{ backgroundColor: `${colors.accent}80` }} />
                <span style={{ color: colors.accent }}>✦</span>
                <span className="h-px w-8" style={{ backgroundColor: `${colors.accent}80` }} />
              </div>
              <p
                className="mt-3 text-[3rem] font-normal leading-none sm:text-[3.4rem]"
                style={{ ...headingStyle(theme), color: colors.foreground }}
              >
                {couple.partnerB}
              </p>
            </div>
          </AnimatedBlock>

          {/* ── Date & venue ── */}
          <AnimatedBlock delay={0.26}>
            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: colors.accent }} />
                <p className="text-[0.85rem]" style={{ color: colors.foreground }}>
                  {couple.date}
                </p>
              </div>
              <div className="flex items-start justify-center gap-2">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  style={{ color: colors.accent }}
                />
                <p className="text-[0.85rem]" style={{ color: colors.foreground }}>
                  {couple.venue}
                </p>
              </div>
            </div>
          </AnimatedBlock>

          {/* ── RSVP ── */}
          <AnimatedBlock delay={0.34} className="mt-10">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="border-2 px-10 py-2.5 text-xs font-semibold uppercase tracking-[0.32em] transition hover:bg-white/5"
              style={{ borderColor: colors.accent, color: colors.foreground }}
            >
              RSVP
            </button>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
