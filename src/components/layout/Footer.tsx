"use client";

import Link from "next/link";
import HomeLink from "@/components/ui/HomeLink";
import { withBasePath } from "@/lib/basePath";
import {
  HiChatBubbleOvalLeft,
  HiEnvelope,
  HiShoppingBag,
  HiCalendarDays,
  HiChevronDown,
  HiTruck,
  HiShieldCheck,
} from "react-icons/hi2";
import { categories } from "@/data/products";
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_GREETING,
} from "@/lib/whatsapp";

const whatsappHref =
  buildWhatsAppUrl(DEFAULT_WHATSAPP_GREETING) || "#";

const mobileQuickLinks = [
  {
    href: "/shop",
    label: "Shop",
    icon: HiShoppingBag,
    external: false,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: HiEnvelope,
    external: false,
  },
  {
    href: "/book-appointment",
    label: "Book",
    icon: HiCalendarDays,
    external: false,
  },
  {
    href: whatsappHref,
    label: "Chat",
    icon: HiChatBubbleOvalLeft,
    external: true,
  },
] as const;

function FooterAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="footer-accordion group border-b border-off-white/10 sm:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-lime [&::-webkit-details-marker]:hidden">
        {title}
        <HiChevronDown className="h-4 w-4 text-off-white/50 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-off-white pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        {/* Mobile layout */}
        <div className="space-y-6 sm:hidden">
          <div className="text-center">
            <HomeLink className="inline-block">
              <img
                src={withBasePath("/logo.png")}
                alt="GlowVerse"
                width={200}
                height={56}
                className="mx-auto h-11 w-auto"
              />
            </HomeLink>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-off-white/70">
              Premium Indian cosmetics — made for Indian skin, delivered across
              Bharat.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {mobileQuickLinks.map((item) => {
              const Icon = item.icon;
              const className =
                "flex min-h-[3.25rem] flex-col items-center justify-center gap-1.5 rounded-2xl border border-off-white/10 bg-off-white/[0.06] px-2 py-3 text-center transition-colors active:bg-off-white/10";

              const content = (
                <>
                  <Icon className="h-5 w-5 text-lime" />
                  <span className="text-xs font-medium text-off-white/90">
                    {item.label}
                  </span>
                </>
              );

              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="rounded-2xl border border-lime/25 bg-lime/[0.08] p-4">
            <h4 className="text-sm font-semibold text-lime">Stay in the glow</h4>
            <p className="mt-1 text-xs text-off-white/70">
              Get 15% off your first order.
            </p>
            <form
              className="mt-3 flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="min-h-[2.75rem] w-full rounded-full border border-off-white/20 bg-off-white/10 px-4 text-sm placeholder:text-off-white/40 focus:border-lime focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-[2.75rem] w-full rounded-full bg-lime text-sm font-semibold text-foreground transition-colors active:bg-lime-dark"
              >
                Join Newsletter
              </button>
            </form>
          </div>

          <FooterAccordion title="Shop Categories">
            <ul className="grid grid-cols-2 gap-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="block rounded-xl bg-off-white/[0.05] px-3 py-2.5 text-sm text-off-white/75 transition-colors active:bg-off-white/10 active:text-lime"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <FooterAccordion title="Help & Support">
            <ul className="space-y-1">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/book-appointment", label: "Book Appointment" },
                { href: whatsappHref, label: "WhatsApp", external: true },
                { href: "#", label: "Returns" },
                { href: "#", label: "FAQ" },
              ].map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[2.75rem] items-center rounded-xl px-3 text-sm text-off-white/75 transition-colors active:bg-off-white/5 active:text-lime"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex min-h-[2.75rem] items-center rounded-xl px-3 text-sm text-off-white/75 transition-colors active:bg-off-white/5 active:text-lime"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-off-white/10 bg-off-white/[0.05] px-3 py-1.5 text-[11px] text-off-white/60">
              <HiTruck className="h-3.5 w-3.5 text-lime" />
              Pan-India Delivery
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-off-white/10 bg-off-white/[0.05] px-3 py-1.5 text-[11px] text-off-white/60">
              <HiShieldCheck className="h-3.5 w-3.5 text-lime" />
              COD Available
            </span>
          </div>
        </div>

        {/* Tablet + desktop layout — unchanged */}
        <div className="hidden gap-10 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <HomeLink className="mb-4 inline-block">
              <img
                src={withBasePath("/logo.png")}
                alt="logo"
                width={200}
                height={56}
                className="h-10 w-auto sm:h-12"
              />
            </HomeLink>
            <p className="text-sm leading-relaxed text-off-white/70">
              Premium Indian cosmetics crafted with Ayurvedic and botanical
              ingredients — made for Indian skin, delivered across Bharat.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] transition-opacity hover:opacity-90"
                aria-label="Chat on WhatsApp"
              >
                <HiChatBubbleOvalLeft className="h-4 w-4 text-white" />
              </a>
              <Link
                href="/contact"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-off-white/10 transition-colors hover:bg-lime hover:text-foreground"
                aria-label="Contact us"
              >
                <HiEnvelope className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-lime">Shop</h4>
            <ul className="space-y-2.5">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="text-sm text-off-white/70 transition-colors hover:text-lime"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-lime">Support</h4>
            <ul className="space-y-2.5 text-sm text-off-white/70">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-lime"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/book-appointment"
                  className="transition-colors hover:text-lime"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-lime"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <span className="text-off-white/50">Pan-India Delivery</span>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-lime">
                  COD Available
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-lime">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-lime">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-lime">Newsletter</h4>
            <p className="mb-3 text-sm text-off-white/70">
              Get 15% off your first order.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-full border border-off-white/20 bg-off-white/10 px-4 py-2.5 text-sm placeholder:text-off-white/40 focus:border-lime focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-lime-dark"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-off-white/10 pt-6 text-xs text-off-white/50 sm:mt-10 sm:flex-row sm:gap-4">
          <p className="text-center sm:text-left">
            &copy; 2026 GlowVerse. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-lime">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-lime">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
