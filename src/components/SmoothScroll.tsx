"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { loaderState } from "@/lib/loader-state";
import { getLenis, setLenis } from "@/lib/lenis";

/** Lenis smooth scrolling wired into GSAP's ticker + ScrollTrigger. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    if (!loaderState.isDone()) {
      lenis.stop();
      loaderState.onDone(() => lenis.start());
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lenis.isStopped && !document.documentElement.classList.contains("is-locked")) lenis.start();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(undefined);
    };
  }, []);

  // On route change: land at the very top before paint (Lenis would otherwise ease back to the
  // previous page's position), then let ScrollTrigger re-measure the new page.
  useLayoutEffect(() => {
    const lenis = getLenis();
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    const hash = window.location.hash;
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const target = hash ? document.querySelector(hash) : null;
      if (target) lenis?.scrollTo(target as HTMLElement, { offset: -100 });
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
