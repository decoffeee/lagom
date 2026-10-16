import Link from "next/link";
import { nav, roomHref, rooms, site } from "@/lib/site";
import { ContactInfo } from "./ContactInfo";
import { SwapTitle } from "./SwapTitle";
import { Marquee } from "./Marquee";

export function Footer() {
  return (
    <footer id="site-footer">
      <section className="section footer">
        <div className="container footer-ct">
          <div className="block ft-left">
            <div className="block ft-contact">
              <ContactInfo className="ft-contact-info" location />
            </div>
            <div className="block ft-rooms">
              <div className="block ft-rooms-inner">
                <div className="info-label">rooms</div>
                <div className="block ft-room-list">
                  {rooms.map((r) => (
                    <Link key={r.slug} href={roomHref(r)} className={`ft-room-pill ${r.italic ? "is-italic" : ""}`.trim()}>
                      {r.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <nav className="block ft-links" aria-label="Footer">
              {nav.footer.map((item) => (
                <SwapTitle key={item.href} className="footer-link" text={item.label} href={item.href} />
              ))}
            </nav>
            <div className="block ft-platforms">
              <div className="info-label">find us on</div>
              <nav className="block" aria-label="Booking platforms">
                {site.platforms.map((p) => (
                  <SwapTitle key={p.label} className="footer-link" text={p.label} href={p.href} target="_blank" rel="noopener noreferrer" />
                ))}
              </nav>
            </div>
          </div>
          <div className="block ft-mark">
            <div className="ft-mark-text">{site.mark}</div>
          </div>
        </div>
        <Marquee>
          <div className="reel-a">lagom</div>
          <div className="reel-b">stays</div>
        </Marquee>
        <div className="container ft-bottom">
          <div className="ft-copy">{site.copyright}</div>
        </div>
      </section>
    </footer>
  );
}
