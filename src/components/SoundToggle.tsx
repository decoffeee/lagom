"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { soundState } from "@/lib/sound-state";

const SRC = "/music/soothing-handpan.m4a";
const VOLUME = 0.45;
const STORAGE_KEY = "lagom-sound";
const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

/**
 * Background music + the little equaliser toggle in the header.
 *
 * The track starts when the visitor picks "enter with music" on the loader screen
 * (that click is the user gesture browsers require for audible playback). Picking
 * silence leaves it off; the toggle can switch it on or off at any point afterwards.
 * Lives in the header, which never remounts, so the music carries on across pages.
 */
export function SoundToggle() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const wanted = useRef(false);
  const [playing, setPlayingState] = useState(false);

  const setPlaying = useCallback((on: boolean) => {
    setPlayingState(on);
    soundState.set({ playing: on });
  }, []);

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
    [fade, setPlaying],
  );

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.preload = "none";
    a.volume = 0;
    audio.current = a;

    const remember = (on: boolean) => {
      wanted.current = on;
      try {
        localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
      } catch {}
    };

    // Fallback if a browser still refuses playback: start on the next tap / key press.
    const removeGestures = () => GESTURES.forEach((g) => window.removeEventListener(g, onGesture, true));
    const onGesture = (e: Event) => {
      if (button.current?.contains(e.target as Node)) return removeGestures();
      if (!wanted.current) return removeGestures();
      play(2.5).then(removeGestures, () => {});
    };
    const offRequest = soundState.onRequest((on) => {
      remember(on);
      if (!on) return;
      play(2.5).catch(() => GESTURES.forEach((g) => window.addEventListener(g, onGesture, { capture: true, passive: true })));
    });

    // pause while the tab is in the background, resume when it comes back
    const onVisibility = () => {
      if (document.hidden) a.pause();
      else if (wanted.current && a.currentTime > 0) a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      offRequest();
      removeGestures();
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.killTweensOf(a);
      a.pause();
      a.removeAttribute("src");
      a.load();
      audio.current = null;
      soundState.set({ playing: false });
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
  }, [playing, play, fade, setPlaying]);

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
