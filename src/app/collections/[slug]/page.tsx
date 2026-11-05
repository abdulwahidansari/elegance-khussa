import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, getCollection, products, productsIn } from "@/lib/data";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => collections.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCollection((await params).slug);
  if (!c) return {};
  return { title: c.name, description: c.blurb, alternates: { canonical: `/collections/${c.slug}` }, robots: productsIn(c.slug).length ? undefined : { index: false, follow: true } };
}

export default async function Collection({ params }: Props) {
  const c = getCollection((await params).slug);
  if (!c) notFound();
  const items = productsIn(c.slug);
  const showingAll = items.length === 0;
  return (
    <>
      <Breadcrumbs items={[{ name: "Shop all", href: "/shop" }, { name: c.name, href: `/collections/${c.slug}` }]} />
      <h1 className="mt-6 text-4xl">{c.name}</h1>
      <p className="mt-2 max-w-xl text-brown-soft">{c.blurb}</p>
      {showingAll && <p className="mt-4 max-w-xl text-sm text-brown-soft">This category is not stocked separately yet. Everything available to order is below.</p>}
      <div className="mt-8">
        <ProductGrid items={showingAll ? products : items} />
      </div>
    </>
  );
}
