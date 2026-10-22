import { imageSlot } from "@/core/domain/entities/image";
import type { SiteContent } from "@/core/domain/entities/site-content";

export const siteContent: SiteContent = {
  welcome: {
    lead: [
      { text: "Welcome to HAZ." },
      { text: " Where the spirit of the Mediterranean brings people together over great food and drinks. Where warm hospitality and a vibrant atmosphere make every visit one to remember." },
    ],
    body: "It’s time to taste the Mediterranean. Discover beautifully curated dishes where fresh, seasonal ingredients meet ancient cooking techniques with a modern touch. From the kitchen to the bar, every detail comes together to create the distinctive HAZ experience – across the heart of London.",
  },
  promos: [
    {
      eyebrow: "Celebrate Together This Festive Season",
      title: "Christmas at HAZ",
      body: "Gather around the table and celebrate Christmas the HAZ way. Choose from two festive menus, featuring 5 or 8 starters selected by our Chef to share, followed by your choice of main course and dessert. Festive menus from £54 per person. Book your Christmas celebration at HAZ.",
      ctaLabel: "Book your Christmas celebration",
      href: "/book",
      image: imageSlot("HAZ festive celebration", "/images/haz-home-christmas.webp"),
    },
    {
      eyebrow: "Our Must-Try Set Lunch Menu",
      title: "Set Lunch Menu",
      body: "Mediterranean flavours, made for lunchtime. Start with a choice of favourites including Tabbouleh, Babaganoush or Hummus, followed by a main such as Flatbread with minced beef and vegetables, Chicken Tagine or Vegetable Moussaka. Perfect for a quick business lunch, a relaxed afternoon or simply a midweek treat in the heart of London. 2 courses for £19.50 per person.",
      ctaLabel: "Discover the lunch menu",
      href: "/menu",
      image: imageSlot("HAZ set lunch menu", "/images/haz-home-lunch.webp"),
    },
  ],
  story: {
    heading: "Our story",
    paragraphs: [
      "HAZ is where the wider HazOleaFable story began. More than two decades ago, founders Haci, Ahmed and Zafer opened their first restaurant in Cutler Street in the City of London.",
      "Their idea was rooted in something simple and personal – sharing the authentic Turkish food and hospitality they knew and loved with London.",
      "From that first restaurant, HAZ grew across the City, building a loyal following among generations of Londoners, City workers and visitors.",
      "The restaurants evolved. London evolved. The way London consumes food evolved. But the foundations have remained remarkably consistent:",
      "Today HAZ has the opportunity to tell that story with renewed confidence.",
      "Rather than translating its Turkish identity for Londoners, HAZ can increasingly invite London into it – celebrating the dishes, names, traditions, flavours and culture that have always been at the heart of the restaurants.",
      "HAZ has been part of London's restaurant landscape for more than 20 years. Its next chapter can be its most confidently Turkish yet.",
    ],
    principles: ["generous food", "warm hospitality", "good ingredients", "the pleasure of eating together"],
    image: imageSlot("HAZ restaurant story", "/images/haz-story-intro.webp"),
  },
  journey: [
    {
      year: "2001",
      title: "Haz Premier Place, London",
      text: "The first HAZ Premier Place restaurant opens on Cutler Street in the City of London, created by founders Haci, Zafer, and Ahmed to bring authentic Turkish and Mediterranean flavors to the capital.",
      image: imageSlot("HAZ Premier Place, 2001", "/images/haz-journey-2001.webp"),
    },
    {
      year: "2007",
      title: "Haz Plantation Place, London",
      text: "2007 — HAZ Plantation Place (Mincing Lane): The group expands to its second location, establishing a major footprint near Fenchurch Street.",
      image: imageSlot("HAZ Plantation Place, 2007", "/images/haz-journey-2007.webp"),
    },
    {
      year: "2009",
      title: "Haz St Paul's, London",
      text: "2009 — HAZ St Paul's (Foster Lane): HAZ expands further into the heart of the City center, opening its third spot steps away from St Paul's Cathedral.",
      image: imageSlot("HAZ St Paul's, 2009", "/images/haz-journey-2009.webp"),
    },
    {
      year: "2014",
      title: "Haz Bishopsgate, London",
      text: "2014 — HAZ Bishopsgate (Bishopsgate): The fourth location is launched, offering a dual-level experience with a bar lounge below and a dedicated dining space above.",
      image: imageSlot("HAZ Bishopsgate, 2014", "/images/haz-journey-2014.webp"),
    },
    {
      year: "2019",
      title: "Haz Finsbury Square, London",
      text: "2019 — HAZ Finsbury Square (Finsbury Square): The fifth HAZ location opens, introducing a modernized aesthetic later applied to updates across the brand.",
      image: imageSlot("HAZ Finsbury Square, 2019", "/images/haz-journey-2019.webp"),
    },
  ],
  spotlight: {
    title: "HAZ Finsbury Square",
    paragraphs: [
      "Our most recent HAZ is located on the stunning Finsbury Square, just a short walk from the tube station. A vibrant atmosphere welcomes you in with a standout bar design at the entrance.",
      "As you move through the space an elegant dining space is revealed, where you can sample the delicious taste of the Med.",
    ],
    ctaLabel: "More info",
    href: "/locations",
    image: imageSlot("HAZ Finsbury Square dining room", "/images/haz-location-finsbury-1.webp"),
  },
};
