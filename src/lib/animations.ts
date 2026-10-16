"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "./gsap";
import { loaderState } from "./loader-state";

export type Selector = <T extends Element = HTMLElement>(sel: string) => T[];

/**
 * Runs a GSAP "page load" timeline inside `scope` once the site loader is done
 * (immediately on client-side navigations). Elements carrying the `flicker`
 * class stay invisible until the timeline starts, so nothing flashes.
 */
export function useLoadTimeline(scope: RefObject<HTMLElement | null>, build: (tl: gsap.core.Timeline, q: Selector) => void) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const ctx = gsap.context(() => {}, el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const off = loaderState.onDone(() => {
      ctx.add(() => {
        el.querySelectorAll(".flicker").forEach((n) => n.classList.remove("flicker"));
        const tl = gsap.timeline();
        build(tl, gsap.utils.selector(el) as Selector);
        if (reduce) tl.progress(1);
      });
    });
    return () => {
      off();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Runs scroll-driven GSAP code inside a scoped context; reverted on unmount. */
export function useScrollEffects(scope: RefObject<HTMLElement | null>, setup: (q: Selector) => void) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const ctx = gsap.context(() => setup(gsap.utils.selector(el) as Selector), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
