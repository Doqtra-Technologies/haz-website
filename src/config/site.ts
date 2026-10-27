export const siteConfig = {
  name: "HAZ",
  tagline: "Mediterranean dining in the heart of London",
  description:
    "Haz is a Mediterranean restaurant group in London. Shared plates, vibrant cocktails and a grill that is always on.",
  email: "info@hazrestaurant.co.uk",
  instagramHandle: "@hazrestaurantofficial",
  instagramUrl: "https://www.instagram.com/hazrestaurantofficial/",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/hazrestaurantofficial/" },
    { label: "Facebook", href: "https://www.facebook.com/HazLondon/?checkpoint_src=1501092823525282" },
  ],
} as const;

export const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Group Dining", href: "/group-dining" },
  { label: "What's On", href: "/whats-on" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
] as const;

/** OpenTable reservation widget supplied by the client. */
export const OPENTABLE_LOADER_URL =
  "//www.opentable.co.uk/widget/reservation/loader?rid=355443&rid=83689&rid=289461&rid=83686&rid=83707&type=multi&theme=standard&color=2&dark=false&iframe=true&domain=couk&lang=en-GB&newtab=false&ot_source=Restaurant%20website&cfe=true";

export const OPENTABLE_BOOKING_URL =
  "https://www.opentable.co.uk/booking/restref/availability?lang=en-GB&correlationId=cb23b425-3861-4c8d-998e-2ef41d1075c5&restRef=334638&otSource=Restaurant%20website";

export const SEVENROOMS_BOOKING_URL =
  "https://www.sevenrooms.com/reservations/hazpremierplace?venues=hazpremierplace,hazbishopsgate,hazstpauls,hazplantationplace,hazpremierplace,hazfinsburysquare";
