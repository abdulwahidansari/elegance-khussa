import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { faqs, hasPlaceholders } from "@/lib/faq";
export const metadata: Metadata = { title: "FAQ", alternates: { canonical: "/faq" } };


export default function FAQ() {
  return (
    <section className="max-w-prose">
      <h1 className="text-4xl">Frequently asked questions</h1>
      <div className="mt-6 divide-y divide-brown/15 border-y border-brown/15">
        {faqs.map((f) => (
          <details key={f.q} className="py-3"><summary className="cursor-pointer font-display text-xl">{f.q}</summary><p className="mt-2">{f.a}</p></details>
        ))}
      </div>
      {/* FAQ schema is published only once every answer is real. */}
      {!hasPlaceholders && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />}
    </section>
  );
}
