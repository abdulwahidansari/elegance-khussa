# The Elegance Khussa (foundation)

Next.js (App Router) + TypeScript + Tailwind CSS storefront foundation.
**This is a starting scaffold, not a finished store.** It has not been installed, built or tested yet.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```
Dependencies are set to `latest`; after the first successful install, pin the versions in package.json.

## What exists
Home, shop, collection, product, new arrivals, best sellers, cart (browser localStorage), about, contact, FAQ,
policy pages, 404, sitemap.xml, robots.txt, metadata and canonical URLs, Organization / Product /
Breadcrumb / FAQ JSON-LD.

## What does NOT exist yet
Checkout and orders, payments, customer accounts, wishlist, order tracking, search, filters and sorting,
discount codes, newsletter, reviews, recently viewed, real database, admin, Google Analytics, real images.

## Rules built in
- All catalog data in `src/lib/data.ts` is SAMPLE data (`isMock: true`). Mock product pages are `noindex`
  and excluded from the sitemap. Remove `isMock` only for real, photographed products.
- Business facts are `[PLACEHOLDER: ...]` in `src/lib/site.ts`, the policy pages and the FAQ. Fill in real values.
- No review structured data until genuine reviews exist.

## Deploy
Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`), deploy (e.g. Vercel), then add `theelegancekhussa.store`
in the host's domain settings and create the DNS records the host shows you.
