"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollEffects } from "@/lib/animations";

/**
 * Wraps the home page so the page background scrubs beige → black as the
 * gallery arrives, and back to beige as the amenities section takes over.
 */
export function HomeScroll({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useScrollEffects(scope, (q) => {
    const body = scope.current!;
    gsap.fromTo(body, { backgroundColor: "#e8e4d9" }, { backgroundColor: "#000000", ease: "none", scrollTrigger: { trigger: q(".gallery-sc")[0], start: "top center", end: "top top", scrub: 0.5 } });
    gsap.fromTo(body, { backgroundColor: "#000000" }, { backgroundColor: "#e8e4d9", ease: "none", immediateRender: false, scrollTrigger: { trigger: q(".amenities-sc")[0], start: "top center", end: "top top", scrub: 0.3 } });
  });
  return (
    <div ref={scope} className="body-div">
      {children}
    </div>
  );
}
