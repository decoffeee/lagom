"use client";

import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { lockScroll } from "@/lib/lenis";

/** Attaches a PhotoSwipe lightbox to every `a` inside the given gallery selector. */
export function Lightbox({ gallery }: { gallery: string }) {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery,
      children: "a",
      pswpModule: () => import("photoswipe"),
      showHideAnimationType: "zoom",
      bgOpacity: 0.9,
    });
    lightbox.on("openingAnimationStart", () => lockScroll(true));
    lightbox.on("close", () => lockScroll(false));
    lightbox.init();
    return () => lightbox.destroy();
  }, [gallery]);
  return null;
}
