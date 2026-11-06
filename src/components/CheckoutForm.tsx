"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/data";
import { money } from "@/lib/site";
import { trackPurchase } from "@/lib/tracking";

export function CheckoutForm() {
  const { lines, dispatch } = useCart();
  const [placed, setPlaced] = useState(false);
  const rows = lines.flatMap((l) => {
    const p = getProduct(l.slug);
    return p ? [{ l, p }] : [];
  });
  const total = rows.reduce((n, { l, p }) => n + p.price * l.qty, 0);

  if (placed) {
    return (
      <>
        <h1 className="text-4xl">Order placed</h1>
        <p className="mt-4 max-w-prose">
          Thank you. We have your delivery details and will contact you to confirm the order. Payment is cash on delivery, and the shipping cost is confirmed before dispatch.
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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackPurchase(total);
    dispatch({ type: "clear" });
    setPlaced(true);
  }

  return (
    <>
      <h1 className="text-4xl">Checkout</h1>
      <ul className="mt-6 max-w-lg divide-y divide-brown/15 border-y border-brown/15">
        {rows.map(({ l, p }) => (
          <li key={`${l.slug}-${l.size}`} className="flex justify-between gap-4 py-3 text-sm">
            <span>{p.name} · EU {l.size} · Qty {l.qty}</span>
            <span>{money(p.price * l.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-lg text-right text-xl">Subtotal {money(total)}</p>
      <p className="mt-1 max-w-lg text-right text-sm text-brown-soft">Shipping is confirmed before the order is dispatched. Pay cash on delivery.</p>

      <form onSubmit={onSubmit} className="mt-8 max-w-lg space-y-4">
        <div>
          <label htmlFor="name" className="text-sm">Full name</label>
          <input id="name" name="name" required autoComplete="name" className="mt-1 w-full border border-brown/30 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm">Phone</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className="mt-1 w-full border border-brown/30 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label htmlFor="city" className="text-sm">City</label>
          <input id="city" name="city" required autoComplete="address-level2" className="mt-1 w-full border border-brown/30 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label htmlFor="address" className="text-sm">Delivery address</label>
          <textarea id="address" name="address" required rows={3} autoComplete="street-address" className="mt-1 w-full border border-brown/30 bg-transparent px-3 py-2" />
        </div>
        <button type="submit" className="bg-brown px-8 py-3 text-ivory">Place order</button>
      </form>
    </>
  );
}
