"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/data";
import { money } from "@/lib/site";

const field = "mt-1 w-full border border-brown/30 bg-transparent px-3 py-2";

export function CheckoutForm() {
  const { lines, dispatch } = useCart();
  const [ref, setRef] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const rows = lines.flatMap((l) => {
    const p = getProduct(l.slug);
    return p ? [{ l, p }] : [];
  });
  const total = rows.reduce((n, { l, p }) => n + p.price * l.qty, 0);
  const hasSample = rows.some(({ p }) => p.isMock);

  if (ref) {
    return (
      <>
        <h1 className="text-4xl">Order received</h1>
        <p className="mt-4 max-w-prose">
          Thank you. Your order reference is <strong>{ref}</strong>. We will contact you on the phone number you gave to confirm the order and the shipping cost. Payment is cash on delivery.
        </p>
        <Link href="/shop" className="mt-6 inline-block underline underline-offset-4">Continue shopping</Link>
      </>
    );
  }

  if (!rows.length) {
    return (
      <>
        <h1 className="text-4xl">Checkout</h1>
        <p className="mt-4">Your cart is empty, so there is nothing to check out.</p>
        <Link href="/shop" className="mt-4 inline-block underline underline-offset-4">Browse the collection</Link>
      </>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), phone: data.get("phone"), city: data.get("city"), address: data.get("address"),
          website: data.get("website"), // honeypot
          lines,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ref?: string; error?: string };
      if (!res.ok || !json.ref) {
        setError(json.error ?? "Something went wrong. Please try again.");
      } else {
        dispatch({ type: "clear" }); // only after the order was really received
        setRef(json.ref);
      }
    } catch {
      setError("We could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="text-4xl">Checkout</h1>
      {hasSample && (
        <p role="note" className="mt-4 max-w-lg border border-gold/60 bg-sand px-4 py-3 text-sm">
          Preview store: the items in your cart are sample products and cannot be ordered yet.
        </p>
      )}
      <ul className="mt-6 max-w-lg divide-y divide-brown/15 border-y border-brown/15">
        {rows.map(({ l, p }) => (
          <li key={`${l.slug}-${l.size}`} className="flex justify-between gap-4 py-3 text-sm">
            <span>{p.name} · EU {l.size} · Qty {l.qty}</span>
            <span>{money(p.price * l.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-lg text-right text-xl">Subtotal {money(total)}</p>
      <p className="mt-1 max-w-lg text-right text-sm text-brown-soft">Shipping is confirmed with you before dispatch. Pay cash on delivery.</p>

      <form onSubmit={onSubmit} className="mt-8 max-w-lg space-y-4" noValidate={false}>
        <div>
          <label htmlFor="name" className="text-sm">Full name</label>
          <input id="name" name="name" required minLength={2} maxLength={80} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm">Phone (we call to confirm)</label>
          <input id="phone" name="phone" type="tel" required inputMode="tel" placeholder="0300 1234567" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="city" className="text-sm">City</label>
          <input id="city" name="city" required maxLength={60} autoComplete="address-level2" className={field} />
        </div>
        <div>
          <label htmlFor="address" className="text-sm">Delivery address</label>
          <textarea id="address" name="address" required minLength={8} maxLength={300} rows={3} autoComplete="street-address" className={field} />
        </div>
        {/* Honeypot for bots; hidden from people and screen readers. */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        {error && <p role="alert" className="text-sm text-[#8a1c1c]">{error}</p>}
        <button type="submit" disabled={busy || hasSample} className="bg-brown px-8 py-3 text-ivory disabled:opacity-50">
          {busy ? "Placing order…" : "Place order"}
        </button>
      </form>
    </>
  );
}
