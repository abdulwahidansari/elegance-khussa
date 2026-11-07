import { CreditCard, Headphones, Package, Truck } from "lucide-react";

const items = [
  { Icon: Truck, title: "Fast Delivery", note: "Deliver orders on time" },
  { Icon: Headphones, title: "Great Support 24/7", note: "Instant contact access" },
  { Icon: CreditCard, title: "Secure Payment", note: "Your money is safe" },
  { Icon: Package, title: "Exclusive Deals", note: "Enjoy amazing discounts" },
];

export function TrustStrip() {
  return (
    <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map(({ Icon, title, note }) => (
        <li key={title} className="rounded-2xl bg-sand px-4 py-7 text-center">
          <Icon size={28} strokeWidth={1.5} aria-hidden className="mx-auto text-brown" />
          <p className="mt-3 font-semibold">{title}</p>
          <p className="mt-1 text-sm text-brown-soft">{note}</p>
        </li>
      ))}
    </ul>
  );
}
