"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { allNav } from "@/lib/nav";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);

  return (
    <div className="md:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)} className="-ml-2 p-2">
        {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto border-b border-brown/15 bg-ivory px-4 pb-6">
          <ul className="divide-y divide-brown/10">
            {allNav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-display text-xl">
                      {item.label}<span aria-hidden className="text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <ul className="pb-3 pl-3 text-[15px]">
                      <li><Link href={item.href} className="block py-1.5 underline underline-offset-4">View all</Link></li>
                      {item.children.map((c) => <li key={c.href}><Link href={c.href} className="block py-1.5">{c.label}</Link></li>)}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} className="block py-3 font-display text-xl">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
