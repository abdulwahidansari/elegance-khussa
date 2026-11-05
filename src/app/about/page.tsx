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
        Our products are manufactured both locally and internationally. We carefully select our manufacturing partners so the pairs meet our quality standards and offer fair value.
      </p>
      <p className="mt-4">
        Shipping cost is shown before you complete a purchase, and you receive a tracking email once an order has shipped. Delivery time depends on your location. If you are not completely happy with an order, contact us and we will do our best to make it right. Items marked final sale cannot be returned.
      </p>
      <p className="mt-6">
        <Link href="/shop" className="underline underline-offset-4">Shop all khussa</Link>
        {" · "}
        <Link href="/contact" className="underline underline-offset-4">Contact us</Link>
      </p>
    </article>
  );
}
