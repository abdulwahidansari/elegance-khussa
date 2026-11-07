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
Home (video hero, shop-by-style, FAQ, trust strip), shop, collections, product pages, new arrivals, best sellers, search,
cart (browser localStorage), cash-on-delivery checkout that submits to `/api/orders`, newsletter signup (`/api/subscribe`),
contact form (opens the visitor's email app), about, FAQ, policy pages, 404, sitemap.xml, robots.txt, metadata and canonical URLs,
Organization / Product / Breadcrumb / FAQ JSON-LD.

Orders and signups go to `FORMS_WEBHOOK_URL` (see `docs/forms-webhook.md`). Without it they show an honest "not switched on" message.

## What does NOT exist yet
Payment gateways, customer accounts, wishlist, order tracking, filters and sorting, discount codes, reviews,
recently viewed, a real database, an admin area, Google Analytics, real product photos.

## Rules built in
- All catalog data in `src/lib/data.ts` is SAMPLE data (`isMock: true`). Mock product pages are `noindex`
  and excluded from the sitemap. Remove `isMock` only for real, photographed products.
- Business facts are `[PLACEHOLDER: ...]` in `src/lib/site.ts`, the policy pages and the FAQ. Fill in real values.
- No review structured data until genuine reviews exist.

## Deploy
Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`), deploy (e.g. Vercel), then add `theelegancekhussa.store`
in the host's domain settings and create the DNS records the host shows you.
