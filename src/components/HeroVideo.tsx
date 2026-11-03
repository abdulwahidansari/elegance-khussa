"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed looping background video.
 * Falls back to the brand gradient if the file is missing, the user prefers
 * reduced motion, or Save-Data is on. Put the file at public/videos/khussa1.mp4.
 */
export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playable, setPlayable] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) { setPlayable(false); return; }
    ref.current?.play().catch(() => setPlayable(false));
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-champagne via-sand to-ivory" aria-hidden>
      {playable && (
        <video
          ref={ref}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          src={src}
          poster={poster}
          autoPlay muted loop playsInline preload="metadata"
          onCanPlay={() => setReady(true)}
          onError={() => setPlayable(false)}
        />
      )}
      {/* Legibility: darken only where the text sits (bottom-left). */}
      <div className="absolute inset-0 bg-gradient-to-t from-brown/75 via-brown/25 to-transparent md:bg-gradient-to-tr md:from-brown/70 md:via-brown/15 md:to-transparent" />
    </div>
  );
}
