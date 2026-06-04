"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HiXMark } from "react-icons/hi2";
import HomeLink from "@/components/ui/HomeLink";
import { withBasePath } from "@/lib/basePath";
import { getCategories } from "@/data/products";
import { CategoryIcon } from "@/lib/categoryIcons";
import { mainNavLinks } from "@/lib/navLinks";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const categories = getCategories();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className='fixed inset-0 bg-foreground/30 z-[55] lg:hidden'
        onClick={onClose}
        aria-hidden
      />
      <aside
        id='mobile-sidebar'
        role='dialog'
        aria-modal='true'
        aria-label='Navigation menu'
        className='fixed top-0 left-0 bottom-0 z-[56] flex w-[min(18rem,85vw)] flex-col bg-off-white shadow-xl lg:hidden'>
        <div className='flex items-center justify-between p-5 border-b border-pista/20'>
          <HomeLink onNavigate={onClose}>
            <img
              src={withBasePath("/logo.png")}
              alt="GlowVerse"
              width={200}
              height={56}
              className="header-logo"
            />
          </HomeLink>
          <button
            onClick={onClose}
            className='p-2 rounded-full hover:bg-pista/10'
            aria-label='Close menu'>
            <HiXMark className='w-5 h-5' />
          </button>
        </div>
        <nav className='flex-1 overflow-y-auto p-5 space-y-1 overscroll-contain'>
          {mainNavLinks.map((link) =>
            link.isHome ? (
              <HomeLink
                key={link.href}
                onNavigate={onClose}
                className='block px-4 py-3 rounded-xl hover:bg-pista/10 font-medium transition-colors'>
                {link.label}
              </HomeLink>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className='block px-4 py-3 rounded-xl hover:bg-pista/10 font-medium transition-colors'>
                {link.label === "Shop" ? "Shop All" : link.label}
              </Link>
            ),
          )}
          <p className='px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted'>
            Categories
          </p>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              onClick={onClose}
              className='flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-pista/10 transition-colors'>
              <CategoryIcon
                category={cat.slug}
                className='w-5 h-5 text-pista-dark shrink-0'
              />
              <span className='text-sm font-medium'>{cat.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
