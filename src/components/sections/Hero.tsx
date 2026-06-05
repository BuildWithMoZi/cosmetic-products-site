"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import gsap from "gsap";
import { heroBanners, mobileHeroBanners } from "@/data/heroBanners";
import {
  DEFAULT_WHATSAPP_GREETING,
  openWhatsApp,
} from "@/lib/whatsapp";

const MOBILE_MEDIA_QUERY = "(max-width: 639px)";

function subscribeMobileView(onStoreChange: () => void) {
  const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getMobileViewSnapshot() {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const AUTOPLAY_MS = 6000;
const SLIDE_DURATION = 1.6;

export default function Hero() {
  const isMobileView = useSyncExternalStore(
    subscribeMobileView,
    getMobileViewSnapshot,
    () => false,
  );
  const banners = isMobileView ? mobileHeroBanners : heroBanners;
  const total = banners.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const animateSlideContent = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    const parts = slide.querySelectorAll(
      ".slide-badge, .slide-title, .slide-highlight, .slide-subtitle, .slide-cta",
    );

    gsap.fromTo(
      parts,
      { opacity: 0, y: 28, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      },
    );

    const imageWrap = slide.querySelector(".slide-image-wrap");
    if (imageWrap) {
      gsap.fromTo(
        imageWrap,
        { scale: 1.06, transformOrigin: "top center" },
        {
          scale: 1,
          transformOrigin: "top center",
          duration: SLIDE_DURATION + 0.4,
          ease: "power2.out",
        },
      );
    }
  }, []);

  const animateToSlide = useCallback(
    (index: number) => {
      const normalized = ((index % total) + total) % total;
      const prevSlide = slideRefs.current[activeIndexRef.current];

      if (prevSlide) {
        const prevParts = prevSlide.querySelectorAll(
          ".slide-badge, .slide-title, .slide-highlight, .slide-subtitle, .slide-cta",
        );
        gsap.to(prevParts, {
          opacity: 0,
          y: -16,
          duration: 0.35,
          ease: "power2.in",
        });
      }

      gsap.to(trackRef.current, {
        xPercent: -(normalized * 100) / total,
        duration: SLIDE_DURATION,
        ease: "expo.inOut",
        onComplete: () => {
          activeIndexRef.current = normalized;
          setActiveIndex(normalized);
          isAnimatingRef.current = false;
          animateSlideContent(normalized);
        },
      });
    },
    [animateSlideContent, total],
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimatingRef.current || index === activeIndexRef.current) return;
      isAnimatingRef.current = true;
      animateToSlide(index);
    },
    [animateToSlide],
  );

  const nextSlide = useCallback(() => {
    goToSlide(activeIndexRef.current + 1);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeIndexRef.current - 1);
  }, [goToSlide]);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      animateToSlide(activeIndexRef.current + 1);
    }, AUTOPLAY_MS);
  }, [animateToSlide]);

  useEffect(() => {
    slideRefs.current = [];
    activeIndexRef.current = 0;
    setActiveIndex(0);
    isAnimatingRef.current = false;

    if (autoplayRef.current) clearInterval(autoplayRef.current);

    requestAnimationFrame(() => {
      gsap.set(trackRef.current, { xPercent: 0 });
      animateSlideContent(0);
      resetAutoplay();
    });

    if (window.location.hash === "#hero") {
      requestAnimationFrame(() => {
        document.getElementById("hero")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isMobileView, animateSlideContent, resetAutoplay]);

  const handleManualNav = (index: number) => {
    goToSlide(index);
    resetAutoplay();
  };

  const handlePrev = () => {
    prevSlide();
    resetAutoplay();
  };

  const handleNext = () => {
    nextSlide();
    resetAutoplay();
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-foreground scroll-mt-0"
      aria-label="Hero banner slider"
    >
      <div className="relative h-[88vh] min-h-[540px] sm:h-[85vh] sm:min-h-[580px] lg:h-[92vh] lg:min-h-[680px]">
        <div
          key={isMobileView ? "hero-mobile" : "hero-desktop"}
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${total * 100}%` }}
        >
          {banners.map((banner, index) => (
            <article
              key={banner.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="relative h-full shrink-0 overflow-hidden"
              style={{ width: `${100 / total}%` }}
            >
              <div className="slide-image-wrap absolute inset-0 will-change-transform">
                {isMobileView ? (
                  <AppImage
                    src={banner.mobileImage!}
                    alt={`${banner.title} — ${banner.highlight}`}
                    fill
                    priority={index < 2}
                    className="slide-image object-cover object-center"
                    sizes="100vw"
                  />
                ) : (
                  <AppImage
                    src={banner.image}
                    alt={`${banner.title} — ${banner.highlight}`}
                    fill
                    priority={banner.id <= 2}
                    className="slide-image object-cover object-top"
                    sizes="100vw"
                  />
                )}
              </div>

              <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-foreground/75 via-foreground/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/45 to-transparent sm:from-foreground/35 sm:via-transparent sm:to-transparent" />

              <div className="absolute inset-0 flex items-end pb-[5.25rem] sm:items-center sm:pb-0 sm:pt-28 lg:pt-32">
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">
                  <div className="w-full max-w-xl lg:max-w-2xl">
                    <div className="mb-3.5 sm:mb-0">
                      <span className="slide-badge mb-2 inline-block rounded-full bg-lime/90 px-3 py-1 text-[10px] font-semibold text-foreground sm:mb-5 sm:px-4 sm:py-1.5 sm:text-sm">
                        {banner.badge}
                      </span>

                      <h1 className="slide-title font-display text-xl font-bold leading-[1.15] text-off-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] sm:mb-3 sm:text-4xl sm:leading-[1.08] sm:drop-shadow-none md:text-5xl lg:text-6xl xl:text-7xl">
                        {banner.title}
                      </h1>

                      <p className="slide-highlight font-display text-[0.95rem] font-semibold leading-snug text-lime drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)] sm:mb-4 sm:text-2xl sm:drop-shadow-none md:text-3xl lg:text-4xl">
                        {banner.highlight}
                      </p>

                      <p className="slide-subtitle mt-1.5 max-w-[17rem] text-[10px] leading-snug text-off-white/90 line-clamp-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:mt-0 sm:mb-8 sm:max-w-md sm:text-base sm:leading-relaxed sm:text-off-white/85 sm:line-clamp-none sm:drop-shadow-none lg:max-w-lg lg:text-lg">
                        {banner.subtitle}
                      </p>
                    </div>

                    <div className="slide-cta hero-cta">
                      <Link
                        href={banner.primaryCta.href}
                        className="hero-cta__btn hero-cta__btn--primary"
                      >
                        <span className="hero-cta__label">
                          {banner.primaryCta.label}
                        </span>
                        <HiArrowRight className="hero-cta__arrow" />
                      </Link>

                      <div
                        className={`hero-cta__pair ${
                          banner.secondaryCta ? "" : "hero-cta__pair--solo"
                        }`}
                      >
                        {banner.secondaryCta && (
                          <Link
                            href={banner.secondaryCta.href}
                            className="hero-cta__btn hero-cta__btn--ghost"
                          >
                            <span className="hero-cta__label">
                              {banner.secondaryCta.label}
                            </span>
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            openWhatsApp(DEFAULT_WHATSAPP_GREETING)
                          }
                          className="hero-cta__btn hero-cta__btn--whatsapp"
                          aria-label="Chat on WhatsApp"
                        >
                          <WhatsAppIcon className="hero-cta__wa-icon" />
                          <span className="hero-cta__label">WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-off-white/15 backdrop-blur-md border border-off-white/25 flex items-center justify-center text-off-white hover:bg-lime hover:text-foreground transition-all duration-300 hover:scale-105"
          aria-label="Previous slide"
        >
          <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-off-white/15 backdrop-blur-md border border-off-white/25 flex items-center justify-center text-off-white hover:bg-lime hover:text-foreground transition-all duration-300 hover:scale-105"
          aria-label="Next slide"
        >
          <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 sm:gap-2.5">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => handleManualNav(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-500 ease-out ${
                index === activeIndex
                  ? "w-8 sm:w-10 h-2.5 bg-lime"
                  : "w-2.5 h-2.5 bg-off-white/40 hover:bg-off-white/70"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-off-white/10 z-10 overflow-hidden">
          <div
            key={activeIndex}
            className="h-full bg-lime origin-left animate-[bannerProgress_6s_ease-out_forwards]"
          />
        </div>
      </div>
    </section>
  );
}
