"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLoadTimeline, useScrollEffects } from "@/lib/animations";

/**
 * Decorative line-art in the empty corners of the home hero: two pendant lamps
 * hanging from the top-right, a stool with a basket in the bottom-left.
 *
 * Layers (outer → inner):
 *   .hero-deco        entrance (load timeline) + scroll parallax (scrubbed)
 *   .hero-deco-mouse  pointer parallax (fine pointers only)
 *   img               idle motion (the lamps swing on their cords)
 *
 * Purely visual: aria-hidden, no pointer events, sits under the hero text.
 * `parts` picks which pieces to render; the reviews page splits them across two sections.
 */
export type DecoPart = "light" | "chair";

export function HeroDeco({ parts = ["light", "chair"] }: { parts?: DecoPart[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useLoadTimeline(scope, (tl, q) => {
    const light = q(".hero-deco-light");
    const lamp = q(".hero-deco-light img");
    const chair = q(".hero-deco-chair");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lamps drop in on their cords and settle; chair rises from the floor.
    if (light.length) {
      tl.fromTo(light, { autoAlpha: 0, y: -120 }, { autoAlpha: 1, y: 0, duration: 1.4, ease: "power3.out" }, 0.35)
        .fromTo(lamp, { rotation: -7, transformOrigin: "50% 0%" }, { rotation: 0, duration: 1.8, ease: "elastic.out(1, 0.45)" }, 0.5);
    }
    if (chair.length) tl.fromTo(chair, { autoAlpha: 0, y: 70, rotation: -3, transformOrigin: "50% 100%" }, { autoAlpha: 1, y: 0, rotation: 0, duration: 1.2, ease: "power3.out" }, 0.55);

    // Idle: a slow pendulum swing once the lamps have settled.
    if (!reduce && lamp.length) {
      tl.add(() => {
        gsap.fromTo(lamp, { rotation: -4.5, transformOrigin: "50% 0%" }, { rotation: 4.5, duration: 2.9, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }, 2.3);
    }
  });

  // Scroll parallax: lamps lift away faster than the page, the stool sinks slower (depth).
  useScrollEffects(scope, (q) => {
    const st = { trigger: scope.current, start: "top top", end: "bottom top", scrub: true } as const;
    if (q(".hero-deco-light").length) gsap.to(q(".hero-deco-light"), { yPercent: -45, ease: "none", scrollTrigger: st });
    if (q(".hero-deco-chair").length) gsap.to(q(".hero-deco-chair"), { yPercent: 35, ease: "none", scrollTrigger: st });
  });

  // Pointer parallax: both drift gently against the cursor, at different depths.
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const light = el.querySelector<HTMLElement>(".hero-deco-light .hero-deco-mouse");
    const chair = el.querySelector<HTMLElement>(".hero-deco-chair .hero-deco-mouse");
    if (!light && !chair) return;
    const opts = { duration: 1.4, ease: "power3.out" };
    const lx = light && gsap.quickTo(light, "x", opts);
    const ly = light && gsap.quickTo(light, "y", opts);
    const cx = chair && gsap.quickTo(chair, "x", opts);
    const cy = chair && gsap.quickTo(chair, "y", opts);
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      lx?.(nx * -22);
      ly?.(ny * -14);
      cx?.(nx * 14);
      cy?.(ny * 10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf([light, chair].filter(Boolean));
    };
  }, []);

  return (
    <div ref={scope} className="hero-deco-layer" aria-hidden="true">
      {parts.includes("light") && (
        <div className="hero-deco hero-deco-light flicker">
          <div className="hero-deco-mouse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deco/light.svg" alt="" width={180} height={300} decoding="async" />
          </div>
        </div>
      )}
      {parts.includes("chair") && (
        <div className="hero-deco hero-deco-chair flicker">
          <div className="hero-deco-mouse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deco/chair.svg" alt="" width={257} height={276} decoding="async" />
          </div>
        </div>
      )}
    </div>
  );
}
