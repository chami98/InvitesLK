"use client";

import type { WeddingTheme } from "@/lib/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

type EnvelopeIntroProps = {
  theme: WeddingTheme;
  partnerA: string;
  partnerB: string;
  inviteeName: string;
  reducedMotion: boolean;
  /** Called synchronously on the opening tap (a user gesture), e.g. to start music. */
  onOpenStart?: () => void;
  /** Called once the envelope has finished opening; parent should unmount this inside AnimatePresence. */
  onOpened: () => void;
};

type Phase = "closed" | "opening";

/**
 * Full-screen sealed envelope shown when the invite link is first opened.
 * Tapping breaks the wax seal, lifts the flap and slides the card out before revealing the page.
 */
export function EnvelopeIntro({
  theme,
  partnerA,
  partnerB,
  inviteeName,
  reducedMotion,
  onOpenStart,
  onOpened,
}: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [flapBehind, setFlapBehind] = useState(false);
  const { colors, fonts } = theme;
  const surface = colors.surface ?? colors.background;
  const border = colors.border ?? colors.accent;
  const headingFont = `var(${fonts.headingVar}), serif`;
  const initials = `${partnerA.charAt(0)}${partnerB.charAt(0)}`.toUpperCase();

  // Keep the page pinned to the top while the envelope is showing.
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (phase !== "opening") return;
    const t = window.setTimeout(onOpened, reducedMotion ? 150 : 2300);
    return () => window.clearTimeout(t);
  }, [phase, reducedMotion, onOpened]);

  const open = () => {
    if (phase !== "closed") return;
    onOpenStart?.();
    setPhase("opening");
  };

  const isOpening = phase === "opening";
  const t = (seconds: number) => (reducedMotion ? 0 : seconds);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
        fontFamily: `var(${fonts.bodyVar}), system-ui, sans-serif`,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.08 }}
      transition={{ duration: t(0.7), ease: easeOut }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 45%, ${colors.accent}1f 0%, transparent 70%)`,
        }}
      />

      <motion.div
        className="relative mb-10 text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={isOpening ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
        transition={{ duration: t(0.6), ease: easeOut }}
      >
        <p className="text-xs uppercase tracking-[0.35em]" style={{ color: colors.muted }}>
          {inviteeName ? `Dear ${inviteeName}` : "You're invited"}
        </p>
        <p className="mt-3 text-3xl sm:text-4xl" style={{ fontFamily: headingFont }}>
          {partnerA} &amp; {partnerB}
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={open}
        disabled={isOpening}
        aria-label="Open invitation"
        className="relative aspect-[3/2] w-[min(86vw,26rem)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
        style={{ perspective: "1200px", ["--tw-ring-color" as string]: colors.accent }}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={
          isOpening
            ? { opacity: 1, y: 60, scale: 1 }
            : { opacity: 1, y: [0, -6, 0], scale: 1 }
        }
        transition={
          isOpening
            ? { duration: t(0.8), delay: t(0.8), ease: easeOut }
            : {
                opacity: { duration: t(0.8), ease: easeOut },
                scale: { duration: t(0.8), ease: easeOut },
                y: reducedMotion
                  ? { duration: 0 }
                  : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }
        }
      >
        {/* Envelope back */}
        <div
          className="absolute inset-0 rounded-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
          style={{ backgroundColor: surface, border: `1px solid ${border}` }}
        />

        {/* Card that slides out */}
        <motion.div
          className="absolute inset-x-[6%] top-[6%] bottom-[6%] z-[2] flex flex-col items-center justify-center rounded-sm px-4 text-center shadow-md"
          style={{
            backgroundColor: colors.background,
            border: `1px solid ${border}`,
          }}
          initial={{ y: 0 }}
          animate={isOpening ? { y: "-62%" } : { y: 0 }}
          transition={{ duration: t(0.9), delay: t(0.75), ease: easeOut }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.3em] sm:text-xs"
            style={{ color: colors.muted }}
          >
            Together with their families
          </span>
          <span
            className="mt-2 text-xl leading-tight sm:text-2xl"
            style={{ fontFamily: headingFont, color: colors.foreground }}
          >
            {partnerA} &amp; {partnerB}
          </span>
          <span className="mt-2 h-px w-12" style={{ backgroundColor: colors.accent }} />
        </motion.div>

        {/* Front pocket (sides + bottom triangles) */}
        <div
          className="absolute inset-0 z-[3] rounded-md"
          style={{
            backgroundColor: surface,
            backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.05), rgba(0,0,0,0.01))",
            clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        <svg
          className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
          viewBox="0 0 300 200"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 200 L150 112 L300 200"
            fill="none"
            stroke={border}
            strokeOpacity={0.6}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Top flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[60%]"
          style={{
            zIndex: flapBehind ? 1 : 4,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          initial={{ rotateX: 0 }}
          animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: t(0.6), delay: t(0.2), ease: "easeInOut" }}
          onUpdate={(latest) => {
            if (!flapBehind && typeof latest.rotateX === "number" && latest.rotateX > 90) {
              setFlapBehind(true);
            }
          }}
          onAnimationComplete={() => {
            if (isOpening) setFlapBehind(true);
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: surface,
              backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.07))",
              clipPath: "polygon(0 0, 100% 0, 50% 94%)",
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.08))",
            }}
          />
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 300 120"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 0 L150 113 L300 0"
              fill="none"
              stroke={border}
              strokeOpacity={0.7}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>

        {/* Wax seal */}
        <motion.span
          className="absolute left-1/2 top-[56%] z-[5] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold tracking-wider text-white shadow-lg sm:h-16 sm:w-16 sm:text-base"
          style={{
            backgroundColor: colors.accent,
            backgroundImage:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(circle at 70% 75%, rgba(0,0,0,0.25), transparent 60%)",
            boxShadow: `0 0 0 3px ${colors.accent}55, 0 8px 18px rgba(0,0,0,0.25)`,
            fontFamily: headingFont,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isOpening ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={
            isOpening
              ? { duration: t(0.35), ease: "easeIn" }
              : { duration: t(0.5), delay: t(0.5), type: reducedMotion ? "tween" : "spring", bounce: 0.4 }
          }
        >
          {initials}
        </motion.span>
      </motion.button>

      <motion.p
        className="relative mt-10 text-xs uppercase tracking-[0.3em]"
        style={{ color: colors.muted }}
        initial={{ opacity: 0 }}
        animate={isOpening ? { opacity: 0 } : { opacity: [0.4, 1, 0.4] }}
        transition={
          isOpening
            ? { duration: t(0.3) }
            : reducedMotion
              ? { duration: 0 }
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }
      >
        Tap to open
      </motion.p>
    </motion.div>
  );
}
