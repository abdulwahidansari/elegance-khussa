import Link from "next/link";
import type { Product } from "@/lib/types";
import { money } from "@/lib/site";
import { ProductImage } from "./ProductImage";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="group block">
      <ProductImage name={p.name} mock={p.isMock} />
      <h3 className="mt-3 text-xl group-hover:underline underline-offset-4">{p.name}</h3>
      <p className="text-sm">
        {money(p.price)}
        {p.compareAt && <span className="ml-2 text-brown-soft line-through">{money(p.compareAt)}</span>}
      </p>
    </Link>
  );
}
