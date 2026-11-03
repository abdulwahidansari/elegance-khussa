export type NavItem = { label: string; href: string; children?: NavItem[] };

const c = (label: string, slug: string, children?: NavItem[]): NavItem => ({ label, href: `/collections/${slug}`, children });

// Single source of truth for header, mobile menu, footer and collection routes.
export const mainNav: NavItem[] = [
  c("Khussa", "khussa", [
    c("Bridal Khussa", "bridal-khussa"), c("Embroidered Khussa", "embroidered-khussa"), c("Kundan Khussa", "kundan-khussa"),
    c("Nawabi Khussa", "nawabi-khussa"), c("Simple Khussa", "simple-khussa"), c("Open Khussa", "open-khussa"),
    c("Net Khussa", "net-khussa"), c("Loafers", "loafers"),
  ]),
  c("Clutches & Bags", "clutches-bags", [
    c("Potli Bags", "potli-bags"), c("Party Clutches", "party-clutches"), c("Kundan Clutches", "kundan-clutches"),
    c("Turkish Clutches", "turkish-clutches"), c("Mini Clutches", "mini-clutches"),
  ]),
  c("Accessories", "accessories", [c("Anklets", "anklets"), c("Earrings", "earrings"), c("Bracelets", "bracelets"), c("Key Chains", "key-chains")]),
  c("Flats", "flats", [c("Mules", "mules"), c("Sliders", "sliders"), c("Pumps", "pumps")]),
  c("Kolhapuri", "kolhapuri", [c("Festive Kolhapuri", "festive-kolhapuri"), c("Casual Kolhapuri", "casual-kolhapuri"), c("Tilla Kolhapuri", "tilla-kolhapuri")]),
  c("Peshawari", "peshawari", [c("Casual Peshawari", "casual-peshawari"), c("Festive Peshawari", "festive-peshawari")]),
];

export const moreNav: NavItem[] = [
  c("Festive Combos", "festive-combos", [c("Gift Box", "gift-box"), c("Wedding Combo", "wedding-combo")]),
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  c("Sale", "sale"),
];

export const allNav = [...mainNav, ...moreNav];
