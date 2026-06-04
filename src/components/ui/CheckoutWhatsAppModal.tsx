"use client";

import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { Product } from "@/types/product";
import {
  buildCartOrderMessage,
  buildSingleProductOrderMessage,
  isWhatsAppConfigured,
  openWhatsApp,
} from "@/lib/whatsapp";

interface CheckoutWhatsAppModalProps {
  open: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
  totalPrice: number;
  onSuccess?: () => void;
  singleProduct?: Product;
}

export default function CheckoutWhatsAppModal({
  open,
  onClose,
  items,
  totalPrice,
  onSuccess,
  singleProduct,
}: CheckoutWhatsAppModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.replace(/\D/g, "");

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (trimmedPhone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!isWhatsAppConfigured()) {
      setError("WhatsApp is not configured. Please contact support.");
      return;
    }

    const message =
      singleProduct
        ? buildSingleProductOrderMessage(
            singleProduct,
            items[0]?.quantity ?? 1,
            trimmedName,
            trimmedPhone,
          )
        : buildCartOrderMessage(items, totalPrice, trimmedName, trimmedPhone);

    const opened = openWhatsApp(message);
    if (opened) {
      onSuccess?.();
      onClose();
      setName("");
      setPhone("");
    } else {
      setError("Could not open WhatsApp. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        className="relative w-full max-w-md rounded-2xl bg-off-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2
            id="checkout-modal-title"
            className="font-display text-xl font-semibold">
            Order on WhatsApp
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-pista/10 transition-colors"
            aria-label="Close">
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted mb-4">
          Enter your details. We will open WhatsApp with your order ready to
          send.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="checkout-name" className="block text-sm font-medium mb-1.5">
              Full name *
            </label>
            <input
              id="checkout-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-pista/20 bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-lime/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="checkout-phone" className="block text-sm font-medium mb-1.5">
              Phone number *
            </label>
            <input
              id="checkout-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-pista/20 bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-lime/50"
              placeholder="10-digit mobile number"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#25D366] text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
            Continue to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
