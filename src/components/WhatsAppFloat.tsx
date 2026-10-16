import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/lib/icons";

/** Always-visible WhatsApp Business chat button, bottom right. */
export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Lagom! I'd like to ask about a stay.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp: ${site.whatsappText}`}
    >
      <WhatsAppIcon size={28} />
      <span className="wa-float-text">{site.whatsappText}</span>
    </a>
  );
}
