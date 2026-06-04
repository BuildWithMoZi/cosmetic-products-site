"use client";

import { useState } from "react";
import {
  buildInquiryMessage,
  isWhatsAppConfigured,
  openWhatsApp,
} from "@/lib/whatsapp";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-pista/20 bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-lime/50";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.replace(/\D/g, "");
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (trimmedPhone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!trimmedSubject) {
      setError("Please enter a subject.");
      return;
    }
    if (!trimmedMessage) {
      setError("Please enter your message.");
      return;
    }
    if (!isWhatsAppConfigured()) {
      setError("WhatsApp is not configured. Please try again later.");
      return;
    }

    const opened = openWhatsApp(
      buildInquiryMessage({
        name: trimmedName,
        phone: trimmedPhone,
        email: email.trim() || undefined,
        subject: trimmedSubject,
        message: trimmedMessage,
      }),
    );

    if (opened) {
      setSubmitted(true);
      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setError("Could not open WhatsApp. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-lime/15 border border-lime/30 p-8 text-center">
        <p className="font-display text-xl font-semibold text-pista-dark mb-2">
          Inquiry sent via WhatsApp
        </p>
        <p className="text-sm text-muted mb-6">
          Complete the message in WhatsApp and we will get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-lime text-foreground rounded-full font-semibold text-sm hover:bg-lime-dark transition-colors">
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inquiry-name" className="block text-sm font-medium mb-1.5">
            Full name *
          </label>
          <input
            id="inquiry-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="inquiry-phone" className="block text-sm font-medium mb-1.5">
            Phone *
          </label>
          <input
            id="inquiry-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="10-digit mobile"
          />
        </div>
      </div>
      <div>
        <label htmlFor="inquiry-email" className="block text-sm font-medium mb-1.5">
          Email (optional)
        </label>
        <input
          id="inquiry-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label htmlFor="inquiry-subject" className="block text-sm font-medium mb-1.5">
          Subject *
        </label>
        <input
          id="inquiry-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder="What is this about?"
        />
      </div>
      <div>
        <label htmlFor="inquiry-message" className="block text-sm font-medium mb-1.5">
          Message *
        </label>
        <textarea
          id="inquiry-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder="Tell us how we can help..."
        />
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
        Send via WhatsApp
      </button>
    </form>
  );
}
