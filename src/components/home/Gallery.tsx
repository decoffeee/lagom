"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { home, rooms } from "@/lib/site";
import { IMAGES, type ImageKey } from "@/lib/images";
import { Lightbox } from "../Lightbox";

const STYLES = ["is-bold is-italic", "is-bold", "", "is-bold", "is-italic"];
const TABS = rooms.map((r, i) => ({ label: r.label, cls: STYLES[i % STYLES.length], images: [r.images.main, ...r.images.grid.slice(0, 2)] as ImageKey[] }));
const GRID_ID = "home-gallery";
const SIZES = "(max-width: 479px) 50vw, 33vw";
/** How long the backs stay up at minimum, so the flip completes and the title is readable even when images come from cache. */
const MIN_HOLD = 1300;
/** Give up waiting on a stuck image and flip back anyway. */
const MAX_WAIT = 6000;
/** Deterministic 0..1 noise so each turn gets its own tilt and timing without impure calls in render. */
const noise = (seed: number) => {
  let x = (seed + 0x6d2b79f5) | 0;
  x = Math.imul(x ^ (x >>> 15), x | 1);
  x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
};

/**
 * "rooms." — tabbed photo cards.
 *
 * Switching rooms flips every card over; the centre card's back carries the new
 * room's title and a loader. The next room's photos preload in a hidden layer while
 * the backs are up, the front swaps to them, and the cards flip back once every one
 * of them has loaded. The old photos stay on the front so nothing pops mid-turn.
 */
export function Gallery() {
  /** Room whose photos are on the front of the cards. */
  const [shown, setShown] = useState(0);
  /** Room being loaded behind the flipped cards, if any. */
  const [pending, setPending] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(0);
  /** Counts room switches; seeds a fresh random resting tilt, flipped tilt and delay per card on every turn. */
  const [turn, setTurn] = useState(0);
  /** Which room the cards flipped over for, and when. */
  const flip = useRef<{ room: number; at: number } | null>(null);

  const active = pending ?? shown;
  const tab = TABS[active];
  const front = TABS[shown];
  const center = Math.floor(front.images.length / 2);

  const select = (i: number) => {
    if (i === active) return;
    setLoaded(0);
    setTurn((t) => t + 1);
    setPending(i);
  };
  const onLoaded = useCallback(() => setLoaded((n) => n + 1), []);

  // flip back once all images of the pending room are in (or we've waited long enough)
  useEffect(() => {
    if (pending === null) return;
    if (flip.current?.room !== pending) flip.current = { room: pending, at: Date.now() };
    const total = TABS[pending].images.length;
    const elapsed = Date.now() - flip.current.at;
    const wait = loaded >= total ? Math.max(0, MIN_HOLD - elapsed) : Math.max(0, MAX_WAIT - elapsed);
    const t = window.setTimeout(() => {
      setShown(pending);
      setPending(null);
    }, wait);
    return () => window.clearTimeout(t);
  }, [pending, loaded]);

  return (
    <section className="section gallery-sc" id="rooms">
      <div className="container gallery-title-ct">
        <h2 className="home-title">{home.gallery.title}</h2>
      </div>
      <div className="container gallery-ct">
        <div className="tabs">
          <div className="tab-menu" role="tablist" aria-label="Rooms">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                id={`tab-${i}`}
                aria-selected={active === i}
                aria-controls="panel-rooms"
                tabIndex={active === i ? 0 : -1}
                className={`tab-title ${t.cls} ${active === i ? "is-open" : ""}`.trim()}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") select((active + 1) % TABS.length);
                  if (e.key === "ArrowLeft") select((active - 1 + TABS.length) % TABS.length);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="tab-content">
            <div id="panel-rooms" role="tabpanel" aria-labelledby={`tab-${active}`} aria-busy={pending !== null} className="tab-pane is-open">
              <div className="container">
                <ul id={GRID_ID} className={`img-grid flip-grid ${pending !== null ? "is-flipped" : ""}`.trim()} inert={pending !== null}>
                  {front.images.map((k, i) => {
                    const im = IMAGES[k];
                    const rest = (noise(turn * 17 + i + 3) * 2 - 1) * 3;
                    const tilt = (noise(turn * 31 + i) * 2 - 1) * 6;
                    const jitter = noise(turn * 53 + i + 7) * 140;
                    return (
                      <li key={i} className="flip-card" style={{ "--i": i, "--rest": `${rest.toFixed(1)}deg`, "--tilt": `${tilt.toFixed(1)}deg`, "--jitter": `${Math.round(jitter)}ms` } as React.CSSProperties}>
                        <div className="flip-inner">
                          <figure className="flip-face flip-front">
                            <a href={im.src.src} data-pswp-width={im.src.width} data-pswp-height={im.src.height} target="_blank" rel="noreferrer" aria-label={`Open photo: ${im.alt}`}>
                              <span className="image">
                                <Image src={im.src} alt={im.alt} sizes={SIZES} placeholder="blur" />
                              </span>
                            </a>
                          </figure>
                          <div className="flip-face flip-back" aria-hidden="true">
                            {i === center && (
                              <>
                                <span className="flip-title">{tab.label}</span>
                                <span className="flip-loader" />
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {pending !== null && (
                  /* same `sizes` as the cards, so the browser fetches the exact candidate the front will use */
                  <div className="flip-preload" aria-hidden="true">
                    {TABS[pending].images.map((k) => (
                      <Image key={k} src={IMAGES[k].src} alt="" sizes={SIZES} loading="eager" onLoad={onLoaded} onError={onLoaded} />
                    ))}
                  </div>
                )}
                <Lightbox gallery={`#${GRID_ID}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
