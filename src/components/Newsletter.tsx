"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (value) setEmail(value);
  }

  if (email) {
    return <p className="mt-3 text-sm text-ivory/80" role="status">You are on the list, {email}. We will send new arrivals to that address.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 flex items-center rounded-full border border-ivory/30 p-1.5 pl-5">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input id="nl-email" name="email" type="email" required placeholder="Email address" className="w-full bg-transparent text-sm placeholder:text-ivory/50" />
      <button type="submit" aria-label="Subscribe" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory text-brown">
        <ArrowRight size={16} aria-hidden />
      </button>
    </form>
  );
}
