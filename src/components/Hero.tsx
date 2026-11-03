import Link from "next/link";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative left-1/2 -mt-10 flex min-h-[88svh] w-screen -translate-x-1/2 items-end overflow-hidden text-ivory"
    >
      <HeroVideo src="/videos/khussa1.mp4" />
      <div className="mx-auto w-full max-w-6xl px-4 pb-14 md:pb-20">
        <h1 id="hero-title" className="hero-rise max-w-3xl text-5xl leading-[1.02] md:text-8xl" style={{ animationDelay: "100ms" }}>
          Khussa for the days you remember.
        </h1>
        <p className="hero-rise mt-5 max-w-md text-base text-ivory/90 md:text-lg" style={{ animationDelay: "250ms" }}>
          Bridal, embroidered and everyday Pakistani khussa, with sizing and delivery details on every page.
        </p>
        <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
          <Link href="/shop" className="bg-ivory px-8 py-3 text-brown transition-transform duration-300 hover:-translate-y-0.5">Shop all khussa</Link>
          <Link href="/collections/bridal-khussa" className="border border-ivory/70 px-8 py-3 transition-colors duration-300 hover:bg-ivory/10">Bridal khussa</Link>
        </div>
      </div>
    </section>
  );
}
