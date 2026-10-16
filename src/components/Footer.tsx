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
              <ContactInfo className="ft-contact-info" />
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
          <a href={site.credit.href} className="ft-credit magnetic" target={site.credit.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-cursor-stick="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.219 65.532" aria-hidden="true">
              <path d="M0,26.756A32.336,32.336,0,0,0,13.976,53.362,32.719,32.719,0,0,0,27.84,26.605,32.714,32.714,0,0,0,14.188,0,32.341,32.341,0,0,0,0,26.756" transform="translate(37.692 6.161)" />
              <path d="M33.181,32.917A36.821,36.821,0,0,1,47.715,3.612a32.766,32.766,0,1,0-.232,58.427,36.814,36.814,0,0,1-14.3-29.122" />
              <path d="M32.174,64.348A32.174,32.174,0,1,1,64.348,32.174,32.21,32.21,0,0,1,32.174,64.348m0-59.837A27.662,27.662,0,1,0,59.837,32.174,27.694,27.694,0,0,0,32.174,4.512" transform="translate(37.87 0.743)" />
            </svg>
            <span>{site.credit.label}</span>
          </a>
        </div>
      </section>
    </footer>
  );
}
