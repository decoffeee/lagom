"use client";

import { useActionState } from "react";
import { sendContact, type FormState } from "@/app/actions";
import { contact, site } from "@/lib/site";
import { WhatsAppIcon } from "@/lib/icons";

const initial: FormState = { ok: null, message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  return (
    <div className="container contact-form flicker">
      <form className="form" action={action} noValidate={false}>
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
        {state.message ? (
          <div className={`form-message ${state.ok ? "is-ok" : "is-error"}`} role="status" aria-live="polite">
            {state.message}
          </div>
        ) : null}
        <div className="form-group form-submit">
          <button type="submit" className="form-btn" disabled={pending}>
            {pending ? "Sending…" : contact.submit}
          </button>
        </div>
      </form>
      <div className="form-or">{contact.or}</div>
      <a className="wa-btn wa-btn--big" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={30} />
        {contact.whatsapp}
      </a>
    </div>
  );
}
