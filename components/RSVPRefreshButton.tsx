"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RSVPRefreshButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  function handleRefresh() {
    setSpinning(true);
    router.refresh();
    setTimeout(() => setSpinning(false), 800);
  }

  return (
    <button
      onClick={handleRefresh}
      className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-600 shadow-sm transition hover:bg-stone-50 active:scale-95"
    >
      <RefreshCw className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`} />
      Refresh
    </button>
  );
}
