# Lagom — Airbnb website

A Next.js 16 (App Router, Turbopack) site for Lagom Airbnb (Lagom Premium Apartment Pvt. Ltd., Kathmandu). The design,
loading screen, layouts, animations and colours are a faithful recreation of [nueve.gr](https://nueve.gr/), adapted for
five room types: Deluxe, Studio, 1BK, 2BHK and the Presidential Suite (no prices shown).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the production domain (it feeds canonical
URLs, the sitemap, robots.txt and Open Graph tags).

## Where things live

| What | Where |
| --- | --- |
| All copy, contact details, nav, amenities, specs | `src/lib/site.ts` (everything marked `TODO` is a placeholder) |
| Photos (static imports, alt text) | `src/lib/images.ts`, `src/images/` |
| Global styles (values copied from the reference) | `src/app/globals.css` |
| Pages | `src/app/` → `/`, `/rooms/[slug]/` (one per room), `/experiences/`, `/contact/` (also the booking page; `/book/` redirects here), `/privacy-policy/` |
| Rooms, amenities, booking-platform links | `rooms`, `allAmenities`, `site.platforms` in `src/lib/site.ts` |
| Floating WhatsApp button | `src/components/WhatsAppFloat.tsx` (number + text in `site.ts`) |
| Loader, header + off-canvas menu, footer, cursor, smooth scroll | `src/components/` |
| Home sections / room page sections / forms | `src/components/home`, `src/components/room`, `src/components/forms` |
| Fonts (Manrope, Melodrama) | `src/fonts/`, loaded with `next/font/local` |

## Animations

- **Loader** (`Loader.tsx`): beige bar sweeps a black screen for 3 s while a Melodrama counter runs 0→100 and
  slides across (mix-blend-mode: difference), then the screen slides up. Runs on hard loads only.
- **Smooth scroll**: Lenis wired into GSAP's ticker + ScrollTrigger (`SmoothScroll.tsx`).
- **Cursor**: Cuberto mouse-follower dot in exclusion blend; `data-cursor-stick` elements are magnetic.
- **Off-canvas menu**: GSAP timeline (drops from the top with rounded corners, titles stagger in, image column loops).
- **Home**: hero text rises after the loader; the hero photo un-folds from a 300 px arch to full width on scroll;
  the page background scrubs beige → black for the gallery and back for amenities; "deco." splits into characters.
- **Rooms / experiences / contact**: per-page GSAP load timelines (`useLoadTimeline`), parallax images.
- Hover effects: swap-titles (text slides up), "anyside" button (circle grows from the pointer), pill cards.

## SEO

- Metadata API per page (title template, descriptions, canonical, Open Graph, Twitter, robots directives).
- Generated `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon / apple icon and OG/Twitter images.
- JSON-LD: `WebSite` + `Organization/LodgingBusiness` (with all booking platforms as `sameAs`) globally,
  `VacationRental` + `BreadcrumbList` on every room page, `ContactPage`/`WebPage` elsewhere.
- Semantic headings (one `h1` per page), descriptive alt text, `next/image` with AVIF/WebP, trailing-slash URLs,
  security headers in `next.config.ts`. All routes are statically prerendered.

## Forms

The reservation form lives on `/contact/`: room, check-in, guests, nights, contact details and an optional message.
On submit it opens WhatsApp with the request pre-filled (number in `site.whatsapp`), so it needs no server or email
setup. It has a honeypot field against bots.

## Before launch (placeholders)

Search `src/lib/site.ts` for `TODO`: email, phone and the WhatsApp Business number (digits, international format),
Instagram/Facebook handles, the street address, beds/bathrooms per room type, the rating, and room-specific photos
(all rooms currently share the same interior shots). The experiences page needs photos of Swayambhunath, the city
and local food.
