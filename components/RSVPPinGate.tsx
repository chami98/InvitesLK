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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === pin) {
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
    <div className="flex min-h-dvh items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-stone-200 bg-white px-8 py-10 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-stone-500"
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
            <h1 className="text-lg font-semibold text-stone-900">RSVP Dashboard</h1>
            <p className="mt-1 text-sm text-stone-500">{coupleNames}</p>
            <p className="mt-3 text-sm text-stone-500">Enter the PIN to view responses.</p>
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
                className={`w-full rounded-lg border px-4 py-3 text-center text-lg tracking-widest outline-none transition focus:ring-2 focus:ring-stone-300 ${
                  error
                    ? "border-red-300 bg-red-50 text-red-700 placeholder-red-300"
                    : "border-stone-200 bg-stone-50 text-stone-900"
                }`}
                autoComplete="off"
              />
              {error && (
                <p className="mt-2 text-center text-xs text-red-600">Incorrect PIN. Try again.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={input.length === 0}
              className="mt-4 w-full rounded-lg bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
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
