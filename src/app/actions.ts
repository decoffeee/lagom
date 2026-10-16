"use server";

import { site } from "@/lib/site";

export type FormState = { ok: boolean | null; message: string };

const str = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? "").trim().slice(0, max);
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Delivers a message. If RESEND_API_KEY (+ optional CONTACT_TO / CONTACT_FROM) is set,
 * the message is emailed through Resend; otherwise it is logged on the server.
 */
async function deliver(subject: string, lines: Record<string, string>) {
  const body = Object.entries(lines)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[lagom] ${subject}\n${body}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? `Lagom <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: lines.Email,
      subject,
      text: body,
    }),
  });
  if (!res.ok) throw new Error(`Mail provider responded ${res.status}`);
}

export async function sendBooking(_prev: FormState, fd: FormData): Promise<FormState> {
  if (str(fd, "website")) return { ok: true, message: "Thank you, your request has been sent." };
  const residence = str(fd, "residence", 60);
  const checkin = str(fd, "checkin", 20);
  const guests = Number(str(fd, "guests", 3));
  const nights = Number(str(fd, "nights", 3));
  const name = str(fd, "name", 120);
  const email = str(fd, "email", 320);
  const phone = str(fd, "phone", 40);
  if (!residence || !checkin || !name || !isEmail(email) || !phone) return { ok: false, message: "Please fill in all required fields with valid details." };
  if (!Number.isFinite(guests) || guests < 1 || !Number.isFinite(nights) || nights < 1) return { ok: false, message: "Please enter a valid number of guests and nights." };
  if (fd.get("consent") !== "yes") return { ok: false, message: "Please agree to the processing of your details." };
  try {
    await deliver(`Reservation request from ${name}`, { Room: residence, "Check in": checkin, Guests: String(guests), Nights: String(nights), Name: name, Email: email, Phone: phone });
    return { ok: true, message: "Thank you, your request has been sent. We will contact you to confirm availability." };
  } catch (e) {
    console.error(e);
    return { ok: false, message: "Something went wrong while sending. Please try again or contact us directly." };
  }
}
