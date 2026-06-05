"use client";

import { useEffect, useState } from "react";

/** Hide while scrolling down the page; show while scrolling up or near the top. */
export function useScrollVisibility(threshold = 8) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y <= 12) {
        setVisible(true);
      } else if (Math.abs(delta) >= threshold) {
        setVisible(delta < 0);
        lastY = y;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}
