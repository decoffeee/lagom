"use client";

import { useActionState } from "react";
import { sendBooking, type FormState } from "@/app/actions";
import { book } from "@/lib/site";
import { DateField, SelectField } from "./Fields";

const initial: FormState = { ok: null, message: "" };

export function BookForm() {
  const [state, action, pending] = useActionState(sendBooking, initial);
  return (
    <div className="container contact-form flicker">
      <form className="form" action={action}>
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
        <div className="form-group">
          <ul className="form-options">
            <li>
              <input type="checkbox" id="book-consent" name="consent" value="yes" required />
              <label htmlFor="book-consent">{book.consent}</label>
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
            {pending ? "Sending…" : book.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
