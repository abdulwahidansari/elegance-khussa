const pick = (value: string | undefined, re: RegExp) => (value && re.test(value) ? value : "");

/** Public measurement IDs. Empty values stay off so the site never loads a broken tag. */
export const tracking = {
  ga4: pick(process.env.NEXT_PUBLIC_GA4_ID, /^G-[A-Z0-9]+$/),
  gtm: pick(process.env.NEXT_PUBLIC_GTM_ID, /^GTM-[A-Z0-9]+$/),
  pixel: pick(process.env.NEXT_PUBLIC_META_PIXEL_ID, /^\d{5,20}$/),
  ads: pick(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID, /^AW-\d+$/),
  adsLabel: pick(process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL, /^[A-Za-z0-9_-]{4,40}$/),
  adsense: pick(process.env.NEXT_PUBLIC_ADSENSE_CLIENT, /^ca-pub-\d+$/),
};

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: (...args: unknown[]) => void;
  }
}

function addScript(id: string, src: string, attrs?: Record<string, string>) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  Object.entries(attrs ?? {}).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

/** Loads every configured marketing tag. Call only after the visitor accepts cookies. */
export function loadMarketing() {
  const { ga4, gtm, pixel, ads, adsense } = tracking;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
  }
  window.gtag("js", new Date());

  if (gtm) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    addScript("ek-gtm", `https://www.googletagmanager.com/gtm.js?id=${gtm}`);
  }
  if (ga4 || ads) {
    addScript("ek-gtag", `https://www.googletagmanager.com/gtag/js?id=${ga4 || ads}`);
    if (ga4) window.gtag("config", ga4);
    if (ads) window.gtag("config", ads);
  }
  if (pixel && !window.fbq) {
    const fbq = function (...args: unknown[]) {
      const q = fbq as typeof fbq & { queue: unknown[] };
      q.queue.push(args);
    } as ((...args: unknown[]) => void) & { queue: unknown[]; loaded?: boolean; version?: string };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    addScript("ek-pixel", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixel);
    window.fbq("track", "PageView");
  }
  if (adsense) {
    addScript("ek-adsense", `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`, { crossorigin: "anonymous" });
  }
}

export function trackPurchase(value: number) {
  if (typeof window === "undefined") return;
  const { ga4, ads, adsLabel, pixel } = tracking;
  if (window.gtag && ga4) window.gtag("event", "purchase", { value, currency: "PKR" });
  if (window.gtag && ads && adsLabel) {
    window.gtag("event", "conversion", { send_to: `${ads}/${adsLabel}`, value, currency: "PKR" });
  }
  if (window.fbq && pixel) window.fbq("track", "Purchase", { value, currency: "PKR" });
}
