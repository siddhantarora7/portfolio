"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A YouTube video that costs nothing until it's wanted: a local poster and a
 * play button, swapped for the (no-cookie) player on click.
 */
export function VideoEmbed({ youtubeId, title, poster }: { youtubeId: string; title: string; poster: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="glass rounded-[24px] p-2.5">
      <div className="relative overflow-hidden rounded-[16px] border border-rule bg-black" style={{ aspectRatio: "16 / 9" }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 block size-full cursor-pointer" aria-label={`Play ${title}`}>
            <Image src={poster} alt="" fill sizes="(min-width: 768px) 680px, 100vw" className="object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
            <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
              <span className="key-btn key-btn--primary">
                <svg viewBox="0 0 16 16" className="size-4" fill="currentColor">
                  <path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.3-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5Z" />
                </svg>
                Watch the demo
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
