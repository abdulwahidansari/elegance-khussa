import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";

const policies: Record<string, { title: string; paragraphs: string[] }> = {
  shipping: {
    title: "Shipping Policy",
    paragraphs: [
      "Shipping cost depends on your location and the items in your order. We confirm it with you by phone before your order is dispatched.",
      "Delivery time also depends on your location, and we tell you what to expect when we call to confirm your order.",
      "Payment is cash on delivery and is collected when the order arrives.",
    ],
  },
  returns: {
    title: "Return and Exchange Policy",
    paragraphs: [
      "If you would like to ask about an exchange or return, contact us with your order details and the reason.",
      "We review each request individually and tell you the next step before anything is sent back.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    paragraphs: [
      "We collect the name, phone number, delivery address and email you give us at checkout or on the contact form. We use that information to deliver your order and to reply to you.",
      "We do not sell your details. Payment for cash-on-delivery orders is collected by the courier when the parcel arrives, so we do not store card numbers.",
      `Questions about your information can be sent to ${site.contact.email}.`,
    ],
  },
  customization: {
    title: "Customization Policy",
    paragraphs: [
      "A custom or made-to-order piece is only started after we confirm the details with you, including size, colour and any change you asked for.",
      "If you want a change, contact us before the order is made. We will say whether it is still possible.",
    ],
  },
  terms: {
    title: "Terms and Conditions",
    paragraphs: [
      `${site.name} sells traditional Pakistani footwear online. Prices are shown in Pakistani rupees. Placing an order means you have checked the size, the product details and the shipping cost shown before checkout.`,
      "Payment is cash on delivery unless a product page says otherwise. We may contact you to confirm the address before dispatch.",
      "Returns and exchanges follow the return and exchange policy. Shipping cost and delivery time depend on your location and are confirmed with you by phone before dispatch.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => Object.keys(policies).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const policy = policies[slug];
  return policy ? { title: policy.title, alternates: { canonical: `/policies/${slug}` } } : {};
}

export default async function Policy({ params }: Props) {
  const slug = (await params).slug;
  const policy = policies[slug];
  if (!policy) notFound();
  return (
    <article className="max-w-prose">
      <h1 className="text-4xl">{policy.title}</h1>
      {policy.paragraphs.map((p) => <p key={p} className="mt-4">{p}</p>)}
    </article>
  );
}
