import Link from "next/link";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative left-1/2 -mt-10 w-screen -translate-x-1/2 overflow-hidden bg-ivory text-brown md:flex md:min-h-[82svh] md:items-center"
    >
      <HeroVideo
        src="/videos/khussa1.mp4"
        poster="/videos/khussa1-poster.jpg"
        alt="Pair of cream khussa with gold bead and pearl embroidery"
      />
      {/* The footage is a light studio shot, so the text sits on an ivory fade instead of a dark overlay. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ivory from-0% via-ivory/85 via-35% to-transparent to-62% md:block" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 md:py-24">
        <div className="md:max-w-[34rem]">
          <h1 id="hero-title" className="hero-rise text-5xl leading-[1.04] md:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
            Pakistani Khussa for Brides and Beyond
          </h1>
          <p className="hero-rise mt-5 max-w-md text-base text-brown-soft md:text-lg" style={{ animationDelay: "250ms" }}>
            Explore handmade bridal, embroidered and everyday khussa for women, traditional Pakistani footwear for weddings, Eid and special occasions, all in one collection.
          </p>
          <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
            <Link href="/shop" className="bg-brown px-8 py-3 text-ivory transition-transform duration-300 hover:-translate-y-0.5">Shop All Khussa</Link>
            <Link href="/collections/bridal-khussa" className="border border-brown/60 px-8 py-3 transition-colors duration-300 hover:bg-brown/5">Explore Bridal Khussa</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
