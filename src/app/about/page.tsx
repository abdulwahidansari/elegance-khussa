import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };

export default function About() {
  return (
    <article className="max-w-prose">
      <h1 className="text-4xl">About The Elegance Khussa</h1>
      <p className="mt-4">
        The Elegance Khussa is an online store for traditional Pakistani footwear: bridal, embroidered and everyday khussa, made to be worn and kept.
      </p>
      <p className="mt-4">
        Our khussa are handmade, and the range runs from heavily worked bridal pairs to simple styles for daily wear.
      </p>
      <p className="mt-4">
        Delivery time and shipping cost depend on your location, and we confirm both with you by phone before dispatch. Payment is cash on delivery. If you want to ask about an exchange or return, contact us with your order details.
      </p>
      <p className="mt-6">
        <Link href="/shop" className="underline underline-offset-4">Shop all khussa</Link>
        {" · "}
        <Link href="/contact" className="underline underline-offset-4">Contact us</Link>
      </p>
    </article>
  );
}
