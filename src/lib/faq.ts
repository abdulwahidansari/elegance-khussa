import { site } from "./site";

// Answers marked [PLACEHOLDER] must be replaced with real business information.
export const faqs = [
  { q: "What is your return and exchange policy?", a: site.returns },
  { q: "Are any purchases final sale?", a: "[PLACEHOLDER: which items, if any, cannot be returned or exchanged]" },
  { q: "When will I get my order?", a: site.delivery },
  { q: "Where are your products made?", a: "[PLACEHOLDER: where and by whom your khussa are made]" },
  { q: "How much does shipping cost?", a: "[PLACEHOLDER: delivery charges]" },
  { q: "How do I choose my size?", a: "Sizes are listed in EU sizing. [PLACEHOLDER: add a measurement guide and advice for wide feet.]" },
  { q: "How do I pay?", a: "[PLACEHOLDER: list the payment methods that are actually live.]" },
];
export const hasPlaceholders = faqs.some((f) => f.a.includes("[PLACEHOLDER"));
