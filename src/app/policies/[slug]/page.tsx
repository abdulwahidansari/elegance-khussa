import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";

const policies: Record<string, { title: string; paragraphs: string[] }> = {
  shipping: {
    title: "Shipping Policy",
    paragraphs: [
      "Shipping costs are calculated from your location and the items in your order. You always see the shipping cost before you complete your purchase.",
      "We work quickly to ship your order as soon as possible. Once it has shipped, you receive an email with tracking information and further details.",
      "Delivery times vary depending on your location. Cash on delivery is collected when the order arrives.",
    ],
  },
  returns: {
    title: "Return and Exchange Policy",
    paragraphs: [
      "We want every customer to be 100% satisfied. If you are not completely happy with your order, contact us and we will do our best to make it right.",
      "We are unable to accept returns on certain items. Any product that is final sale is clearly marked before purchase.",
      "To start a return, use the contact page and include your order details. We will tell you the next step before anything is sent back.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    paragraphs: [
      "We collect the name, phone number, delivery address and email you give us at checkout or on the contact form. We use that information to deliver your order and to reply to you.",
      "We do not sell your details. Payment for cash-on-delivery orders is collected by the courier when the parcel arrives, so we do not store card numbers.",
      "A cookie keeps the cart in this browser. Analytics, Meta, Google Ads, Tag Manager and optional AdSense cookies run only after you accept them. You can choose essential cookies only. Search Console is used to see how the site appears in Google, and it does not follow you around the shop.",
      `Questions about your information can be sent to ${site.contact.email}.`,
    ],
  },
  customization: {
    title: "Customization Policy",
    paragraphs: [
      "A custom or made-to-order piece is only started after we confirm the details with you, including size, colour and any change you asked for.",
      "Once that work has started, the item is final sale. Final-sale products are marked before you purchase them.",
      "If you want a change, contact us before the order is made. We will say whether it is still possible.",
    ],
  },
  terms: {
    title: "Terms and Conditions",
    paragraphs: [
      `${site.name} sells traditional Pakistani footwear online. Prices are shown in Pakistani rupees. Placing an order means you have checked the size, the product details and the shipping cost shown before checkout.`,
      "Payment is cash on delivery unless a product page says otherwise. We may contact you to confirm the address before dispatch.",
      "Returns follow the return policy. Items marked final sale cannot be returned. Shipping times depend on your location and are confirmed by the tracking email sent after dispatch.",
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
