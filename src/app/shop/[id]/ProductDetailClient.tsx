"use client";

import { useState } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import CheckoutWhatsAppModal from "@/components/ui/CheckoutWhatsAppModal";
import {
  HiStar,
  HiShoppingBag,
  HiHeart,
  HiCheckBadge,
  HiTruck,
} from "react-icons/hi2";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, tagLabels } from "@/lib/utils";

interface ProductDetailClientProps {
  product: Product;
  categoryName: string;
}

export default function ProductDetailClient({
  product,
  categoryName,
}: ProductDetailClientProps) {
  const { addToCart, setIsOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);
  const [orderOpen, setOrderOpen] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsOpen(true);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
      <div className="relative aspect-square sm:aspect-[4/5] lg:aspect-square max-w-xl mx-auto lg:max-w-none w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-cream border border-pista/10">
        <AppImage
          src={product.image}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {product.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-lime text-foreground text-xs font-semibold rounded-full"
              >
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        )}

        {discount && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-pista text-off-white text-xs font-semibold rounded-full z-10">
            -{discount}% OFF
          </span>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center z-10">
            <span className="px-5 py-2.5 bg-off-white rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <Link
          href={`/shop?category=${product.category}`}
          className="text-sm font-medium text-pista-dark uppercase tracking-wider mb-2 hover:text-pista transition-colors w-fit"
        >
          {categoryName}
        </Link>

        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3">
          {product.name}
        </h1>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiStar
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-lime text-lime"
                    : "text-pista/30"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted">
            {product.rating} ({product.reviews.toLocaleString("en-IN")} reviews)
          </span>
        </div>

        <div className="flex flex-wrap items-baseline gap-3 mb-6">
          <span className="font-display text-3xl sm:text-4xl font-bold text-pista-dark">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <p className="text-muted leading-relaxed mb-6 sm:mb-8">
          {product.description}
        </p>

        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold mb-3">Available Shades</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-pista/20 ring-2 ring-transparent hover:ring-lime/50 transition-all"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {product.inStock ? (
              <>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 px-8 py-3.5 bg-lime text-foreground rounded-full text-sm sm:text-base font-semibold hover:bg-lime-dark transition-colors shadow-lg shadow-lime/20"
                >
                  <HiShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => setOrderOpen(true)}
                  className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white rounded-full text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  Order on WhatsApp
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 px-8 py-3.5 bg-pista/20 text-muted rounded-full text-sm sm:text-base font-semibold cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className={`inline-flex min-h-[48px] items-center justify-center gap-2 px-6 py-3.5 rounded-full border font-semibold transition-colors sm:px-8 ${
              saved
                ? "border-lime bg-lime text-foreground hover:bg-lime-dark"
                : "border-pista/25 text-foreground hover:bg-cream"
            }`}
            aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={saved}
          >
            <HiHeart className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
            <span>{saved ? "Saved" : "Wishlist"}</span>
          </button>
        </div>

        <CheckoutWhatsAppModal
          open={orderOpen}
          onClose={() => setOrderOpen(false)}
          items={[{ product, quantity: 1 }]}
          totalPrice={product.price}
          singleProduct={product}
        />

        <ul className="space-y-3 rounded-2xl bg-cream/60 border border-pista/10 p-4 sm:p-5">
          <li className="flex items-start gap-3 text-sm">
            <HiTruck className="w-5 h-5 text-pista-dark shrink-0 mt-0.5" />
            <span className="text-muted">
              Free delivery on orders above ₹999 — pan-India shipping
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm">
            <HiCheckBadge className="w-5 h-5 text-pista-dark shrink-0 mt-0.5" />
            <span className="text-muted">
              COD available · Easy returns within 7 days
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
