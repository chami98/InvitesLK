"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";

const TRACK_SRC = "/music/ordinary.mp3";
const TARGET_VOLUME = 0.5;

export type BackgroundMusicHandle = {
  /** Must be called from inside a user gesture (e.g. the envelope tap) so browsers allow playback. */
  start: () => void;
};

type BackgroundMusicProps = {
  ref?: Ref<BackgroundMusicHandle>;
  accentColor: string;
  /** Show the mute toggle (hidden while the envelope is still closed). */
  showToggle: boolean;
};

/**
 * Looping background track for the invitation, with a floating play/mute toggle.
 * Playback begins when the guest opens the envelope and fades in gently.
 */
export function BackgroundMusic({ ref, accentColor, showToggle }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  // Whether the guest wants music on; used to resume after the tab becomes visible again.
  const wantsMusicRef = useRef(false);

  const fadeIn = (audio: HTMLAudioElement) => {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    audio.volume = 0;
    fadeRef.current = window.setInterval(() => {
      const next = Math.min(TARGET_VOLUME, audio.volume + 0.025);
      audio.volume = next;
      if (next >= TARGET_VOLUME && fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 80);
  };

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    wantsMusicRef.current = true;
    audio
      .play()
      .then(() => fadeIn(audio))
      .catch(() => {
        // Autoplay blocked — the toggle stays available so the guest can start it manually.
        wantsMusicRef.current = false;
      });
  };

  const pause = () => {
    wantsMusicRef.current = false;
    audioRef.current?.pause();
  };

  useImperativeHandle(ref, () => ({ start: play }));

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) audio.pause();
      else if (wantsMusicRef.current) audio.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <AnimatePresence>
        {showToggle ? (
          <motion.button
            key="music-toggle"
            type="button"
            onClick={playing ? pause : play}
            aria-label={playing ? "Mute music" : "Play music"}
            aria-pressed={playing}
            className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-neutral-800 shadow-lg backdrop-blur transition hover:bg-white"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {playing ? (
              <span className="relative flex items-center justify-center">
                <motion.span
                  className="absolute h-9 w-9 rounded-full"
                  style={{ border: `1.5px solid ${accentColor}` }}
                  animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  aria-hidden
                />
                <Music className="h-5 w-5" style={{ color: accentColor }} aria-hidden />
              </span>
            ) : (
              <VolumeX className="h-5 w-5" aria-hidden />
            )}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
