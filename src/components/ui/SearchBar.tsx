"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface SearchBarProps {
  autoFocus?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function SearchBar({
  autoFocus,
  onClose,
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex-1 relative ${className}`}>
      <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, categories..."
        className="w-full pl-11 pr-4 py-3 rounded-full bg-cream border border-pista/20 text-sm focus:outline-none focus:ring-2 focus:ring-pista/40 focus:border-pista transition-all"
      />
    </form>
  );
}
