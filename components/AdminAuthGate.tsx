"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

interface AdminAuthGateProps {
  children: React.ReactNode;
}

export function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if already authenticated
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_auth");
    if (savedAuth) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pin.trim().length === 0) {
      setError("Please enter the admin PIN");
      return;
    }

    // In production, this should validate against a secure backend
    // For now, it validates against environment variable
    const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN;

    if (pin === adminPin) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setPin("");
    } else {
      setError("Invalid admin PIN");
      setPin("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        {/* Decorative gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-sm">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-8 shadow-xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <Lock className="text-blue-400" size={24} />
              </div>
              <h1 className="text-2xl font-normal tracking-wide text-white">Admin Access</h1>
              <p className="mt-3 text-sm text-slate-400">
                Enter the admin PIN to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Admin PIN
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN"
                  autoFocus
                  className="mt-2 w-full rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3 text-center text-lg tracking-widest text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin(e as any);
                  }}
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-4 py-3 text-sm font-medium text-white transition shadow-lg hover:shadow-blue-500/20"
              >
                Unlock Admin Panel
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Admin PIN required to create weddings
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
