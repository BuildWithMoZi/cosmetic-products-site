import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

export function getWhatsAppNumber(): string {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? ""
  );
}

export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber().length >= 10;
}

export function buildWhatsAppUrl(message: string): string {
  const number = getWhatsAppNumber();
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): boolean {
  const url = buildWhatsAppUrl(message);
  if (!url) return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

export function buildCartOrderMessage(
  items: { product: Product; quantity: number }[],
  totalPrice: number,
  name: string,
  phone: string,
): string {
  const lines = items.map(
    (item) =>
      `• ${item.product.name} x${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`,
  );

  return [
    "Hi GlowVerse! I want to place an order:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(totalPrice)}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
  ].join("\n");
}

export function buildSingleProductOrderMessage(
  product: Product,
  quantity: number,
  name: string,
  phone: string,
): string {
  return buildCartOrderMessage(
    [{ product, quantity }],
    product.price * quantity,
    name,
    phone,
  );
}

export function buildInquiryMessage(data: {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}): string {
  return [
    "Hi GlowVerse! I have an inquiry:",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : "",
    `Subject: ${data.subject}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildAppointmentMessage(data: {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}): string {
  return [
    "Hi GlowVerse! I would like to book an appointment:",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Preferred date: ${data.date}`,
    `Preferred time: ${data.time}`,
    data.notes ? `\nNotes: ${data.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export const DEFAULT_WHATSAPP_GREETING =
  "Hi GlowVerse! I have a question about your products.";
