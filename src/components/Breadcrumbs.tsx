import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { site } from "@/lib/site";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-brown-soft">
        <ol className="flex flex-wrap gap-2">
          {all.map((it, i) => (
            <li key={it.href} className="flex gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === all.length - 1 ? <span aria-current="page">{it.name}</span> : <Link href={it.href} className="underline-offset-4 hover:underline">{it.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: site.url + it.href })),
      }} />
    </>
  );
}
