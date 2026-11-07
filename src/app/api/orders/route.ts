import { NextResponse } from "next/server";
import { validateOrder } from "@/lib/order";
import { forward } from "@/lib/webhook";

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body === "object" && body !== null && (body as { website?: unknown }).website) {
    return NextResponse.json({ ref: "EK-RECEIVED" });
  }

  const v = validateOrder(body, { allowSamples: process.env.ALLOW_SAMPLE_ORDERS === "true" });
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

  const ref = `EK-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  const result = await forward("order", { ref, paymentMethod: "cash on delivery", ...v.order });

  if (result === "unconfigured") {
    return NextResponse.json({ error: "Online ordering is not switched on yet. Please contact us to place your order." }, { status: 503 });
  }
  if (result === "failed") {
    return NextResponse.json({ error: "We could not send your order. Please try again or contact us." }, { status: 502 });
  }
  return NextResponse.json({ ref });
}
