"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState<{ name: string; email: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSent({ name, email });
  }

  if (sent) {
    return (
      <p className="mt-6" role="status">
        Thank you, {sent.name}. Your email app should open a message to {site.contact.email}. If it does not, write to us directly from {sent.email}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className="text-sm">Name</label>
        <input id="name" name="name" required autoComplete="name" className="mt-1 w-full border border-brown/30 bg-transparent px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="text-sm">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="mt-1 w-full border border-brown/30 bg-transparent px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="text-sm">Message</label>
        <textarea id="message" name="message" required rows={5} className="mt-1 w-full border border-brown/30 bg-transparent px-3 py-2" />
      </div>
      <button type="submit" className="bg-brown px-8 py-3 text-ivory">Send message</button>
    </form>
  );
}
