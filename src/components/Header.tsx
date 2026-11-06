import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { site, announcement } from "@/lib/site";
import { mainNav, moreNav, type NavItem } from "@/lib/nav";
import { CartLink } from "./CartLink";
import { MobileMenu } from "./MobileMenu";
import { Socials } from "./Socials";

const open =
  "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100";
const chevron = "transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180";

function Item({ item, trigger }: { item: NavItem; trigger?: "button" }) {
  const label = (
    <>
      {item.label}
      {item.children && <ChevronDown size={13} aria-hidden className={chevron} />}
    </>
  );
  const cls = "flex items-center gap-1.5 py-5 text-[15px] transition-colors duration-200 hover:text-gold";
  return (
    <li className="group relative">
      {trigger === "button" ? <button type="button" aria-haspopup="true" className={cls}>{label}</button> : <Link href={item.href} className={cls}>{label}</Link>}
      {item.children && (
        <ul className={`invisible absolute left-0 top-full z-50 min-w-60 translate-y-1 border border-brown/10 bg-ivory py-2 opacity-0 shadow-[0_18px_40px_-18px_rgba(59,42,32,0.35)] transition duration-200 ${open}`}>
          {item.children.map((c) => (
            <li key={c.href}><Link href={c.href} className="block px-5 py-2 text-sm transition-colors duration-150 hover:bg-sand">{c.label}</Link></li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Header() {
  return (
    <>
      <div className="bg-brown text-ivory">
        <div className="mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1 px-3 py-2 text-xs sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:px-4 sm:text-sm">
          <Socials className="justify-start" iconClassName="size-3.5 min-[380px]:size-4 sm:size-[18px]" />
          <p className="min-w-0 text-center leading-snug sm:col-start-2">{announcement}</p>
          <p className="hidden justify-self-end sm:block">Pakistan (PKR Rs)</p>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-brown/10 bg-ivory">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4 lg:gap-6">
          <MobileMenu />
          <Link href="/" className="min-w-0 truncate py-3 font-display text-xl min-[400px]:text-2xl sm:py-4 lg:text-[26px]">{site.name}</Link>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-4 xl:gap-7">
              {mainNav.map((i) => <Item key={i.href} item={i} />)}
              <Item item={{ label: "More", href: "#", children: moreNav }} trigger="button" />
            </ul>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/search" aria-label="Search"><Search size={20} aria-hidden /></Link>
            <CartLink />
          </div>
        </div>
      </header>
    </>
  );
}
