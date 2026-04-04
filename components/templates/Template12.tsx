"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Celestial — deep midnight navy, inline star SVG, gold accents, Cinzel font */
export function Template12({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const gold = colors.accent;
  const mono = `${couple.partnerA[0]}${couple.partnerB[0]}`;

  const stars = [
    [8, 12], [18, 5], [30, 20], [45, 8], [55, 18], [70, 4], [82, 14], [92, 7],
    [5, 30], [15, 45], [25, 38], [38, 50], [50, 35], [62, 48], [75, 32], [88, 42],
    [3, 60], [20, 72], [35, 65], [48, 78], [60, 60], [73, 70], [85, 62], [95, 75],
    [10, 85], [28, 90], [42, 82], [58, 92], [72, 85], [90, 88],
    [12, 95], [35, 97], [55, 94], [78, 96],
  ] as [number, number][];

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12 sm:px-8 sm:py-16"
      style={{ backgroundColor: colors.background }}
    >
      {/* Starfield layer */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        {stars.map(([cx, cy], i) => {
          const size = i % 5 === 0 ? 0.55 : i % 3 === 0 ? 0.35 : 0.22;
          const opacity = 0.3 + (i % 7) * 0.1;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={size}
              fill={i % 4 === 0 ? gold : "#dde4f5"}
              fillOpacity={opacity}
            />
          );
        })}
        {/* A few 4-pointed sparkle stars */}
        {([[20, 25], [60, 15], [80, 55], [40, 80]] as [number, number][]).map(([cx, cy], i) => (
          <g key={`sp-${i}`} transform={`translate(${cx},${cy})`} opacity={0.55}>
            <path
              d={`M0,-1.2 L0.22,-0.22 L1.2,0 L0.22,0.22 L0,1.2 L-0.22,0.22 L-1.2,0 L-0.22,-0.22Z`}
              fill={gold}
            />
          </g>
        ))}
        {/* Thin constellation lines */}
        <line x1="18" y1="5" x2="30" y2="20" stroke="#3a5090" strokeWidth="0.15" strokeOpacity="0.4" />
        <line x1="30" y1="20" x2="45" y2="8" stroke="#3a5090" strokeWidth="0.15" strokeOpacity="0.4" />
        <line x1="45" y1="8" x2="55" y2="18" stroke="#3a5090" strokeWidth="0.15" strokeOpacity="0.4" />
        <line x1="62" y1="48" x2="75" y2="32" stroke="#3a5090" strokeWidth="0.15" strokeOpacity="0.35" />
        <line x1="75" y1="32" x2="88" y2="42" stroke="#3a5090" strokeWidth="0.15" strokeOpacity="0.35" />
      </svg>

      {/* Card */}
      <div
        className="relative z-[1] w-full max-w-[26rem] border shadow-2xl"
        style={{
          backgroundColor: `${colors.surface}e8`,
          borderColor: `${colors.border}60`,
        }}
      >
        {/* Outer gold frame */}
        <div
          className="absolute inset-0 border pointer-events-none"
          style={{ borderColor: `${gold}25` }}
        />
        <div
          className="absolute inset-[10px] border pointer-events-none"
          style={{ borderColor: `${gold}18` }}
        />

        <div className="px-10 pb-12 pt-12 text-center sm:px-12">
          {/* Monogram circle */}
          <AnimatedBlock>
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2"
              style={{
                borderColor: `${gold}60`,
                background: `radial-gradient(circle, ${colors.surface} 60%, ${colors.background} 100%)`,
              }}
            >
              <span
                className="text-2xl tracking-widest"
                style={{ ...headingStyle(theme), color: gold }}
              >
                {mono}
              </span>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <p
              className="mt-5 text-[0.55rem] uppercase tracking-[0.55em]"
              style={{ color: colors.muted }}
            >
              Wedding Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.14}>
            <p className="mt-7 text-sm" style={{ color: colors.muted }}>
              You are invited,
            </p>
            <h1
              className="mt-1 text-2xl font-normal tracking-wider sm:text-3xl"
              style={{ ...headingStyle(theme), color: gold }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <div
              className="mx-auto mt-10 border-t border-b py-9"
              style={{ borderColor: `${gold}28` }}
            >
              <p
                className="text-[0.58rem] uppercase tracking-[0.38em]"
                style={{ color: colors.muted }}
              >
                The Marriage of
              </p>
              <p
                className="mt-5 text-[2.6rem] font-normal uppercase tracking-[0.18em] leading-none sm:text-[3rem]"
                style={headingStyle(theme)}
              >
                {couple.partnerA}
              </p>
              <div className="my-3 flex items-center justify-center gap-3">
                <span className="h-px w-8 opacity-30" style={{ backgroundColor: gold }} />
                <span className="text-sm" style={{ color: gold }}>✦</span>
                <span className="h-px w-8 opacity-30" style={{ backgroundColor: gold }} />
              </div>
              <p
                className="text-[2.6rem] font-normal uppercase tracking-[0.18em] leading-none sm:text-[3rem]"
                style={headingStyle(theme)}
              >
                {couple.partnerB}
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.28}>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0" style={{ color: gold }} />
                <div className="text-left">
                  <p
                    className="text-[0.55rem] uppercase tracking-[0.3em]"
                    style={{ color: colors.muted }}
                  >
                    Date
                  </p>
                  <p className="mt-0.5 text-xs">{couple.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: gold }} />
                <div className="text-left">
                  <p
                    className="text-[0.55rem] uppercase tracking-[0.3em]"
                    style={{ color: colors.muted }}
                  >
                    Venue
                  </p>
                  <p className="mt-0.5 text-xs">{couple.venue}</p>
                </div>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.36} className="mt-10">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="border px-12 py-3 text-xs uppercase tracking-[0.4em] transition hover:bg-white/5"
              style={{ borderColor: `${gold}60`, color: gold }}
            >
              RSVP
            </button>
          </AnimatedBlock>
        </div>
      </div>
    </div>
  );
}
