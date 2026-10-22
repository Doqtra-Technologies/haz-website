import { container } from "@/infrastructure/container";
import { HomeHero } from "@/presentation/components/home/HomeHero";
import { PromoSlider } from "@/presentation/components/home/PromoSlider";
import { RestaurantsGrid } from "@/presentation/components/home/RestaurantsGrid";
import { Welcome } from "@/presentation/components/home/Welcome";

export default async function HomePage() {
  const [content, locations] = await Promise.all([
    container.getSiteContent.execute(),
    container.getLocations.execute(),
  ]);
  const homeLocationOrder = [
    "st-pauls",
    "plantation-place",
    "premier-place",
    "finsbury-square",
    "bishopsgate",
  ];
  const homeLocations = [...locations].sort(
    (a, b) => homeLocationOrder.indexOf(a.slug) - homeLocationOrder.indexOf(b.slug),
  );

  return (
    <>
      <HomeHero />
      <Welcome content={content.welcome} />
      <PromoSlider promos={content.promos} />
      <RestaurantsGrid locations={homeLocations} />
    </>
  );
}
