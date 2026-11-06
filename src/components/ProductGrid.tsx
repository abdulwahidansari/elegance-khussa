import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) return <p>No products here yet. Browse the full collection from Shop all.</p>;
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => <li key={p.slug}><ProductCard p={p} /></li>)}
    </ul>
  );
}
