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

export type ImageKey = "living" | "living-portrait" | "lounge" | "bathroom" | "kitchen" | "s1" | "s22" | "s3" | "s4" | "s5";

export const IMAGES: Record<ImageKey, { src: StaticImageData; alt: string }> = {
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
};

export const img = (key: ImageKey) => IMAGES[key];
