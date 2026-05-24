"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { getAllProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function AllProductsShowcase() {
  const products = getAllProducts();
  const ref = useGsapFadeIn(".catalog-item", { stagger: 0.05 });

  return (
    <section className="py-16 sm:py-24 bg-cream/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-pista-dark uppercase tracking-wider mb-2">
              Full Catalog
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              All Products
            </h2>
            <p className="text-muted mt-2 max-w-md">
              Browse our complete collection of {products.length} premium beauty products.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-foreground rounded-full text-sm font-semibold hover:bg-lime-dark transition-colors shrink-0"
          >
            Shop All
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5"
        >
          {products.map((product, index) => (
            <div key={product.id} className="catalog-item">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
