"use client";

import { useGsapCounter } from "@/hooks/useGsapAnimation";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const counterRef = useGsapCounter(value, suffix);

  return (
    <div className="stat-item text-center">
      <p className="font-display text-4xl sm:text-5xl font-bold text-pista-dark mb-2">
        <span ref={counterRef}>0{suffix}</span>
      </p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useGsapFadeIn(".stat-item", { stagger: 0.15, y: 20 });

  return (
    <section className="py-16 sm:py-20 bg-off-white border-y border-pista/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          <StatItem value={30} suffix="+" label="Premium Products" />
          <StatItem value={15} suffix="K+" label="Happy Customers" />
          <StatItem value={98} suffix="%" label="Satisfaction Rate" />
          <StatItem value={28} suffix="+" label="States Delivered" />
        </div>
      </div>
    </section>
  );
}
