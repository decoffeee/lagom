"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLoadTimeline, useScrollEffects } from "@/lib/animations";
import { home } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { HeroDeco } from "./HeroDeco";

/**
 * "there is no place like / home." + the full-screen image that un-folds
 * from a 300px arch to full width as you scroll (scrubbed).
 */
export function HomeHero() {
  const scope = useRef<HTMLDivElement>(null);
  const hero = IMAGES.bathroom;

  useLoadTimeline(scope, (tl, q) => {
    tl.fromTo(q(".hero-l1"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }, 0)
      .fromTo(q(".hero-l2"), { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }, 0.2)
      .fromTo(q(".hero-quote"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.5)
      .fromTo(q(".hero-img-sc"), { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);
  });

  useScrollEffects(scope, (q) => {
    const img = q(".hero-img")[0];
    gsap.fromTo(
      img,
      { y: -200, width: 300, borderTopLeftRadius: 500, borderTopRightRadius: 500 },
      { y: 0, width: "100%", borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: "none", scrollTrigger: { trigger: img, start: "center bottom", end: "center top", scrub: 1 } },
    );
  });

  return (
    <div ref={scope}>
      <section className="section hero">
        <HeroDeco />
        <div className="container hero-ct">
          <h1 className="hero-h1">
            <span className="block hero-line">
              <span className="hero-l1 flicker">{home.hero.line1}</span>
            </span>
            <span className="block hero-line">
              <span className="hero-l2 flicker">{home.hero.line2}</span>
            </span>
          </h1>
          <p className="hero-quote flicker">{home.hero.quote}</p>
        </div>
      </section>
      <section className="section hero-img-sc flicker">
        <div className="hero-img">
          <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" placeholder="blur" />
        </div>
      </section>
    </div>
  );
}
