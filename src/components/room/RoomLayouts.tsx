"use client";

import { useEffect, useRef, useState } from "react";
import type { Room } from "@/lib/site";

/** Walkthrough video beside the named layouts of a room type (e.g. Wise / Adore / Happy), or a caption when it has none. */
export function RoomLayouts({ room }: { room: Room }) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Autoplay (muted) only while on screen, and never for reduced-motion users.
  useEffect(() => {
    const el = video.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!room.layouts && !room.video) return null;

  const toggleSound = () => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (el.paused) el.play().catch(() => {});
  };

  return (
    <section className="section apart-text-sc">
      <div className="container two-col apart-layouts">
        {room.video && (
          <div className="block apart-video">
            <video ref={video} src={room.video.src} poster={room.video.poster} muted loop playsInline preload="metadata" controls={false} aria-label={`Walkthrough video of the ${room.kind}`} />
            <button type="button" className="apart-gal-view-btn apart-video-btn" onClick={toggleSound} aria-pressed={!muted}>
              {muted ? "SOUND ON" : "SOUND OFF"}
            </button>
          </div>
        )}
        {room.layouts ? (
          <div className="block apart-layouts-info">
            <h2 className="apart-layouts-title">layouts.</h2>
            <ul className="apart-layouts-list">
              {room.layouts.map((l) => (
                <li key={l.names.join()} className="apart-layout">
                  <div className="apart-layout-name">{l.names.join(" & ")}</div>
                  <div className="apart-layout-beds">{l.beds}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="block apart-layouts-info">
            <h2 className="apart-layouts-title">walk through.</h2>
            {room.video?.caption && <div className="apart-text-info">{room.video.caption}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
