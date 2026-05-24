"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiAdjustmentsHorizontal, HiXMark } from "react-icons/hi2";
import { products } from "@/data/products";
import { Category, SortOption, FilterState } from "@/types/product";
import { filterProducts, sortOptions, defaultFilters } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import FilterSidebar from "@/components/ui/FilterSidebar";
import SearchBar from "@/components/ui/SearchBar";

interface ShopClientProps {
  initialSearch: string;
  initialCategory: string;
  initialSort: string;
}

const validCategories: Category[] = [
  "skincare",
  "serums",
  "moisturizers",
  "sun-protection",
  "lips",
  "complexion",
  "eyes",
  "haircare",
  "body-care",
  "fragrance",
  "tools",
  "masks-treatments",
];

const validSorts: SortOption[] = [
  "featured",
  "price-asc",
  "price-desc",
  "rating",
  "newest",
];

function parseCategory(value: string): Category[] {
  if (value && validCategories.includes(value as Category)) {
    return [value as Category];
  }
  return [];
}

function parseSort(value: string): SortOption {
  if (validSorts.includes(value as SortOption)) {
    return value as SortOption;
  }
  return "featured";
}

export default function ShopClient({
  initialSearch,
  initialCategory,
  initialSort,
}: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    search: initialSearch,
    categories: parseCategory(initialCategory),
    sort: parseSort(initialSort),
  }));

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "";
    const sort = searchParams.get("sort") ?? "featured";

    setFilters((prev) => ({
      ...prev,
      search,
      categories: parseCategory(category),
      sort: parseSort(sort),
    }));
  }, [searchParams]);

  const updateUrl = useCallback(
    (next: FilterState) => {
      const params = new URLSearchParams();
      if (next.search) params.set("search", next.search);
      if (next.categories.length === 1) params.set("category", next.categories[0]);
      if (next.sort !== "featured") params.set("sort", next.sort);

      const query = params.toString();
      router.push(query ? `/shop?${query}` : "/shop", { scroll: false });
    },
    [router]
  );

  const handleFiltersChange = (next: FilterState) => {
    setFilters(next);
    updateUrl(next);
  };

  const handleSortChange = (sort: SortOption) => {
    const next = { ...filters, sort };
    setFilters(next);
    updateUrl(next);
  };

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters]
  );

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Shop All Products
          </h1>
          <p className="text-muted">
            Browse our complete collection of premium cosmetics
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar className="max-w-xl" />
          <div className="flex items-center gap-3 sm:ml-auto">
            <select
              value={filters.sort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="px-4 py-3 rounded-full bg-cream border border-pista/20 text-sm focus:outline-none focus:ring-2 focus:ring-pista/40"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-full bg-cream border border-pista/20 text-sm font-medium"
            >
              <HiAdjustmentsHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="w-[240px] hidden lg:block shrink-0">
            <FilterSidebar filters={filters} onChange={handleFiltersChange} />
          </aside>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted mb-6">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-muted text-sm mb-6">
                  Try adjusting your filters or browse all products.
                </p>
                <button
                  onClick={() =>
                    handleFiltersChange({ ...defaultFilters, sort: filters.sort })
                  }
                  className="px-6 py-3 bg-lime text-foreground rounded-full font-semibold hover:bg-lime-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <aside className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-off-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-pista/10">
              <h3 className="font-display text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-pista/10"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={handleFiltersChange}
              onClose={() => setMobileFiltersOpen(false)}
              isMobile
            />
          </aside>
        </div>
      )}
    </div>
  );
}
