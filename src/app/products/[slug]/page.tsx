import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollection, getProduct, products, productsIn } from "@/lib/data";
import { money, site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductImage } from "@/components/ProductImage";
import { AddToCart } from "@/components/AddToCart";
import { ProductGrid } from "@/components/ProductGrid";
import { JsonLd } from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} Khussa`,
    description: p.description,
    alternates: { canonical: `/products/${p.slug}` },
    // Sample products must not be indexed until replaced with real ones.
    robots: p.isMock ? { index: false, follow: true } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const c = getCollection(p.collection)!;
  const related = productsIn(p.collection).filter((x) => x.slug !== p.slug);

  return (
    <>
      <Breadcrumbs items={[{ name: "Shop all", href: "/shop" }, { name: c.name, href: `/collections/${c.slug}` }, { name: p.name, href: `/products/${p.slug}` }]} />
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductImage name={p.name} mock={p.isMock} />
        <div>
          <h1 className="text-4xl">{p.name}</h1>
          <p className="mt-2 text-xl">
            {money(p.price)}
            {p.compareAt && <span className="ml-3 text-base text-brown-soft line-through">{money(p.compareAt)}</span>}
          </p>
          <p className="mt-4 max-w-prose">{p.description}</p>
          <div className="my-6"><AddToCart slug={p.slug} sizes={p.sizes} /></div>
          <ul className="list-disc pl-5 text-sm">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <dl className="mt-6 grid grid-cols-[6rem_1fr] gap-y-1 text-sm">
            {p.specs.map((s) => (<div key={s.label} className="contents"><dt className="text-brown-soft">{s.label}</dt><dd>{s.value}</dd></div>))}
            <div className="contents"><dt className="text-brown-soft">Delivery</dt><dd>{site.delivery}</dd></div>
            <div className="contents"><dt className="text-brown-soft">Returns</dt><dd>{site.returns}</dd></div>
          </dl>
        </div>
      </div>
      {related.length > 0 && (<section className="mt-16"><h2 className="mb-6 text-3xl">You may also like</h2><ProductGrid items={related} /></section>)}
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description,
        url: `${site.url}/products/${p.slug}`,
        offers: { "@type": "Offer", priceCurrency: "PKR", price: p.price, availability: "https://schema.org/InStock" },
      }} />
    </>
  );
}
