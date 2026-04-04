"use client";

import { AnimatedBlock } from "@/components/AnimatedBlock";
import { headingStyle } from "@/components/ThemeWrapper";
import { Calendar, MapPin } from "lucide-react";
import type { TemplateProps } from "./types";

/** Cherry blossom SVG branch drawn inline */
function CherryBlossomBranch({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 280 120"
      width={280}
      height={120}
      aria-hidden
      style={{ overflow: "visible", transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Main branch */}
      <path
        d="M10,110 Q60,80 100,60 Q140,40 180,50 Q220,60 260,40"
        fill="none"
        stroke="#7a4a38"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      {/* Sub-branches */}
      <path d="M80,68 Q90,48 100,38" fill="none" stroke="#7a4a38" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M130,52 Q138,32 148,22" fill="none" stroke="#7a4a38" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M180,50 Q185,30 192,18" fill="none" stroke="#7a4a38" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.4" />
      <path d="M220,45 Q228,28 235,16" fill="none" stroke="#7a4a38" strokeWidth="1.0" strokeLinecap="round" strokeOpacity="0.38" />

      {/* Blossoms — 5-petal flowers */}
      {([
        [100, 38, 10],
        [86, 58, 9],
        [148, 22, 11],
        [136, 42, 8],
        [192, 18, 10],
        [178, 44, 8],
        [235, 16, 9],
        [220, 40, 7],
        [260, 40, 8],
        [60, 82, 7],
        [165, 34, 6],
      ] as [number, number, number][]).map(([cx, cy, r], i) => (
        <g key={i} transform={`translate(${cx},${cy})`} opacity={0.85 + (i % 3) * 0.05}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx={0}
              cy={-r * 0.55}
              rx={r * 0.42}
              ry={r * 0.52}
              fill={i % 2 === 0 ? "#f0a0b0" : "#f8ccd8"}
              fillOpacity={0.82}
              transform={`rotate(${a})`}
            />
          ))}
          <circle cx={0} cy={0} r={r * 0.28} fill="#fce8ec" fillOpacity={0.95} />
          <circle cx={0} cy={0} r={r * 0.14} fill="#e07888" fillOpacity={0.9} />
        </g>
      ))}

      {/* Falling petals */}
      {([
        [112, 75, 14],
        [155, 62, 18],
        [200, 70, 10],
        [240, 60, 22],
        [70, 95, 16],
      ] as [number, number, number][]).map(([cx, cy, rot], i) => (
        <ellipse
          key={`p-${i}`}
          cx={cx}
          cy={cy}
          rx={4.5}
          ry={3}
          fill="#f0a0b0"
          fillOpacity={0.45}
          transform={`rotate(${rot},${cx},${cy})`}
        />
      ))}
    </svg>
  );
}

/** Ivory & Petal — ultra-minimal, cherry blossom branches top + bottom, clean typography */
export function Template13({ theme, inviteeName, couple, onOpenRSVP }: TemplateProps) {
  const { colors } = theme;
  const border = colors.border ?? colors.accent;

  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10 sm:px-8 sm:py-12"
      style={{ backgroundColor: colors.background }}
    >
      {/* Top blossom branch */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <CherryBlossomBranch />
      </div>

      {/* Bottom blossom branch (flipped) */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 z-10" style={{ transform: "translateX(-50%) rotate(180deg)" }}>
        <CherryBlossomBranch />
      </div>

      {/* Card — paper-thin, minimal */}
      <div className="relative z-[1] w-full max-w-[24rem] text-center">
        {/* Thin single border */}
        <div
          className="absolute inset-0 border"
          style={{ borderColor: `${border}55` }}
        />

        <div className="relative px-10 pb-14 pt-14 sm:px-14 sm:pb-16 sm:pt-16">
          <AnimatedBlock>
            <p
              className="text-[0.58rem] uppercase tracking-[0.5em]"
              style={{ color: colors.muted }}
            >
              An Invitation
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.08}>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px flex-1" style={{ backgroundColor: `${border}40` }} />
              <span className="text-base" style={{ color: colors.accent }}>✿</span>
              <span className="h-px flex-1" style={{ backgroundColor: `${border}40` }} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.14}>
            <p className="mt-6 text-sm" style={{ color: colors.muted }}>
              with love, to
            </p>
            <h1
              className="mt-1 text-3xl font-normal sm:text-[2.6rem]"
              style={{ ...headingStyle(theme), color: colors.accent }}
            >
              {inviteeName}
            </h1>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <p
              className="mt-8 text-[0.65rem] uppercase tracking-[0.28em]"
              style={{ color: colors.muted }}
            >
              please join us as we celebrate
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.26}>
            <p
              className="mt-5 text-[3rem] font-light leading-none sm:text-[3.4rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerA}
            </p>
            <p className="mt-2 text-2xl font-light" style={{ color: colors.accent }}>
              &amp;
            </p>
            <p
              className="mt-2 text-[3rem] font-light leading-none sm:text-[3.4rem]"
              style={headingStyle(theme)}
            >
              {couple.partnerB}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.34}>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px flex-1" style={{ backgroundColor: `${border}40` }} />
              <span className="text-base" style={{ color: colors.accent }}>✿</span>
              <span className="h-px flex-1" style={{ backgroundColor: `${border}40` }} />
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.4}>
            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: colors.accent }} />
                <p className="text-sm">{couple.date}</p>
              </div>
              <div className="flex items-start justify-center gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: colors.accent }} />
                <p className="text-sm">{couple.venue}</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.48} className="mt-9">
            <button
              type="button"
              onClick={onOpenRSVP}
              className="border px-10 py-2.5 text-xs uppercase tracking-[0.35em] transition hover:opacity-75"
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
