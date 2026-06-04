"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types/product";
import { getProductById } from "@/data/products";

const STORAGE_KEY = "glowverse-wishlist";

interface WishlistContextType {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  hydrated: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const restored = ids
          .map((id) => getProductById(id))
          .filter((p): p is Product => p !== undefined);
        setItems(restored);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items.map((p) => p.id)),
    );
  }, [items, hydrated]);

  const toggleWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items],
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        totalItems: items.length,
        isOpen,
        setIsOpen,
        hydrated,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
