"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralCornerCluster, FloralDivider, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Rustic — warm paper card, terracotta roses, botanical corners */
export function Template5({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;
  const palette = PALETTES.terracotta;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8 sm:py-16"
      style={{
        backgroundColor: colors.background,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23c49a6c' fill-opacity='0.07'%3E%3Cpath d='M0 20h40v1H0zM20 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E\")",
      }}
    >
      <div
        className="relative w-full max-w-[25rem] rounded-sm shadow-lg"
        style={{ backgroundColor: colors.surface ?? "#fef3c7" }}
      >
        {/* Rustic border */}
        <div
          className="absolute inset-0 rounded-sm border-2"
          style={{ borderColor: `${border}50` }}
        />
        <div
          className="absolute inset-[8px] rounded-sm border"
          style={{ borderColor: `${border}30` }}
        />

        {/* Floral corners */}
        <div className="pointer-events-none absolute -right-6 -top-6 z-10">
          <FloralCornerCluster palette={palette} size={170} />
        </div>
        <div
          className="pointer-events-none absolute -bottom-6 -left-6 z-10"
          style={{ transform: "rotate(180deg)" }}
        >
          <FloralCornerCluster palette={palette} size={140} />
        </div>

        {/* Content */}
        <div className="relative z-[1] px-10 pb-12 pt-12 text-center sm:px-12">
          <AnimatedBlock>
            <p
              className="text-[0.6rem] uppercase tracking-[0.38em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.07}>
            <div className="mt-3 flex justify-center">
              <FloralDivider palette={palette} width={180} height={38} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.12}>
            <p className="mt-2 text-sm" style={{ color: colors.muted }}>
              join us for the wedding of
            </p>
            <h1
              className="mt-5 text-[2.8rem] font-normal leading-none sm:text-[3.2rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerA}
            </h1>
            <p className="mt-2 text-2xl" style={{ color: colors.accent }}>
              &amp;
            </p>
            <p
              className="mt-2 text-[2.8rem] font-normal leading-none sm:text-[3.2rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <div className="mt-3 flex justify-center">
              <FloralDivider palette={palette} width={180} height={38} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.26}>
            <p className="mt-3 text-sm italic" style={{ color: colors.muted }}>
              You are cordially invited,{" "}
              <span style={{ color: colors.foreground }}>{inviteeName}</span>
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.32}>
            <div
              className="mx-auto mt-6 space-y-3 rounded-sm border p-5"
              style={{
                borderColor: `${border}30`,
                backgroundColor: "rgba(255,255,255,0.45)",
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

          <AnimatedBlock delay={0.4} className="mt-8">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="rounded-md border-2 px-9 py-2.5 text-xs uppercase tracking-[0.28em] transition hover:opacity-80"
              style={{ borderColor: border, color: colors.foreground }}
            >
              RSVP
            </button>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
