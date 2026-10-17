"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { loaderState } from "@/lib/loader-state";
import { soundState } from "@/lib/sound-state";

/** Finish scheduled by a cleanup. React's dev mode unmounts + remounts every effect once;
 *  the remount cancels this so the loader still plays in full instead of being skipped. */
let pendingFinish: number | undefined;

/**
 * Site loader (NextBricks "type 2"): a beige bar sweeps across a black screen
 * while a serif counter runs 0 → 100 and slides from left to right.
 * The counter uses mix-blend-mode: difference so it inverts where the bar passes.
 *
 * At 100 the screen holds and offers two ways in: with music or in silence.
 * The chosen option is handed to the sound toggle (see sound-state.ts) and the
 * loader lifts away. Only runs on hard loads (the root layout never remounts on
 * client navigation).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const display = useRef<HTMLDivElement>(null);
  const calc = useRef<HTMLDivElement>(null);
  const choice = useRef<HTMLDivElement>(null);
  const primary = useRef<HTMLButtonElement>(null);
  const choose = useRef<(withMusic: boolean) => void>(() => {});

  useEffect(() => {
    const el = root.current;
    const barEl = bar.current;
    const wrapEl = wrap.current;
    const displayEl = display.current;
    const calcEl = calc.current;
    const choiceEl = choice.current;
    if (!el || !barEl || !wrapEl || !displayEl || !calcEl || !choiceEl) return;
    window.clearTimeout(pendingFinish);
    if (loaderState.isDone()) {
      el.style.display = "none";
      return;
    }

    const html = document.documentElement;
    html.classList.add("is-loading");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0.6 : 1.75;
    const getX = () => wrapEl.offsetWidth - calcEl.offsetWidth;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      html.classList.remove("is-loading");
      loaderState.markDone();
    };

    let chosen = false;
    choose.current = (withMusic) => {
      if (chosen) return;
      chosen = true;
      // inside the click, so the audio element is allowed to start
      soundState.request(withMusic);
      gsap.timeline()
        .to(choiceEl, { autoAlpha: 0, y: -16, duration: 0.35, ease: "power2.in" })
        .to(el, { y: "-100svh", duration: reduce ? 0.2 : 0.8, ease: "expo.inOut", onStart: finish }, reduce ? ">" : "-=0.1")
        .set(el, { display: "none" });
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
      .fromTo(
        choiceEl,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", onComplete: () => primary.current?.focus({ preventScroll: true }) },
        reduce ? ">" : "-=0.25",
      )
      .fromTo(choiceEl.querySelectorAll(".loader-btn"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, "<0.2");

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
    <div ref={root} className="loader" role="dialog" aria-modal="true" aria-label="Welcome to Lagom">
      <div ref={bar} className="loader-bar" aria-hidden="true" />
      <div ref={wrap} className="loader-wrap" aria-hidden="true">
        <div ref={display} className="loader-pct">
          0
        </div>
        <div ref={calc} className="loader-pct loader-pct--calc">
          100
        </div>
      </div>
      <div ref={choice} className="loader-choice">
        <p className="loader-choice-label">
          Lagom is best experienced <em>with sound.</em>
        </p>
        <div className="loader-choice-btns">
          <button ref={primary} type="button" className="loader-btn loader-btn--primary magnetic" onClick={() => choose.current(true)} data-cursor-stick="">
            Enter with music
          </button>
          <button type="button" className="loader-btn loader-btn--ghost magnetic" onClick={() => choose.current(false)} data-cursor-stick="">
            Enter in silence
          </button>
        </div>
        <p className="loader-choice-hint">You can switch the music on or off any time from the header.</p>
      </div>
    </div>
  );
}
