import type { Metadata } from "next";
import { container } from "@/infrastructure/container";
import { FloatingReserve } from "@/presentation/components/layout/FloatingReserve";
import { MenuExplorer } from "@/presentation/components/menu/MenuExplorer";

export const metadata: Metadata = { title: "Menu" };

export default async function MenuPage() {
  const [menus, locations] = await Promise.all([
    container.getMenus.execute(),
    container.getLocations.execute(),
  ]);

  return (
    <>
      <MenuExplorer
        menus={menus}
        restaurants={locations.map((l) => ({ slug: l.slug, name: l.name }))}
      />
      <FloatingReserve />
    </>
  );
}
