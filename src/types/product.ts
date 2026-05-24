export type Category =
  | "skincare"
  | "serums"
  | "moisturizers"
  | "sun-protection"
  | "lips"
  | "complexion"
  | "eyes"
  | "haircare"
  | "body-care"
  | "fragrance"
  | "tools"
  | "masks-treatments";

export type ProductTag = "bestseller" | "new" | "sale" | "organic" | "vegan";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  tags: ProductTag[];
  rating: number;
  reviews: number;
  image: string;
  colors?: string[];
  inStock: boolean;
}

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  productCount: number;
  coverImage?: string;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export interface FilterState {
  categories: Category[];
  tags: ProductTag[];
  priceRange: [number, number];
  search: string;
  sort: SortOption;
}
