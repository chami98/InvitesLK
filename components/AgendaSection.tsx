"use client";

import { headingStyle } from "@/components/ThemeWrapper";
import type { AgendaItem, CoupleInvite, WeddingTheme } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  Camera,
  Heart,
  MapPin,
  Music2,
  Sparkles,
  Star,
  UtensilsCrossed,
  Users,
  Wine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AgendaSectionProps = {
  theme: WeddingTheme;
  templateId: number;
  couple: CoupleInvite;
};

function getAgendaIcon(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("ceremon") || t.includes("vow") || t.includes("ring")) return Heart;
  if (t.includes("cocktail") || t.includes("drink") || t.includes("mingle")) return Wine;
  if (t.includes("reception") || t.includes("dinner") || t.includes("feast")) return UtensilsCrossed;
  if (t.includes("danc") || t.includes("party") || t.includes("celebrat")) return Music2;
  if (t.includes("arrival") || t.includes("welcome") || t.includes("guest")) return Users;
  if (t.includes("photo") || t.includes("portrait")) return Camera;
  if (t.includes("speech") || t.includes("toast")) return Sparkles;
  return Star;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function AgendaSection({ theme, templateId, couple }: AgendaSectionProps) {
  const { agenda } = couple;
  if (!agenda.length) return null;

  const isDark = [4, 8, 12, 14, 17].includes(templateId);
  const reducedMotion = useReducedMotion();
  const accent = theme.colors.accent;
  const surface = theme.colors.surface ?? theme.colors.background;

  return (
    <section
      id="agenda"
      aria-labelledby="agenda-heading"
      className="scroll-mt-24 px-5 py-16 sm:px-10 sm:py-24"
      style={{
        backgroundColor: isDark ? "rgba(0,0,0,0.14)" : `${accent}08`,
      }}
    >
      <div className="mx-auto max-w-4xl">
        {/* ── Section header ── */}
        <motion.div
          className="flex flex-col items-center gap-3 text-center sm:gap-4"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{
              color: accent,
              backgroundColor: isDark ? "rgba(255,255,255,0.08)" : `${accent}18`,
            }}
          >
            <CalendarClock className="h-3.5 w-3.5" aria-hidden />
            Day-of Schedule
          </div>

          <h2
            id="agenda-heading"
            className="text-3xl font-normal sm:text-4xl lg:text-5xl"
            style={headingStyle(theme)}
          >
            The Agenda
          </h2>

          {/* Ornamental rule */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 sm:w-16" style={{ backgroundColor: `${accent}50` }} />
            <span className="text-xs" style={{ color: accent }}>✦</span>
            <span className="h-px w-10 sm:w-16" style={{ backgroundColor: `${accent}50` }} />
          </div>

          <p className="max-w-md text-pretty text-sm leading-relaxed text-[color:var(--theme-muted)] sm:text-base">
            Here&apos;s how we&apos;ll celebrate — times are a guide and we&apos;ll keep things wonderfully relaxed.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative mt-14 sm:mt-16">
          {/* Vertical rail — left on mobile, centered on md+ */}
          <div
            className="pointer-events-none absolute bottom-0 top-0 w-px left-[0.9375rem] md:left-1/2 md:-translate-x-px"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${accent}55 8%, ${accent}55 92%, transparent 100%)`,
            }}
            aria-hidden
          />

          <ol className="relative m-0 list-none p-0">
            {agenda.map((item, i) => {
              const Icon = getAgendaIcon(item.title);
              const isLeft = i % 2 === 0; // desktop: left side card

              return (
                <motion.li
                  key={`${item.time}-${item.title}-${i}`}
                  className={`relative mb-8 last:mb-0 sm:mb-10`}
                  initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease }}
                >
                  {/* Dot on the rail */}
                  <div
                    className="absolute left-[0.9375rem] top-5 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                    aria-hidden
                  >
                    {/* Ping ring */}
                    <span
                      className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-[0.18]"
                      style={{ backgroundColor: accent }}
                    />
                    {/* Dot circle */}
                    <span
                      className="relative z-10 flex h-[1.875rem] w-[1.875rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-md"
                      style={{
                        borderColor: accent,
                        backgroundColor: surface,
                        color: accent,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>

                  {/* Card — mobile: indent right of dot; desktop: left or right half */}
                  <div
                    className={[
                      "ml-10 md:ml-0",
                      "md:w-[calc(50%-3rem)]",
                      isLeft ? "md:mr-auto md:pl-0 md:pr-0" : "md:ml-auto",
                    ].join(" ")}
                  >
                    <TimelineCard item={item} theme={theme} isDark={isDark} accent={accent} isLeft={isLeft} />
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* End cap dot */}
          <div
            className="pointer-events-none absolute -bottom-0.5 left-[0.9375rem] h-2 w-2 -translate-x-1/2 rounded-full md:left-1/2"
            style={{ backgroundColor: `${accent}55` }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  theme,
  isDark,
  accent,
  isLeft,
}: {
  item: AgendaItem;
  theme: WeddingTheme;
  isDark: boolean;
  accent: string;
  isLeft: boolean;
}) {
  return (
    <div
      className={[
        "group relative rounded-2xl border p-5 shadow-sm",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
        "sm:p-6",
      ].join(" ")}
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.065)" : "rgba(255,255,255,0.9)",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : `${accent}28`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Accent top-border glow on hover */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
        aria-hidden
      />

      {/* Time badge */}
      <p
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.2em]"
        style={{ color: accent, backgroundColor: `${accent}14` }}
      >
        <CalendarClock className="h-3 w-3" aria-hidden />
        {item.time}
      </p>

      {/* Title */}
      <p
        className="mt-2.5 text-lg font-medium leading-snug sm:text-xl"
        style={headingStyle(theme)}
      >
        {item.title}
      </p>

      {/* Description */}
      {item.description ? (
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--theme-muted)]">
          {item.description}
        </p>
      ) : null}

      {/* Location */}
      {item.location ? (
        <p
          className="mt-3 flex items-start gap-1.5 text-xs text-[color:var(--theme-muted)]"
        >
          <MapPin
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            style={{ color: accent }}
            aria-hidden
          />
          {item.location}
        </p>
      ) : null}

      {/* Connector arrow pointing toward center rail */}
      <span
        className={[
          "pointer-events-none absolute top-5 hidden h-3 w-3 rotate-45 border md:block",
          isLeft
            ? "right-[-0.375rem] border-t-0 border-l-0"
            : "left-[-0.375rem] border-b-0 border-r-0",
        ].join(" ")}
        style={{
          backgroundColor: isDark ? "rgba(255,255,255,0.065)" : "rgba(255,255,255,0.9)",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : `${accent}28`,
        }}
        aria-hidden
      />
    </div>
  );
}
