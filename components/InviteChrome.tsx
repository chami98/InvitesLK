"use client";

import { ArrowUp, CalendarClock, Heart, Images } from "lucide-react";
import { useEffect, useState } from "react";

type InviteChromeProps = {
  accentColor: string;
  surfaceColor: string;
  onRSVP: () => void;
};

export function InviteChrome({ accentColor, surfaceColor, onRSVP }: InviteChromeProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAgenda = () => {
    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-[140%] rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-lg ring-1 ring-black/10 transition focus:translate-y-0 focus:outline-none"
      >
        Skip to invitation
      </a>

      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden"
        style={{
          backgroundColor: surfaceColor,
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
          <button
            type="button"
            onClick={scrollToAgenda}
            className="inline-flex flex-col items-center justify-center gap-0.5 rounded-xl border border-black/10 bg-white/85 px-2 py-2.5 text-[11px] font-medium leading-tight text-neutral-800 shadow-sm backdrop-blur sm:text-xs"
          >
            <CalendarClock className="h-4 w-4 shrink-0" aria-hidden />
            Agenda
          </button>
          <button
            type="button"
            onClick={scrollToGallery}
            className="inline-flex flex-col items-center justify-center gap-0.5 rounded-xl border border-black/10 bg-white/85 px-2 py-2.5 text-[11px] font-medium leading-tight text-neutral-800 shadow-sm backdrop-blur sm:text-xs"
          >
            <Images className="h-4 w-4 shrink-0" aria-hidden />
            Photos
          </button>
          <button
            type="button"
            onClick={onRSVP}
            className="inline-flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2.5 text-[11px] font-semibold leading-tight text-white shadow-md transition hover:brightness-105 sm:text-xs"
            style={{ backgroundColor: accentColor }}
          >
            <Heart className="h-4 w-4 shrink-0" aria-hidden />
            RSVP
          </button>
        </div>
      </div>

      {showScrollTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-neutral-800 shadow-lg transition hover:bg-neutral-50 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 md:bottom-8"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      ) : null}
    </>
  );
}
