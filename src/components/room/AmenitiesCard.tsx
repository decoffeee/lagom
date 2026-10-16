"use client";

import { useCallback, useState } from "react";
import { airbnbUrl, allAmenities, guestFavorite, site, type Room } from "@/lib/site";
import { CloseIcon, Icon, LaurelIcon } from "@/lib/icons";
import { Popup } from "../Popup";

/** Guest-favourite card, this room's amenities and the property-wide "view all amenities" popup. */
export function AmenitiesCard({ room }: { room: Room }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const half = Math.ceil(room.amenities.length / 2);
  const cols = [room.amenities.slice(0, half), room.amenities.slice(half)];
  return (
    <div className="block apart-cards">
      <a className="gf-card magnetic" href={airbnbUrl} target="_blank" rel="noopener noreferrer" data-cursor-stick="">
        <div className="gf-badge">
          <LaurelIcon />
          <div className="gf-badge-text">
            Guest
            <br />
            favorite
          </div>
          <LaurelIcon flip />
        </div>
        <div className="gf-text">{guestFavorite.text}</div>
        <div className="gf-rating">
          <div className="gf-rating-nb">{guestFavorite.rating}</div>
          <div className="gf-rating-lb">stars</div>
        </div>
      </a>
      <div className="block">
        <div className="block amen-card">
          {cols.map((col, i) => (
            <div className="block amen-list" key={i}>
              {col.map((a) => (
                <div className="block amen-item" key={a.label}>
                  <Icon name={a.icon} size={24} />
                  <div className="amen-item-text">{a.label}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="all-amen-btn" onClick={() => setOpen(true)} aria-haspopup="dialog">
        View all amenities
      </button>

      <Popup open={open} onClose={close} variant="amen" label="All amenities">
        <section className="amen-pop">
          <div className="amen-pop-head">
            <button type="button" className="popup-close" onClick={close} aria-label="Close">
              <CloseIcon />
            </button>
            <h3 className="amen-pop-title">Amenities</h3>
            <div className="amen-pop-sub">{site.name.toLowerCase()} property amenities</div>
          </div>
          {allAmenities.map((group) => (
            <div className="block amen-room-ct" key={group.group}>
              <div className="amen-room-title">{group.group}</div>
              <div className="block amen-pop-list">
                {group.items.map((a) => (
                  <div className="amen-pop-item" key={a.label}>
                    <Icon name={a.icon} size={24} />
                    <div className="amen-item-text">{a.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </Popup>
    </div>
  );
}
