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
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="text-stone-400">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-lg">
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Lock className="text-blue-600" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-stone-900">Admin Access</h1>
              <p className="mt-2 text-sm text-stone-500">
                Enter the admin PIN to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Admin PIN
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN"
                  autoFocus
                  className="mt-2 w-full rounded-lg border border-stone-200 px-4 py-2 text-center text-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin(e as any);
                  }}
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Unlock Admin Panel
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-stone-400">
              Admin PIN required to create weddings
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
