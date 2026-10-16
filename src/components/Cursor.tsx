"use client";

import { useEffect } from "react";
import MouseFollower from "mouse-follower";
import { gsap } from "@/lib/gsap";

/** Custom cursor: a small white dot in exclusion blend mode that sticks to `.magnetic` elements. */
export function Cursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    MouseFollower.registerGSAP(gsap);
    const cursor = new MouseFollower({
      className: "mf-cursor -exclusion",
      speed: 0.55,
      ease: "expo.out",
      skewing: 0,
      stickDelta: 0.15,
      visible: true,
      stateDetection: { "-hidden": "iframe" },
    });
    document.documentElement.classList.add("has-cursor");
    return () => {
      cursor.destroy();
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return null;
}
