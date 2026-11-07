import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { collections, products, productsIn } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/shop", "/new-arrivals", "/best-sellers", "/about", "/contact", "/faq"];
  return [
    ...staticPaths.map((p) => ({ url: site.url + p })),
    ...collections.filter((c) => productsIn(c.slug).length > 0).map((c) => ({ url: `${site.url}/collections/${c.slug}` })),
    // Mock products are noindex, so they are left out until real products replace them.
    ...products.filter((p) => !p.isMock).map((p) => ({ url: `${site.url}/products/${p.slug}` })),
  ];
}
