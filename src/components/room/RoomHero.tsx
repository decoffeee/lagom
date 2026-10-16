"use client";

import Image from "next/image";
import { useRef } from "react";
import { SplitText } from "@/lib/gsap";
import { useLoadTimeline } from "@/lib/animations";
import type { Room } from "@/lib/site";
import { IMAGES } from "@/lib/images";

/** Room hero: vertical line, circular photo, TITLE., intro — all animated in. */
export function RoomHero({ room }: { room: Room }) {
  const scope = useRef<HTMLElement>(null);
  const im = IMAGES[room.images.hero];

  useLoadTimeline(scope, (tl, q) => {
    tl.fromTo(q(".apart-top-div"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: "none" }, 0)
      .fromTo(q(".apart-img"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 1, ease: "circ.out" }, 0.1)
      .fromTo(q(".apart-title"), { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power4.out" }, 0.3);
    const text = q(".apart-text");
    if (text.length) {
      const split = new SplitText(text, { type: "lines", linesClass: "nb-line" });
      tl.fromTo(split.lines, { autoAlpha: 0, y: 55 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.05 }, 0.5);
    }
    tl.fromTo(q(".apart-bot-div"), { height: "0vh" }, { height: "25vh", duration: 0.8, ease: "power3.out" }, 0.6);
  });

  return (
    <section ref={scope} className="section apart-hero">
      <div className="container apart-hero-ct">
        <div className="block apart-top">
          <div className="v-line apart-top-div flicker" aria-hidden="true" />
          <div className="apart-img flicker">
            <Image src={im.src} alt={im.alt} fill sizes="280px" priority placeholder="blur" />
          </div>
        </div>
        <div className="block apart-mid">
          <div className="page-title-wrap">
            <h1 className="apart-title flicker">{room.title}</h1>
          </div>
          <div className="block page-text-wrap">
            <div className="apart-text flicker">{room.intro}</div>
          </div>
        </div>
        <div className="v-line apart-bot-div flicker" aria-hidden="true" />
      </div>
    </section>
  );
}
