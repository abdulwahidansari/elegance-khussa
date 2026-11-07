import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/data";
import { mainNav } from "@/lib/nav";
import { ProductGrid } from "@/components/ProductGrid";
import { Hero } from "@/components/Hero";
import { FaqSection } from "@/components/FaqSection";
import { TrustStrip } from "@/components/TrustStrip";

const title = "Handmade Pakistani Khussa for Women | The Elegance Khussa";
const description =
  "Shop handmade Pakistani khussa for women: bridal, embroidered and everyday styles in traditional footwear for weddings, Eid and special occasions.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title, description, url: "/", siteName: "The Elegance Khussa" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="coll" className="mt-16">
        <h2 id="coll" className="text-3xl">Shop by style</h2>
        <ul className="mt-4 divide-y divide-brown/15 border-y border-brown/15">
          {mainNav.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="flex items-baseline justify-between gap-6 py-4 transition-colors duration-200 hover:bg-sand">
                <span className="font-display text-2xl">{c.label}</span>
                <span className="hidden truncate text-sm text-brown-soft md:inline">{c.children?.map((x) => x.label).join(" · ")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="new" className="mt-16">
        <h2 id="new" className="mb-6 text-3xl">New arrivals</h2>
        <ProductGrid items={products.filter((p) => p.isNew)} />
      </section>

      <FaqSection />
      <TrustStrip />
    </>
  );
}
