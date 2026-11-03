import type { Metadata } from "next";
import { notFound } from "next/navigation";

const policies: Record<string, string> = {
  shipping: "Shipping Policy", returns: "Return and Exchange Policy", privacy: "Privacy Policy", customization: "Customization Policy", terms: "Terms and Conditions",
};
type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => Object.keys(policies).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  return policies[slug] ? { title: policies[slug], alternates: { canonical: `/policies/${slug}` } } : {};
}

export default async function Policy({ params }: Props) {
  const title = policies[(await params).slug];
  if (!title) notFound();
  return (
    <article className="max-w-prose">
      <h1 className="text-4xl">{title}</h1>
      <p className="mt-4">[PLACEHOLDER: this policy has not been written. Supply your real terms, then have them reviewed before launch. Nothing here is a promise to customers.]</p>
    </article>
  );
}
