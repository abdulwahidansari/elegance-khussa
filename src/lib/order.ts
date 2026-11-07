import { getProduct } from "./data";

export type OrderItem = { slug: string; name: string; size: number; qty: number; unitPrice: number; sample: boolean };
export type Order = { name: string; phone: string; city: string; address: string; items: OrderItem[]; subtotal: number };
export type Validated = { ok: true; order: Order } | { ok: false; error: string };

const fail = (error: string): Validated => ({ ok: false, error });
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

export const normalizePhone = (v: string) => v.replace(/[\s\-()]/g, "");
/** Pakistani mobile or landline: 03001234567, +923001234567, 02112345678. */
export const isPkPhone = (v: string) => /^(\+92|0)\d{9,10}$/.test(v);
export const isEmail = (v: string) => v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Validates an order and recomputes prices from the product data. Prices sent by the browser are ignored. */
export function validateOrder(raw: unknown, opts: { allowSamples?: boolean } = {}): Validated {
  if (typeof raw !== "object" || raw === null) return fail("Invalid order.");
  const r = raw as Record<string, unknown>;
  const name = clean(r.name, 80);
  const city = clean(r.city, 60);
  const address = clean(r.address, 300);
  const phone = normalizePhone(clean(r.phone, 25));

  if (name.length < 2) return fail("Please enter your full name.");
  if (!isPkPhone(phone)) return fail("Please enter a valid phone number, for example 0300 1234567.");
  if (city.length < 2) return fail("Please enter your city.");
  if (address.length < 8) return fail("Please enter your full delivery address.");
  if (!Array.isArray(r.lines) || r.lines.length === 0 || r.lines.length > 30) return fail("Your cart is empty.");

  const items: OrderItem[] = [];
  for (const line of r.lines) {
    const l = (line ?? {}) as Record<string, unknown>;
    const p = typeof l.slug === "string" ? getProduct(l.slug) : undefined;
    if (!p) return fail("One of the items in your cart is no longer available.");
    const size = l.size, qty = l.qty;
    if (typeof size !== "number" || !p.sizes.includes(size)) return fail(`Please choose a valid size for ${p.name}.`);
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1 || qty > 10) return fail("Quantity must be between 1 and 10.");
    if (p.isMock && !opts.allowSamples) return fail("These are sample products shown for preview and cannot be ordered yet.");
    items.push({ slug: p.slug, name: p.name, size, qty, unitPrice: p.price, sample: p.isMock });
  }
  const subtotal = items.reduce((n, i) => n + i.unitPrice * i.qty, 0);
  return { ok: true, order: { name, phone, city, address, items, subtotal } };
}
