import type { MenuCategory } from "@/core/domain/entities/menu";
import type { MenuRepository } from "@/core/domain/repositories";

export class GetMenus {
  constructor(private readonly menus: MenuRepository) {}
  execute(): Promise<MenuCategory[]> {
    return this.menus.findAll();
  }
}
