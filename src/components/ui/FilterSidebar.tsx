"use client";

import { Category, ProductTag, FilterState } from "@/types/product";
import { getCategories } from "@/data/products";
import { tagLabels, formatPrice, MAX_PRODUCT_PRICE } from "@/lib/utils";
import { HiXMark } from "react-icons/hi2";
import { CategoryIcon } from "@/lib/categoryIcons";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function FilterSidebar({
  filters,
  onChange,
  onClose,
  isMobile,
}: FilterSidebarProps) {
  const categories = getCategories();

  const toggleCategory = (cat: Category) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: updated });
  };

  const toggleTag = (tag: ProductTag) => {
    const updated = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onChange({ ...filters, tags: updated });
  };

  const clearAll = () => {
    onChange({
      ...filters,
      categories: [],
      tags: [],
      priceRange: [0, MAX_PRODUCT_PRICE],
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < MAX_PRODUCT_PRICE;

  return (
    <aside className={`${isMobile ? "p-5" : "sticky top-28"}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold">Filters</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-pista-dark hover:text-pista font-medium"
            >
              Clear all
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-pista/10">
              <HiXMark className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="text-sm font-semibold mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat.slug}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.slug)}
                  onChange={() => toggleCategory(cat.slug)}
                  className="w-4 h-4 rounded border-pista/30 accent-pista focus:ring-pista/40"
                />
                <span className="text-sm group-hover:text-pista-dark transition-colors flex items-center gap-2">
                  <CategoryIcon category={cat.slug} className="w-4 h-4 text-pista-dark shrink-0" />
                  {cat.name}
                </span>
                <span className="text-xs text-muted ml-auto">
                  {cat.productCount}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-sm font-semibold mb-3">Price Range</h4>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={MAX_PRODUCT_PRICE}
              value={filters.priceRange[1]}
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceRange: [filters.priceRange[0], Number(e.target.value)],
                })
              }
              className="w-full accent-pista"
            />
          </div>
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-semibold mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(tagLabels) as ProductTag[]).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filters.tags.includes(tag)
                    ? "bg-lime text-foreground"
                    : "bg-cream text-muted hover:bg-pista/10"
                }`}
              >
                {tagLabels[tag]}
              </button>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
