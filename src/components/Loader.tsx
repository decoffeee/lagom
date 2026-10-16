"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { loaderState } from "@/lib/loader-state";

/** Finish scheduled by a cleanup. React's dev mode unmounts + remounts every effect once;
 *  the remount cancels this so the loader still plays in full instead of being skipped. */
let pendingFinish: number | undefined;

/**
 * Site loader (NextBricks "type 2"): a beige bar sweeps across a black screen
 * while a serif counter runs 0 → 100 and slides from left to right.
 * The counter uses mix-blend-mode: difference so it inverts where the bar passes.
 * Only runs on hard loads (the root layout never remounts on client navigation).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const display = useRef<HTMLDivElement>(null);
  const calc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const barEl = bar.current;
    const wrapEl = wrap.current;
    const displayEl = display.current;
    const calcEl = calc.current;
    if (!el || !barEl || !wrapEl || !displayEl || !calcEl) return;
    window.clearTimeout(pendingFinish);
    if (loaderState.isDone()) {
      el.style.display = "none";
      return;
    }

    const html = document.documentElement;
    html.classList.add("is-loading");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0.6 : 1;
    const getX = () => wrapEl.offsetWidth - calcEl.offsetWidth;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      html.classList.remove("is-loading");
      loaderState.markDone();
    };

    const tl = gsap.timeline();
    tl.to(barEl, {
      width: "100%",
      duration,
      ease: "power1.out",
      onStart: () => gsap.set(displayEl, { x: 0 }),
      onUpdate() {
        displayEl.textContent = String(Math.round(this.progress() * 100));
      },
    })
      .to(displayEl, { x: getX, duration, ease: "power1.out" }, "<0")
      .to(el, { y: "-100svh", duration: 0.2, ease: "expo.out", delay: 0.4, onStart: finish })
      .set(el, { display: "none" });

    const onResize = () => {
      const progress = (gsap.getProperty(barEl, "width", "%") as number) / 100;
      gsap.set(displayEl, { x: getX() * progress });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tl.kill();
      // a real unmount still releases the page; a dev-mode remount cancels this first
      pendingFinish = window.setTimeout(() => {
        finish();
        el.style.display = "none";
      }, 0);
    };
  }, []);

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <div ref={bar} className="loader-bar" />
      <div ref={wrap} className="loader-wrap">
        <div ref={display} className="loader-pct">
          0
        </div>
        <div ref={calc} className="loader-pct loader-pct--calc">
          100
        </div>
      </div>
    </div>
  );
}
