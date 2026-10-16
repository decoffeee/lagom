import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/lib/icons";

/** mail / phone / WhatsApp / social — used in the menu and the footer. */
export function ContactInfo({ className = "" }: { className?: string }) {
  return (
    <div className={`block ${className}`.trim()}>
      <div className="block">
        <div className="info-label">mail</div>
        <a className="info-value" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </div>
      <div className="block">
        <div className="info-label">phone</div>
        <a className="info-value" href={`tel:${site.phone.replace(/\s+/g, "")}`}>
          {site.phone}
        </a>
        <a className="wa-btn" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          Send Message
        </a>
      </div>
      <div className="block">
        <div className="info-label">social</div>
        <a className="info-link" href={site.instagram} target="_blank" rel="noopener noreferrer">
          instagram
        </a>
        <a className="info-link" href={site.facebook} target="_blank" rel="noopener noreferrer">
          facebook
        </a>
      </div>
    </div>
  );
}
