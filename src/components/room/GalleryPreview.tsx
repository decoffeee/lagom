"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Room } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { CloseIcon, GridIcon } from "@/lib/icons";
import { Popup } from "../Popup";
import { ImageGrid } from "../ImageGrid";

/** 1 + 4 photo preview; clicking opens the full-screen photo popup grouped by space. */
export function GalleryPreview({ room }: { room: Room }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const main = IMAGES[room.images.main];
  return (
    <>
      <button type="button" className="container gal-preview" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={`View all photos of the ${room.kind}`}>
        <div className="block gal-main">
          <span className="apart-gal-view-btn">
            <GridIcon />
            VIEW PHOTOS
          </span>
          <div className="apart-gal-img">
            <Image src={main.src} alt={main.alt} fill sizes="(max-width: 767px) 100vw, 700px" placeholder="blur" />
          </div>
        </div>
        <div className="gal-grid">
          {room.images.grid.map((k, i) => (
            <div key={k + i} className="apart-gal-img">
              <Image src={IMAGES[k].src} alt={IMAGES[k].alt} fill sizes="(max-width: 767px) 50vw, 350px" placeholder="blur" />
            </div>
          ))}
        </div>
      </button>

      <Popup open={open} onClose={close} variant="photos" label={`${room.kind} photos`}>
        <div className="photos-top">
          <div className="popup-title">{room.title}</div>
          <button type="button" className="popup-close" onClick={close} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <section className="section apart-offcanvas">
          {room.photoGroups.map((g) => (
            <div key={g.id} className="container room-gal">
              <div className="block room-info">
                <h3 className="room-title">{g.title}</h3>
                <div className="room-text">{g.text}</div>
              </div>
              <div className="block room-imgs">
                <ImageGrid id={`photos-${room.slug}-${g.id}`} images={g.images} sizes="(max-width: 479px) 50vw, 280px" />
              </div>
            </div>
          ))}
        </section>
      </Popup>
    </>
  );
}
