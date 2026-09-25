"use client";

import { headingStyle } from "@/components/ThemeWrapper";
import { getVenueEmbedUrl, getVenueMapsLink, type CoupleInvite, type WeddingTheme } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

type VenueMapSectionProps = {
  theme: WeddingTheme;
  templateId: number;
  couple: CoupleInvite;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function VenueMapSection({ theme, templateId, couple }: VenueMapSectionProps) {
  const isDark = [4, 8, 12, 14, 17].includes(templateId);
  const reducedMotion = useReducedMotion();
  const accent = theme.colors.accent;

  return (
    <section
      id="venue"
      aria-labelledby="venue-heading"
      className="scroll-mt-24 px-5 py-16 sm:px-10 sm:py-24"
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
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Location
          </div>

          <h2
            id="venue-heading"
            className="text-3xl font-normal sm:text-4xl lg:text-5xl"
            style={headingStyle(theme)}
          >
            The Venue
          </h2>

          {/* Ornamental rule */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 sm:w-16" style={{ backgroundColor: `${accent}50` }} />
            <span className="text-xs" style={{ color: accent }}>✦</span>
            <span className="h-px w-10 sm:w-16" style={{ backgroundColor: `${accent}50` }} />
          </div>

          <p className="max-w-md text-pretty text-sm leading-relaxed text-[color:var(--theme-muted)] sm:text-base">
            {couple.venue}
          </p>
        </motion.div>

        {/* ── Map ── */}
        <motion.div
          className="mt-10 overflow-hidden rounded-2xl border shadow-sm sm:mt-12"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : `${accent}28` }}
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          <iframe
            title={`Map of ${couple.venue}`}
            src={getVenueEmbedUrl(couple.venue)}
            className="block h-72 w-full border-0 sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        <div className="mt-8 flex justify-center">
          <a
            href={getVenueMapsLink(couple)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            style={{ backgroundColor: accent, color: isDark ? "#111" : "#fff" }}
          >
            <Navigation className="h-4 w-4" aria-hidden />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
