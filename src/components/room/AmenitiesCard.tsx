"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { allAmenities, site, type Room } from "@/lib/site";
import { CloseIcon, Icon } from "@/lib/icons";
import { Popup } from "../Popup";

/** Reviews link, this room's amenities and the property-wide "view all amenities" popup. */
export function AmenitiesCard({ room }: { room: Room }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const half = Math.ceil(room.amenities.length / 2);
  const cols = [room.amenities.slice(0, half), room.amenities.slice(half)];
  return (
    <div className="block apart-cards">
      <Link href="/reviews/" className="all-amen-btn gf-reviews-btn">
        Read guest reviews
      </Link>
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
