"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { loaderState } from "@/lib/loader-state";

const SRC = "/music/lofi-relaxing.m4a";
const VOLUME = 0.45;
const STORAGE_KEY = "lagom-sound";
const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

/**
 * Background music + the little equaliser toggle in the header.
 *
 * The track fades in as the loader lifts. Browsers block audible autoplay until the visitor
 * has interacted with the page, so when that first attempt is refused, it starts on the
 * first click / tap / key press instead. A visitor's "off" choice is remembered.
 * Lives in the header, which never remounts, so the music carries on across pages.
 */
export function SoundToggle() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const wanted = useRef(true);
  const [playing, setPlaying] = useState(false);

  const fade = useCallback((to: number, duration: number, onComplete?: () => void) => {
    const a = audio.current;
    if (!a) return;
    gsap.to(a, { volume: to, duration, ease: "sine.inOut", overwrite: true, onComplete });
  }, []);

  const play = useCallback(
    (fadeIn: number) => {
      const a = audio.current;
      if (!a) return Promise.reject();
      return a.play().then(() => {
        setPlaying(true);
        fade(VOLUME, fadeIn);
      });
    },
    [fade],
  );

  useEffect(() => {
    try {
      wanted.current = localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {}

    const a = new Audio(SRC);
    a.loop = true;
    a.preload = "none";
    a.volume = 0;
    audio.current = a;

    const removeGestures = () => GESTURES.forEach((g) => window.removeEventListener(g, onGesture, true));
    const onGesture = (e: Event) => {
      // a press on the toggle itself is handled by the toggle
      if (button.current?.contains(e.target as Node)) return removeGestures();
      if (!wanted.current) return removeGestures();
      play(2.5).then(removeGestures, () => {});
    };
    const start = () => {
      if (!wanted.current) return;
      play(2.5).catch(() => GESTURES.forEach((g) => window.addEventListener(g, onGesture, { capture: true, passive: true })));
    };
    const off = loaderState.onDone(start);

    // pause while the tab is in the background, resume when it comes back
    const onVisibility = () => {
      if (document.hidden) a.pause();
      else if (wanted.current && a.currentTime > 0) a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      off();
      removeGestures();
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.killTweensOf(a);
      a.pause();
      a.removeAttribute("src");
      a.load();
      audio.current = null;
    };
  }, [play]);

  const toggle = useCallback(() => {
    const a = audio.current;
    if (!a) return;
    const next = !playing;
    wanted.current = next;
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    if (next) {
      play(1.2).catch(() => {});
    } else {
      setPlaying(false);
      fade(0, 0.6, () => a.pause());
    }
  }, [playing, play, fade]);

  return (
    <button
      ref={button}
      type="button"
      className={`sound-toggle ${playing ? "is-on" : ""}`.trim()}
      aria-label={playing ? "Mute music" : "Play music"}
      aria-pressed={playing}
      onClick={toggle}
      data-cursor-stick=""
    >
      <span className="sound-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
