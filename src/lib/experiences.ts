/**
 * Content for /experiences: what to do in and around Swayambhu, and further out in the valley.
 *
 * Facts were checked against the sources listed in `sources` (October 2026). Entry fees and
 * opening hours in Nepal change without much notice, so every price is flagged "verify on site".
 */
import type { ImageKey } from "./images";
import type { Video } from "@/components/YouTube";

export type Place = {
  name: string;
  /** Short distance / time hint from Lagom or from the stupa, e.g. "10 min walk" */
  meta?: string;
  text: string;
  link?: { label: string; href: string };
};

export type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  images: ImageKey[];
  /** Optional list of places / dishes / dates shown under the paragraphs */
  listTitle?: string;
  list?: Place[];
  /** Optional captioned photo grid (opens in a lightbox) */
  gallery?: { image: ImageKey; caption: string }[];
  videos?: Video[];
};

export const experiences = {
  title: "experiences",
  metaDescription:
    "A guest's guide to Swayambhu and Kathmandu from Lagom: the Swayambhunath Stupa a ten-minute walk away, Buddha Park, forest hikes, the Durbar Squares, Boudhanath, Newari food, festivals and practical tips.",
  intro: "Kathmandu, a valley ringed by hills and temples, where the prayer flags of Swayambhunath fly a ten-minute walk from your door.",

  /** Distances strip under the hero. */
  facts: [
    { value: "10 min", label: "walk to Swayambhunath" },
    { value: "2.5 km", label: "to Thamel" },
    { value: "2 km", label: "to Kathmandu Durbar Square" },
    { value: "10 km", label: "to the airport, free shuttle" },
  ],

  banner: "s22" as ImageKey,

  sections: [
    {
      id: "stupa",
      title: "the stupa.",
      paragraphs: [
        "Swayambhunath sits on its wooded hill just above Lagom. The name means \"self-arisen\": legend says the valley was once a lake, a lotus bloomed on its surface with a light that never went out, and the bodhisattva Manjushri cut the hills with his sword to drain the water so people could worship it. An inscription dated 640 CE already records work here by the Licchavi kings, which makes it the oldest stupa in Nepal and part of the Kathmandu Valley UNESCO World Heritage Site.",
        "Climb the 365 stone steps on the east side at dawn, when monks and neighbours walk the stupa clockwise, spin the brass prayer wheels and light butter lamps. The white dome is topped by a gilded cube with the Buddha's eyes looking out in the four directions, and thirteen golden rings for the thirteen stages to enlightenment. The dome was re-gilded with 20 kg of gold in 2010; the Anantapur shrine, destroyed in the 2015 earthquake, has since been rebuilt.",
        "And yes, the monkeys. Families of rhesus macaques live on the hill and gave the place its nickname. They are harmless if you keep food, sunglasses and anything shiny out of sight.",
      ],
      images: ["s1", "s3"],
      listTitle: "on the hill",
      list: [
        { name: "The great vajra", meta: "top of the steps", text: "A huge bronze thunderbolt on a mandala base greets you at the top of the staircase, with the stupa rising behind it." },
        { name: "Harati (Ajima) temple", meta: "beside the stupa", text: "A two-tiered gilded Newari temple to the goddess who protects children, the busiest shrine on the hill. No photos in front of the deity; the sides are fine." },
        { name: "Shantipur", meta: "north of the stupa", text: "A plain, 1,500-year-old shrine said to hold the tantric master Shantikar Acharya, still meditating inside. A poem by King Pratap Malla is inscribed on the wall." },
        { name: "Pratappur and Anantapur", meta: "flanking the stupa", text: "The two tall white shikhara towers built by Pratap Malla in the 17th century. Anantapur fell in 2015 and stands again." },
        { name: "Karma Raja Mahavihar", meta: "north side", text: "The Karma Kagyu monastery on the platform. Drop in quietly for the morning or late-afternoon puja, when the monks chant to drums and horns." },
        { name: "Dewa Dharma and Dharmachakra monasteries", meta: "west side", text: "Two smaller, quieter gompas: Dewa Dharma with its bronze Buddha and murals, and the 19th-century Bhutanese Drukpa Kagyu gompa near the Harati temple." },
        { name: "Stupa museum", meta: "rear corner, free", text: "A small red-brick hall of Buddhist bronzes and stone sculpture, easy to miss and worth ten minutes." },
        { name: "World Peace Pond", meta: "steps down from Shantipur", text: "Toss a coin into the bowl of the standing Buddha for luck, then keep going into the little forest behind for the quietest corner of the hill." },
        { name: "Singing-bowl lanes", meta: "back streets at the top", text: "Workshops and stalls selling singing bowls, thangka paintings, prayer flags and mala beads. Bargain gently; opening prices run high." },
        { name: "The view", meta: "any clear morning", text: "The whole valley spreads below you. In autumn and winter the Ganesh Himal and Langtang ranges show above the northern rim." },
      ],
      videos: [
        { id: "JKlW-FIXHRI", title: "Monkey Temple, Swayambhunath in 4K", by: "devinsupertramp" },
        { id: "Po4JieBGQj8", title: "Swayambhunath 360° video", by: "AirPano VR" },
        { id: "EozlYQgB6rY", title: "Things to know before visiting", by: "Travel Tips For Nepal" },
      ],
    },
    {
      id: "hill",
      title: "around the hill.",
      paragraphs: [
        "Most visitors see the stupa and leave. Stay a few days with us and the whole western edge of the city opens up: giant golden statues, a Vajrayogini temple on a holy river, a university museum of butterflies and birds, and the old gardens and shrines that ring the base of the hill. All of these are within a short walk or a ten-minute taxi.",
      ],
      images: ["s4", "s5"],
      listTitle: "a short walk away",
      list: [
        { name: "Amideva Buddha Park", meta: "foot of the hill, Ring Road", text: "Three golden statues, each over 20 metres tall: Amitabha (Shakyamuni) in the centre holding the bowl of nectar, with Chenrezig and Guru Rinpoche beside him. Built in 2003 and a calm place to sit when the stupa is busy." },
        { name: "Natural History Museum", meta: "south slope of the hill", text: "Tribhuvan University's cabinet of curiosities since 1975: more than 50,000 specimens of Nepal's plants, insects, birds and animals, including fossils. Small, old-fashioned and charming." },
        { name: "Swayambhu Vihara", meta: "base of the hill", text: "A Newar Buddhist courtyard monastery (bahal) with carved windows and metalwork, where the valley's older Vajrayana tradition is still practised alongside the Tibetan gompas above." },
        { name: "Bijeshwori temple", meta: "Bishnumati bank, on the way to town", text: "A 1655 temple to Vajrayogini in her sky-dancer form, sacred to Hindus and Tibetan Buddhists alike, on the old pilgrim path between Swayambhu and the city. Photographing the deity is not allowed." },
        { name: "Shobha Bhagwati", meta: "Bishnumati bank", text: "A pagoda temple to Durga in her nine forms, busiest during Dashain. Beside it stands the memorial to the martyrs of 1941." },
        { name: "National Museum", meta: "Chhauni, 15 min walk", text: "Nepal's main museum in a former Rana arsenal: stone and bronze sculpture, the Buddhist art gallery and a hall of historic weapons. Closed Tuesdays; a combined ticket covers all buildings." },
        { name: "Balaju Water Garden", meta: "10 min by taxi", text: "An 18th-century garden of 22 carved stone water spouts (Baisdhara), a replica of the sleeping Vishnu and a public swimming pool. Thousands bathe here on the full moon of Baisakh." },
        { name: "Ichangu Narayan", meta: "3 km north-west, 15 min by taxi", text: "One of the four Narayan temples that guard the valley, in a quiet village below Nagarjun hill. Its origins are placed anywhere between the 5th and 13th century, and the walk there through fields is the point." },
        { name: "Kimdol and Manjushree Bazaar", meta: "the lanes below the stupa", text: "The everyday Swayambhu: monastery schools, momo kitchens, tailors and tea stalls. BIA Café in Kimdol is a bookish spot for a slow coffee." },
      ],
      videos: [{ id: "yAwXDsgACtA", title: "Swayambhunath and Buddha Park in 4K", by: "Waeba" }],
    },
    {
      id: "trails",
      title: "the trails.",
      paragraphs: [
        "Lagom sits in Nagarjun, named for the forested hill that rises behind Swayambhu and forms the southern lobe of Shivapuri Nagarjun National Park. Which means some of the best day hikes in the valley start almost at the door.",
        "Carry water, start early and take a photo ID: park gates ask for one. Autumn (September to November) and spring (March to May) give the clearest skies.",
      ],
      images: ["s4", "s1"],
      listTitle: "pick a hill",
      list: [
        { name: "Jamacho hike, Nagarjun", meta: "half day, gate 15 min away", text: "Enter at the Phulbari gate on the Ring Road and climb through pine, oak and rhododendron to Jamacho Gumba at 2,128 m, a small monastery and viewpoint where Guru Rinpoche is said to have meditated. Around 10 km return, 4 to 6 hours at an easy pace. Park entry for foreigners is around NPR 565 including tax (verify at the gate)." },
        { name: "Chandragiri Hills", meta: "45 min by taxi + cable car", text: "A 2.4 km cable car lifts you in about 15 minutes to 2,500 m, the Bhaleshwor Mahadev temple and a panorama from Annapurna to Everest on a clear day. Round trip for foreigners is roughly USD 22 to 23 (verify current fares and operating status)." },
        { name: "Champadevi", meta: "full day, from Pharping or Hattiban", text: "A ridge walk to a 2,278 m shrine on the valley's south-west rim, with Kirtipur and the whole city below. Locals climb it on Nepali New Year." },
        { name: "Kirtipur old town walk", meta: "5 km south, 20 min by taxi", text: "A traffic-free medieval Newar town on a hill: the Bagh Bhairab temple with its tiger god, the 1655 Uma Maheshwar pagoda at the top (1,414 m) and the Chilancho stupa. Finish with a Newari lunch, see the food section." },
      ],
      videos: [
        { id: "7GD2qqz_Gig", title: "Solo hike to Jamacho Gumba, Nagarjun", by: "Infinite With Nishan" },
        { id: "42j9BOBEces", title: "Chandragiri cable car and Bhaleshwor temple", by: "PURVI BLUES" },
      ],
    },
    {
      id: "city",
      title: "the city.",
      paragraphs: [
        "Seven monuments in the valley make up the Kathmandu Valley World Heritage Site, and Swayambhunath is the one you can walk to. The others are between fifteen minutes and an hour away by taxi, and the Pathao or inDrive apps will get you there for a fair fare.",
        "Thamel, with its bookshops, bakeries and trekking stores, is half an hour on foot through the old lanes, or ten minutes by car. We are happy to plan your days with you and arrange a driver or a licensed guide.",
      ],
      images: ["s5", "s3"],
      listTitle: "the valley's heritage, with foreign-national entry fees as of early 2026",
      list: [
        { name: "Kathmandu Durbar Square (Hanuman Dhoka)", meta: "2 km, NPR 1,000 incl. museum", text: "The old royal palace, the Kumari's house where the living goddess appears at her window, the rebuilt Kasthamandap pavilion and the Kala Bhairab relief. Best in the late-afternoon light." },
        { name: "Thamel, Asan and Indra Chowk", meta: "2.5 km, free", text: "Walk from Thamel's lanes to the Garden of Dreams, a restored 1920s neoclassical garden, then into Asan, the oldest market in the city: spices, brass, beads and the Annapurna temple. Bargain from about half the asking price." },
        { name: "Patan Durbar Square", meta: "7 km, NPR 1,000 incl. Patan Museum", text: "The most coherent of the three squares: the stone Krishna Mandir of 1637, the sunken royal bath of Sundari Chowk and the Patan Museum, one of the best in South Asia. Walk north to the Golden Temple (Hiranya Varna Mahavihar) and its gilded courtyard." },
        { name: "Boudhanath", meta: "10 km, NPR 400", text: "One of the largest stupas in the world and the heart of Tibetan Kathmandu, ringed by some fifty monasteries. Go at dusk, when the butter lamps are lit and hundreds of people walk the kora, then eat on a rooftop above the dome." },
        { name: "Pashupatinath", meta: "9 km, NPR 1,000", text: "Nepal's holiest Shiva temple on the Bagmati river. Non-Hindus cannot enter the main shrine but can watch the dawn rituals and the evening aarti from across the river. Cremations take place on the ghats; be discreet." },
        { name: "Bhaktapur", meta: "16 km, NPR 1,800 for several days", text: "A whole medieval city for one ticket: the 55-Window Palace, the five-tiered Nyatapola temple, the pottery square and the juju dhau, the famous \"king of yoghurts\" made in clay bowls. Give it a full day." },
        { name: "Changu Narayan", meta: "20 km, NPR 300", text: "The oldest temple in the valley on a ridge beyond Bhaktapur, with 5th-century inscriptions and some of the finest early stone carving in Nepal. Pair it with Bhaktapur, and consider sleeping at Nagarkot for a Himalayan sunrise." },
      ],
      videos: [
        { id: "ZqpguAUuMk0", title: "Kathmandu Durbar Square walking tour in 4K", by: "Travel with Phil" },
        { id: "bSJd_k1USoI", title: "Boudhanath stupa kora, 360° view", by: "Pradip Artyst" },
      ],
    },
    {
      id: "food",
      title: "the food.",
      paragraphs: [
        "Start with momo and dal bhat, then go deeper. The Newars, the valley's original people, have one of the great unsung cuisines of Asia: smoky, spiced, built around beaten rice and eaten with a glass of chhyang (rice beer) or aila (rice spirit). Kirtipur and Patan are the places for it, and both are a short ride away.",
        "Back at Lagom, your own kitchen is fully equipped for a slow breakfast, and the tea and coffee are on us.",
      ],
      images: ["food-newari-spread", "food-dal-bhat"],
      listTitle: "what to order",
      list: [
        { name: "Momo", text: "Steamed dumplings of buffalo, chicken or vegetables with a tomato-sesame achar. Try jhol momo, served in a warm spiced broth, and kothey, pan-fried." },
        { name: "Dal bhat and the Thakali set", text: "Rice, lentil soup, greens, pickle and curry, refilled until you surrender. The Thakali version from Mustang adds buckwheat bread, ghee and slow-cooked mutton." },
        { name: "Samay baji", text: "The Newari festival platter: beaten rice (chiura), choila, black soybeans, boiled egg, spiced potato, pickled radish and a bara on top." },
        { name: "Choila", text: "Grilled buffalo (or chicken, or duck) tossed with mustard oil, garlic, ginger, chilli and fenugreek. Haku choila is the smoky black version." },
        { name: "Bara and chatamari", text: "Bara (wo) is a savoury lentil pancake, often with an egg or minced meat cooked in. Chatamari is a thin rice-flour crepe with toppings, the \"Newari pizza\"." },
        { name: "Yomari", text: "A steamed rice-flour dumpling shaped like a fig and filled with molasses and sesame, or sweet khuwa. Made for Yomari Punhi in December, but Kirtipur serves it all year." },
        { name: "Juju dhau, sel roti and lhaphing", text: "Bhaktapur's thick clay-pot yoghurt; the ring-shaped rice bread fried at festivals; and the cold, chilli-laced mung-bean noodles sold in Boudha's alleys." },
      ],
      gallery: [
        { image: "food-momo", caption: "Momo, straight from the steamer" },
        { image: "food-samay-baji", caption: "Samay baji on a brass plate" },
        { image: "food-wo", caption: "Wo, the Newari lentil pancake" },
        { image: "food-yomari", caption: "Yomari, steamed for Yomari Punhi" },
        { image: "food-juju-dhau", caption: "Juju dhau in its clay bowl, Bhaktapur" },
        { image: "food-sel-roti", caption: "Sel roti, the festival bread" },
      ],
      videos: [
        { id: "wtTZQivkNQI", title: "Nepali street food across Kathmandu: bara, momo and more", by: "Luke Martin" },
        { id: "EW57O-LbdaM", title: "Newari food tour in Patan: 18 dishes", by: "Hungry Two Travel" },
      ],
    },
  ] satisfies Section[],

  /** Where to eat, split by distance. */
  eat: {
    title: "where to eat",
    groups: [
      {
        title: "near the stupa",
        places: [
          { name: "Nirvana Café & Restaurant", meta: "on the road up to the temple", text: "Rooftop breakfast with the stupa in view, good momo; the local favourite for a first morning." },
          { name: "Swayambhu Coffee House", meta: "metres from the complex", text: "Cheap, cheerful and honest Nepali and Tibetan plates after the climb." },
          { name: "Cafe De Stupa and Lisa-T", meta: "on the hilltop", text: "Two tiny terrace cafés tucked behind the stupa for tea, laphing and the sunset." },
          { name: "BIA Café", meta: "Kimdol", text: "Books on every wall, a small garden and the quietest coffee in the neighbourhood." },
        ],
      },
      {
        title: "worth the ride",
        places: [
          { name: "Newa Lahana", meta: "Kirtipur, 20 min", text: "A community-run Newari kitchen and open museum: more than fifty dishes cooked by the women of the town, eaten on straw mats upstairs. Order mixed wo, choila, sukuti and yomari.", link: { label: "Nepali Times review", href: "https://nepalitimes.com/newa-lahana" } },
          { name: "Sasa: Twa", meta: "Kirtipur, 20 min", text: "A traditional Newar household turned restaurant. People cross the valley for its buff choila and khaja set; expect a wait." },
          { name: "Honacha", meta: "behind Krishna Mandir, Patan", text: "The oldest Newari eatery on Patan Durbar Square, a hundred years of choila, bara and chiura on low stools." },
          { name: "Boudha rooftops", meta: "Boudhanath, 30 min", text: "Thukpa, thenthuk, tingmo and butter tea above the stupa at dusk." },
        ],
      },
      {
        title: "learn to make it",
        places: [
          { name: "Momo cooking class", meta: "Thamel, 1 to 2 hours", text: "Nepal Cooking School and Kathmandu Cooking Academy both run short classes, some with a market walk first, from roughly USD 15 to 20 per person." },
        ],
      },
    ],
  },

  /** Festival calendar, 2026 dates from the Nepal public-holiday list. Lunar dates move every year. */
  calendar: {
    title: "the calendar.",
    intro: "Swayambhu is a living temple, and the hill fills on festival days. Dates follow the lunar calendar and shift every year; these are for 2026.",
    items: [
      { when: "Feb / Mar", name: "Losar", text: "Tibetan New Year. Monasteries on the hill hold masked dances and pujas; the fifteenth night ends with thousands of butter lamps." },
      { when: "Mid-April", name: "Nepali New Year and Bisket Jatra", text: "Bhaktapur drags its chariots and raises a 25 m pole; locals hike Champadevi and bathe at Balaju's 22 spouts." },
      { when: "1 May", name: "Buddha Jayanti", text: "The Buddha's birth, enlightenment and passing on the full moon of Baisakh. Swayambhunath is the heart of it: prayer flags, butter lamps, chanting and a procession around the hill from before dawn." },
      { when: "Aug / Sep", name: "Gunla", text: "The Newar Buddhist holy month. Every morning before sunrise, neighbourhood bands play devotional music up the steps to the stupa." },
      { when: "25 Sep", name: "Indra Jatra", text: "Eight days of masked dances, the raising of the lingo pole and the Kumari's chariot through Kathmandu Durbar Square." },
      { when: "19 to 23 Oct", name: "Dashain", text: "The biggest Hindu festival of the year. Kites, swings, family feasts and offerings at Shobha Bhagwati and the other Shakti temples. Many shops close." },
      { when: "9 to 12 Nov", name: "Tihar", text: "The festival of lights: oil lamps and marigold garlands on every house, dogs and cows honoured, sel roti frying everywhere." },
      { when: "Dec", name: "Yomari Punhi", text: "The full moon after the rice harvest, when Newar families steam yomari. Kirtipur's kitchens make them by the hundred." },
    ],
  },

  /** Practical notes. */
  tips: {
    title: "good to know.",
    items: [
      { name: "Getting around", text: "Pathao and inDrive (ride-hailing apps) work well in Kathmandu and need a local SIM to register; a car to Thamel or Patan is a few hundred rupees. We also arrange drivers for day trips." },
      { name: "Money and SIM", text: "Carry small notes of Nepali rupees for taxis, temples and tea. Ncell and Nepal Telecom counters at the airport arrivals hall sell tourist SIMs against your passport." },
      { name: "Entry fees", text: "Heritage sites charge foreign nationals separately from SAARC citizens, and prices rise every couple of years. Treat the figures on this page as a guide and check at the ticket counter." },
      { name: "Temple manners", text: "Walk clockwise around stupas and prayer wheels. Cover shoulders and knees, remove shoes where others do, and ask before photographing people or deities." },
      { name: "Monkeys and crows", text: "On the hill, keep snacks zipped away and hold on to glasses, phones and hats. Do not feed the monkeys." },
      { name: "Water and timing", text: "Drink bottled or filtered water; yours is free at Lagom. Start temple visits at dawn or late afternoon for light, air and fewer people." },
    ],
  },

  /** Sources the content above was checked against. */
  sources: {
    title: "sources",
    items: [
      { label: "UNESCO: Kathmandu Valley World Heritage Site", href: "https://whc.unesco.org/en/list/121/" },
      { label: "Wikipedia: Swayambhunath", href: "https://en.wikipedia.org/wiki/Swayambhunath" },
      { label: "The Longest Way Home: Swayambhunath guide", href: "https://www.thelongestwayhome.com/travel-guides/nepal/swayambhunath-monkey-temple.html" },
      { label: "In Your Pocket: the UNESCO sites of the Kathmandu Valley", href: "https://www.inyourpocket.com/nepal/kathmandu/articles/a-guide-to-the-unesco-world-heritage-sites-of-the" },
      { label: "Best Heritage Tour: monasteries around Swayambhunath", href: "https://www.bestheritagetour.com/blog/monasteries-around-swayambhunath" },
      { label: "Atlas Obscura: Amideva Buddha Park", href: "https://www.atlasobscura.com/places/amideva-buddha-park" },
      { label: "Natural History Museum of Nepal", href: "https://en.wikipedia.org/wiki/Natural_History_Museum_of_Nepal" },
      { label: "Nepal Traveller: Bijeshwori temple", href: "https://nepaltraveller.com/sidetrack/267" },
      { label: "Nepal Traveller: Jamacho hike", href: "https://www.nepaltraveller.com/sidetrack/jamacho-hiking-a-nature-escape-from-kathmandu" },
      { label: "Nepal Traveller: Chandragiri cable car guide", href: "https://nepaltraveller.com/sidetrack/3396" },
      { label: "Wikipedia: Kirtipur", href: "https://en.wikipedia.org/wiki/Kirtipur" },
      { label: "Nepali Times: Newa Lahana", href: "https://nepalitimes.com/newa-lahana" },
      { label: "Onlinekhabar: where to eat choila in Kathmandu", href: "https://english.onlinekhabar.com/best-places-eat-chhoila-in-kathmandu.html" },
      { label: "Lonely Planet: best day trips from Kathmandu", href: "https://www.lonelyplanet.com/articles/best-day-trips-from-kathmandu" },
      { label: "In Your Pocket: getting around Kathmandu", href: "https://www.inyourpocket.com/nepal/kathmandu/articles/getting-around-kathmandu/" },
      { label: "Tripadvisor: restaurants near Swayambhunath", href: "https://www.tripadvisor.com/RestaurantsNear-g293890-d2018892-Swaymbhunath-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Region.html" },
    ],
  },
};
