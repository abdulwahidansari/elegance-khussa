import { site } from "./site";

// Answers marked [PLACEHOLDER] must be replaced with real business information.
export const faqs = [
  { q: "What is your return policy?", a: site.returns },
  { q: "Are any purchases final sale?", a: "We are unable to accept returns on certain items. Any products that are final sale will be clearly marked before purchase." },
  { q: "When will I get my order?", a: site.delivery },
  { q: "Where are your products manufactured?", a: "Our products are manufactured both locally and internationally. We carefully select our manufacturing partners to ensure that our products meet our quality standards and offer fair value." },
  { q: "How much does shipping cost?", a: "Shipping costs are calculated based on your location and the items in your order. You will always see the shipping cost before completing your purchase." },
  { q: "How do I choose my size?", a: "Sizes are listed in EU sizing. [PLACEHOLDER: add a measurement guide and advice for wide feet.]" },
  { q: "How do I pay?", a: "[PLACEHOLDER: list the payment methods that are actually live.]" },
];
export const hasPlaceholders = faqs.some((f) => f.a.includes("[PLACEHOLDER"));
