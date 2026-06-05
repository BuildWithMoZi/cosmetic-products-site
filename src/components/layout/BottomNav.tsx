"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiShoppingBag,
  HiChatBubbleLeftRight,
  HiCalendarDays,
} from "react-icons/hi2";
import HomeLink from "@/components/ui/HomeLink";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const navItems = [
  { href: "/", label: "Home", isHome: true, icon: HiHome },
  { href: "/shop", label: "Products", isHome: false, icon: HiShoppingBag },
  {
    href: "/contact",
    label: "Inquiry",
    isHome: false,
    icon: HiChatBubbleLeftRight,
  },
  {
    href: "/book-appointment",
    label: "Appointment",
    isHome: false,
    icon: HiCalendarDays,
  },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BottomNav() {
  const pathname = usePathname();
  const visible = useScrollVisibility();

  return (
    <nav
      aria-label="Mobile navigation"
      className={`bottom-nav lg:hidden ${visible ? "bottom-nav--visible" : "bottom-nav--hidden"}`}
    >
      <div className="bottom-nav__bar">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          const content = (
            <>
              <span
                className={`bottom-nav__icon-wrap ${active ? "bottom-nav__icon-wrap--active" : ""}`}
              >
                <Icon className="bottom-nav__icon" aria-hidden />
              </span>
              <span className="bottom-nav__label">{item.label}</span>
            </>
          );

          if (item.isHome) {
            return (
              <HomeLink
                key={item.href}
                className={`bottom-nav__item ${active ? "bottom-nav__item--active" : ""}`}
                aria-label={item.label}
              >
                {content}
              </HomeLink>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav__item ${active ? "bottom-nav__item--active" : ""}`}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
