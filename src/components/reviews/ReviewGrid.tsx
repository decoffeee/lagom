"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollEffects } from "@/lib/animations";
import type { Review } from "@/lib/reviews";

/** Five brand-coloured stars (every review shown is a 5/5). */
export function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`rv-stars ${className}`.trim()} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

const COLS = 3;
/** Scroll travel per column (px), symmetric so the columns line up again mid-way through. */
const DRIFT = [70, -50, 110];
/** Slight tilts handed out in turn, so the cards sit a little loosely rather than in a strict grid. */
const TILT = [-1.4, 0.9, 0, -0.7, 1.3, 0.4, -1.1, 0, 0.8, -0.5];
/** Card shades, from the lightest cream to a warmer, slightly deeper one; cycled out of step with the tilts. */
const SHADE = ["#faf8f3", "#f5f2eb", "#fcfaf6", "#f3efe7", "#f8f5ef", "#f6f3ec", "#fbf9f4"];

/**
 * Three columns of cards at their natural heights, all on the page at once. As you scroll,
 * each column drifts at its own speed (scrubbed), so the stack moves with depth. Below
 * 992px the columns flatten into CSS multi-column masonry and stay still.
 */
export function ReviewGrid({ items, source }: { items: Review[]; source: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const cols: Review[][] = Array.from({ length: COLS }, () => []);
  const look = new Map(items.map((r, i) => [r, { "--tilt": `${TILT[i % TILT.length]}deg`, "--card": SHADE[i % SHADE.length] } as React.CSSProperties]));
  items.forEach((r, i) => cols[i % COLS].push(r));

  useScrollEffects(scope, (q) => {
    if (!window.matchMedia("(min-width: 992px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const st = { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true } as const;
    q(".rv-col").forEach((col, i) => {
      gsap.fromTo(col, { y: DRIFT[i] }, { y: -DRIFT[i], ease: "none", scrollTrigger: st });
    });
  });

  return (
    <div ref={scope} className="rv-grid">
      {cols.map((col, i) => (
        <ul className="rv-col" key={i}>
          {col.map((r) => (
            <li className="rv-card" key={`${r.name}-${r.when}`} style={look.get(r)}>
              <Stars />
              <blockquote className="rv-quote">
                <p>{r.text}</p>
              </blockquote>
              <div className="rv-meta">
                <div className="rv-who">
                  <div className="rv-name">{r.name}</div>
                  <div className="rv-sub">{[r.when, r.trip].filter(Boolean).join(" · ")}</div>
                </div>
                <div className="rv-source">{source}</div>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
