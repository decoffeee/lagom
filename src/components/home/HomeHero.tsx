"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLoadTimeline, useScrollEffects } from "@/lib/animations";
import { getLenis } from "@/lib/lenis";
import { home } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { HeroDeco } from "./HeroDeco";

/**
 * "there is no place like / home." + the full-screen image that un-folds
 * from a 300px arch to full width as you scroll (scrubbed).
 * A scroll cue sits bottom-right and fades out as soon as the page starts moving.
 */
export function HomeHero() {
  const scope = useRef<HTMLDivElement>(null);
  const hero = IMAGES.bathroom;

  useLoadTimeline(scope, (tl, q) => {
    tl.fromTo(q(".hero-l1"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }, 0)
      .fromTo(q(".hero-l2"), { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }, 0.2)
      .fromTo(q(".hero-quote"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.5)
      .fromTo(q(".hero-img-sc"), { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2)
      .fromTo(q(".hero-scroll"), { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" }, 1.1);
  });

  useScrollEffects(scope, (q) => {
    const img = q(".hero-img")[0];
    gsap.fromTo(
      img,
      { y: -200, width: 300, borderTopLeftRadius: 500, borderTopRightRadius: 500 },
      { y: 0, width: "100%", borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: "none", scrollTrigger: { trigger: img, start: "center bottom", end: "center top", scrub: 1 } },
    );
    // the cue has done its job once the visitor scrolls: fade the wrapper (the load timeline owns the inner button)
    gsap.to(q(".hero-scroll-wrap"), { opacity: 0, y: -20, ease: "none", scrollTrigger: { trigger: scope.current, start: "top top", end: "20% top", scrub: true } });
  });

  const scrollDown = useCallback(() => {
    const target = scope.current?.querySelector<HTMLElement>(".hero-img-sc");
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={scope}>
      <section className="section hero">
        <HeroDeco />
        <div className="container hero-ct">
          <h1 className="hero-h1">
            <span className="block hero-line">
              <span className="hero-l1 flicker" >{home.hero.line1}</span>
            </span>
            <span className="block hero-line">
              <span className="hero-l2 flicker">{home.hero.line2}</span>
            </span>
          </h1>
          <p className="hero-quote flicker">{home.hero.quote}</p>
        </div>
        <div className="hero-scroll-wrap">
          <button type="button" className="hero-scroll flicker" onClick={scrollDown} data-cursor-stick="">
            <span className="hero-scroll-text">
              <span className="hero-scroll-label">Scroll</span>
              <span className="hero-scroll-sub">to explore</span>
            </span>
            <span className="hero-scroll-ring" aria-hidden="true">
              <svg className="hero-scroll-arrow" viewBox="0 0 24 24" width="22" height="22">
                <path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg className="hero-scroll-arrow hero-scroll-arrow--echo" viewBox="0 0 24 24" width="22" height="22">
                <path d="M12 4v15M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
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
