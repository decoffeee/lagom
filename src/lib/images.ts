import type { StaticImageData } from "next/image";
import living from "@/images/living.jpg";
import livingPortrait from "@/images/living-portrait.jpg";
import lounge from "@/images/lounge.jpg";
import bathroom from "@/images/bathroom.jpg";
import kitchen from "@/images/kitchen.jpg";
import s1 from "@/images/s1.jpg";
import s22 from "@/images/s22.jpg";
import s3 from "@/images/s3.jpg";
import s4 from "@/images/s4.jpg";
import s5 from "@/images/s5.jpg";
import foodNewariSpread from "@/images/food-newari-spread.jpg";
import foodDalBhat from "@/images/food-dal-bhat.jpg";
import foodSamayBaji from "@/images/food-samay-baji.jpg";
import foodMomo from "@/images/food-momo.jpg";
import foodJujuDhau from "@/images/food-juju-dhau.jpg";
import foodWo from "@/images/food-wo.jpg";
import foodYomari from "@/images/food-yomari.jpg";
import foodSelRoti from "@/images/food-sel-roti.jpg";

export type ImageKey =
  | "living"
  | "living-portrait"
  | "lounge"
  | "bathroom"
  | "kitchen"
  | "s1"
  | "s22"
  | "s3"
  | "s4"
  | "s5"
  | "food-newari-spread"
  | "food-dal-bhat"
  | "food-samay-baji"
  | "food-momo"
  | "food-juju-dhau"
  | "food-wo"
  | "food-yomari"
  | "food-sel-roti";

/** Attribution for third-party photos (Creative Commons, via Wikimedia Commons). */
export type Credit = { artist: string; license: string; licenseUrl: string; page: string };
const BY_SA = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" };

export const IMAGES: Record<ImageKey, { src: StaticImageData; alt: string; credit?: Credit }> = {
  living: { src: living, alt: "Lagom living room with a round oak table, built-in plaster sofas and an open kitchen with a brass hood" },
  "living-portrait": { src: livingPortrait, alt: "Lagom lounge seen from above, with a woven pendant light and a set table" },
  lounge: { src: lounge, alt: "Lagom lounge and the freestanding bathtub under three bamboo pendant lights" },
  bathroom: { src: bathroom, alt: "Freestanding bathtub on white pebbles, palms and an arched terracotta curtain at Lagom" },
  kitchen: { src: kitchen, alt: "Lagom kitchen with a gold fridge, brass hood and stone counters" },
  s1: { src: s1, alt: "The golden spire and painted Buddha eyes of Swayambhunath Stupa behind carved stone shrines and prayer flags" },
  s22: { src: s22, alt: "Swayambhunath Stupa's golden tower and painted eyes rising above a field of small carved stone shrines" },
  s3: { src: s3, alt: "A monk in maroon robes praying at a carved shrine beside a row of prayer wheels" },
  s4: { src: s4, alt: "A gilded Tibetan-style monastery rising over a small white stupa, prayer flags strung across a blue sky" },
  s5: { src: s5, alt: "Temple courtyard with black stone shrines, golden pagoda roofs, prayer wheels and a whitewashed stupa dome" },
  "food-newari-spread": {
    src: foodNewariSpread,
    alt: "A Newari feast in brass bowls on a dark wooden table: beaten rice, choila, spiced potatoes, soybeans and curries",
    credit: { artist: "Sufe", ...BY_SA, page: "https://commons.wikimedia.org/wiki/File:Newari_Foods.jpg" },
  },
  "food-dal-bhat": {
    src: foodDalBhat,
    alt: "Dal bhat on a brass thali: rice, lentil soup, greens, vegetable curry, papad, yoghurt and fruit",
    credit: { artist: "Subhashish Panigrahi", ...BY_SA, page: "https://commons.wikimedia.org/wiki/File:Nepali_dal-bhat-tarkari.jpg" },
  },
  "food-samay-baji": {
    src: foodSamayBaji,
    alt: "Samay baji, the Newari platter, on a brass plate: beaten rice, choila, black soybeans, fried egg, potatoes and curd",
    credit: { artist: "Sherin", ...BY_SA, page: "https://commons.wikimedia.org/wiki/File:Traditional_Newari_Thali.jpg" },
  },
  "food-momo": {
    src: foodMomo,
    alt: "Steamed momo dumplings in a white bowl, steam rising against a dark background",
    credit: { artist: "Tapas Kumar Halder", ...BY_SA, page: "https://commons.wikimedia.org/wiki/File:Steamed_Momos_-_KOLKATA.jpg" },
  },
  "food-juju-dhau": {
    src: foodJujuDhau,
    alt: "A clay bowl of juju dhau, Bhaktapur's sweet yoghurt, held up against a blue sky and Nepali flags",
    credit: { artist: "SHnehaa", ...BY_SA, page: "https://commons.wikimedia.org/wiki/File:Juju_dhau.jpg" },
  },
  "food-wo": {
    src: foodWo,
    alt: "A plate of golden wo, Newari lentil pancakes, stacked in a ring",
    credit: { artist: "Iscream123", ...BY_SA, page: "https://commons.wikimedia.org/wiki/File:Wo_(Newari_Lentil_Pancakes).jpg" },
  },
  "food-yomari": {
    src: foodYomari,
    alt: "Freshly steamed yomari, fig-shaped rice-flour dumplings filled with molasses and sesame",
    credit: { artist: "Ritesh Man Tamrakar", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:Yomari.jpg" },
  },
  "food-sel-roti": {
    src: foodSelRoti,
    alt: "Sel roti, crisp ring-shaped rice bread fried golden for the festivals",
    credit: { artist: "Gaurav Dhwaj Khadka", ...BY_SA, page: "https://commons.wikimedia.org/wiki/File:Sel_roti.jpg" },
  },
};

export const img = (key: ImageKey) => IMAGES[key];
