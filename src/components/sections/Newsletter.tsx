"use client";

import { useState } from "react";
import { HiEnvelope, HiCheckCircle } from "react-icons/hi2";
import { useGsapFadeIn } from "@/hooks/useGsapAnimation";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useGsapFadeIn(".newsletter-content", { y: 30 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="newsletter-content relative overflow-hidden rounded-3xl bg-foreground p-8 sm:p-12 lg:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pista/20 to-lime/10" />

          <div className="relative max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-lime flex items-center justify-center mx-auto mb-6">
              <HiEnvelope className="w-6 h-6 text-foreground" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-off-white mb-4">
              Join the GlowVerse
            </h2>
            <p className="text-off-white/70 mb-8">
              Subscribe for exclusive offers, desi beauty tips, and early access to new arrivals.
              Get 15% off your first order — pan-India delivery available.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-lime">
                <HiCheckCircle className="w-5 h-5" />
                <span className="font-medium">Thank you for subscribing!</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-off-white/10 border border-off-white/20 text-off-white placeholder:text-off-white/40 focus:outline-none focus:border-lime text-sm"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-lime text-foreground rounded-full font-semibold hover:bg-lime-dark transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
