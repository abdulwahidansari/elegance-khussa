// Business facts are PLACEHOLDERS until the owner supplies real values.
export const site = {
  name: "The Elegance Khussa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theelegancekhussa.store",
  tagline: "Handcrafted Pakistani khussa, made to be worn and kept.",
  description:
    "Embroidered, bridal and everyday Pakistani khussa for women. A curated collection of traditional footwear.",
  contact: {
    email: "[PLACEHOLDER: support email]",
    phone: "[PLACEHOLDER: phone / WhatsApp]",
    address: "[PLACEHOLDER: business address]",
  },
  delivery:
    "We will work quickly to ship your order as soon as possible. Once your order has shipped, you will receive an email with tracking information and further details. Delivery times may vary depending on your location.",
  returns:
    "We want all our customers to be 100% satisfied with their purchases. If you're not completely happy with your order, please let us know, and we'll do our best to make things right.",
};

// Shown in the top bar and footer. Edit freely.
export const announcement = "Pakistani khussa for weddings, festive days and every day";
export const footerBlurb = "Traditional Pakistani khussa for weddings, festive days and everyday wear.";
// Add real URLs to show social links. Empty entries are hidden, so nothing is a dead link.
export const social: Record<string, string> = { Instagram: "", Facebook: "", TikTok: "", YouTube: "" };

export const money = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;
