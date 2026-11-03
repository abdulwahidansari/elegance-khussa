import type { Metadata } from "next";
export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };

export default function About() {
  return (
    <article className="max-w-prose">
      <h1 className="text-4xl">About The Elegance Khussa</h1>
      <p className="mt-4">The Elegance Khussa is an online store for traditional Pakistani footwear. This page is a draft.</p>
      <p className="mt-4">[PLACEHOLDER: the owner&apos;s real story, where the khussas are made, who makes them, and what the brand stands for. Add only facts you can stand behind.]</p>
    </article>
  );
}
