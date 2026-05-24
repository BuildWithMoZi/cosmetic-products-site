"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { getNewProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function NewArrivals() {
  const products = getNewProducts();
  const ref = useGsapFadeIn(".new-item", { stagger: 0.08 });

  return (
    <section className="py-16 sm:py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-pista-dark uppercase tracking-wider mb-2">
              Just Landed
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              New Arrivals
            </h2>
            <p className="text-muted mt-2 max-w-md">
              Fresh picks and latest formulas added to our collection.
            </p>
          </div>
          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pista-dark hover:text-pista transition-colors shrink-0"
          >
            See All New
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {products.map((product, index) => (
            <div key={product.id} className="new-item">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
