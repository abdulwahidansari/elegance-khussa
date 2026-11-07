import { site } from "./site";

// Answers marked [PLACEHOLDER] must be replaced with real business information.
export const faqs = [
  { q: "What is your return and exchange policy?", a: site.returns },
    { q: "When will I get my order?", a: site.delivery },
  { q: "Are your khussa handmade?", a: "Yes. The Elegance Khussa sells handmade Pakistani khussa for women, from bridal and embroidered pairs to simple everyday styles." },
  { q: "How much does shipping cost?", a: "Shipping cost depends on your location and the items in your order. We confirm it with you by phone before dispatch." },
  { q: "How do I choose my size?", a: "Sizes are listed in EU sizing on every product. Choose the size you usually wear. If you are between two sizes, pick the larger one." },
  { q: "How do I pay?", a: "Pay by cash on delivery when your order arrives. You enter your name, phone and address at checkout before the order is placed." },
];
export const hasPlaceholders = faqs.some((f) => f.a.includes("[PLACEHOLDER"));
