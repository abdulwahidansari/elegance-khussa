import type { Metadata } from "next";
export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function Checkout() {
  return (
    <>
      <h1 className="text-4xl">Checkout</h1>
      <p className="mt-4 max-w-prose">Checkout is not built yet. This page is a placeholder.</p>
      <p className="mt-2 max-w-prose text-sm text-brown-soft">Planned: customer details, delivery address, cash on delivery, and a card/wallet gateway once merchant credentials exist. See README.</p>
    </>
  );
}
