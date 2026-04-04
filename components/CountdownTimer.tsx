"use client";

import { headingStyle } from "@/components/ThemeWrapper";
import type { CoupleInvite, WeddingTheme } from "@/lib/data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CountdownTimerProps = {
  theme: WeddingTheme;
  templateId: number;
  couple: CoupleInvite;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

function parseWeddingDate(dateStr: string): Date {
  // "Saturday, June 14, 2026" → strip the weekday prefix
  const cleaned = dateStr.replace(/^[A-Za-z]+,\s*/, "");
  return new Date(cleaned);
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    isPast: false,
  };
}

// ─── Single animated number block ────────────────────────────────────────────

function CountBlock({
  value,
  label,
  accent,
  isDark,
  theme,
  reducedMotion,
}: {
  value: number;
  label: string;
  accent: string;
  isDark: boolean;
  theme: WeddingTheme;
  reducedMotion: boolean;
}) {
  const display = String(value).padStart(2, "0");
  const prevRef = useRef(display);
  const changed = prevRef.current !== display;
  useEffect(() => {
    prevRef.current = display;
  });

  return (
    <div
      className="relative flex flex-col items-center overflow-hidden rounded-2xl px-3 py-5 sm:px-5 sm:py-6"
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.08)" : `${accent}12`,
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : `${accent}28`}`,
      }}
    >
      {/* Top accent glow line */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${accent}80, transparent)` }}
        aria-hidden
      />

      {/* Number with flip animation */}
      <div className="relative h-12 w-full overflow-hidden sm:h-14" aria-live="polite" aria-atomic>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            className="absolute inset-0 flex items-center justify-center text-4xl font-normal tabular-nums sm:text-5xl"
            style={headingStyle(theme)}
            initial={reducedMotion || !changed ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 18 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label */}
      <p
        className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] sm:text-[0.65rem]"
        style={{ color: isDark ? "rgba(255,255,255,0.55)" : "var(--theme-muted)" }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function CountdownTimer({ theme, templateId, couple }: CountdownTimerProps) {
  const reducedMotion = !!useReducedMotion();
  const isDark = [4, 8, 12, 14].includes(templateId);
  const accent = theme.colors.accent;

  const target = parseWeddingDate(couple.date);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    if (timeLeft.isPast) return;
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target, timeLeft.isPast]);

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-heading"
      className="scroll-mt-24 border-t border-black/5 px-5 py-14 sm:px-10 sm:py-20"
      style={{
        backgroundColor: isDark ? "rgba(255,255,255,0.03)" : `${accent}06`,
      }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Section header */}
        <motion.div
          className="flex flex-col items-center gap-3 text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{
              color: accent,
              backgroundColor: isDark ? "rgba(255,255,255,0.08)" : `${accent}18`,
            }}
          >
            <CalendarHeart className="h-3.5 w-3.5" aria-hidden />
            Counting down
          </div>

          <h2
            id="countdown-heading"
            className="text-3xl font-normal sm:text-4xl lg:text-5xl"
            style={headingStyle(theme)}
          >
            {timeLeft.isPast ? "The big day has arrived!" : "Until the big day"}
          </h2>

          {/* Ornamental rule */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 sm:w-14" style={{ backgroundColor: `${accent}45` }} />
            <span className="text-xs" style={{ color: accent }}>✦</span>
            <span className="h-px w-10 sm:w-14" style={{ backgroundColor: `${accent}45` }} />
          </div>

          <p className="text-sm text-[color:var(--theme-muted)]">
            {couple.date} · {couple.venue}
          </p>
        </motion.div>

        {/* Countdown blocks */}
        {!timeLeft.isPast ? (
          <motion.div
            className="mt-10 grid grid-cols-4 gap-3 sm:gap-4"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {units.map(({ value, label }) => (
              <CountBlock
                key={label}
                value={value}
                label={label}
                accent={accent}
                isDark={isDark}
                theme={theme}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        ) : (
          <motion.p
            className="mt-10 text-center text-xl"
            style={{ color: accent }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            🎉 {couple.partnerA} &amp; {couple.partnerB} are officially married!
          </motion.p>
        )}

        {/* Days-only large callout */}
        {!timeLeft.isPast && (
          <motion.p
            className="mt-8 text-center text-sm text-[color:var(--theme-muted)]"
            initial={reducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            That&apos;s{" "}
            <strong style={{ color: accent }}>
              {timeLeft.days} day{timeLeft.days !== 1 ? "s" : ""}
            </strong>
            ,{" "}
            <strong style={{ color: accent }}>
              {timeLeft.hours} hour{timeLeft.hours !== 1 ? "s" : ""}
            </strong>
            , and{" "}
            <strong style={{ color: accent }}>
              {timeLeft.minutes} minute{timeLeft.minutes !== 1 ? "s" : ""}
            </strong>{" "}
            away — mark your calendar!
          </motion.p>
        )}
      </div>
    </section>
  );
}
