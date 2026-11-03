import type { Metadata } from "next";
import { Search as SearchIcon } from "lucide-react";
import { products } from "@/lib/data";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = { title: "Search", robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").trim();
  const needle = q.toLowerCase();
  const results = needle ? products.filter((p) => `${p.name} ${p.description} ${p.collection}`.toLowerCase().includes(needle)) : [];
  return (
    <>
      <h1 className="text-4xl">Search</h1>
      <form action="/search" role="search" className="mt-6 flex max-w-xl items-center border-b border-brown/40">
        <label htmlFor="q" className="sr-only">Search products</label>
        <input id="q" name="q" defaultValue={q} placeholder="Search khussa, bridal, embroidered…" className="w-full bg-transparent py-3" autoFocus />
        <button type="submit" aria-label="Search" className="p-2"><SearchIcon size={20} aria-hidden /></button>
      </form>
      {q && <p className="mb-6 mt-6 text-sm text-brown-soft">{results.length} result{results.length === 1 ? "" : "s"} for “{q}”</p>}
      {q && <ProductGrid items={results} />}
    </>
  );
}
