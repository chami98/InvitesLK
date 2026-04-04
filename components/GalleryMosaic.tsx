"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import type { GalleryImage } from "@/lib/data";
import Image from "next/image";

type GalleryMosaicProps = {
  images: GalleryImage[];
  accentColor: string;
};

/** Responsive grid of moments — scroll-reveals with stagger. */
export function GalleryMosaic({ images, accentColor }: GalleryMosaicProps) {
  if (!images.length) return null;

  return (
    <div className="mt-12">
      <ScrollReveal y={20} className="mb-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--theme-muted)]">
          More moments
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {images.map((img, i) => (
          <ScrollReveal
            key={`${img.src}-${i}`}
            delay={i * 0.06}
            y={26}
            className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
              aria-hidden
            />
            {img.caption ? (
              <p className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-medium leading-tight text-white drop-shadow sm:text-[11px]">
                {img.caption}
              </p>
            ) : null}
            <span
              className="pointer-events-none absolute inset-x-3 top-3 h-0.5 rounded-full opacity-40"
              style={{ backgroundColor: accentColor }}
              aria-hidden
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
