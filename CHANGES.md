# Changes in this update

Extract this zip over your project folder (keep your own node_modules, .next and .git). Then run `npm install` and `npm run dev`.
Do before going live: add `FORMS_WEBHOOK_URL` in Vercel (docs/forms-webhook.md).

## New / changed
- Hero: new headline, text and buttons; light-studio layout built around khussa1.mp4; poster image with alt text; ivory text fade (no dark overlay).
- Home page: own title, meta description, Open Graph and Twitter tags; share image (frame from your video).
- layout.tsx: removed the site-wide canonical "/" (it pointed every page without its own canonical at the homepage).
- Checkout: now sends the order to /api/orders. The cart is cleared only after the order was really received. Errors are shown. Prices are recalculated on the server.
- Newsletter: now sends to /api/subscribe and only says "added" when it really was.
- Sample products cannot be ordered (set ALLOW_SAMPLE_ORDERS=true only to test).
- Copy: removed promises the site cannot keep (tracking emails, "100% satisfied", "final sale" labels, "manufactured internationally").
- Video: removed the unused audio track (lossless), 2.5 MB -> 2.3 MB.
- robots.txt: /api/ is not crawled. README and .env.example updated.

## Checked here
TypeScript check of the whole project passes. Order/email validation and the webhook sender were run in automated tests.
NOT checked: `next build`, the API routes inside Next, real browser playback, a live webhook, your social links.
