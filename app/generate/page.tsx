"use client";

import { MOCK_COUPLES } from "@/lib/data";
import { Check, Copy, ExternalLink, Sparkles, Users } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function encodeInviteeName(name: string): string {
  return encodeURIComponent(name.trim()).replace(/%20/g, "+");
}

export default function GeneratePage() {
  return (
    <Suspense>
      <GenerateContent />
    </Suspense>
  );
}

function GenerateContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("couple") ?? "";
  const [namesInput, setNamesInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://inviteslk.vercel.app";

  const couple = MOCK_COUPLES.find((c) => c.slug === slug);

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

  function shareWhatsApp(name: string, url: string) {
    if (!couple) return;
    const message = `Hi ${name}! 🎉\n\nYou're invited to ${couple.partnerA} & ${couple.partnerB}'s wedding!\n\n${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }

  if (!slug || !couple) {
    return (
      <div className="min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Decorative gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <header className="relative border-b border-slate-700/50 bg-slate-900/80 backdrop-blur px-6 py-12 text-center sm:px-10">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-blue-400" size={20} />
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
              InvitesLK
            </p>
            <Sparkles className="text-blue-400" size={20} />
          </div>
          <h1
            className="mt-2 text-4xl font-normal tracking-wide text-white"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Generate Invite URLs
          </h1>
          <p className="mt-2 text-sm text-slate-400">Create personalized invitation links for your guests</p>
        </header>

        <main className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-2xl text-center">
            <Users className="mx-auto mb-4 text-blue-400" size={32} />
            <p className="text-sm text-slate-300 mb-3">
              Pass a couple slug via the{" "}
              <code className="rounded bg-slate-900 px-2.5 py-1 text-blue-300 font-mono text-xs">
                ?couple=
              </code>{" "}
              query parameter.
            </p>
            <p className="font-mono text-xs text-slate-500 bg-slate-900 rounded px-4 py-3 inline-block">
              /generate?couple=damsarani-supun
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Example: <span className="text-blue-300">inviteslk.vercel.app/generate?couple=supun-thilini</span>
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Decorative gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-700/50 bg-slate-900/80 backdrop-blur px-6 py-12 text-center sm:px-10">
        <div className="inline-flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-blue-400" size={20} />
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400">
            InvitesLK
          </p>
          <Sparkles className="text-blue-400" size={20} />
        </div>
        <h1
          className="mt-2 text-4xl font-normal tracking-wide text-white"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {couple.partnerA} &amp; {couple.partnerB}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {couple.date} · {couple.venue}
        </p>
      </header>

      <main className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Guest Names Input */}
        <section className="mb-8 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <Users className="text-blue-400" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-white">Guest Names</h2>
              <p className="text-sm text-slate-400">one per line</p>
            </div>
          </div>
          <textarea
            value={namesInput}
            onChange={(e) => setNamesInput(e.target.value)}
            placeholder={"Mr. & Mrs. Rodrigo\nDr. Rajan & Family\nThe Perera Family"}
            rows={8}
            className="w-full resize-none rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3 font-mono text-sm text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition"
          />
          <p className="mt-3 text-xs text-slate-400">
            {names.length} guest{names.length !== 1 ? "s" : ""} registered
          </p>
        </section>

        {/* Generated URLs */}
        {urls.length > 0 && (
          <section className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="text-blue-400" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-white">Generated Links</h3>
                  <p className="text-sm text-slate-400">{urls.length} personalized invitation{urls.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <button
                onClick={copyAll}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-4 py-2 text-sm font-medium text-white transition shadow-lg hover:shadow-blue-500/20"
              >
                {allCopied ? (
                  <>
                    <Check size={16} className="text-green-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                  </>
                )}
              </button>
            </div>

            <ul className="space-y-3">
              {urls.map(({ name, url }) => (
                <li
                  key={name}
                  className="group rounded-xl border border-slate-600/30 bg-slate-900/30 hover:bg-slate-900/60 p-4 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white group-hover:text-blue-300 transition">{name}</p>
                      <p className="mt-2 break-all font-mono text-xs text-slate-500 group-hover:text-slate-400 transition">
                        {url}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2 items-center">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition"
                        title="Open invitation"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => copyOne(url)}
                        className={`rounded-lg p-2.5 transition ${
                          copied === url
                            ? "text-green-400 bg-green-400/10"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                        }`}
                        title="Copy URL"
                      >
                        {copied === url ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => shareWhatsApp(name, url)}
                        className="rounded-lg p-2.5 text-slate-400 hover:text-green-500 hover:bg-green-500/10 transition"
                        title="Share on WhatsApp"
                      >
                        <WhatsAppIcon size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Empty State */}
        {names.length === 0 && (
          <section className="text-center">
            <Users className="mx-auto mb-4 text-slate-600" size={48} />
            <p className="text-slate-400">Enter guest names above to generate personalized invitation links</p>
          </section>
        )}
      </main>
    </div>
  );
}
