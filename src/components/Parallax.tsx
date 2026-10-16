"use client";

import Image from "next/image";
import { useRef } from "react";
import { IMAGES, type ImageKey } from "@/lib/images";
import { gsap } from "@/lib/gsap";
import { useScrollEffects } from "@/lib/animations";

/** Image scaled to 1.2 that drifts up/down with scroll (simpleParallax-like). */
export function Parallax({ image, orientation = "up", className = "", sizes = "400px", priority = false, children }: { image: ImageKey; orientation?: "up" | "down"; className?: string; sizes?: string; priority?: boolean; children?: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useScrollEffects(scope, (q) => {
    const img = q("img");
    const from = orientation === "up" ? 8 : -8;
    gsap.fromTo(img, { yPercent: from, scale: 1.2 }, { yPercent: -from, scale: 1.2, ease: "none", scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true } });
  });
  const im = IMAGES[image];
  return (
    <div ref={scope} className={className}>
      <Image src={im.src} alt={im.alt} sizes={sizes} priority={priority} placeholder="blur" />
      {children}
    </div>
  );
}
