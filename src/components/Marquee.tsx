"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

/**
 * Infinite horizontal reel. Runs right-to-left... reversed (left-to-right)
 * like the reference, and speeds up / flips with the scroll velocity.
 */
export function Marquee({ children, speed = 25, reversed = true }: { children: ReactNode; speed?: number; reversed?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rootEl = root.current;
    const wrapEl = wrapper.current;
    if (!rootEl || !wrapEl) return;
    const original = wrapEl.firstElementChild as HTMLElement | null;
    if (!original) return;

    const ctx = gsap.context(() => {
      // clone the item until it covers at least twice the container width
      const itemWidth = original.getBoundingClientRect().width;
      if (!itemWidth) return;
      const needed = Math.max(2, Math.ceil((rootEl.clientWidth * 2) / itemWidth) + 1);
      const clones: HTMLElement[] = [];
      for (let i = 1; i < needed; i++) {
        const c = original.cloneNode(true) as HTMLElement;
        c.classList.add("-clone");
        c.setAttribute("aria-hidden", "true");
        wrapEl.appendChild(c);
        clones.push(c);
      }
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(wrapEl, { x: reversed ? -itemWidth : 0 }, { x: reversed ? 0 : -itemWidth, duration: speed, ease: "none" });
      tl.timeScale(1);

      let current = 1;
      const lenis = getLenis();
      const onScroll = () => {
        const v = lenis?.velocity ?? 0;
        const target = gsap.utils.clamp(-6, 6, (Math.abs(v) < 0.5 ? 1 : v / 40) * 1);
        // bothDirection: flip with scroll direction, ease back toward 1
        current = v < -0.5 ? -Math.max(1, Math.abs(target)) : v > 0.5 ? Math.max(1, Math.abs(target)) : 1;
        gsap.to(tl, { timeScale: current, duration: 0.8, ease: "expo.out", overwrite: true });
      };
      lenis?.on("scroll", onScroll);

      const onEnter = () => tl.pause();
      const onLeave = () => tl.resume();
      rootEl.addEventListener("mouseenter", onEnter);
      rootEl.addEventListener("mouseleave", onLeave);

      return () => {
        lenis?.off("scroll", onScroll);
        rootEl.removeEventListener("mouseenter", onEnter);
        rootEl.removeEventListener("mouseleave", onLeave);
        clones.forEach((c) => c.remove());
      };
    }, rootEl);
    return () => ctx.revert();
  }, [speed, reversed]);

  return (
    <div ref={root} className="reel">
      <div ref={wrapper} className="reel-wrapper">
        <div className="reel-item">{children}</div>
      </div>
    </div>
  );
}
