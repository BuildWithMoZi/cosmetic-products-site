"use client";

import { useState } from "react";
import {
  buildAppointmentMessage,
  isWhatsAppConfigured,
  openWhatsApp,
} from "@/lib/whatsapp";

const SERVICE_OPTIONS = [
  "Skin consultation",
  "Skin analysis",
  "Makeup session",
  "Product recommendation",
  "Other",
];

export default function AppointmentForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-pista/20 bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-lime/50";

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
      setError("Please enter a valid phone number.");
      return;
    }
    if (!date) {
      setError("Please select a preferred date.");
      return;
    }
    if (!time) {
      setError("Please select a preferred time.");
      return;
    }
    if (!isWhatsAppConfigured()) {
      setError("WhatsApp is not configured. Please try again later.");
      return;
    }

    const opened = openWhatsApp(
      buildAppointmentMessage({
        name: trimmedName,
        phone: trimmedPhone,
        service,
        date,
        time,
        notes: notes.trim() || undefined,
      }),
    );

    if (opened) {
      setSubmitted(true);
      setName("");
      setPhone("");
      setService(SERVICE_OPTIONS[0]);
      setDate("");
      setTime("");
      setNotes("");
    } else {
      setError("Could not open WhatsApp. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-lime/15 border border-lime/30 p-8 text-center">
        <p className="font-display text-xl font-semibold text-pista-dark mb-2">
          Appointment request sent
        </p>
        <p className="text-sm text-muted mb-6">
          Confirm your booking in WhatsApp. Our team will reply with available
          slots.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-lime text-foreground rounded-full font-semibold text-sm hover:bg-lime-dark transition-colors">
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="appt-name" className="block text-sm font-medium mb-1.5">
            Full name *
          </label>
          <input
            id="appt-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="appt-phone" className="block text-sm font-medium mb-1.5">
            Phone *
          </label>
          <input
            id="appt-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="10-digit mobile"
          />
        </div>
      </div>
      <div>
        <label htmlFor="appt-service" className="block text-sm font-medium mb-1.5">
          Service *
        </label>
        <select
          id="appt-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={inputClass}>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="appt-date" className="block text-sm font-medium mb-1.5">
            Preferred date *
          </label>
          <input
            id="appt-date"
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="appt-time" className="block text-sm font-medium mb-1.5">
            Preferred time *
          </label>
          <input
            id="appt-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="appt-notes" className="block text-sm font-medium mb-1.5">
          Notes (optional)
        </label>
        <textarea
          id="appt-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className={`${inputClass} resize-y`}
          placeholder="Any special requests..."
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
        Book via WhatsApp
      </button>
    </form>
  );
}
