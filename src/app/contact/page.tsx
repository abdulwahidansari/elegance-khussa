import type { Metadata } from "next";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <section className="max-w-prose">
      <h1 className="text-4xl">Contact us</h1>
      <dl className="mt-6 space-y-2">
        <div><dt className="text-sm text-brown-soft">Email</dt><dd>{site.contact.email}</dd></div>
        <div><dt className="text-sm text-brown-soft">Phone or WhatsApp</dt><dd>{site.contact.phone}</dd></div>
        <div><dt className="text-sm text-brown-soft">Address</dt><dd>{site.contact.address}</dd></div>
      </dl>
    </section>
  );
}
