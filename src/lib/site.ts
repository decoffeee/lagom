/**
 * Central content + configuration for the Lagom site.
 * Everything marked TODO is a placeholder: swap in the real details before launch.
 */
import type { IconName } from "./icons";
import type { ImageKey } from "./images";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lagom-stay.com").replace(/\/$/, "");

export const site = {
  name: "Lagom",
  legalName: "Lagom Premium Apartment Pvt. Ltd.",
  logo: "lagom.",
  logoShort: "l.",
  /** Small mark next to the logo (Nueve used "( 9 )" for nine; Lagom has five room types). */
  mark: "( 5 )",
  quote: "Where every corner tells a story",
  tagline: "Where every corner tells a story",
  description:
    "Lagom Airbnb (officially Lagom Premium Apartment Pvt. Ltd.) is a highly rated, highly aesthetic luxury service apartment complex in Kathmandu, Nepal, near the Swayambhunath Stupa (Monkey Temple). Pinterest-like wabi-sabi interiors, smart-tech rooms and an independent, upscale stay.",
  keywords: ["Lagom", "Lagom Premium Apartment", "Kathmandu Airbnb", "Kathmandu apartment", "Swayambhunath", "service apartment Kathmandu", "luxury stay Nepal", "wabi sabi", "presidential suite Kathmandu"],
  email: "lagomairbnb@gmail.com",
  phone: "+977 9708097322",
  /** WhatsApp Business (@lagomairbnb) number, digits only in international format. */
  whatsapp: "9779708097322",
  whatsappText: "Book your stay",
  instagram: "https://www.instagram.com/lagom_airbnb/",
  facebook: "https://www.facebook.com/p/Lagom-Airbnb-Nepal-61566543087073/",
  platforms: [
    { label: "airbnb", href: "https://www.airbnb.com/rooms/1286091822026294123?source_impression_id=p3_1792000384_P3toE1YIUfmXKqoD" },
    { label: "booking.com", href: "https://www.booking.com/hotel/np/lagom-premium-apartment.html?aid=356980&label=gog235jc-10CA0oqwFCF2xhZ29tLXByZW1pdW0tYXBhcnRtZW50SDNYA2irAYgBAZgBM7gBB8gBDNgBA-gBAfgBAYgCAagCAbgC1oO_1gbAAgHSAiQ0ZDhhNTE1Mi1kYTkwLTQwNjYtYmEwZC1mNTljNGI1MTZjMWbYAgHgAgE&came_from_hotel_review=1&keep_landing=1&sid=7653eb68f558a35273e7a8c6c0d35574" },
    { label: "agoda", href: "https://www.agoda.com/lagom-premium-apartment-pvt-ltd-h77109817/hotel/kathmandu-np.html?cid=1844104&ds=nVKaBBKR%2FmuUjjhV" },
    { label: "tripadvisor", href: "https://www.tripadvisor.com/Hotel_Review-g293890-d32709693-Reviews-Lagom_Premium_Apartment-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html" },
    { label: "expedia", href: "https://www.expedia.com/Nagarjun-Hotels-Lagom-Premium-Apartment-Pvt-Ltd.h112067712.Hotel-Information" },
    { label: "google", href: "https://share.google/hAtbUP5i1A2Z810Uq" },
  ],
  address: { street: "", city: "Kathmandu", region: "Bagmati", postalCode: "", country: "NP" }, // TODO street
  area: "Near Swayambhunath Stupa (Monkey Temple), Nagarjun, Kathmandu",
  /** Google Maps search query for the embedded map. */
  mapQuery: "Lagom Premium Apartment Pvt Ltd Kathmandu",
  /** Opens the property in Google Maps (footer "location" link). */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lagom+Premium+Apartment+Pvt+Ltd+Kathmandu",
  languages: ["English", "Hindi"],
  copyright: "© 2026 Lagom Premium Apartment Pvt. Ltd. All rights reserved.",
};

export type NavItem = { label: string; href: string };

export const nav = {
  primary: [
    { label: "HOME", href: "/" },
    { label: "EXPERIENCES", href: "/experiences/" },
    { label: "REVIEWS", href: "/reviews/" },
    { label: "CONTACT", href: "/contact/" },
  ] satisfies NavItem[],
  /** Accordion item (Nueve: RESIDENCES → Classic / Mini / Village) */
  rooms: { label: "ROOMS" },
  secondary: [
    { label: "book now", href: "/contact/" },
    { label: "privacy", href: "/privacy-policy/" },
    { label: "cookies", href: "/privacy-policy/#cookies" },
  ] satisfies NavItem[],
  footer: [
    { label: "experiences", href: "/experiences/" },
    { label: "reviews", href: "/reviews/" },
    { label: "book now", href: "/contact/" },
    { label: "contact", href: "/contact/" },
    { label: "privacy", href: "/privacy-policy/" },
    { label: "cookies", href: "/privacy-policy/#cookies" },
  ] satisfies NavItem[],
};

export type Amenity = { icon: IconName; label: string };
export type Spec = { value: string; label: string };

export type Room = {
  slug: string;
  /** Marketing name, e.g. "Deluxe Bedroom Airbnb" */
  kind: string;
  /** Pill / tab label, e.g. "DELUXE." */
  label: string;
  italic?: boolean;
  /** Hero title (uppercased via CSS) */
  title: string;
  guests: string;
  maxGuests: number;
  intro: string;
  metaDescription: string;
  specs: Spec[];
  storyTitle: string;
  story: { left: string[]; right: string[] };
  amenities: Amenity[];
  /** hero circle, gallery main, gallery grid (4) */
  images: { hero: ImageKey; main: ImageKey; grid: ImageKey[] };
  photoGroups: { id: string; title: string; text: string; images: ImageKey[] }[];
  /** Named apartments of this type that differ only in bed setup. */
  layouts?: { names: string[]; beds: string }[];
  /** Portrait walkthrough video served from /public. */
  /** Portrait walkthrough video served from /public; `caption` shows beside it when there are no layouts. */
  video?: { src: string; poster: string; caption?: string };
};

const base = {
  ac: { icon: "air-conditioning", label: "Air conditioning" },
  hot: { icon: "hot-water", label: "Hot water" },
  wifi: { icon: "fast-wifi", label: "Free Wi-Fi" },
  balcony: { icon: "balcony", label: "Balcony" },
  kettle: { icon: "hot-water-kettle", label: "Water kettle" },
  touch: { icon: "touch-switch", label: "Touch switches" },
  kitchen: { icon: "kitchen", label: "Fully equipped kitchen" },
  kitchenette: { icon: "coffee-maker-nespresso", label: "Kitchenette" },
  tub: { icon: "bathtub", label: "Bathtub" },
  curtains: { icon: "curtains", label: "Automatic curtains" },
  tv: { icon: "flat-tv", label: "Smart TV" },
  laundry: { icon: "washing-machine", label: "Laundry service" },
  shuttle: { icon: "plane", label: "Free airport pick-up" },
  travel: { icon: "compass", label: "Travel assistance" },
  parking: { icon: "parking", label: "Parking included" },
  work: { icon: "laptop", label: "Laptop workspace" },
  water: { icon: "bottle", label: "Free bottled water" },
} satisfies Record<string, Amenity>;

// TODO: confirm beds / bathrooms per room type.
export const rooms: Room[] = [
  {
    slug: "deluxe",
    kind: "Deluxe Bedroom Airbnb",
    label: "DELUXE.",
    title: "deluxe.",
    guests: "2",
    maxGuests: 2,
    intro: "Comfortable and cozy for solo travellers or couples. A calm bedroom with a balcony, touch switches and everything you need for an easy stay.",
    metaDescription: "Deluxe Bedroom at Lagom, Kathmandu: a cozy room for two with balcony, air conditioning, hot water, free Wi-Fi and smart touch switches.",
    specs: [
      { value: "2", label: "guests" },
      { value: "1", label: "bedroom" },
      { value: "1", label: "bed" },
      { value: "1", label: "bathroom" },
      { value: "yes", label: "balcony" },
    ],
    storyTitle: "cozy",
    story: {
      left: [
        "The Deluxe Bedroom is the simplest way to live the Lagom feeling: soft plaster walls, warm indirect light and a bed you will not want to leave.",
        "Step out to the balcony for the morning air over the valley, then back in to a room where every switch answers to a touch.",
      ],
      right: [
        "Designed for one or two, it keeps the essentials close: hot water, air conditioning, fast Wi-Fi and a kettle for tea at any hour.",
        "Housekeeping, luggage storage and our free airport pick-up are all a message away.",
      ],
    },
    amenities: [base.shuttle, base.travel, base.ac, base.hot, base.wifi, base.balcony, base.kettle, base.touch, base.tv, base.laundry, base.parking],
    images: { hero: "deluxe-4", main: "deluxe-1", grid: ["deluxe-5", "deluxe-2", "deluxe-3", "deluxe-6"] },
    photoGroups: [
      { id: "bedroom", title: "bedroom.", text: "Warm plaster, linen and low light: a platform bed under a lit arch, a boucle chair and a desk with a kettle.", images: ["deluxe-1", "deluxe-2", "deluxe-3", "deluxe-4", "deluxe-5"] },
      { id: "bath", title: "bath.", text: "A vessel basin on an oak vanity, brass taps and a walk-in shower in warm stone tones.", images: ["deluxe-6", "deluxe-7"] },
    ],
    video: { src: "/rooms/deluxe/intro.mp4", poster: "/rooms/deluxe/intro-poster.jpg", caption: "Tap the card, open the door and step in: a short walk through the Deluxe Bedroom." },
  },
  {
    slug: "studio",
    kind: "Studio Airbnb",
    label: "studio.",
    title: "studio.",
    guests: "2",
    maxGuests: 2,
    intro: "Compact and cozy with a fully equipped kitchen, perfect for solo travellers or couples who like to cook their own breakfast.",
    metaDescription: "Studio Airbnb at Lagom, Kathmandu: a compact, cozy space for two with a fully equipped kitchen and kitchenette, balcony, air conditioning and free Wi-Fi.",
    specs: [
      { value: "2", label: "guests" },
      { value: "1", label: "bed" },
      { value: "1", label: "bathroom" },
      { value: "full", label: "kitchen" },
      { value: "yes", label: "balcony" },
    ],
    storyTitle: "compact",
    story: {
      left: [
        "Everything in one calm, open room: a bed under a lit plaster arch, a round table for two and a kitchenette you will actually use.",
        "The Studio is made for travellers who want independence without giving up the comfort of a styled, serviced home.",
      ],
      right: [
        "A fully equipped kitchen and kitchenette, hot water, air conditioning and fast Wi-Fi come as standard, with touch switches throughout.",
        "The balcony catches the afternoon light; the stupa is a short walk away.",
      ],
    },
    amenities: [base.shuttle, base.travel, base.ac, base.hot, base.kitchen, base.kitchenette, base.wifi, base.balcony, base.touch, base.tv, base.work, base.laundry],
    images: { hero: "studio-3", main: "studio-1", grid: ["studio-2", "studio-7", "studio-6", "studio-8"] },
    photoGroups: [
      { id: "room", title: "room.", text: "A platform bed under a lit arch, a boucle chair by the desk, an arched wardrobe and a full-length mirror.", images: ["studio-1", "studio-2", "studio-3", "studio-4", "studio-5"] },
      { id: "kitchen", title: "kitchen.", text: "A round table for two and a kitchenette with a brass hood, a gas hob and lit open shelves.", images: ["studio-6", "studio-7"] },
      { id: "bath", title: "bath.", text: "A vessel basin on a rattan vanity and a rain shower in white wave tiles.", images: ["studio-8", "studio-9"] },
    ],
    video: { src: "/rooms/studio/intro.mp4", poster: "/rooms/studio/intro-poster.jpg", caption: "From the door to the bed in one take: a short walk through the Studio." },
  },
  {
    slug: "1bk",
    kind: "1BK Airbnb",
    label: "1BK.",
    title: "1bk.",
    guests: "2",
    maxGuests: 2,
    intro: "Spacious with a fully equipped kitchen, ideal for solo travellers or couples settling in for a longer stay.",
    metaDescription: "1BK Airbnb at Lagom, Kathmandu: a spacious one-bedroom apartment with a fully equipped kitchen, hot water, air conditioning, free Wi-Fi and smart touch switches.",
    specs: [
      { value: "2", label: "guests" },
      { value: "1", label: "bedroom" },
      { value: "1", label: "bed" },
      { value: "1", label: "bathroom" },
      { value: "full", label: "kitchen" },
    ],
    storyTitle: "spacious",
    story: {
      left: [
        "A separate bedroom, a kitchen island set for two and a kitchen with everything from the kettle to the microwave: the 1BK is a home, not a room.",
        "Work from the laptop corner in the morning, cook in the evening, and let the city wait.",
      ],
      right: [
        "Air conditioning, hot water and fast Wi-Fi throughout, with touch switches in every space.",
        "Laundry, housekeeping and tour assistance are available on request.",
      ],
    },
    amenities: [base.shuttle, base.travel, base.ac, base.hot, base.kitchen, base.kitchenette, base.wifi, base.touch, base.tv, base.work, base.laundry, base.parking],
    images: { hero: "1bk-5", main: "1bk-1", grid: ["1bk-3", "1bk-2", "1bk-4", "1bk-6"] },
    photoGroups: [
      { id: "kitchen", title: "kitchen.", text: "Through the arch: a kitchen island with bar stools for two, lit niches and a fully equipped kitchen.", images: ["1bk-1", "1bk-2"] },
      { id: "bedroom", title: "bedroom.", text: "A platform bed under a lit plaster arch, a boucle chair by the curtains and a terracotta jug in its niche.", images: ["1bk-3", "1bk-4", "1bk-5"] },
      { id: "bath", title: "bath.", text: "An oval vessel basin on a rattan vanity and a brass rain shower.", images: ["1bk-6", "1bk-7"] },
    ],
    video: { src: "/rooms/1bk/intro.mp4", poster: "/rooms/1bk/intro-poster.jpg", caption: "Unlock the door and walk through: kitchen, island and bedroom in under thirty seconds." },
  },
  {
    slug: "2bhk",
    kind: "2BHK Airbnb",
    label: "2BHK.",
    title: "2bhk.",
    guests: "2–4",
    maxGuests: 4,
    intro: "Spacious with a fully equipped kitchen and a bathtub, ideal for families or small groups of up to four.",
    metaDescription: "2BHK Airbnb at Lagom, Kathmandu: two bedrooms, a hall and a fully equipped kitchen for up to four guests, with two queen beds or a queen and two twins, a bathtub, balcony, air conditioning and free Wi-Fi.",
    specs: [
      { value: "2–4", label: "guests" },
      { value: "2", label: "bedrooms" },
      { value: "2–3", label: "beds" },
      { value: "1", label: "bathroom" },
      { value: "full", label: "kitchen" },
    ],
    storyTitle: "family",
    story: {
      left: [
        "Two bedrooms, a hall to gather in and a kitchen big enough for a family breakfast: the 2BHK gives everyone their own corner of calm.",
        "A freestanding bathtub on white pebbles for long evenings, a balcony for the morning, and the same wabi-sabi warmth in every room.",
      ],
      right: [
        "Choose Wise, with two queen beds, or Adore and Happy, each with a queen bedroom and a twin room for friends or children.",
        "Air conditioning, hot water, a fully equipped kitchen and kitchenette, fast Wi-Fi and touch switches throughout.",
      ],
    },
    amenities: [base.shuttle, base.travel, base.ac, base.tub, base.hot, base.kitchen, base.kitchenette, base.wifi, base.balcony, base.touch, base.tv, base.laundry],
    images: { hero: "2bhk-3", main: "2bhk-1", grid: ["2bhk-2", "2bhk-4", "2bhk-9", "2bhk-7"] },
    photoGroups: [
      { id: "living", title: "living.", text: "The hall: built-in sofas, a round oak table for four and an open kitchen with a brass hood.", images: ["2bhk-1", "2bhk-2"] },
      { id: "bath", title: "bath.", text: "A freestanding tub on white pebbles under three bamboo pendants, with an oak vanity and brass taps.", images: ["2bhk-3", "2bhk-4", "2bhk-5", "2bhk-6", "2bhk-7"] },
      { id: "bedrooms", title: "bedrooms.", text: "A queen bedroom with a lounge chair, and in Adore and Happy a twin room with two beds.", images: ["2bhk-8", "2bhk-9", "2bhk-10"] },
    ],
    layouts: [
      { names: ["Wise"], beds: "2 queen beds" },
      { names: ["Adore", "Happy"], beds: "1 queen bed + 2 twin beds" },
    ],
    video: { src: "/rooms/2bhk/intro.mp4", poster: "/rooms/2bhk/intro-poster.jpg" },
  },
  {
    slug: "presidential-suite",
    kind: "Presidential Suite",
    label: "SUITE.",
    italic: true,
    title: "presidential.",
    guests: "2–4",
    maxGuests: 4,
    intro: "Our most luxurious option, with premium features, smart automation and a touch of elegance. For two, or up to four.",
    metaDescription: "The Presidential Suite at Lagom, Kathmandu: our most luxurious stay, with bathtub, fully equipped kitchen, balcony, automatic curtain openers, touch switches, air conditioning and free Wi-Fi.",
    specs: [
      { value: "2–4", label: "guests" },
      { value: "2", label: "beds" },
      { value: "1", label: "bathroom" },
      { value: "full", label: "kitchen" },
      { value: "yes", label: "bathtub" },
    ],
    storyTitle: "elegance",
    story: {
      left: [
        "The Presidential Suite is Lagom at its most complete: the freestanding bathtub under three bamboo pendants, the arched terracotta curtain, the brass and the stone.",
        "Curtains open on their own in the morning; every light answers to a touch.",
      ],
      right: [
        "A fully equipped kitchen and kitchenette, a balcony, air conditioning, hot water and fast Wi-Fi, with premium finishes throughout.",
        "Ideal for couples, and comfortable for up to four.",
      ],
    },
    amenities: [base.shuttle, base.travel, base.ac, base.tub, base.hot, base.kitchen, base.kitchenette, base.wifi, base.balcony, base.curtains, base.touch, base.tv],
    images: { hero: "presidential-2", main: "presidential-1", grid: ["presidential-4", "presidential-6", "presidential-9", "presidential-7"] },
    photoGroups: [
      { id: "bath", title: "bath.", text: "A freestanding tub on a bed of white pebbles, brass fittings, palms and three bamboo pendants.", images: ["presidential-1", "presidential-2", "presidential-3"] },
      { id: "rooms", title: "rooms.", text: "A raised platform bed with glowing niches, a lounge under three arched curtains and a second room with its own beds and desk.", images: ["presidential-4", "presidential-5", "presidential-6", "presidential-7", "presidential-8"] },
      { id: "kitchen", title: "kitchen.", text: "An oak dining table for two and an open kitchen with a brass hood and a gold fridge.", images: ["presidential-9", "presidential-10", "presidential-11"] },
    ],
    video: { src: "/rooms/presidential-suite/intro.mp4", poster: "/rooms/presidential-suite/intro-poster.jpg", caption: "Arched windows, the platform bed and the bathtub beyond: a short walk through the Presidential Suite." },
  },
];

export const roomBySlug = (slug: string) => rooms.find((r) => r.slug === slug);
export const roomHref = (r: Room) => `/rooms/${r.slug}/`;

export const home = {
  title: "Lagom Premium Apartment • Where every corner tells a story",
  hero: { line1: "there is no place like", line2: "lagom airbnb.", quote: "where every corner tells a story" },
  deco: {
    title: "deco.",
    left: [
      "The Pinterest-y, <b>wabi-sabi</b> aesthetic that feels very calming to stay in. Lagom Airbnb, officially registered as <b>Lagom Premium Apartment Pvt. Ltd.</b>, is a highly rated, highly aesthetic luxury service apartment complex in <b>Kathmandu, Nepal</b>, near the Swayambhunath Stupa (Monkey Temple).",
      "Known for its modern <b>smart-tech</b> integration and cozy interiors, it is a popular destination for travellers looking for an independent, upscale stay.",
    ],
    right: [
      "Choose between the cozy <b>Deluxe</b> bedroom, the compact <b>Studio</b>, the spacious <b>1BK</b> and <b>2BHK</b> apartments with fully equipped kitchens, or the <b>Presidential Suite</b> with its bathtub and automatic curtains. All rooms come with air conditioning, hot water, free Wi-Fi and touch switches.",
    ],
  },
  gallery: { title: "rooms." },
  amenities: {
    title: "amenities.",
    text: "Free airport pick-up when you land, travel assistance with tours and tickets, and modern comfort in every unit.",
    items: [
      base.shuttle,
      base.travel,
      { icon: "fast-wifi", label: "Free Wi-Fi" },
      base.ac,
      base.kitchen,
      { icon: "touch-switch", label: "Smart touch switches" },
      base.laundry,
      base.parking,
    ] as Amenity[],
  },
  cta: "Book Now",
};

/** "View all amenities" popup — property-wide amenities. */
export const allAmenities: { group: string; items: Amenity[] }[] = [
  { group: "Internet", items: [{ icon: "fast-wifi", label: "Free Wi-Fi in the apartment and public areas" }] },
  {
    group: "Airport and travel",
    items: [
      { icon: "plane", label: "Free airport pick-up, 10:00 AM to 10:30 PM on request" },
      { icon: "compass", label: "Travel assistance with tours and tickets" },
      { icon: "parking", label: "Free uncovered self parking on site (max 2 spaces per unit)" },
    ],
  },
  {
    group: "Food and drink",
    items: [
      { icon: "hot-water-kettle", label: "Electric kettle" },
      { icon: "coffee-maker-nespresso", label: "Tea bags and instant coffee" },
      { icon: "dishes-and-silverware", label: "Paper towels" },
      { icon: "dining-table", label: "Couples / private dining" },
    ],
  },
  {
    group: "Bathroom",
    items: [
      { icon: "bathtub", label: "Separate bathtub and shower" },
      { icon: "bidet", label: "Bidet" },
      { icon: "hair-dryer", label: "Hair dryer (on request)" },
      { icon: "shampoo", label: "Shampoo and soap" },
      { icon: "body-soap", label: "Free toiletries, toothbrush and toothpaste" },
      { icon: "towel", label: "Towels and toilet paper provided" },
    ],
  },
  {
    group: "Bedrooms and living spaces",
    items: [
      { icon: "cotton-linens", label: "Bedsheets provided" },
      { icon: "dining-table", label: "Separate dining area" },
      { icon: "wardrobe", label: "Separate sitting area" },
      { icon: "air-conditioning", label: "Air conditioning" },
      { icon: "touch-switch", label: "Touch switches and smart features" },
    ],
  },
  {
    group: "Laundry and work",
    items: [
      { icon: "washing-machine", label: "Dry cleaning / laundry service" },
      { icon: "iron", label: "Iron and ironing board on request" },
      { icon: "laptop", label: "Laptop workspace" },
    ],
  },
  {
    group: "Services and conveniences",
    items: [
      { icon: "bell", label: "Concierge services and limited-hour front desk" },
      { icon: "bottle", label: "Free bottled water" },
      { icon: "cleaning-products", label: "Housekeeping (on request)" },
      { icon: "luggage", label: "Luggage storage" },
    ],
  },
  {
    group: "Good to know",
    items: [
      { icon: "elevator", label: "No elevator" },
      { icon: "fire-extinguisher", label: "Designated smoking areas" },
      { icon: "first-aid-kit", label: "No pets or service animals" },
      { icon: "self-check-in", label: "Languages spoken: English, Hindi" },
    ],
  },
];

/** Experiences page content lives in ./experiences.ts */

export const contact = {
  title: "Contact",
  metaDescription: "Contact Lagom Premium Apartment in Kathmandu with any question about your stay. Send us a message on WhatsApp and we will reply as soon as possible.",
  intro: "Contact us with any questions. We are here to help you make your stay unforgettable.",
  submit: "Send Message",
};

/** Reservation fields used by the form on the contact page. */
export const book = {
  consent: "I agree to provide the above information for the purposes of the reservation.",
  options: rooms.map((r) => r.kind),
  maxGuests: 4,
};

export const privacy = {
  title: "Privacy",
  metaDescription: "How Lagom Premium Apartment handles the personal information you share with us.",
  intro: "How we handle the information you share with us.",
};
