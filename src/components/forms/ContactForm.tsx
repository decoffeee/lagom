"use client";

import type { FormEvent } from "react";
import { contact, site } from "@/lib/site";
import { WhatsAppIcon } from "@/lib/icons";

const field = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/** Turns the form into a pre-formatted WhatsApp message and opens the chat. */
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  if (field(fd, "website")) return; // honeypot
  const text = [
    "Hi Lagom! I'd like to get in touch.",
    "",
    `*Name:* ${field(fd, "name")}`,
    `*Email:* ${field(fd, "email")}`,
    `*Phone:* ${field(fd, "phone")}`,
    "",
    "*Message:*",
    field(fd, "message"),
  ].join("\n");
  window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
}

export function ContactForm() {
  return (
    <div className="container contact-form flicker">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="name" placeholder="Full name*" required autoComplete="name" aria-label="Full name" />
        </div>
        <div className="form-group half">
          <input type="email" name="email" placeholder="Email *" required maxLength={320} autoComplete="email" aria-label="Email" />
        </div>
        <div className="form-group half">
          <input type="tel" name="phone" placeholder="Phone*" required autoComplete="tel" aria-label="Phone" />
        </div>
        <div className="form-group tall">
          <textarea name="message" placeholder="Your message*" required aria-label="Your message" />
        </div>
        <div className="form-group">
          <ul className="form-options">
            <li>
              <input type="checkbox" id="contact-consent" name="consent" value="yes" required />
              <label htmlFor="contact-consent">{contact.consent}</label>
            </li>
          </ul>
        </div>
        <div className="hp" aria-hidden="true">
          <label>
            Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="form-group form-submit">
          <button type="submit" className="wa-btn wa-btn--big">
            <WhatsAppIcon size={30} />
            {contact.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
