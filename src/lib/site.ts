// Business facts are PLACEHOLDERS until the owner supplies real values.
export const site = {
  name: "The Elegance Khussa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theelegancekhussa.store",
  tagline: "Handcrafted Pakistani khussa, made to be worn and kept.",
  description:
    "Embroidered, bridal and everyday Pakistani khussa for women. A curated collection of traditional footwear.",
  contact: {
    email: "hello@theelegancekhussa.store",
    phone: "",
    address: "Pakistan",
  },
  delivery:
    "Delivery time and shipping cost depend on your location. We confirm both with you by phone before your order is dispatched.",
  returns:
    "To ask about an exchange or return, contact us with your order details and we will tell you the next step.",
};

// Shown in the top bar and footer. Edit freely.
export const announcement = "Pakistani khussa for weddings, festive days and every day";
export const footerBlurb = "Traditional Pakistani khussa for weddings, festive days and everyday wear.";
// Profile links used by the header and footer icons. Replace a URL if the real handle is different.
export const social: Record<string, string> = {
  Instagram: "https://www.instagram.com/theelegancekhussa/",
  Facebook: "https://www.facebook.com/theelegancekhussa",
  TikTok: "https://www.tiktok.com/@theelegancekhussa",
  YouTube: "https://www.youtube.com/@theelegancekhussa",
};

export const money = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;
