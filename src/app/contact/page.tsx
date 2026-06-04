import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | GlowVerse",
  description:
    "Get in touch with GlowVerse for product inquiries, orders, and support via WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="pt-[5.5rem] sm:pt-28 lg:pt-32 pb-16 min-h-screen bg-off-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <p className="text-sm font-medium text-pista-dark uppercase tracking-wider mb-2">
            Get in touch
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Contact & Inquiry
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Fill in the form below and we will open WhatsApp with your message
            ready to send. Our team typically replies within a few hours.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
