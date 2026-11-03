"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/cart" aria-label={`Cart, ${count} items`} className="flex items-center gap-1">
      <ShoppingBag size={20} aria-hidden /> <span className="text-sm">{count}</span>
    </Link>
  );
}
