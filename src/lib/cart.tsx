"use client";
import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from "react";

export type Line = { slug: string; size: number; qty: number };
type Action =
  | { type: "add"; slug: string; size: number }
  | { type: "setQty"; slug: string; size: number; qty: number }
  | { type: "remove"; slug: string; size: number }
  | { type: "clear" }
  | { type: "load"; lines: Line[] };

const same = (a: Line, slug: string, size: number) => a.slug === slug && a.size === size;

function reducer(state: Line[], a: Action): Line[] {
  switch (a.type) {
    case "load": return a.lines;
    case "add":
      return state.some((l) => same(l, a.slug, a.size))
        ? state.map((l) => (same(l, a.slug, a.size) ? { ...l, qty: l.qty + 1 } : l))
        : [...state, { slug: a.slug, size: a.size, qty: 1 }];
    case "setQty":
      return state.map((l) => (same(l, a.slug, a.size) ? { ...l, qty: Math.max(1, a.qty) } : l));
    case "remove": return state.filter((l) => !same(l, a.slug, a.size));
    case "clear": return [];
  }
}

const Ctx = createContext<{ lines: Line[]; dispatch: Dispatch<Action>; count: number } | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ek-cart");
      if (raw) dispatch({ type: "load", lines: JSON.parse(raw) });
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("ek-cart", JSON.stringify(lines)); } catch {}
  }, [lines]);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return <Ctx.Provider value={{ lines, dispatch, count }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
