import type { Metadata } from "next";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = { title: "New Arrivals", alternates: { canonical: "/new-arrivals" } };

export default function Page() {
  return (<><h1 className="mb-6 text-4xl">New arrivals</h1><ProductGrid items={products.filter((p) => p.isNew)} /></>);
}
