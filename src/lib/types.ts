export type Collection = { slug: string; name: string; blurb: string };

export type Product = {
  slug: string;
  name: string;
  collection: string; // Collection.slug
  price: number; // PKR
  compareAt?: number;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  sizes: number[];
  isNew?: boolean;
  isBestSeller?: boolean;
  /** SAMPLE DATA: true until a real, photographed product replaces it. */
  isMock: boolean;
};
