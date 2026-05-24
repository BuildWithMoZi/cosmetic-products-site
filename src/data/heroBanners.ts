export interface HeroBanner {
  id: number;
  image: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export const heroBanners: HeroBanner[] = [
  {
    id: 1,
    image: "/hero-banners/1.png",
    badge: "Made in India",
    title: "Kerala Glow",
    highlight: "Sun-Kissed Complexion",
    subtitle:
      "Mineral-enriched formulas with tulsi, aloe vera and botanical extracts for a vibrant, festival-ready glow.",
    primaryCta: { label: "Shop Collection", href: "/shop?category=complexion" },
    secondaryCta: { label: "Explore Skincare", href: "/shop?category=skincare" },
  },
  {
    id: 2,
    image: "/hero-banners/2.png",
    badge: "Ayurvedic Blend",
    title: "Gulab & Chandan",
    highlight: "Radiance Redefined",
    subtitle:
      "Rose water and sandalwood oils for deeply nourished, luminous skin — inspired by Indian beauty rituals.",
    primaryCta: { label: "Shop Now", href: "/shop?category=skincare" },
    secondaryCta: { label: "View All", href: "/shop" },
  },
  {
    id: 3,
    image: "/hero-banners/3.png",
    badge: "Himalayan Botanicals",
    title: "Himalayan Dew",
    highlight: "Peptide Glow Serum",
    subtitle:
      "Pure Himalayan botanical peptides for firmer, hydrated skin with a fresh, dewy finish.",
    primaryCta: { label: "Shop Serum", href: "/shop?search=serum" },
    secondaryCta: { label: "Skincare", href: "/shop?category=skincare" },
  },
  {
    id: 4,
    image: "/hero-banners/4.png",
    badge: "Vitamin C Infused",
    title: "Nimbu Glow",
    highlight: "Lime Radiance Foundation",
    subtitle:
      "Hydrating luminous foundation infused with amla and Vitamin C for an energizing, natural glow.",
    primaryCta: { label: "Shop Makeup", href: "/shop?category=complexion" },
    secondaryCta: { label: "New Arrivals", href: "/shop?sort=newest" },
  },
  {
    id: 5,
    image: "/hero-banners/5.png",
    badge: "Silky & Pigmented",
    title: "Marigold Matte",
    highlight: "Radiant Lipstick",
    subtitle:
      "Silky, pigmented, long-wearing lip colour infused with shea butter — perfect for Indian skin tones.",
    primaryCta: { label: "Shop Lipstick", href: "/shop?category=lips" },
    secondaryCta: { label: "Bestsellers", href: "/shop?sort=featured" },
  },
  {
    id: 6,
    image: "/hero-banners/6.png",
    badge: "Haldi Inspired",
    title: "Golden Glow",
    highlight: "Satin Lip Collection",
    subtitle:
      "Metallic-finish matte lipstick with turmeric and shea butter for bold colour and all-day comfort.",
    primaryCta: { label: "Discover More", href: "/shop?category=lips" },
  },
  {
    id: 7,
    image: "/hero-banners/7.png",
    badge: "Luminous & Precise",
    title: "Royal Silhouette",
    highlight: "Liquid Foundation",
    subtitle:
      "Silk-veil liquid foundation and kajal-friendly eyeliner for a flawless, precise Indian bridal look.",
    primaryCta: { label: "Shop Collection", href: "/shop?category=complexion" },
    secondaryCta: { label: "View All", href: "/shop" },
  },
  {
    id: 8,
    image: "/hero-banners/8.png",
    badge: "Eye Definition",
    title: "Kajal Couture",
    highlight: "Eyes Collection",
    subtitle:
      "Smudge-proof kajal, lashes and palettes — luminous, precise essentials crafted for Indian eyes.",
    primaryCta: { label: "Shop Eyes", href: "/shop?category=eyes" },
    secondaryCta: { label: "Explore Tools", href: "/shop?category=tools" },
  },
];
