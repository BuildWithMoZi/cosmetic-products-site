import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductById,
  getProductsByCategory,
  getCategories,
  products,
} from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/ui/ProductCard";
import { HiChevronRight } from "react-icons/hi2";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found | GlowVerse" };

  return {
    title: `${product.name} | GlowVerse`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const categoryInfo = getCategories().find((c) => c.slug === product.category);
  const categoryName =
    categoryInfo?.name ??
    product.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-[5.5rem] sm:pt-28 lg:pt-32 pb-16 min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap items-center gap-1.5 text-sm text-muted mb-6 sm:mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/shop" className="hover:text-pista-dark transition-colors">
            Shop
          </Link>
          <HiChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-pista-dark transition-colors capitalize"
          >
            {categoryName}
          </Link>
          <HiChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <span className="text-foreground font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        <ProductDetailClient
          product={product}
          categoryName={categoryName}
        />

        {related.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-12 border-t border-pista/15">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-medium text-pista-dark uppercase tracking-wider mb-2">
                  You May Also Like
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold">
                  Related Products
                </h2>
              </div>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-sm font-semibold text-pista-dark hover:text-pista transition-colors shrink-0"
              >
                View all in {categoryName}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((item, index) => (
                <ProductCard key={item.id} product={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
