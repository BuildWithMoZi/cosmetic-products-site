"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapFadeIn(
  selector: string,
  options?: { delay?: number; stagger?: number; y?: number }
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (targets.length === 0) return;

    gsap.fromTo(
      targets,
      { opacity: 0, y: options?.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: options?.stagger ?? 0.1,
        delay: options?.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [selector, options?.delay, options?.stagger, options?.y]);

  return ref;
}

export function useGsapHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 60, duration: 0.8 }, "-=0.3")
        .from(".hero-subtitle", { opacity: 0, y: 40, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 30, duration: 0.6, stagger: 0.15 }, "-=0.3")
        .from(".hero-image", { opacity: 0, scale: 0.8, duration: 1 }, "-=0.8")
        .from(".hero-float", { opacity: 0, scale: 0, duration: 0.5, stagger: 0.1 }, "-=0.5");
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useGsapParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}

export function useGsapCounter(
  endValue: number,
  suffix = ""
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: endValue,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + suffix;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [endValue, suffix]);

  return ref;
}
