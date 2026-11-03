"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function AddToCart({ slug, sizes }: { slug: string; sizes: number[] }) {
  const { dispatch } = useCart();
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  return (
    <div>
      <fieldset>
        <legend className="mb-2 text-sm">Size (EU)</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <label key={s} className={`cursor-pointer border px-4 py-2 text-sm ${size === s ? "border-brown bg-brown text-ivory" : "border-brown/30"}`}>
              <input type="radio" name="size" className="sr-only" checked={size === s} onChange={() => { setSize(s); setAdded(false); }} />
              {s}
            </label>
          ))}
        </div>
      </fieldset>
      <button type="button" disabled={size === null}
        onClick={() => { if (size !== null) { dispatch({ type: "add", slug, size }); setAdded(true); } }}
        className="mt-6 w-full bg-brown px-6 py-3 text-ivory disabled:opacity-40">
        {size === null ? "Select a size" : "Add to cart"}
      </button>
      <p role="status" className="mt-2 text-sm">{added ? "Added to your cart." : ""}</p>
    </div>
  );
}
