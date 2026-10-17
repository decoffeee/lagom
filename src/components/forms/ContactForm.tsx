"use client";

import type { FormEvent } from "react";
import { book, contact, site } from "@/lib/site";
import { WhatsAppIcon } from "@/lib/icons";
import { DateField, SelectField } from "./Fields";

const field = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/** Turns the reservation request into a pre-formatted WhatsApp message and opens the chat. */
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  if (field(fd, "website")) return; // honeypot
  const message = field(fd, "message");
  const text = [
    "Hi Lagom! I'd like to book a stay.",
    "",
    `*Room:* ${field(fd, "residence")}`,
    `*Check in:* ${field(fd, "checkin")}`,
    `*Guests:* ${field(fd, "guests")}`,
    `*Nights:* ${field(fd, "nights")}`,
    "",
    `*Name:* ${field(fd, "name")}`,
    `*Email:* ${field(fd, "email")}`,
    `*Phone:* ${field(fd, "phone")}`,
    ...(message ? ["", "*Message:*", message] : []),
  ].join("\n");
  window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
}

export function ContactForm() {
  return (
    <div className="container contact-form flicker">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group half">
          <SelectField name="residence" placeholder="Room *" options={book.options} required />
        </div>
        <div className="form-group half">
          <DateField name="checkin" placeholder="Check in *" required />
        </div>
        <div className="form-group half">
          <input type="number" name="guests" min={1} max={book.maxGuests} placeholder="Guests*" required aria-label="Guests" />
        </div>
        <div className="form-group half">
          <input type="number" name="nights" min={1} max={30} placeholder="Nights*" required aria-label="Nights" />
        </div>
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
          <textarea name="message" placeholder="Your message (optional)" aria-label="Your message (optional)" />
        </div>
        <div className="form-group">
          <ul className="form-options">
            <li>
              <input type="checkbox" id="contact-consent" name="consent" value="yes" required />
              <label htmlFor="contact-consent">{book.consent}</label>
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
