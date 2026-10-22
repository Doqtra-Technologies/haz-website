import { imageSlot } from "@/core/domain/entities/image";
import type { Location, MenuHighlight } from "@/core/domain/entities/location";

const highlights = (slug: string): MenuHighlight[] => [
  {
    name: "Begendi Kebab",
    description: "Grilled lamb loin with fire roasted aubergine sauce",
    image: imageSlot(`${slug} highlight: Begendi Kebab`, "/images/begendi-kebab.jpg"),
  },
  {
    name: "Burrata",
    description: "Heritage tomatoes, basil leaves and olive oil",
    image: imageSlot(`${slug} highlight: Burrata`, "/images/burrata.jpg"),
  },
  {
    name: "Smoked Salmon",
    description: "Cucumber, tartar sauce, dill and salmon roe",
    image: imageSlot(`${slug} highlight: Smoked Salmon`, "/images/smoked-salmon.jpg"),
  },
  {
    name: "Black Angus Sirloin",
    description: "Australian Black Angus, peppercorn sauce, sautéed spiced potatoes",
    image: imageSlot(`${slug} highlight: Black Angus Sirloin`, "/images/black-angus-sirloin.jpg"),
  },
];

const GALLERY = ["photo-14", "photo-19", "photo-20", "photo-28", "photo-29", "photo-46"];
const GROUP_DINING_IMAGES: Record<string, string[]> = {
  "premier-place": ["/images/haz-group-premier-1.webp", "/images/haz-group-premier-2.webp"],
  "plantation-place": ["/images/haz-group-plantation-1.webp", "/images/haz-group-plantation-2.webp"],
  bishopsgate: [
    "/images/haz-group-bishopsgate-1.webp",
    "/images/haz-group-bishopsgate-2.webp",
    "/images/haz-group-bishopsgate-3.webp",
  ],
  "st-pauls": [
    "/images/haz-group-st-pauls-1.webp",
    "/images/haz-group-st-pauls-2.webp",
    "/images/haz-group-st-pauls-3.webp",
    "/images/haz-group-st-pauls-4.webp",
  ],
  "finsbury-square": ["/images/haz-group-finsbury-1.webp", "/images/haz-group-finsbury-2.webp"],
};

const gallery = (slug: string) =>
  [
    "grilled dish",
    "bartender at work",
    "mezze spread",
    "salad & mains",
    "table setting",
  ].map((l, i) => imageSlot(`${slug} gallery: ${l}`, `/images/${GALLERY[i % GALLERY.length]}.jpg`));

const groupGallery = (slug: string) =>
  GROUP_DINING_IMAGES[slug].map((src, index) =>
    imageSlot(`${slug} group dining photo ${index + 1}`, src),
  );

const weekHours = [
  { days: "Sun – Thu", time: "11:30 – 23:00" },
  { days: "Fri – Sat", time: "11:30 – 00:00" },
];

export const locations: Location[] = [
  {
    slug: "premier-place",
    name: "Haz Premier Place",
    shortName: "Premier Place",
    region: "London",
    phone: "020 7929 7923",
    address: "9 Cutler St, London, E1 7DJ",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Haz+Premier+Place+9+Cutler+St+London+E1+7DJ",
    cardImage: imageSlot("Premier Place restaurant", "/images/haz-location-premier-1.webp"),
    heroImage: imageSlot("Premier Place restaurant", "/images/haz-location-premier-1.webp"),
    interiorImage: imageSlot("Premier Place restaurant interior", "/images/haz-location-premier-2.webp"),
    headline: "HAZ Premier Place",
    description: [
      "Where the HAZ story began. Premier Place has been welcoming guests since 2001, bringing the flavours and spirit of the Mediterranean to the heart of the City.",
      "With a relaxed yet vibrant atmosphere, it’s a favourite for everything from business lunches and casual catch-ups to cocktails and dinner after work.",
    ],
    hours: weekHours,
    openingTimes: [
      { days: "Monday – Saturday", time: "11.30am to 11.30pm" },
      { days: "Sunday", time: "11.30am to 10.30pm" },
    ],
    highlights: highlights("Premier Place"),
    gallery: gallery("Premier Place"),
    groupDining: {
      description:
        "Premier place was the first Haz restaurant we opened, back in 2001. Our little corner of the Mediterranean in the heart of London, where our cocktail maker is ready and the grill is always on. Be prepared to leave with a full belly! We can’t wait to see you.",
      gallery: groupGallery("premier-place"),
    },
  },
  {
    slug: "plantation-place",
    name: "Haz Plantation Place",
    shortName: "Plantation Place",
    region: "London",
    phone: "020 7929 3173",
    address: "6 Mincing Lane, London, EC3M 3BD",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Haz+Plantation+Place+6+Mincing+Lane+London+EC3M+3BD",
    cardImage: imageSlot("Plantation Place restaurant", "/images/haz-location-plantation-1.webp"),
    heroImage: imageSlot("Plantation Place restaurant", "/images/haz-location-plantation-1.webp"),
    interiorImage: imageSlot("Plantation Place restaurant interior", "/images/haz-location-plantation-2.webp"),
    headline: "HAZ Plantation Place",
    description: [
      "Set in the heart of London’s financial district, HAZ Plantation Place offers a vibrant escape from the bustle of the City.",
      "With its impressive dining space and distinctive bar, it’s the perfect setting for business lunches, after-work drinks and relaxed dinners, all served with the Mediterranean flavours and warm hospitality HAZ is known for.",
    ],
    hours: weekHours,
    openingTimes: weekHours,
    highlights: highlights("Plantation Place"),
    gallery: gallery("Plantation Place"),
    groupDining: {
      description:
        "In the heart of London’s financial district, Haz Plantation Place has been welcoming guests since 2001. With its striking dining space, vibrant atmosphere and unique bar, it’s made for everything from business lunches to after-work drinks and relaxed dinners. Whatever the occasion, there’s always a reason to stay a little longer.",
      gallery: groupGallery("plantation-place"),
    },
  },
  {
    slug: "bishopsgate",
    name: "Haz Bishopsgate",
    shortName: "Bishopsgate",
    region: "London",
    phone: "020 3343 9717",
    address: "64 Bishopsgate, London, EC2N 4AW",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Haz+Bishopsgate+64+Bishopsgate+London+EC2N+4AW",
    cardImage: imageSlot("Bishopsgate restaurant", "/images/haz-location-bishopsgate-1.webp"),
    heroImage: imageSlot("Bishopsgate restaurant", "/images/haz-location-bishopsgate-1.webp"),
    interiorImage: imageSlot("Bishopsgate restaurant interior", "/images/haz-location-bishopsgate-2.webp"),
    headline: "HAZ Bishopsgate",
    description: [
      "Located in the heart of the City, HAZ Bishopsgate offers a vibrant setting for Mediterranean dining.",
      "A stylish bar creates a lively atmosphere downstairs, while the first-floor dining space offers a more intimate setting. Perfect for everything from business lunches and after-work drinks to relaxed dinners and group gatherings.",
    ],
    hours: weekHours,
    openingTimes: [
      { days: "Monday – Friday", time: "11.00am to 11.00pm" },
      { days: "Saturday", time: "11.30am to 11.30pm" },
      { days: "Sunday", time: "11.30am to 10.00pm" },
    ],
    highlights: highlights("Bishopsgate"),
    gallery: gallery("Bishopsgate"),
    groupDining: {
      description:
        "HAZ Bishopsgate is made for bringing people together. With a beautifully designed bar and a more private dining space upstairs, it’s the perfect setting for group dinners, corporate gatherings and special celebrations. Whatever the occasion, enjoy great food and warm Mediterranean hospitality in the heart of the City.",
      gallery: groupGallery("bishopsgate"),
    },
  },
  {
    slug: "st-pauls",
    name: "Haz St Paul’s",
    shortName: "St Paul’s",
    region: "London",
    phone: "020 7600 4172",
    address: "34 Foster Ln, London, EC2V 6HD",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Haz+St+Pauls+34+Foster+Ln+London+EC2V+6HD",
    cardImage: imageSlot("St Paul's restaurant", "/images/haz-location-st-pauls-1.webp"),
    heroImage: imageSlot("St Paul's restaurant", "/images/haz-location-st-pauls-1.webp"),
    interiorImage: imageSlot("St Paul's restaurant interior", "/images/haz-location-st-pauls-2.webp"),
    headline: "HAZ St Paul’s",
    description: [
      "Located in the heart of the City, HAZ St Paul’s has been welcoming guests since 2009.",
      "With its warm and inviting atmosphere, it’s the perfect spot for everything from business lunches and casual catch-ups to after-work drinks and relaxed dinners, all accompanied by the Mediterranean flavours HAZ is known for.",
    ],
    hours: weekHours,
    openingTimes: weekHours,
    highlights: highlights("St Paul’s"),
    gallery: gallery("St Paul’s"),
    groupDining: {
      description:
        "HAZ St Paul’s has been part of the City since 2009, welcoming guests from morning through to evening. Just moments from St Paul’s, it’s a lively spot for everything from relaxed lunches to after-work dinners and drinks. Whatever brings you in, good food and warm Mediterranean hospitality are always waiting.",
      gallery: groupGallery("st-pauls"),
    },
  },
  {
    slug: "finsbury-square",
    name: "Haz Finsbury Square",
    shortName: "Finsbury Square",
    region: "London",
    phone: "020 7920 9944",
    address: "The Alphabeta Building, 14 Finsbury Square, London, EC2A 1AH",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Haz+Finsbury+Square+The+Alphabeta+Building+14+Finsbury+Square+London+EC2A+1AH",
    cardImage: imageSlot("Finsbury Square restaurant", "/images/haz-location-finsbury-1.webp"),
    heroImage: imageSlot("Finsbury Square restaurant", "/images/haz-location-finsbury-1.webp"),
    interiorImage: imageSlot("Finsbury Square restaurant interior", "/images/haz-location-finsbury-2.webp"),
    headline: "HAZ Finsbury Square",
    description: [
      "Our most recent HAZ is located on the stunning Finsbury Square, just a short walk from the tube station.",
      "A vibrant atmosphere welcomes you in with a standout bar design at the entrance. As you move through the space an elegant dining space is revealed, where you can sample the delicious taste of the Med.",
    ],
    hours: weekHours,
    openingTimes: [{ days: "Monday – Sunday", time: "11.00am to 11.30pm" }],
    highlights: highlights("Finsbury Square"),
    gallery: gallery("Finsbury Square"),
    groupDining: {
      description:
        "HAZ Finsbury Square offers a vibrant setting for bringing people together. From its standout bar to the elegant dining space beyond, it’s ideal for group dinners, corporate gatherings and special celebrations. Gather around the table and enjoy Mediterranean flavours in the heart of Finsbury Square.",
      gallery: groupGallery("finsbury-square"),
    },
  },
];
