import { imageSlot } from "@/core/domain/entities/image";
import type { BlogPost } from "@/core/domain/entities/blog";

/** Real post from "Haz Blog.docx"; further posts to be added. */
export const blogPosts: BlogPost[] = [
  {
    slug: "celebrate-christmas-in-the-city-of-london-at-haz",
    title: "Celebrate Christmas in the City of London at HAZ",
    excerpt: "Christmas lunches and festive dinners with Mediterranean flavours and warm hospitality.",
    date: "2026-10-01",
    category: "Christmas",
    image: imageSlot("Blog: Christmas celebration at Haz", "/images/photo-29.jpg"),
    body: [
      "The best Christmas celebrations give everyone a chance to slow down, share good food and enjoy each other's company. Whether you're organising a Christmas lunch with colleagues or a festive dinner with friends, HAZ brings Mediterranean flavours and warm hospitality to the occasion.",
      "With restaurants at St Paul's, Bishopsgate, Finsbury Square, Premier Place and Plantation Place, HAZ offers a choice of City of London locations for your festive gathering.",
      "A Christmas lunch worth gathering for. The end of the year is a chance to bring the team together away from the office. A relaxed Christmas lunch gives colleagues time to catch up, celebrate what they've achieved and enjoy a meal around the same table. At HAZ, the Mediterranean approach to dining makes sharing part of the experience.",
      "Make an evening of your Christmas dinner. Gather friends or colleagues for an evening of food, drinks and conversation in the heart of the City. From a smaller catch-up to a larger Christmas party, choose the HAZ location that works best for your guests.",
      "Plan your festive gathering at HAZ. Tell the HAZ team which location you have in mind, your preferred date and your group size to start planning your celebration.",
    ],
  },
];
