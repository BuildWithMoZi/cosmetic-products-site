"use client";

import Link from "next/link";
import { HiTag } from "react-icons/hi2";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function PromoBanner() {
  const ref = useGsapFadeIn(".promo-content", { y: 30 });

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pista-dark via-pista to-pista-light p-8 sm:p-12 lg:p-16"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative promo-content max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime text-foreground text-xs font-bold rounded-full mb-4">
              <HiTag className="w-3.5 h-3.5" />
              LIMITED TIME OFFER
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-4">
              Monsoon Sale — Up to 30% Off
            </h2>
            <p className="text-off-white/80 text-base sm:text-lg mb-8 leading-relaxed">
              Refresh your beauty routine with our seasonal favourites.
              Free delivery on all orders above ₹999 across India.
            </p>
            <Link
              href="/shop?sort=price-desc"
              className="inline-flex items-center px-8 py-4 bg-lime text-foreground rounded-full font-semibold hover:bg-lime-dark transition-colors shadow-lg"
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
