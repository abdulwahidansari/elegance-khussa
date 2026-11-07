import { NextResponse } from "next/server";
import { isEmail } from "@/lib/order";
import { forward } from "@/lib/webhook";

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const b = (body ?? {}) as { email?: unknown; website?: unknown };
  if (b.website) return NextResponse.json({ ok: true }); // honeypot

  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  if (!isEmail(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const result = await forward("newsletter", { email });
  if (result === "unconfigured") return NextResponse.json({ error: "Email signup is not switched on yet." }, { status: 503 });
  if (result === "failed") return NextResponse.json({ error: "We could not save your email. Please try again." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
