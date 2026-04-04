"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";

type RSVPModalProps = {
  open: boolean;
  onClose: () => void;
  accentColor: string;
  foreground: string;
  surface?: string;
};

export function RSVPModal({
  open,
  onClose,
  accentColor,
  foreground,
  surface = "#ffffff",
}: RSVPModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close overlay"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: surface, color: foreground }}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6" style={{ color: accentColor }} aria-hidden />
                <h2 id="rsvp-title" className="text-xl font-semibold tracking-tight">
                  RSVP
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 transition hover:bg-black/5"
                aria-label="Close RSVP dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed opacity-90">
              Thank you for your response. Online RSVP will be available soon — for now,
              this is a preview of how guests will confirm attendance.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
