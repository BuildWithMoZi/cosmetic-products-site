"use client";

import { useRef } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { HiStar, HiShoppingBag, HiHeart } from "react-icons/hi2";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, tagLabels } from "@/lib/utils";
import gsap from "gsap";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const productHref = `/shop/${product.id}`;

  return (
    <article
      ref={cardRef}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-pista/10 bg-off-white transition-shadow duration-300 hover:border-pista/30 hover:shadow-lg hover:shadow-pista/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative aspect-square shrink-0 overflow-hidden bg-cream">
        <Link
          href={productHref}
          className="absolute inset-0 z-0 block"
          aria-label={`View ${product.name}`}
        >
          <AppImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {product.tags.length > 0 && (
          <span className="pointer-events-none absolute left-3 top-3 z-[1] rounded-full bg-lime px-2.5 py-1 text-xs font-semibold text-foreground">
            {tagLabels[product.tags[0]]}
          </span>
        )}

        {discount && (
          <span
            className={`pointer-events-none absolute z-[1] rounded-full bg-pista px-2.5 py-1 text-xs font-semibold text-off-white ${
              product.tags.length > 0 ? "left-3 top-11" : "left-3 top-3"
            }`}
          >
            -{discount}%
          </span>
        )}

        {!product.inStock && (
          <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center bg-foreground/40">
            <span className="rounded-full bg-off-white px-4 py-2 text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute right-3 top-3 z-10 p-1 text-foreground/75 transition-colors hover:text-pista-dark"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
        >
          <HiHeart
            className={`h-5 w-5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] ${
              saved ? "fill-pista-dark text-pista-dark" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link href={productHref} className="flex flex-1 flex-col">
          <p className="mb-1 text-xs uppercase tracking-wider text-muted">
            {product.category.replace("-", " ")}
          </p>

          <h3 className="mb-2 min-h-[2.5rem] text-sm font-medium leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-pista-dark">
            {product.name}
          </h3>

          <div className="mb-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiStar
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-lime text-lime"
                    : "text-pista/30"
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-muted">({product.reviews})</span>
          </div>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-1.5 sm:gap-2">
          <Link
            href={productHref}
            className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-2"
          >
            {product.originalPrice && (
              <span className="order-1 text-[10px] leading-tight text-muted line-through sm:order-2 sm:text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="order-2 font-semibold text-pista-dark sm:order-1">
              {formatPrice(product.price)}
            </span>
          </Link>

          {product.inStock && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="shrink-0 p-1 text-foreground/75 transition-colors hover:text-pista-dark"
              aria-label="Add to cart"
            >
              <HiShoppingBag className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="mt-3 flex min-h-4 gap-1.5">
          {product.colors?.map((color) => (
            <span
              key={color}
              className="h-4 w-4 rounded-full border border-pista/20"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
