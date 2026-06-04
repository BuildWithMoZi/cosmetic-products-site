"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import {
  HiXMark,
  HiHeart,
  HiTrash,
  HiShoppingBag,
} from "react-icons/hi2";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import gsap from "gsap";

export default function WishlistDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();
  const { addToCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" },
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(drawerRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => setIsOpen(false),
    });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
  };

  const handleAddToCart = (product: (typeof items)[0]) => {
    addToCart(product);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-foreground/40 z-[60]"
        onClick={handleClose}
      />
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-off-white z-[60] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-pista/20">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <HiHeart className="w-5 h-5 text-lime-600" />
            Wishlist ({items.length})
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-pista/10 transition-colors"
            aria-label="Close wishlist">
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <HiHeart className="w-16 h-16 text-pista/30 mb-4" />
            <p className="text-muted font-medium">Your wishlist is empty</p>
            <p className="text-sm text-muted/70 mt-1">
              Save products you love by tapping the heart icon.
            </p>
            <Link
              href="/shop"
              onClick={handleClose}
              className="mt-6 px-6 py-3 bg-lime text-foreground rounded-full font-semibold text-sm hover:bg-lime-dark transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-cream/50">
                  <Link
                    href={`/shop/${product.id}`}
                    onClick={handleClose}
                    className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <AppImage
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${product.id}`}
                      onClick={handleClose}
                      className="font-medium text-sm line-clamp-2 hover:text-pista-dark transition-colors">
                      {product.name}
                    </Link>
                    <p className="text-pista-dark font-semibold text-sm mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {product.inStock && (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="inline-flex min-h-[40px] items-center gap-1.5 px-3 py-2 rounded-full bg-lime text-foreground text-xs font-semibold hover:bg-lime-dark transition-colors">
                          <HiShoppingBag className="w-3.5 h-3.5" />
                          Add to Cart
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="ml-auto min-h-[40px] min-w-[40px] flex items-center justify-center text-muted hover:text-red-500 transition-colors"
                        aria-label="Remove from wishlist">
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-pista/20 space-y-3">
              <Link
                href="/shop"
                onClick={handleClose}
                className="block w-full py-3.5 bg-lime text-foreground rounded-full font-semibold text-center hover:bg-lime-dark transition-colors">
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={clearWishlist}
                className="w-full py-2 text-sm text-muted hover:text-foreground transition-colors">
                Clear Wishlist
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
