import type { Metadata } from "next";
import AppointmentForm from "@/components/forms/AppointmentForm";

export const metadata: Metadata = {
  title: "Book Appointment | GlowVerse",
  description:
    "Book a skin consultation, makeup session, or beauty appointment at GlowVerse via WhatsApp.",
};

export default function BookAppointmentPage() {
  return (
    <div className="pt-[5.5rem] sm:pt-28 lg:pt-32 pb-16 min-h-screen bg-off-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <p className="text-sm font-medium text-pista-dark uppercase tracking-wider mb-2">
            Book a visit
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Book an Appointment
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Choose your preferred service, date, and time. We will receive your
            request on WhatsApp and confirm your slot shortly.
          </p>
        </div>
        <AppointmentForm />
      </div>
    </div>
  );
}
