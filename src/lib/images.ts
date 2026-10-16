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
import deluxe1 from "@/images/rooms/deluxe/1.jpg";
import deluxe2 from "@/images/rooms/deluxe/2.jpg";
import deluxe3 from "@/images/rooms/deluxe/3.jpg";
import deluxe4 from "@/images/rooms/deluxe/4.jpg";
import deluxe5 from "@/images/rooms/deluxe/5.jpg";
import deluxe6 from "@/images/rooms/deluxe/6.jpg";
import deluxe7 from "@/images/rooms/deluxe/7.jpg";
import studio1 from "@/images/rooms/studio/1.jpg";
import studio2 from "@/images/rooms/studio/2.jpg";
import studio3 from "@/images/rooms/studio/3.jpg";
import studio4 from "@/images/rooms/studio/4.jpg";
import studio5 from "@/images/rooms/studio/5.jpg";
import studio6 from "@/images/rooms/studio/6.jpg";
import studio7 from "@/images/rooms/studio/7.jpg";
import studio8 from "@/images/rooms/studio/8.jpg";
import studio9 from "@/images/rooms/studio/9.jpg";
import oneBk1 from "@/images/rooms/1bk/1.jpg";
import oneBk2 from "@/images/rooms/1bk/2.jpg";
import oneBk3 from "@/images/rooms/1bk/3.jpg";
import oneBk4 from "@/images/rooms/1bk/4.jpg";
import oneBk5 from "@/images/rooms/1bk/5.jpg";
import oneBk6 from "@/images/rooms/1bk/6.jpg";
import oneBk7 from "@/images/rooms/1bk/7.jpg";
import twoBhk1 from "@/images/rooms/2bhk/1.jpg";
import twoBhk2 from "@/images/rooms/2bhk/2.jpg";
import twoBhk3 from "@/images/rooms/2bhk/3.jpg";
import twoBhk4 from "@/images/rooms/2bhk/4.jpg";
import twoBhk5 from "@/images/rooms/2bhk/5.jpg";
import twoBhk6 from "@/images/rooms/2bhk/6.jpg";
import twoBhk7 from "@/images/rooms/2bhk/7.jpg";
import twoBhk8 from "@/images/rooms/2bhk/8.jpg";
import twoBhk9 from "@/images/rooms/2bhk/9.jpg";
import twoBhk10 from "@/images/rooms/2bhk/10.jpg";
import presidential1 from "@/images/rooms/presidential-suite/1.jpg";
import presidential2 from "@/images/rooms/presidential-suite/2.jpg";
import presidential3 from "@/images/rooms/presidential-suite/3.jpg";
import presidential4 from "@/images/rooms/presidential-suite/4.jpg";
import presidential5 from "@/images/rooms/presidential-suite/5.jpg";
import presidential6 from "@/images/rooms/presidential-suite/6.jpg";
import presidential7 from "@/images/rooms/presidential-suite/7.jpg";
import presidential8 from "@/images/rooms/presidential-suite/8.jpg";
import presidential9 from "@/images/rooms/presidential-suite/9.jpg";
import presidential10 from "@/images/rooms/presidential-suite/10.jpg";
import presidential11 from "@/images/rooms/presidential-suite/11.jpg";

/** Room photos live in src/images/rooms/<slug>/<n>.jpg (web copies of images/rooms/<Room>/). */
type RoomImageKey = `deluxe-${1 | 2 | 3 | 4 | 5 | 6 | 7}` | `studio-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1bk-${1 | 2 | 3 | 4 | 5 | 6 | 7}` | `2bhk-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`
  | `presidential-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11}`;

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
  | "food-sel-roti"
  | RoomImageKey;

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
  "deluxe-1": { src: deluxe1, alt: "Deluxe Bedroom at Lagom: a white platform bed under a lit plaster arch, straw pendants and linen curtains" },
  "deluxe-2": { src: deluxe2, alt: "Deluxe bed made up with white linen and a Lagom towel, a straw pendant glowing beside it" },
  "deluxe-3": { src: deluxe3, alt: "The Deluxe bed beside full-height sheer and linen curtains, a terracotta jug on the arch ledge" },
  "deluxe-4": { src: deluxe4, alt: "Deluxe corner with a boucle lounge chair, a plaster desk with a kettle, an oak chair and a straw pendant" },
  "deluxe-5": { src: deluxe5, alt: "Deluxe Bedroom overview from the bed toward the desk, the arched doorway and the bathroom" },
  "deluxe-6": { src: deluxe6, alt: "Deluxe bathroom: a round vessel basin with a brass tap on an oak vanity, towels and a hair dryer" },
  "deluxe-7": { src: deluxe7, alt: "Deluxe shower and toilet in warm stone-look tiles with lit floating shelves" },
  "studio-1": { src: studio1, alt: "Studio Airbnb at Lagom: an arched mirror, a round table for two, a straw pendant and the kitchenette beyond" },
  "studio-2": { src: studio2, alt: "Studio bed under a lit plaster arch with straw pendants, a bedside drawer and linen curtains" },
  "studio-3": { src: studio3, alt: "Studio corner with a boucle chair, a plaster desk, an oak chair and a palm under a straw pendant" },
  "studio-4": { src: studio4, alt: "Arched plaster wardrobe with a linen curtain beside a full-length arched mirror in the Studio" },
  "studio-5": { src: studio5, alt: "View past the arched wardrobe and mirror to the Studio kitchenette and its open shelves" },
  "studio-6": { src: studio6, alt: "A round white table set for two with wine glasses and oak chairs in the Studio" },
  "studio-7": { src: studio7, alt: "Studio kitchenette with a brass hood, a gas hob, a granite counter and lit open shelves" },
  "studio-8": { src: studio8, alt: "Studio bathroom: a vessel basin on a rattan-front vanity, a woven pendant and a backlit mirror" },
  "studio-9": { src: studio9, alt: "Studio shower with a brass rain head, white wave tiles and a woven pendant" },
  "1bk-1": { src: oneBk1, alt: "1BK at Lagom seen through a plaster arch: a kitchen island set for two, bar stools, a straw pendant and lit niches" },
  "1bk-2": { src: oneBk2, alt: "1BK kitchen island set for dinner with gold bar stools, a gold fridge, a microwave and a palm" },
  "1bk-3": { src: oneBk3, alt: "1BK bedroom with a white platform bed under a lit plaster arch, straw pendants and linen curtains" },
  "1bk-4": { src: oneBk4, alt: "Boucle lounge chair and a terracotta side table beside linen curtains under a straw pendant in the 1BK" },
  "1bk-5": { src: oneBk5, alt: "A terracotta jug in a lit arched plaster niche" },
  "1bk-6": { src: oneBk6, alt: "1BK bathroom: an oval vessel basin with a brass tap on a rattan-front vanity and trailing greenery" },
  "1bk-7": { src: oneBk7, alt: "1BK shower with a brass rain head, white textured tiles and marble-look floor" },
  "2bhk-1": { src: twoBhk1, alt: "2BHK hall at Lagom: a round oak table set for four, built-in sofas and the freestanding bathtub under three bamboo pendants" },
  "2bhk-2": { src: twoBhk2, alt: "2BHK living room and open kitchen with a round oak table, built-in plaster sofas, a gold fridge and a brass hood" },
  "2bhk-3": { src: twoBhk3, alt: "Freestanding bathtub on white pebbles under three woven bamboo pendants in the Lagom 2BHK" },
  "2bhk-4": { src: twoBhk4, alt: "The 2BHK bathtub framed by a plaster archway, with palms, terracotta jugs and an arched curtain" },
  "2bhk-5": { src: twoBhk5, alt: "Bath tray with a glass of red wine across the 2BHK tub, a wooden stool and a woven basket beside it" },
  "2bhk-6": { src: twoBhk6, alt: "Close-up of the white tub on pebbles with a pine bath tray and a small vase" },
  "2bhk-7": { src: twoBhk7, alt: "Vessel basin and brass taps on an oak vanity with a pebble planter, the hall reflected in the mirror" },
  "2bhk-8": { src: twoBhk8, alt: "Queen bedroom corner with a boucle lounge chair, a bamboo pendant and an open plaster wardrobe" },
  "2bhk-9": { src: twoBhk9, alt: "Twin bedroom with two white beds, plaster niches with terracotta jugs and linen curtains" },
  "2bhk-10": { src: twoBhk10, alt: "Second view of the twin bedroom: two beds, a bamboo pendant, an open wardrobe and a boucle stool" },
  "presidential-1": { src: presidential1, alt: "The Presidential Suite bathtub seen through a plaster archway: a freestanding tub on pebbles, palms and bamboo pendants" },
  "presidential-2": { src: presidential2, alt: "Freestanding bathtub under woven bamboo pendants and palms, a champagne bottle on the bath tray" },
  "presidential-3": { src: presidential3, alt: "An arched floor mirror reflecting the suite's bathtub, palms and bamboo pendants beside two terracotta stools" },
  "presidential-4": { src: presidential4, alt: "The suite bedroom through an arch: a platform bed with lit niches, a bench and a boucle chair" },
  "presidential-5": { src: presidential5, alt: "Raised platform bed with glowing niches and a bench, an abstract painting and a round table with an oak chair" },
  "presidential-6": { src: presidential6, alt: "Presidential Suite lounge with three arched curtains, a sunken seat, a rug and an oak chair" },
  "presidential-7": { src: presidential7, alt: "Second room of the suite with two platform beds, a floating oak desk, open shelves and an arched mirror" },
  "presidential-8": { src: presidential8, alt: "Second room with a platform bed, a floating desk, a palm and linen curtains" },
  "presidential-9": { src: presidential9, alt: "Oak dining table set for two in front of the suite's kitchen with lit open shelves and a gold fridge" },
  "presidential-10": { src: presidential10, alt: "Dining table set with plates, wine glasses and a vase of dried flowers" },
  "presidential-11": { src: presidential11, alt: "Presidential Suite kitchen with a gold fridge under an arched niche, a brass hood and terracotta jugs" },
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
