"use client";

import { FloralSmallCorner, FloralCornerCluster, PALETTES } from "@/components/FloralSvg";
import { MOCK_COUPLES, WEDDING_TEMPLATES } from "@/lib/data";
import Link from "next/link";

// Palette for each template's card preview
const TEMPLATE_PALETTES: Record<number, keyof typeof PALETTES> = {
  1: "burgundy",
  2: "blushPink",
  3: "deepPink",
  4: "creamGold",
  5: "terracotta",
  6: "coral",
  7: "terracotta",
  8: "lavender",
  9: "blushPink",
  10: "botanical",
  11: "botanical",
  12: "lavender",
  13: "blushPink",
  14: "burgundy",
  15: "creamGold",
};

// One sample invitee per template
const SAMPLE_NAMES: Record<string, string> = {
  "supun-thilini": "Mr.+%26+Mrs.+Perera",
  "kasun-dilrukshi": "Nuwan+Silva",
  "damsarani-supun": "Mr.+%26+Mrs.+Rodrigo",
  "nuwan-sachini": "Chaminda+Jayawardena",
  "ishara-chamara": "The+Wickramasinghe+Family",
  "dinesh-priyanka": "Dr.+Rajan+%26+Family",
  "roshan-hansika": "Amali+Fernando",
  "asela-manasha": "Mr.+%26+Mrs.+Dissanayake",
  "tharaka-sandali": "Saman+Bandara",
  "pasan-hiruni": "The+Rajapaksa+Family",
  "chamari-dilantha": "Nimesha+%26+Rohan",
  "ravindu-amaya": "The+Fernando+Family",
  "kavindi-shehan": "Dr.+Priyantha+%26+Family",
  "malinda-sithara": "Mr.+%26+Mrs.+Wijeratne",
  "thilina-devindi": "Kavinga+Senanayake",
};

export default function Home() {
  return (
    <div className="min-h-dvh bg-stone-100 text-stone-900">
      {/* ── Hero header ── */}
      <header className="border-b border-stone-200 bg-white px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-stone-400">
          Digital Wedding Invitations
        </p>
        <h1
          className="mt-3 text-5xl font-normal leading-none tracking-wide text-stone-900 sm:text-6xl"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          InvitesLK
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-stone-300" />
          <span className="text-stone-400">✦</span>
          <span className="h-px w-12 bg-stone-300" />
        </div>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
          Choose Your Template
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          15 beautiful designs — each a personalised digital invitation
          <br className="hidden sm:block" /> your guests open on any device.
        </p>
      </header>

      {/* ── Template gallery ── */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_COUPLES.map((couple) => {
            const theme = WEDDING_TEMPLATES[couple.templateId];
            if (!theme) return null;
            const palette = PALETTES[TEMPLATE_PALETTES[couple.templateId]];
            const inviteQuery = SAMPLE_NAMES[couple.slug] ?? "Guest";
            const href = `/${couple.slug}?invite=${inviteQuery}`;
            const border = theme.colors.border ?? theme.colors.accent;
            const useLargeCorner = [1, 3, 5, 7, 14].includes(couple.templateId);

            return (
              <div
                key={couple.slug}
                className="group relative block overflow-visible focus-visible:outline-none"
              >
                {/* Invisible cover link — whole card navigates to invitation */}
                <Link
                  href={href}
                  className="absolute inset-0 z-[1]"
                  aria-label={`View ${theme.name} invitation — ${couple.partnerA} & ${couple.partnerB}`}
                />
                {/* Outer hover lift */}
                <div className="relative transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
                  {/* Floral corner decoration */}
                  <div className="pointer-events-none absolute -right-5 -top-5 z-20">
                    {useLargeCorner ? (
                      <FloralCornerCluster palette={palette} size={100} />
                    ) : (
                      <FloralSmallCorner palette={palette} size={90} />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="relative flex flex-col overflow-hidden"
                    style={{
                      backgroundColor: theme.colors.background,
                      minHeight: "20rem",
                    }}
                  >
                    {/* Double border */}
                    <div
                      className="absolute inset-0 border-2 border-double pointer-events-none z-10"
                      style={{ borderColor: border }}
                    />
                    <div
                      className="absolute inset-[8px] border pointer-events-none z-10 opacity-50"
                      style={{ borderColor: border }}
                    />

                    {/* Template name pill */}
                    <div className="relative z-[1] px-5 pt-5">
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.2em]"
                        style={{
                          backgroundColor: `${theme.colors.accent}18`,
                          color: theme.colors.accent,
                        }}
                      >
                        {theme.name}
                      </span>
                    </div>

                    {/* Invitation content preview */}
                    <div
                      className="relative z-[1] flex flex-1 flex-col items-center justify-center px-6 py-8 text-center"
                    >
                      <p
                        className="text-[0.62rem] uppercase tracking-[0.3em]"
                        style={{ color: theme.colors.muted }}
                      >
                        Wedding Invitation
                      </p>

                      {/* Ornamental rule */}
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className="h-px w-6"
                          style={{ backgroundColor: `${border}60` }}
                        />
                        <span className="text-[0.5rem]" style={{ color: border }}>
                          ✦
                        </span>
                        <span
                          className="h-px w-6"
                          style={{ backgroundColor: `${border}60` }}
                        />
                      </div>

                      {/* Couple names */}
                      <p
                        className="mt-3 text-[1.6rem] font-normal leading-tight sm:text-[1.75rem]"
                        style={{
                          fontFamily: `var(${theme.fonts.headingVar}), serif`,
                          color: theme.colors.foreground,
                        }}
                      >
                        {couple.partnerA}
                      </p>
                      <p
                        className="mt-0.5 text-sm"
                        style={{ color: theme.colors.accent }}
                      >
                        &amp;
                      </p>
                      <p
                        className="mt-0.5 text-[1.6rem] font-normal leading-tight sm:text-[1.75rem]"
                        style={{
                          fontFamily: `var(${theme.fonts.headingVar}), serif`,
                          color: theme.colors.foreground,
                        }}
                      >
                        {couple.partnerB}
                      </p>

                      {/* Date */}
                      <p
                        className="mt-4 text-[0.68rem] leading-relaxed"
                        style={{ color: theme.colors.muted }}
                      >
                        {couple.date}
                      </p>
                      <p
                        className="text-[0.64rem]"
                        style={{ color: theme.colors.muted }}
                      >
                        {couple.venue}
                      </p>
                    </div>

                    {/* "View" footer */}
                    <div
                      className="relative z-[2] flex items-center justify-between border-t px-5 py-3"
                      style={{ borderColor: `${border}30` }}
                    >
                      <span
                        className="text-[0.62rem] font-semibold uppercase tracking-[0.25em] transition-opacity group-hover:opacity-80"
                        style={{ color: theme.colors.accent }}
                      >
                        View Invitation →
                      </span>
                      <Link
                        href={`/rsvp/${couple.slug}`}
                        className="relative z-[3] rounded px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] transition hover:opacity-70"
                        style={{
                          color: theme.colors.muted,
                          background: `${theme.colors.accent}12`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        RSVPs
                      </Link>
                    </div>

                    {/* Hover overlay tint */}
                    <div
                      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.04]"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-14 text-center text-xs text-stone-400">
          Append{" "}
          <code className="rounded bg-stone-200/80 px-1.5 py-0.5 text-stone-600">
            ?invite=Guest+Name
          </code>{" "}
          to any URL to personalise the greeting.
        </p>
        <p className="mt-6 text-center text-xs text-stone-300">
          &copy; {new Date().getFullYear()}{" "}
          <span
            className="font-semibold text-stone-400"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            InvitesLK
          </span>{" "}
          — Crafted with care for your special day.
        </p>
      </main>
    </div>
  );
}
