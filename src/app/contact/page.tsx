import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <section className="max-w-prose">
      <h1 className="text-4xl">Contact us</h1>
      <p className="mt-4">
        Questions about an order, a size or a return can be sent to {site.contact.email}. You can also use the form below — it opens an email to us with your message.
      </p>
      <ContactForm />
    </section>
  );
}
