"use client";

import { useCallback, useEffect, useState } from "react";
import {
  HiStar,
  HiCheckBadge,
  HiChevronLeft,
  HiChevronRight,
  HiMapPin,
} from "react-icons/hi2";
import { TbQuote } from "react-icons/tb";
import {
  testimonials,
  reviewStats,
  ratingBreakdown,
  Testimonial,
} from "@/data/testimonials";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

function Stars({
  rating,
  size = "w-4 h-4",
}: {
  rating: number;
  size?: string;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar
          key={i}
          className={`${size} ${
            i < Math.floor(rating)
              ? "fill-lime text-lime"
              : "text-pista/25"
          }`}
        />
      ))}
    </div>
  );
}

function RatingPanel() {
  return (
    <aside className="review-block rounded-3xl bg-foreground text-off-white p-6 sm:p-8 flex flex-col justify-between min-h-[280px] lg:min-h-full border border-pista/20 shadow-xl shadow-pista/10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-lime mb-4">
          Trust Score
        </p>
        <div className="flex items-end gap-3 mb-2">
          <span className="font-display text-6xl sm:text-7xl font-bold leading-none text-lime">
            {reviewStats.averageRating}
          </span>
          <div className="pb-2">
            <Stars rating={reviewStats.averageRating} size="w-5 h-5" />
            <p className="text-xs text-off-white/55 mt-1">
              {reviewStats.totalReviews.toLocaleString("en-IN")} reviews
            </p>
          </div>
        </div>

        <div className="space-y-2.5 mt-6">
          {ratingBreakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="text-xs text-off-white/70 w-3">{row.stars}</span>
              <HiStar className="w-3.5 h-3.5 fill-lime text-lime shrink-0" />
              <div className="flex-1 h-2 rounded-full bg-off-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pista-light to-lime transition-all duration-700"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
              <span className="text-xs text-off-white/50 w-8 text-right">
                {row.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-off-white/10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime/15 text-lime text-xs font-medium">
          <HiCheckBadge className="w-4 h-4" />
          {reviewStats.verifiedPercent}% Verified
        </span>
        <span className="px-3 py-1.5 rounded-full bg-off-white/10 text-off-white/80 text-xs font-medium">
          Pan-India Buyers
        </span>
      </div>
    </aside>
  );
}

function SpotlightCard({
  item,
  isActive,
}: {
  item: Testimonial;
  isActive: boolean;
}) {
  return (
    <article
      className={`absolute inset-0 flex flex-col justify-between rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-500 ${
        isActive
          ? "opacity-100 translate-y-0 scale-100 z-10"
          : "opacity-0 translate-y-4 scale-[0.98] z-0 pointer-events-none"
      }`}
    >
      <TbQuote className="w-10 h-10 sm:w-12 sm:h-12 text-lime/40 mb-4 shrink-0" />

      <p className="font-display text-xl sm:text-2xl lg:text-3xl leading-snug text-off-white flex-1">
        &ldquo;{item.text}&rdquo;
      </p>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-8 pt-6 border-t border-off-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-lime text-foreground flex items-center justify-center font-bold text-sm shrink-0">
            {item.avatar}
          </div>
          <div>
            <p className="font-semibold text-off-white">{item.name}</p>
            <p className="text-sm text-off-white/60">{item.role}</p>
            <p className="flex items-center gap-1 text-xs text-off-white/45 mt-0.5">
              <HiMapPin className="w-3.5 h-3.5" />
              {item.city}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <Stars rating={item.rating} size="w-5 h-5" />
          <span className="text-xs px-3 py-1 rounded-full bg-off-white/10 text-lime font-medium">
            {item.product}
          </span>
        </div>
      </div>
    </article>
  );
}

function ReviewTile({
  item,
  isActive,
  onSelect,
}: {
  item: Testimonial;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`review-block text-left w-full rounded-2xl border p-5 sm:p-6 transition-all duration-300 group ${
        isActive
          ? "bg-lime/10 border-lime shadow-md shadow-lime/10 ring-1 ring-lime/30"
          : "bg-off-white border-pista/10 hover:border-pista/30 hover:shadow-lg hover:shadow-pista/5"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
              isActive
                ? "bg-lime text-foreground"
                : "bg-gradient-to-br from-pista-light to-lime/80 text-foreground"
            }`}
          >
            {item.avatar}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{item.name}</p>
            <p className="text-xs text-muted truncate">{item.city}</p>
          </div>
        </div>
        <Stars rating={item.rating} size="w-3.5 h-3.5" />
      </div>

      <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
        &ldquo;{item.text}&rdquo;
      </p>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-pista/10">
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-cream text-pista-dark truncate max-w-[70%]">
          {item.product}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-pista-dark shrink-0">
          <HiCheckBadge className="w-3.5 h-3.5" />
          Verified
        </span>
      </div>
    </button>
  );
}

export default function Testimonials() {
  const containerRef = useGsapFadeIn(".review-block", { stagger: 0.07, y: 28 });
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  const goTo = useCallback(
    (index: number) => setActiveIndex((index + total) % total),
    [total]
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    const timer = setInterval(() => goTo(activeIndex + 1), 6000);
    return () => clearInterval(timer);
  }, [activeIndex, goTo]);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-off-white to-off-white pointer-events-none" />
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pista/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="review-block text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime/20 text-pista-dark text-xs font-semibold uppercase tracking-wider mb-4">
            <HiStar className="w-4 h-4 fill-lime text-lime" />
            Customer Reviews
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Real Glow, Real Reviews
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Thousands of Indian customers share their honest experience — from
            Mumbai to Kochi, GlowVerse is trusted nationwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          <div className="lg:col-span-4 review-block">
            <RatingPanel />
          </div>

          <div className="lg:col-span-8 review-block">
            <div className="relative min-h-[420px] sm:min-h-[380px] rounded-3xl bg-gradient-to-br from-foreground via-foreground to-pista-dark border border-pista/20 shadow-2xl shadow-pista/15 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-2xl pointer-events-none" />

              {testimonials.map((item, index) => (
                <SpotlightCard
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                />
              ))}

              <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-6 sm:bottom-6 flex items-center justify-between sm:justify-end gap-3 z-20">
                <div className="flex gap-1.5 sm:hidden">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Review ${i + 1}`}
                      className={`rounded-full transition-all ${
                        i === activeIndex
                          ? "w-5 h-2 bg-lime"
                          : "w-2 h-2 bg-off-white/30"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="w-10 h-10 rounded-full bg-off-white/10 backdrop-blur border border-off-white/20 flex items-center justify-center text-off-white hover:bg-lime hover:text-foreground hover:border-lime transition-colors"
                    aria-label="Previous review"
                  >
                    <HiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="w-10 h-10 rounded-full bg-off-white/10 backdrop-blur border border-off-white/20 flex items-center justify-center text-off-white hover:bg-lime hover:text-foreground hover:border-lime transition-colors"
                    aria-label="Next review"
                  >
                    <HiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex justify-center gap-2 mt-5">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show review from ${item.name}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 h-2 bg-lime"
                      : "w-2 h-2 bg-pista/30 hover:bg-pista/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((item, index) => (
            <ReviewTile
              key={item.id}
              item={item}
              isActive={index === activeIndex}
              onSelect={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
