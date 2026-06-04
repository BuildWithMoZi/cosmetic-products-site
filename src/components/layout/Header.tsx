"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HomeLink from "@/components/ui/HomeLink";
import { withBasePath } from "@/lib/basePath";
import {
  HiMagnifyingGlass,
  HiShoppingBag,
  HiHeart,
  HiEllipsisVertical,
  HiXMark,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchBar from "@/components/ui/SearchBar";
import CartDrawer from "@/components/ui/CartDrawer";
import WishlistDrawer from "@/components/ui/WishlistDrawer";
import MobileMenu from "@/components/layout/MobileMenu";
import { mainNavLinks } from "@/lib/navLinks";

const navLinkClass =
  "group relative whitespace-nowrap px-2 xl:px-2.5 py-1 text-[12px] xl:text-[13px] font-medium tracking-wide text-slate-500 transition-colors duration-200 hover:text-slate-900";

const navUnderlineClass =
  "absolute bottom-0 left-2 right-2 xl:left-2.5 xl:right-2.5 h-px scale-x-0 bg-lime-500 transition-transform duration-200 group-hover:scale-x-100 origin-left";

const iconBtnClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors duration-200 hover:bg-black/[0.05] hover:text-slate-900 active:scale-95 sm:h-11 sm:w-11";

const logoSrc = withBasePath("/logo.png");

function HeaderLogo() {
  return (
    <img
      src={logoSrc}
      alt="GlowVerse"
      width={220}
      height={60}
      className="header-logo"
    />
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { totalItems: wishlistCount, setIsOpen: setWishlistOpen } =
    useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            : "bg-white/75 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10 xl:px-12">
          <div className="relative flex h-14 sm:h-16 lg:h-20 items-center">
            {/* Left — menu (mobile) + logo (desktop) */}
            <div className="relative z-10 flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-black/[0.06] active:scale-95"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-sidebar"
              >
                <HiEllipsisVertical className="h-6 w-6" />
              </button>
              <HomeLink className="hidden lg:block">
                <HeaderLogo />
              </HomeLink>
            </div>

            {/* Center — logo (mobile/tablet) or nav (desktop) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center lg:pointer-events-auto lg:static lg:flex-1 lg:min-w-0 lg:justify-center">
              <HomeLink className="pointer-events-auto lg:hidden">
                <HeaderLogo />
              </HomeLink>
              <nav
                className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1"
                aria-label="Main navigation"
              >
                {mainNavLinks.map((link) =>
                  link.isHome ? (
                    <HomeLink key={link.href} className={navLinkClass}>
                      {link.label}
                      <span className={navUnderlineClass} />
                    </HomeLink>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={navLinkClass}
                    >
                      {link.label}
                      <span className={navUnderlineClass} />
                    </Link>
                  ),
                )}
              </nav>
            </div>

            {/* Right — actions */}
            <div className="relative z-10 ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className={iconBtnClass}
                aria-label="Search"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setWishlistOpen(true)}
                className={`relative ${iconBtnClass}`}
                aria-label="Wishlist"
              >
                <HiHeart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-lime-500 px-0.5 text-[10px] font-semibold text-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`relative ${iconBtnClass}`}
                aria-label="Cart"
              >
                <HiShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-lime-500 px-0.5 text-[10px] font-semibold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search panel */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            searchOpen ? "max-h-28 sm:max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-black/[0.05] bg-white/90 backdrop-blur-2xl px-3 sm:px-6 lg:px-10 xl:px-12 py-3">
            <div className="mx-auto flex max-w-2xl items-center gap-2 sm:gap-3">
              <SearchBar
                className="w-full min-w-0"
                autoFocus
                onClose={() => setSearchOpen(false)}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-black/[0.05] hover:text-slate-700"
                aria-label="Close search"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
}
