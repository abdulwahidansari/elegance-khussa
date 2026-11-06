/**
 * Full-bleed looping background video.
 * The file is served with its index at the front, and this tag is in the first
 * HTML response so the browser can start it without waiting for JavaScript.
 * Reduced motion hides the video and keeps the brand gradient.
 */
export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-champagne via-sand to-ivory" aria-hidden>
      <video
        className="hero-video h-full w-full object-cover"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-brown/75 via-brown/25 to-transparent md:bg-gradient-to-tr md:from-brown/70 md:via-brown/15 md:to-transparent" />
    </div>
  );
}
