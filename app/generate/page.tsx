"use client";

import { MOCK_COUPLES } from "@/lib/data";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

function encodeInviteeName(name: string): string {
  return encodeURIComponent(name.trim()).replace(/%20/g, "+");
}

export default function GeneratePage() {
  const [slug, setSlug] = useState(MOCK_COUPLES[0].slug);
  const [namesInput, setNamesInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://inviteslk.vercel.app";

  const names = useMemo(
    () =>
      namesInput
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean),
    [namesInput],
  );

  const urls = useMemo(
    () =>
      names.map((name) => ({
        name,
        url: `${baseUrl}/${slug}?invite=${encodeInviteeName(name)}`,
      })),
    [names, slug, baseUrl],
  );

  function copyOne(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  function copyAll() {
    const text = urls.map((u) => `${u.name}\t${u.url}`).join("\n");
    navigator.clipboard.writeText(text);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  }

  const couple = MOCK_COUPLES.find((c) => c.slug === slug);

  return (
    <div className="min-h-dvh bg-stone-100 text-stone-900">
      <header className="border-b border-stone-200 bg-white px-6 py-10 text-center sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-stone-400">
          InvitesLK
        </p>
        <h1
          className="mt-2 text-4xl font-normal tracking-wide text-stone-900"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Generate Invite URLs
        </h1>
        <p className="mt-2 text-sm text-stone-400">
          Pick a couple, paste guest names — get personalised links.
        </p>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* Couple selector */}
        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Couple
          </label>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-2 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:border-stone-400 focus:outline-none"
          >
            {MOCK_COUPLES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.partnerA} &amp; {c.partnerB} — {c.slug}
              </option>
            ))}
          </select>
          {couple && (
            <p className="mt-2 text-xs text-stone-400">
              {couple.date} · {couple.venue}
            </p>
          )}
        </section>

        {/* Names input */}
        <section className="mt-4 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            Guest Names
            <span className="ml-2 normal-case font-normal tracking-normal text-stone-400">
              — one per line
            </span>
          </label>
          <textarea
            value={namesInput}
            onChange={(e) => setNamesInput(e.target.value)}
            placeholder={"Mr. & Mrs. Rodrigo\nDr. Rajan & Family\nThe Perera Family"}
            rows={7}
            className="mt-2 w-full resize-y rounded-md border border-stone-200 bg-stone-50 px-3 py-2 font-mono text-sm text-stone-800 placeholder-stone-300 focus:border-stone-400 focus:outline-none"
          />
          <p className="mt-1 text-xs text-stone-400">
            {names.length} guest{names.length !== 1 ? "s" : ""}
          </p>
        </section>

        {/* Generated URLs */}
        {urls.length > 0 && (
          <section className="mt-4 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Generated Links
              </span>
              <button
                onClick={copyAll}
                className="flex items-center gap-1.5 rounded-md border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-100 active:scale-95"
              >
                {allCopied ? (
                  <Check size={12} className="text-green-600" />
                ) : (
                  <Copy size={12} />
                )}
                {allCopied ? "Copied!" : "Copy all"}
              </button>
            </div>

            <ul className="mt-4 space-y-3">
              {urls.map(({ name, url }) => (
                <li
                  key={name}
                  className="flex items-start gap-3 rounded-md border border-stone-100 bg-stone-50 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-stone-700">{name}</p>
                    <p className="mt-0.5 break-all font-mono text-[0.7rem] text-stone-400">
                      {url}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1.5 pt-0.5">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded p-1.5 text-stone-400 transition hover:bg-stone-200 hover:text-stone-600"
                      title="Open invitation"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button
                      onClick={() => copyOne(url)}
                      className="rounded p-1.5 text-stone-400 transition hover:bg-stone-200 hover:text-stone-600"
                      title="Copy URL"
                    >
                      {copied === url ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
