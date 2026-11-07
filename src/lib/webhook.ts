export type ForwardResult = "ok" | "unconfigured" | "failed";

/**
 * Sends a form submission (order or newsletter signup) to the shop owner's tool of choice
 * (Make, Zapier, n8n, a Google Apps Script, etc.). Set FORMS_WEBHOOK_URL on the server.
 * Nothing is stored by this app itself until the database phase.
 */
export async function forward(type: "order" | "newsletter", payload: object): Promise<ForwardResult> {
  const url = process.env.FORMS_WEBHOOK_URL;
  if (!url) return "unconfigured";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, receivedAt: new Date().toISOString(), ...payload }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}
