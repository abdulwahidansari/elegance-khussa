"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/data";
import { money } from "@/lib/site";

export default function Cart() {
  const { lines, dispatch } = useCart();
  const rows = lines.flatMap((l) => { const p = getProduct(l.slug); return p ? [{ l, p }] : []; });
  const total = rows.reduce((n, { l, p }) => n + p.price * l.qty, 0);

  if (!rows.length) return (<><h1 className="text-4xl">Your cart is empty</h1><Link href="/shop" className="mt-4 inline-block underline underline-offset-4">Browse the collection</Link></>);

  return (
    <>
      <h1 className="mb-6 text-4xl">Your cart</h1>
      <ul className="divide-y divide-brown/15 border-y border-brown/15">
        {rows.map(({ l, p }) => (
          <li key={`${l.slug}-${l.size}`} className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div><Link href={`/products/${p.slug}`} className="font-display text-xl">{p.name}</Link><p className="text-sm text-brown-soft">Size {l.size}</p></div>
            <label className="text-sm">Qty{" "}
              <input type="number" min={1} value={l.qty} className="w-16 border border-brown/30 bg-transparent px-2 py-1"
                onChange={(e) => dispatch({ type: "setQty", slug: l.slug, size: l.size, qty: Number(e.target.value) || 1 })} />
            </label>
            <span>{money(p.price * l.qty)}</span>
            <button type="button" className="text-sm underline underline-offset-4" onClick={() => dispatch({ type: "remove", slug: l.slug, size: l.size })}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-right text-xl">Subtotal {money(total)}</p>
      <p className="text-right text-sm text-brown-soft">Delivery is calculated at checkout.</p>
      <div className="mt-6 text-right"><Link href="/checkout" className="inline-block bg-brown px-8 py-3 text-ivory">Go to checkout</Link></div>
    </>
  );
}
