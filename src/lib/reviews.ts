/**
 * Content for /reviews: guest testimonials taken from Lagom's Google Business listing.
 *
 * Only five-star reviews are shown. Texts are quoted as the guests wrote them (typos included);
 * the ones Google truncated with "Read more" are cut at the last complete sentence, nothing is
 * added. `when` is approximate: Google shows relative dates ("9 months ago"), converted here from
 * the snapshot taken in October 2026.
 */
import { site } from "./site";

export type Review = {
  name: string;
  /** Approximate month of the stay / review */
  when: string;
  /** Google's trip tags, e.g. "Holiday · Couple" */
  trip?: string;
  text: string;
};

export const reviews = {
  title: "Here is what people say about their stay",
  metaDescription:
    "Guest reviews of Lagom Premium Apartment in Kathmandu: rated 4.8 out of 5 on Google from more than 200 stays. Read what travellers say about the rooms, the ambience and the hosts.",
  intro: "Honest words from the travellers, couples, friends and families who have made Lagom their home in Kathmandu.",
  source: "Google reviews",
  rating: "4.8",
  count: "212",
  googleUrl: site.platforms.find((p) => p.label === "google")!.href,

  items: [
    {
      name: "Gurkha Combat Ultimate Fitness Center",
      when: "June 2026",
      trip: "Holiday · Family",
      text: "I stayed there for almost two weeks and I loved it so much. Lagom Airbnb gave me the true Airbnb experience very private, peaceful, and independent. It felt less like a hotel and more like living in my own beautiful apartment in Kathmandu.",
    },
    {
      name: "slowmovlog",
      when: "June 2026",
      trip: "Family",
      text: "It was an amazing experience to stay in Lagom. My friends and I enjoyed thoroughly. The room aesthetics are amazing. You don't need to go far away to find calmness in the city, you can find that peace and calmness in Lagom. For such a luxurious experience, the prices are fair too.",
    },
    {
      name: "Tshililo Ravhuanzwo",
      when: "April 2026",
      trip: "Holiday · Solo",
      text: "Looks exactly like it does in the pictures, some visible wear and tear but doesn’t take away from the look. Super comfortable, hot shower and overall just lovely. It’s in a suburb so you can still hear bikes and neighbors in the street but it’s not too noisy. Highly recommend it.",
    },
    {
      name: "Sandhya Shrestha",
      when: "January 2026",
      trip: "Holiday · Couple",
      text: "I had a wonderful stay at Lagom Airbnb. The place was very clean, cozy, and thoughtfully arranged, making it feel comfortable and relaxing from the moment I arrived.",
    },
    {
      name: "Diksha Goel",
      when: "January 2026",
      trip: "Holiday · Friends",
      text: "Stayed here for my birthday and had the loveliest experience ✨ The place was highly aesthetic, cozy, and very well maintained — every corner felt thoughtfully done and picture-perfect.",
    },
    {
      name: "Neuraj Karki",
      when: "January 2026",
      text: "Lagom AirBnb is a perfect place to celebrate and spend quality time with friends or family, especially for a group of 4–6 people. The room ambiance is truly extraordinary; very aesthetic, cozy, and thoughtfully designed.",
    },
    {
      name: "thila periasamy",
      when: "January 2026",
      trip: "Holiday · Family",
      text: "Rooms are very good. We took up 2 room suite. Excellent service by Angel. He was extremely kind and considerate. I injured my ankle and had to carried in. He immediately got me crutches and ointment to apply. Only thing the can improve is the bathroom. Otherwise everything was excellent.",
    },
    {
      name: "Bibhashana Bhattarai",
      when: "January 2026",
      trip: "Holiday · Friends",
      text: "We had an absolutely wonderful stay! The rooms were beautifully designed with a clean, aesthetic touch that made the space feel both cozy and stylish.",
    },
    {
      name: "The Caps Pro",
      when: "January 2026",
      text: "My stay at Lagom was amazing. The apartments are really well designed and make you feel right at home as soon as you step in. The lights, furniture and amenities make the vibe really stand out. Absolutely recommend if you’re looking for a short or long term stay. One of the best places in Kathmandu.",
    },
    {
      name: "Ghaleghale",
      when: "January 2026",
      text: "Handsdown the best place for a couples, you can cook, have fun. Love the concept 💕 had so much fun was a lovely stay 💕",
    },
    {
      name: "Sanjiwani dhungana",
      when: "December 2025",
      trip: "Holiday · Friends",
      text: "Absolutely obsessed with the vibe of this place! The aesthetic is spot on—clean lines, airy layout, and dreamy natural lighting that makes every photo look Instagram-ready. The room feels super cozy yet stylish, like something straight out of Pinterest. If you’re looking for an aesthetic getaway or content-friendly space, this is it!",
    },
    {
      name: "Kajolkshetri777",
      when: "December 2025",
      trip: "Holiday",
      text: "Fantastic apartment in an unbeatable location! The decor was stylish and cozy, making it feel like a true home away from home. We loved our time here.",
    },
    {
      name: "Sushant Thapa",
      when: "November 2025",
      text: "I had an amazing stay at Lagom Airbnb Nepal! The place is beautifully designed, clean, and incredibly comfortable — exactly the kind of calm, cozy atmosphere you hope for when traveling.",
    },
    {
      name: "Swastika Sharma",
      when: "2025",
      trip: "Holiday · Friends",
      text: "The place is honestly so aesthetic and beautifully designed. Every detail has been carefully thought of and it really shows. We were 4 of us staying here and the price felt very reasonable for everything that was included.",
    },
    {
      name: "mandip giri",
      when: "2025",
      trip: "Holiday · Couple",
      text: "Our stay was absolutely wonderful. The place was exactly as shown on Instagram clean, cozy, and beautifully set up. The hospitality was amazing, and every little detail made our stay super comfortable. It truly felt like a home away from home. Highly recommend and would definitely love to come back again.",
    },
    {
      name: "Aryan Karn",
      when: "2025",
      text: "My partner and I had an amazing stay at this Airbnb! The space was cozy, clean, and perfect for a couple’s getaway. The little touches, from soft linens, roses, candles to a well-equipped kitchen made it feel like home.",
    },
    {
      name: "Sarovar Paudel",
      when: "2025",
      text: "We had an amazing stay at this beautiful place! The space was incredibly aesthetic, warm, clean, and cozy—perfect for a relaxing getaway. The entire ambiance was calming and inviting, and the staff were very attentive and welcoming.",
    },
    {
      name: "Surabhi Khanal",
      when: "2025",
      trip: "Holiday · Family",
      text: "The stay at the 2BHK unit was truly luxurious. The ambience was extraordinary, highlighted by the unique tub at the center and the convenience of a well-equipped kitchen for quick meals. To make the experience even more delightful, I’d recommend adding guest robes and air fresheners to keep the space feeling fresh and inviting.",
    },
    {
      name: "Smriti Tamang",
      when: "2025",
      trip: "Holiday · Friends",
      text: "Talking about the ambiance, it was truly amazing and I had a wonderful time with my sister. Every staff member was so polite and welcoming, which made the experience even better.",
    },
    {
      name: "Jharana Chokhal",
      when: "2025",
      trip: "Holiday",
      text: "Truly a dreamy escape at Lagom Airbnb ✨ From the moment I arrived, everything felt magical. The decor was super cute, the space incredibly cozy and peaceful — like walking into a dream.",
    },
    {
      name: "Nilam Limbu",
      when: "2025",
      text: "“Home away from home” like literally, but add a little bit of cozy and fancy feeling to it. You have all the appliances for cooking and some basic seasonings. Fully equipped with fridge, ACs and bathrooms.",
    },
    {
      name: "Pema Lama",
      when: "2025",
      trip: "Holiday",
      text: "Had the most wonderful stay at Lagom Airbnb with my two friends! ✨ The ambiance was cozy and dreamy, every corner picture-perfect, and the staff were so kind and welcoming. Highly recommend for anyone looking for comfort, beauty, and good vibes! 🌿💛",
    },
  ] satisfies Review[],
};
