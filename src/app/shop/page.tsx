import type { Metadata } from "next";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shop All Khussa",
  description: "Browse every khussa: bridal, embroidered, tilla and everyday styles.",
  alternates: { canonical: "/shop" },
};

export default function Shop() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Shop all", href: "/shop" }]} />
      <h1 className="my-6 text-4xl">Shop all khussa</h1>
      {/* TODO Phase 4: size/price filters, sorting, pagination */}
      <ProductGrid items={products} />
    </>
  );
}
