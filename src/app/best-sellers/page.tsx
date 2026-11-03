import type { Metadata } from "next";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = { title: "Best Sellers", alternates: { canonical: "/best-sellers" } };

export default function Page() {
  return (<><h1 className="mb-6 text-4xl">Best sellers</h1><ProductGrid items={products.filter((p) => p.isBestSeller)} /></>);
}
