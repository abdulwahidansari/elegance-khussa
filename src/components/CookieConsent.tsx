"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadMarketing } from "@/lib/tracking";

const KEY = "ek-consent";

export function CookieConsent() {
  const [choice, setChoice] = useState<"unknown" | "all" | "essential">("unknown");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "all") {
      setChoice("all");
      loadMarketing();
    } else if (saved === "essential") {
      setChoice("essential");
    }
  }, []);

  function choose(next: "all" | "essential") {
    localStorage.setItem(KEY, next);
    setChoice(next);
    if (next === "all") loadMarketing();
  }

  if (choice !== "unknown") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brown/15 bg-ivory p-4 shadow-[0_-12px_40px_-24px_rgba(59,42,32,0.45)] sm:p-5">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-brown-soft">
          We use cookies for analytics, ads and optional AdSense only after you agree. Essential cookies keep your cart. Read the <Link href="/policies/privacy" className="underline underline-offset-4">privacy policy</Link>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose("essential")} className="flex-1 border border-brown/30 px-4 py-2 text-sm sm:flex-none">Essential only</button>
          <button type="button" onClick={() => choose("all")} className="flex-1 bg-brown px-4 py-2 text-sm text-ivory sm:flex-none">Accept</button>
        </div>
      </div>
    </div>
  );
}
