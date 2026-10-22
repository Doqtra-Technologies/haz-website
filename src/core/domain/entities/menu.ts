export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface MenuCategory {
  slug: string;
  label: string;
  intro: string;
  items: MenuItem[];
}
