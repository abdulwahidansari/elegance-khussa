import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, footerBlurb } from "@/lib/site";
import { mainNav } from "@/lib/nav";
import { Socials } from "./Socials";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "Shop now", links: [...mainNav.map((n): [string, string] => [n.label, n.href]), ["Festive Combos", "/collections/festive-combos"], ["Sale", "/collections/sale"]] },
  { title: "Information", links: [
    ["About us", "/about"], ["Contact us", "/contact"], ["FAQs", "/faq"], ["Returns and exchanges", "/policies/returns"],
    ["Customization policy", "/policies/customization"], ["Privacy policy", "/policies/privacy"], ["Shipping policy", "/policies/shipping"],
  ] },
  { title: "Popular", links: [
    ["Bridal Khussa", "/collections/bridal-khussa"], ["Embroidered Khussa", "/collections/embroidered-khussa"], ["Kundan Khussa", "/collections/kundan-khussa"],
    ["Nawabi Khussa", "/collections/nawabi-khussa"], ["Simple Khussa", "/collections/simple-khussa"], ["Best sellers", "/best-sellers"], ["New arrivals", "/new-arrivals"],
  ] },
  { title: "Categories", links: [
    ["Khussa", "/collections/khussa"], ["Flats", "/collections/flats"], ["Kolhapuri", "/collections/kolhapuri"],
    ["Peshawari", "/collections/peshawari"], ["Clutches & Bags", "/collections/clutches-bags"], ["Accessories", "/collections/accessories"],
  ] },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-brown text-ivory">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-display text-4xl">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm text-ivory/75">{footerBlurb}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl">Get new arrivals by email</h2>
            <form aria-describedby="nl-note" className="mt-3 flex items-center rounded-full border border-ivory/30 p-1.5 pl-5">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" disabled placeholder="Email address" className="w-full bg-transparent text-sm placeholder:text-ivory/50 disabled:cursor-not-allowed" />
              <button type="submit" disabled aria-label="Subscribe" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory text-brown disabled:opacity-50">
                <ArrowRight size={16} aria-hidden />
              </button>
            </form>
            <p id="nl-note" className="mt-2 text-xs text-ivory/60">Email signup is not connected yet.</p>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ivory/15 py-12 md:grid-cols-4">
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="text-base font-semibold">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
                {col.links.map(([label, href]) => (
                  <li key={label}><Link href={href} className="transition-colors duration-150 hover:text-ivory hover:underline underline-offset-4">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory/15 py-6 text-xs text-ivory/70">
          <Link href="/policies/terms" className="hover:text-ivory hover:underline underline-offset-4">Terms and policies</Link>
          <p>© {new Date().getFullYear()} {site.name}</p>
          <Socials />
        </div>
      </div>
    </footer>
  );
}
