import { products } from "@/lib/data";
import { site } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = products.map((p) => `
    <item>
      <g:id>${esc(p.slug)}</g:id>
      <g:title>${esc(p.name)}</g:title>
      <g:description>${esc(p.description)}</g:description>
      <g:link>${esc(`${site.url}/products/${p.slug}`)}</g:link>
      <g:image_link>${esc(`${site.url}/images/khussa-sample.svg`)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${p.price.toFixed(2)} PKR</g:price>
      ${p.compareAt ? `<g:sale_price>${p.price.toFixed(2)} PKR</g:sale_price>` : ""}
      <g:brand>${esc(site.name)}</g:brand>
      <g:identifier_exists>false</g:identifier_exists>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${esc(site.url)}</link>
    <description>${esc(site.description)}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
