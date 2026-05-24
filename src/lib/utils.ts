import { Product, FilterState, SortOption } from "@/types/product";

export function filterProducts(
  products: Product[],
  filters: FilterState
): Product[] {
  let result = [...products];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.tags.length > 0) {
    result = result.filter((p) =>
      filters.tags.some((tag) => p.tags.includes(tag))
    );
  }

  result = result.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => {
        const aNew = a.tags.includes("new") ? 1 : 0;
        const bNew = b.tags.includes("new") ? 1 : 0;
        return bNew - aNew;
      });
      break;
    default:
      result.sort((a, b) => {
        const aBest = a.tags.includes("bestseller") ? 1 : 0;
        const bBest = b.tags.includes("bestseller") ? 1 : 0;
        return bBest - aBest;
      });
  }

  return result;
}

export const MAX_PRODUCT_PRICE = 9999;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export const tagLabels: Record<string, string> = {
  bestseller: "Bestseller",
  new: "New",
  sale: "Sale",
  organic: "Organic",
  vegan: "Vegan",
};

export const defaultFilters: FilterState = {
  categories: [],
  tags: [],
  priceRange: [0, MAX_PRODUCT_PRICE],
  search: "",
  sort: "featured",
};
