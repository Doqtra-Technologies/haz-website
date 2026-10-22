# Haz website

Next.js (App Router) + TypeScript + Tailwind CSS, structured with clean architecture.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Architecture

Dependencies point inwards: `app/presentation → core ← infrastructure`.

```
src/
├─ core/                      # pure TypeScript, no framework imports
│  ├─ domain/
│  │  ├─ entities/            # Location, MenuCategory, EventItem, BlogPost, ...
│  │  └─ repositories.ts      # ports (interfaces) for data + outbound gateways
│  └─ application/use-cases/  # GetLocations, SubmitGroupEnquiry, ...
├─ infrastructure/            # implements the ports
│  ├─ data/                   # static content (locations, menus, events, blog)
│  ├─ repositories/           # in-memory repositories
│  ├─ gateways/               # enquiry + newsletter gateways (log only for now)
│  └─ container.ts            # composition root, the only place that wires things
├─ presentation/              # React components (UI only, no business logic)
│  ├─ components/{ui,layout,home,about,menu,locations,group-dining,whats-on,book,forms}
│  └─ utils/
├─ config/site.ts             # nav, socials, OpenTable URL
└─ app/                       # routes: pages call use cases via the container
```

To move content to a CMS or database, write a new class implementing the
interface in `core/domain/repositories.ts` and swap it in `container.ts`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, welcome, promo slider, restaurants |
| `/about` | Our Story: intro + "Our journey" carousel |
| `/menu` | Menus with restaurant selector and tabs |
| `/group-dining`, `/group-dining/[slug]` | Overview, venue page, enquiry form |
| `/whats-on`, `/whats-on/[slug]` | Events with filter, event detail |
| `/locations`, `/locations/[slug]` | Browse + search, location detail |
| `/blog`, `/blog/[slug]` | Blog list + posts |
| `/book` | Book Now CTA with OpenTable widget |

## Images and logo (placeholders)

Every photo is a labelled placeholder. To use a real image, put it in
`public/images/` and set `src` on the matching slot in `src/infrastructure/data/*.ts`
(e.g. `imageSlot("Premier Place: hero photo", "/images/premier-hero.jpg")`).
Home hero and a few page heroes are defined in their component files.

Logo: `src/presentation/components/layout/Logo.tsx` renders a "HAZ" text
wordmark. Replace it with `<Image src="/logo.svg" .../>`.

## Things to confirm before launch

- **OpenTable ids** in `src/config/site.ts` come from the design brief; confirm they are Haz's.
- **Sample content**: menu dishes/prices, blog posts, menu highlights, "Our journey" years (`20XX`), Plantation Place and Bishopsgate descriptions.
- **Premier Place** card and detail page show different addresses/hours in the design; the detail-page address is used and both hour sets are kept (`hours` vs `openingTimes`).
- Social links (TikTok, Facebook) and brochure PDFs are `#` placeholders.
- Event dates on the Live Music page are the August dates from the design (now past).
- Enquiry and newsletter forms currently only log to the server console; plug in an email/CRM provider via the gateways.

## Importing the real assets

`npm run import-assets -- "/path/to/HAZ"` copies the logo and photos from the Drive folder into `public/`.
Photo-to-slot assignments (hero, menu, what's on, blog use `photo-19/28/29/46`) were made without viewing the
images, so check them and re-point `src` values as needed. Unassigned slots show labelled placeholders;
missing files fall back to the placeholder automatically.
Content now real: A La Carte menu (prices paired in order from a scrambled PDF; verify), Christmas blog post, brand colours (ember `#C74A31`, cream `#F6EAE2`).
Still to wire: F37 Caslon / AHAMONO fonts (self-host via @font-face), other menu PDFs, other blog posts.

Menus: A La Carte, Set Lunch, Pre-Theatre and Christmas now come from the Drive PDFs. Fonts: `import-assets` also copies F37 Caslon (if the .otf files are in the folder) to `public/fonts`; otherwise Cormorant Garamond is used.
