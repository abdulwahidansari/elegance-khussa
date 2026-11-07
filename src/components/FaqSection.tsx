import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/faq";

export function FaqSection({ count = 5 }: { count?: number }) {
  return (
    <section aria-labelledby="faq-title" className="mt-24 bg-sand px-4 py-14 md:py-16">
      <h2 id="faq-title" className="text-center text-4xl md:text-5xl">Frequently asked questions</h2>
      <div className="mx-auto mt-10 max-w-2xl border-t border-brown/15">
        {faqs.slice(0, count).map((f, i) => (
          <details key={f.q} name="home-faq" open={i === 0} className="group border-b border-brown/15">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus size={18} aria-hidden className="shrink-0 text-brown-soft group-open:hidden" />
              <Minus size={18} aria-hidden className="hidden shrink-0 text-brown-soft group-open:block" />
            </summary>
            <p className="pb-5 pr-10 text-brown-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
