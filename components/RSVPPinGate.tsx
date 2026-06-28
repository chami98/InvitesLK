"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  pin: string;
  coupleSlug: string;
  coupleNames: string;
  children: ReactNode;
};

export function RSVPPinGate({ pin, coupleSlug, coupleNames, children }: Props) {
  const storageKey = `rsvp-pin-${coupleSlug}`;
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedPin = sessionStorage.getItem(storageKey);
    if (savedPin === pin) {
      setUnlocked(true);
    } else {
      inputRef.current?.focus();
    }
  }, [storageKey, pin]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === pin) {
      sessionStorage.setItem(storageKey, pin);
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div suppressHydrationWarning className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      {/* Decorative gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-8 py-12 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1 className="text-2xl font-normal tracking-wide text-white">RSVP Dashboard</h1>
            <p className="mt-2 text-sm text-slate-300 font-medium">{coupleNames}</p>
            <p className="mt-3 text-sm text-slate-400">Enter the PIN to view responses.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={shake ? "animate-shake" : ""}>
              <input
                ref={inputRef}
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value.replace(/\D/g, ""));
                  setError(false);
                }}
                placeholder="Enter PIN"
                className={`w-full rounded-xl border px-4 py-3 text-center text-lg tracking-widest outline-none transition focus:ring-2 ${
                  error
                    ? "border-red-500/30 bg-red-500/10 text-red-400 placeholder-red-400/50 focus:ring-red-400/20"
                    : "border-slate-600/50 bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                }`}
                autoComplete="off"
              />
              {error && (
                <p className="mt-3 text-center text-xs text-red-400">Incorrect PIN. Try again.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={input.length === 0}
              className="mt-6 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-4 py-3 text-sm font-medium text-white transition shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.45s ease; }
      `}</style>
    </div>
  );
}
