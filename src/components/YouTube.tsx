"use client";

import Image from "next/image";
import { useState } from "react";

export type Video = { id: string; title: string; by: string };

/**
 * Click-to-load YouTube embed. Shows the video's thumbnail until the guest
 * presses play, so no YouTube scripts or cookies load with the page.
 */
export function YouTube({ video }: { video: Video }) {
  const [play, setPlay] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`;
  return (
    <figure className="yt">
      <div className="yt-frame">
        {play ? (
          <iframe src={src} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
        ) : (
          <button type="button" className="yt-poster magnetic" onClick={() => setPlay(true)} aria-label={`Play video: ${video.title}`} data-cursor-stick="">
            <Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" />
            <span className="yt-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="yt-cap">
        <span className="yt-title">{video.title}</span>
        <span className="yt-by">
          {video.by} ·{" "}
          <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
            watch on YouTube
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
