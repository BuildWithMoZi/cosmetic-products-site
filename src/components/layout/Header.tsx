"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeLink from "@/components/ui/HomeLink";
import { withBasePath } from "@/lib/basePath";
import {
  HiMagnifyingGlass,
  HiShoppingBag,
  HiHeart,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import SearchBar from "@/components/ui/SearchBar";
import CartDrawer from "@/components/ui/CartDrawer";
import MobileMenu from "@/components/layout/MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=skincare", label: "Skincare" },
  { href: "/shop?category=complexion", label: "Makeup" },
  { href: "/shop?category=fragrance", label: "Fragrance" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();

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
          scrolled ?
            "bg-gray-400/75 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-white/60 backdrop-blur-xl border-b border-transparent"
        }`}>
        {/* Top bar */}
        <div className='mx-auto max-w-7xl px-5 sm:px-8 lg:px-12'>
          <div className='flex h-[52px] items-center justify-between gap-6'>
            {/* Left — logo */}
            <HomeLink className='flex shrink-0 items-center'>
              <img
                src={withBasePath("/logo.png")}
                alt='GlowVerse'
                width={120}
                height={44}
                className='h-25 w-auto object-contain'
              />
            </HomeLink>

            {/* Center — nav links */}
            <nav className='hidden lg:flex items-center gap-1'>
              {navLinks.map((link) =>
                link.href === "/" ?
                  <HomeLink
                    key={link.href}
                    className='group relative px-3 py-1 text-[13px] font-medium tracking-wide text-slate-500 transition-colors duration-200 hover:text-slate-900'>
                    {link.label}
                    <span className='absolute bottom-0 left-3 right-3 h-px scale-x-0 bg-lime-500 transition-transform duration-200 group-hover:scale-x-100 origin-left' />
                  </HomeLink>
                : <Link
                    key={link.href}
                    href={link.href}
                    className='group relative px-3 py-1 text-[13px] font-medium tracking-wide text-slate-500 transition-colors duration-200 hover:text-slate-900'>
                    {link.label}
                    <span className='absolute bottom-0 left-3 right-3 h-px scale-x-0 bg-lime-500 transition-transform duration-200 group-hover:scale-x-100 origin-left' />
                  </Link>,
              )}
            </nav>

            {/* Right — actions */}
            <div className='flex items-center gap-0.5'>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className='flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-black/[0.05] hover:text-slate-900'
                aria-label='Search'>
                <HiMagnifyingGlass className='h-[18px] w-[18px]' />
              </button>

              <button
                className='hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-black/[0.05] hover:text-slate-900'
                aria-label='Wishlist'>
                <HiHeart className='h-[18px] w-[18px]' />
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className='relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-black/[0.05] hover:text-slate-900'
                aria-label='Cart'>
                <HiShoppingBag className='h-[18px] w-[18px]' />
                {totalItems > 0 && (
                  <span className='absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-lime-500 text-[10px] font-semibold text-white'>
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className='lg:hidden flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-200 hover:bg-black/[0.05] hover:text-slate-900 ml-1'
                aria-label='Open menu'>
                <HiBars3 className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>

        {/* Search panel — slides in below the bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}>
          <div className='border-t border-black/[0.05] bg-white/80 backdrop-blur-2xl px-5 sm:px-8 lg:px-12 py-3'>
            <div className='mx-auto flex max-w-2xl items-center gap-3'>
              <SearchBar autoFocus onClose={() => setSearchOpen(false)} />
              <button
                onClick={() => setSearchOpen(false)}
                className='shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all hover:bg-black/[0.05] hover:text-slate-700'
                aria-label='Close search'>
                <HiXMark className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>

        {/* Thin lime accent line at very bottom */}
        <div className='h-px w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent' />
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer />
    </>
  );
}
