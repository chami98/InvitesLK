"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type CarouselImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  accentColor: string;
  mutedColor?: string;
  /** Visual frame: matches template families */
  variant?: "classic" | "modern" | "soft" | "dark" | "minimal";
  className?: string;
  /** Autoplay interval in ms; 0 to disable */
  autoplayMs?: number;
};

const variants = {
  classic: "rounded-sm border-2 shadow-md",
  modern: "rounded-2xl border border-neutral-200/80 shadow-sm",
  soft: "rounded-3xl border border-pink-200/50 shadow-lg shadow-pink-100/40",
  dark: "rounded-xl border border-amber-400/30 shadow-2xl shadow-black/40",
  minimal: "rounded-none border-b border-neutral-300",
};

export function ImageCarousel({
  images,
  accentColor,
  mutedColor = "rgba(0,0,0,0.45)",
  variant = "modern",
  className = "",
  autoplayMs = 6500,
}: ImageCarouselProps) {
  const reduceMotion = useReducedMotion();
  const id = useId();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  const count = images.length;
  const safeIndex = count ? ((index % count) + count) % count : 0;

  const go = useCallback(
    (next: number) => {
      if (!count) return;
      const len = count;
      const current = ((index % len) + len) % len;
      const normalized = ((next % len) + len) % len;
      setDirection(normalized > current ? 1 : normalized < current ? -1 : 0);
      setIndex(normalized);
    },
    [count, index],
  );

  const next = useCallback(() => go(safeIndex + 1), [go, safeIndex]);
  const prev = useCallback(() => go(safeIndex - 1), [go, safeIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    const onKey = (e: KeyboardEvent) => {
      if (!visibleRef.current) return;
      const t = e.target;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [next, prev]);

  useEffect(() => {
    if (!autoplayMs || count <= 1 || paused || reduceMotion) return;
    const t = window.setInterval(() => {
      next();
    }, autoplayMs);
    return () => window.clearInterval(t);
  }, [autoplayMs, count, next, paused, reduceMotion]);

  if (!count) return null;

  const current = images[safeIndex];
  const frameClass = variants[variant];

  const slideX = reduceMotion ? 0 : direction === 0 ? 0 : direction > 0 ? 48 : -48;

  return (
    <div
      ref={containerRef}
      className={`relative w-full outline-none ${className}`}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photo gallery"
      aria-describedby={`${id}-live`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p id={`${id}-live`} className="sr-only" aria-live="polite">
        {`Photo ${safeIndex + 1} of ${count}${current.caption ? `. ${current.caption}` : ""}`}
      </p>
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden bg-black/5 ${frameClass}`}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current.src + safeIndex}
            custom={direction}
            initial={{ opacity: reduceMotion ? 1 : 0, x: slideX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -slideX }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (reduceMotion) return;
              if (info.offset.x < -48) next();
              if (info.offset.x > 48) prev();
            }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              priority={safeIndex === 0}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
            {current.caption ? (
              <p className="absolute bottom-0 left-0 right-0 px-4 pb-4 text-center text-sm font-medium text-white drop-shadow md:text-base">
                {current.caption}
              </p>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md backdrop-blur transition hover:bg-white md:left-3 md:h-11 md:w-11"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md backdrop-blur transition hover:bg-white md:right-3 md:h-11 md:w-11"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {images.map((_, i) => {
          const active = i === safeIndex;
          return (
            <button
              key={`${id}-dot-${i}`}
              type="button"
              className="h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                width: active ? 28 : 10,
                backgroundColor: active ? accentColor : mutedColor,
                outlineColor: accentColor,
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active}
              onClick={() => go(i)}
            />
          );
        })}
        {autoplayMs > 0 && count > 1 ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="ml-2 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur"
            aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? "Play" : "Pause"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
