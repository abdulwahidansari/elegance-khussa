import Link from "next/link";
import { preload } from "react-dom";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  preload("/videos/khussa1.mp4", { as: "video", fetchPriority: "high" });
  return (
    <section
      aria-labelledby="hero-title"
      className="relative left-1/2 -mt-6 flex min-h-[70svh] w-screen max-w-[100vw] -translate-x-1/2 items-end overflow-hidden text-ivory sm:-mt-10 sm:min-h-[88svh]"
    >
      <HeroVideo src="/videos/khussa1.mp4" />
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:pb-14 md:pb-20">
        <h1 id="hero-title" className="hero-rise max-w-3xl text-4xl leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl">
          Khussa for the days you remember.
        </h1>
        <p className="hero-rise mt-5 max-w-md text-base text-ivory/90 md:text-lg" style={{ animationDelay: "40ms" }}>
          Bridal, embroidered and everyday Pakistani khussa, with sizing and delivery details on every page.
        </p>
        <div className="hero-rise mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap" style={{ animationDelay: "80ms" }}>
          <Link href="/shop" className="bg-ivory px-8 py-3 text-center text-brown transition-transform duration-300 hover:-translate-y-0.5">Shop all khussa</Link>
          <Link href="/collections/bridal-khussa" className="border border-ivory/70 px-8 py-3 text-center transition-colors duration-300 hover:bg-ivory/10">Bridal khussa</Link>
        </div>
      </div>
    </section>
  );
}
