"use client";

import { useRef, type ReactNode } from "react";
import { SplitText } from "@/lib/gsap";
import { useLoadTimeline } from "@/lib/animations";

/**
 * Hero used by experiences / contact / book / privacy:
 * a thin vertical line grows in, the title rises, the text fades in.
 * `variant="contact"` replays the Contact timeline (title drops from above, lines fade).
 */
export function PageHero({ title, text, variant = "page", children }: { title: string; text: string; variant?: "page" | "contact"; children?: ReactNode }) {
  const scope = useRef<HTMLElement>(null);

  useLoadTimeline(scope, (tl, q) => {
    const line = q(".v-line");
    const heading = q(".page-title");
    const copy = q(".page-text");
    const form = q(".contact-form");
    if (variant === "contact") {
      tl.fromTo(line, { autoAlpha: 0, height: 0 }, { autoAlpha: 1, height: 200, duration: 1, ease: "power3.out" }, 0)
        .fromTo(heading, { autoAlpha: 0, y: -100 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, 0.1);
      if (copy.length) {
        const split = new SplitText(copy, { type: "lines", linesClass: "nb-line" });
        tl.fromTo(split.lines, { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.02 }, 0.2);
      }
      if (form.length) tl.fromTo(form, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: "none" }, 0.3);
    } else {
      tl.fromTo(line, { height: 0 }, { height: 200, duration: 1, ease: "power4.out" }, 0)
        .fromTo(heading, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }, 0);
      if (copy.length) {
        const split = new SplitText(copy, { type: "words", wordsClass: "nb-word" });
        tl.fromTo(split.words, { autoAlpha: 0, y: 5 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.03 }, 0.2);
      }
      const extra = q(".exp-intro-anim");
      if (extra.length) tl.fromTo(extra, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out", stagger: 0.1 }, 0.3);
    }
  });

  return (
    <section ref={scope} className={`section page-hero ${variant === "contact" ? "form-sc" : ""}`.trim()}>
      <div className="container page-hero-ct">
        <div className="v-line flicker" aria-hidden="true" />
        <div className="page-title-wrap">
          <h1 className="page-title flicker">
            {title}
            <span className="post-suffix">.</span>
          </h1>
        </div>
        <div className="block page-text-wrap">
          <div className="page-text flicker">{text}</div>
        </div>
      </div>
      {children}
    </section>
  );
}
