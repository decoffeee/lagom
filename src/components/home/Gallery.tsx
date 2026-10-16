"use client";

import { useState } from "react";
import { home, rooms } from "@/lib/site";
import { ImageGrid } from "../ImageGrid";

const STYLES = ["is-bold is-italic", "is-bold", "", "is-bold", "is-italic"];
const TABS = rooms.map((r, i) => ({ label: r.label, cls: STYLES[i % STYLES.length], images: [r.images.main, ...r.images.grid.slice(0, 2)] }));

/** "gallery." — tabbed photo grids with lightbox. */
export function Gallery() {
  const [active, setActive] = useState(0);
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
                aria-controls={`panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                className={`tab-title ${t.cls} ${active === i ? "is-open" : ""}`.trim()}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActive((a) => (a + 1) % TABS.length);
                  if (e.key === "ArrowLeft") setActive((a) => (a - 1 + TABS.length) % TABS.length);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {TABS.map((t, i) => (
              <div key={t.label} id={`panel-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`} className={`tab-pane ${active === i ? "is-open" : ""}`.trim()} hidden={active !== i}>
                <div className="container">
                  <ImageGrid id={`home-gallery-${i}`} images={t.images} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
