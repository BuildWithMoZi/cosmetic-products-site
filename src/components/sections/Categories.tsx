"use client";

import { getCategories } from "@/data/products";
import CategoryCard from "@/components/ui/CategoryCard";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

export default function Categories() {
  const categories = getCategories();
  const ref = useGsapFadeIn(".category-card", { stagger: 0.1 });

  return (
    <section className="py-16 sm:py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-pista-dark uppercase tracking-wider mb-2">
              Categories
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pista-dark hover:text-pista transition-colors"
          >
            View All Products
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5"
        >
          {categories.map((category) => (
            <div key={category.slug} className="category-card">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
