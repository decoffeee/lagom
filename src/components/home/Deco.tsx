"use client";

import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScrollEffects } from "@/lib/animations";
import { home, roomHref, rooms } from "@/lib/site";
import { Pill } from "../Pill";

/** "deco." — intro copy, a line-art tub in the left column's empty space, and the room pills. Title chars + text rise in on scroll. */
export function Deco() {
  const scope = useRef<HTMLElement>(null);

  useScrollEffects(scope, (q) => {
    const title = q(".home-title")[0];
    const split = new SplitText(title, { type: "chars", charsClass: "nb-char" });
    const tl = gsap.timeline({ scrollTrigger: { trigger: q(".deco-ct")[0], start: "top bottom", once: true } });
    tl.fromTo(split.chars, { autoAlpha: 0, y: 60, rotation: 2 }, { autoAlpha: 1, y: 0, rotation: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 }, 0)
      .fromTo(q(".home-text"), { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.2);

    // the tub slides in from the page edge when it comes into view, then drifts slowly against the scroll
    const tub = q(".deco-tub")[0];
    if (tub) {
      gsap.fromTo(tub, { autoAlpha: 0, x: -90 }, { autoAlpha: 1, x: 0, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: tub, start: "top 92%", once: true } });
      gsap.fromTo(q(".deco-tub img"), { y: 12 }, { y: -12, ease: "none", scrollTrigger: { trigger: tub, start: "top bottom", end: "bottom top", scrub: true } });
    }
  });

  return (
    <section ref={scope} className="section deco-sc">
      <div className="container title-ct">
        <h2 className="home-title">{home.deco.title}</h2>
      </div>
      <div className="container deco-ct">
        <div className="block deco-col deco-col--left">
          <div className="home-text rich">
            {home.deco.left.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
          <div className="deco-tub" aria-hidden="true">
            <div className="deco-tub-flip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/deco/tub.svg" alt="" width={420} height={359} decoding="async" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="block deco-col deco-col--right">
          <div className="home-text rich">
            {home.deco.right.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
          <div className="pills">
            {rooms.map((r) => (
              <Pill key={r.slug} label={r.label} italic={r.italic} image={r.images.hero} href={roomHref(r)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
