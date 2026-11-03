import { social } from "@/lib/site";

const BG = "var(--color-brown)"; // cut-out colour; the footer and top bar are both brown

function Icon({ name, size }: { name: string; size: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const, focusable: false as const };
  switch (name) {
    case "Instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path fill={BG} d="M13.4 21.5v-7.3h2.5l.4-2.9h-2.9V9.5c0-.8.3-1.4 1.4-1.4h1.6V5.5c-.3 0-1.2-.1-2.3-.1-2.2 0-3.7 1.4-3.7 3.8v2.1H8v2.9h2.4v7.3z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M19.6 6.9a4.9 4.9 0 0 1-3.6-4.4V2h-3.5v13.4a2.9 2.9 0 1 1-2-2.8V9a6.4 6.4 0 1 0 5.5 6.4V9a8.2 8.2 0 0 0 4.7 1.5V7.1c-.4 0-.8-.1-1.1-.2z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8z" />
          <path fill={BG} d="M10 9.5v5l4.5-2.5z" />
        </svg>
      );
    default:
      return null;
  }
}

/** Icons always show. An entry with no URL in src/lib/site.ts renders as an inert icon (not a link). */
export function Socials({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {Object.entries(social).map(([name, url]) => (
        <li key={name}>
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="block transition-opacity duration-150 hover:opacity-70">
              <Icon name={name} size={size} />
            </a>
          ) : (
            <span aria-hidden className="block opacity-80"><Icon name={name} size={size} /></span>
          )}
        </li>
      ))}
    </ul>
  );
}
