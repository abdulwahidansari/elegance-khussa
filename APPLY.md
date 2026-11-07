# Hero + SEO update

1. Copy `src/components/Hero.tsx`, `src/app/opengraph-image.tsx` and `src/app/twitter-image.tsx` into your project (Hero.tsx replaces the old one).

2. In `src/app/page.tsx`, add at the top: `import type { Metadata } from "next";` and paste this above `export default function Home`:

```tsx
const title = "Handmade Pakistani Khussa for Women | The Elegance Khussa";
const description =
  "Shop handmade Pakistani khussa for women: bridal, embroidered and everyday styles in traditional footwear for weddings, Eid and special occasions.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title, description, url: "/", siteName: "The Elegance Khussa" },
  twitter: { card: "summary_large_image", title, description },
};
```

3. In `src/app/layout.tsx`, DELETE the line `alternates: { canonical: "/" },` from `metadata`.
   (It told search engines that every page without its own canonical, such as /cart, is a copy of the homepage.)

I did not overwrite page.tsx or layout.tsx because your live site has edits I cannot see.
