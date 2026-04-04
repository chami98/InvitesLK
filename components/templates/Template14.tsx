"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { FloralCornerCluster, FloralDivider, PALETTES } from "@/components/FloralSvg";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Gold filigree corner ornament drawn inline */
function FiligreeCorner({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden style={{ overflow: "visible" }}>
      <path
        d="M2,2 L30,2 M2,2 L2,30"
        stroke="#d4af37"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.7"
        fill="none"
      />
      <path
        d="M8,2 Q8,8 2,8"
        stroke="#d4af37"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeOpacity="0.5"
        fill="none"
      />
      <path
        d="M18,2 Q18,14 10,18 Q4,20 2,18"
        stroke="#d4af37"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.45"
        fill="none"
      />
      <circle cx="30" cy="2" r="1.8" fill="#d4af37" fillOpacity="0.6" />
      <circle cx="2" cy="30" r="1.8" fill="#d4af37" fillOpacity="0.6" />
      <circle cx="2" cy="2" r="2.5" fill="#d4af37" fillOpacity="0.55" />
    </svg>
  );
}

/** Velvet Noir — deep wine/burgundy, gold filigree corners, rose clusters, Fraunces font */
export function Template14({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const gold = colors.accent;
  const palette = PALETTES.burgundy;

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center px-4 py-12 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      {/* Rose corner clusters */}
      <div className="pointer-events-none absolute -right-4 -top-4 z-10">
        <FloralCornerCluster palette={palette} size={180} />
      </div>
      <div
        className="pointer-events-none absolute -bottom-4 -left-4 z-10"
        style={{ transform: "rotate(180deg)" }}
      >
        <FloralCornerCluster palette={palette} size={150} />
      </div>

      {/* Card */}
      <div
        className="relative z-[1] w-full max-w-[26rem] shadow-[0_0_60px_rgba(212,175,55,0.08)]"
        style={{ backgroundColor: colors.surface }}
      >
        {/* Outer gold border */}
        <div
          className="absolute inset-0 border-2 pointer-events-none"
          style={{ borderColor: `${gold}40` }}
        />
        {/* Inner gold border */}
        <div
          className="absolute inset-[10px] border pointer-events-none"
          style={{ borderColor: `${gold}22` }}
        />

        {/* Filigree at all four inner corners */}
        <div className="pointer-events-none absolute left-3 top-3 z-20">
          <FiligreeCorner size={52} />
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-20" style={{ transform: "scaleX(-1)" }}>
          <FiligreeCorner size={52} />
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 z-20" style={{ transform: "scaleY(-1)" }}>
          <FiligreeCorner size={52} />
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 z-20" style={{ transform: "scale(-1,-1)" }}>
          <FiligreeCorner size={52} />
        </div>

        <div className="relative z-[1] px-10 pb-14 pt-12 text-center sm:px-12">
          <AnimatedBlock>
            <p
              className="text-[0.58rem] uppercase tracking-[0.5em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.07}>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8" style={{ backgroundColor: `${gold}40` }} />
              <span className="text-xs" style={{ color: gold }}>✦</span>
              <span className="h-px w-8" style={{ backgroundColor: `${gold}40` }} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.12}>
            <p className="mt-6 text-sm" style={{ color: colors.muted }}>
              You are cordially invited,
            </p>
            <h1
              className="mt-1 text-3xl font-normal sm:text-4xl"
              style={{ ...headingStyle(theme), color: gold }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.18}>
            <div className="mt-7 flex justify-center">
              <FloralDivider palette={palette} width={200} height={36} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.22}>
            <p
              className="mt-4 text-[0.62rem] uppercase tracking-[0.28em]"
              style={{ color: colors.muted }}
            >
              To celebrate the marriage of
            </p>
            <p
              className="mt-5 text-[2.8rem] font-normal leading-none sm:text-[3.2rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerA}
            </p>
            <p className="mt-2 text-xl" style={{ color: gold }}>
              &amp;
            </p>
            <p
              className="mt-2 text-[2.8rem] font-normal leading-none sm:text-[3.2rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.3}>
            <div className="mt-6 flex justify-center">
              <FloralDivider palette={palette} width={200} height={36} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.36}>
            <div
              className="mx-auto mt-7 space-y-3 border-t border-b py-6"
              style={{ borderColor: `${gold}22` }}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: gold }} />
                <p className="text-sm">{couple.date}</p>
              </div>
              <div className="flex items-start justify-center gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: gold }} />
                <p className="text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.44} className="mt-9">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="border-2 px-10 py-2.5 text-xs uppercase tracking-[0.32em] transition hover:bg-white/5"
              style={{ borderColor: `${gold}70`, color: gold }}
            >
              RSVP
            </button>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
