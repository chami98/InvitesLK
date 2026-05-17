"use client";

import { ArrowUp, CalendarClock, Heart, Images } from "lucide-react";
import { useEffect, useState } from "react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type InviteChromeProps = {
  accentColor: string;
  surfaceColor: string;
  coupleLabel: string;
  inviteeName: string;
  onRSVP: () => void;
};

export function InviteChrome({ accentColor, surfaceColor, coupleLabel, inviteeName, onRSVP }: InviteChromeProps) {
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

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const greeting = inviteeName ? `${inviteeName}, you're` : "You're";
    const message = `${greeting} invited to ${coupleLabel}'s wedding! 🎊\n\nOpen your personal invitation:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
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
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-2">
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
            onClick={shareOnWhatsApp}
            className="inline-flex flex-col items-center justify-center gap-0.5 rounded-xl border border-black/10 bg-white/85 px-2 py-2.5 text-[11px] font-medium leading-tight text-neutral-800 shadow-sm backdrop-blur sm:text-xs"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            Share
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
