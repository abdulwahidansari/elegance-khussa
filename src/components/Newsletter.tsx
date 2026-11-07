"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) setDone(true);
      else setError(json.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("We could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) return <p className="mt-3 text-sm text-ivory/80" role="status">Thank you. Your email has been added to our list.</p>;

  return (
    <form onSubmit={onSubmit} className="mt-3">
      <div className="flex items-center rounded-full border border-ivory/30 p-1.5 pl-5">
        <label htmlFor="nl-email" className="sr-only">Email address</label>
        <input id="nl-email" name="email" type="email" required maxLength={254} placeholder="Email address" className="w-full bg-transparent text-sm placeholder:text-ivory/50" />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
        <button type="submit" disabled={busy} aria-label="Subscribe" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory text-brown disabled:opacity-60">
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-ivory/90">{error}</p>}
    </form>
  );
}
