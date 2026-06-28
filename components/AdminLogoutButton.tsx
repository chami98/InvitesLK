"use client";

import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-lg border border-slate-600/50 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}
