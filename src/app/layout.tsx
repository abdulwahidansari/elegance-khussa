import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site, social } from "@/lib/site";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { JsonLd } from "@/components/JsonLd";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant" });
const sans = Jost({ subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Pakistani Khussa for Women`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, url: site.url },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-ivory focus:p-2">Skip to content</a>
        <CartProvider>
          <Header />
          <main id="main" className="mx-auto max-w-6xl px-4 py-6 sm:py-10">{children}</main>
          <Footer />
          <CookieConsent />
        </CartProvider>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: site.name, url: site.url, email: site.contact.email, sameAs: Object.values(social) },
            { "@type": "WebSite", name: site.name, url: site.url, potentialAction: {
              "@type": "SearchAction", target: `${site.url}/search?q={search_term_string}`, "query-input": "required name=search_term_string",
            } },
          ],
        }} />
      </body>
    </html>
  );
}
