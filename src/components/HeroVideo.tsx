"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Hero media: a poster image (the LCP element, always present) with the looping video fading in on top.
 * Reduced motion, Save-Data, autoplay failure or a missing video all leave the poster visible.
 */
export function HeroVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
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
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand md:absolute md:inset-0 md:aspect-auto">
      <Image src={poster} alt={alt} fill priority sizes="100vw" className="object-cover" />
      {playable && (
        <video
          ref={ref}
          aria-hidden
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          src={src}
          autoPlay muted loop playsInline preload="metadata"
          onCanPlay={() => setReady(true)}
          onError={() => setPlayable(false)}
        />
      )}
    </div>
  );
}
