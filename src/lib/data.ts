import type { Collection, Product } from "./types";
import { allNav, type NavItem } from "./nav";

// SAMPLE CATALOG. Names, prices and specs are invented for development only.
const blurbs: Record<string, string> = {
  "bridal-khussa": "Heavily worked pairs for the wedding week and the days around it.",
  "embroidered-khussa": "Thread, zari and bead work for festive dressing.",
  "simple-khussa": "Plain and lightly worked pairs for daily wear.",
  sale: "Pairs currently priced below their regular price.",
};
const flat = (items: NavItem[]): NavItem[] => items.flatMap((i) => [i, ...(i.children ? flat(i.children) : [])]);
const slugOf = (i: NavItem) => i.href.split("/").pop()!;

export const collections: Collection[] = flat(allNav)
  .filter((i) => i.href.startsWith("/collections/"))
  .map((i) => ({ slug: slugOf(i), name: i.label, blurb: blurbs[slugOf(i)] ?? `Browse ${i.label.toLowerCase()} from The Elegance Khussa.` }));

const sizes = [36, 37, 38, 39, 40, 41];
const mat = [{ label: "Upper", value: "[PLACEHOLDER: material]" }, { label: "Sole", value: "[PLACEHOLDER: material]" }];
const mock = { isMock: true, sizes, specs: mat } as const;

export const products: Product[] = [
  { slug: "champagne-tilla-bridal", name: "Champagne Tilla Bridal", collection: "bridal-khussa", price: 7500, compareAt: 8500, isNew: true, isBestSeller: true,
    description: "A bridal khussa in champagne with dense gold tilla work across the vamp.",
    highlights: ["Gold tilla vamp", "Cushioned insole", "Pointed toe"], ...mock },
  { slug: "ivory-pearl-bridal", name: "Ivory Pearl Bridal", collection: "bridal-khussa", price: 6800, isNew: true,
    description: "Ivory base with pearl and sequin detail, made to sit under light bridal outfits.",
    highlights: ["Pearl beadwork", "Cushioned insole"], ...mock },
  { slug: "maroon-zari-embroidered", name: "Maroon Zari Embroidered", collection: "embroidered-khussa", price: 3200, isBestSeller: true,
    description: "Deep maroon with fine zari thread embroidery.",
    highlights: ["Zari embroidery", "Soft lining"], ...mock },
  { slug: "emerald-thread-embroidered", name: "Emerald Thread Embroidered", collection: "embroidered-khussa", price: 3400,
    description: "Emerald green with a floral thread motif.",
    highlights: ["Floral thread work"], ...mock },
  { slug: "gold-tilla-classic", name: "Gold Tilla Classic", collection: "embroidered-khussa", price: 3900, compareAt: 4500, isBestSeller: true,
    description: "The classic gold tilla pattern on a neutral base.",
    highlights: ["Gold tilla", "Pointed toe"], ...mock },
  { slug: "tan-leather-everyday", name: "Tan Leather Everyday", collection: "simple-khussa", price: 1900, isNew: true,
    description: "A plain tan khussa for daily wear.",
    highlights: ["Plain finish", "Lightweight"], ...mock },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
const childSlugs = (slug: string) =>
  flat(allNav).find((i) => i.href === `/collections/${slug}`)?.children?.map(slugOf) ?? [];

export const productsIn = (slug: string) =>
  slug === "sale"
    ? products.filter((p) => p.compareAt)
    : products.filter((p) => p.collection === slug || childSlugs(slug).includes(p.collection));
