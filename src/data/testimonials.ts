export interface Testimonial {
  id: string;
  name: string;
  city: string;
  role: string;
  rating: number;
  text: string;
  product: string;
  date: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    city: "Mumbai, Maharashtra",
    role: "Skincare Enthusiast",
    rating: 5,
    text: "Vitamin C Glow Serum ne meri skin ka texture bilkul smooth kar diya. GlowVerse ab meri daily routine ka hissa hai — genuinely worth every rupee!",
    product: "Vitamin C Glow Serum",
    date: "Feb 2026",
    avatar: "PS",
  },
  {
    id: "2",
    name: "Ananya Reddy",
    city: "Hyderabad, Telangana",
    role: "Bridal Makeup Artist",
    rating: 5,
    text: "As a bridal MUA in Hyderabad, I trust GlowVerse for long-lasting coverage in humid weather. Silk Wear Foundation ka finish photos mein bhi perfect aata hai.",
    product: "Silk Wear Lasting Foundation",
    date: "Jan 2026",
    avatar: "AR",
  },
  {
    id: "3",
    name: "Kavya Iyer",
    city: "Bengaluru, Karnataka",
    role: "Beauty Creator",
    rating: 5,
    text: "Love that everything is cruelty-free with Indian botanicals. Chandan Glow Crème is my monsoon essential — lightweight yet deeply hydrating.",
    product: "Chandan Glow Hydrating Crème",
    date: "Mar 2026",
    avatar: "KI",
  },
  {
    id: "4",
    name: "Riya Patel",
    city: "Ahmedabad, Gujarat",
    role: "Working Professional",
    rating: 5,
    text: "Crystal Secret Day Moisturizer with SPF is perfect for Gujarat ki dhoop. No white cast on Indian skin tone — finally a sunscreen that works!",
    product: "Crystal Secret Day Moisturizer",
    date: "Feb 2026",
    avatar: "RP",
  },
  {
    id: "5",
    name: "Sneha Nair",
    city: "Kochi, Kerala",
    role: "Ayurveda Lover",
    rating: 5,
    text: "Badam & Kesar cream smells divine and absorbs quickly even in Kerala humidity. Delivery was super fast — reached in 2 days!",
    product: "Badam & Kesar Moisturizing Cream",
    date: "Jan 2026",
    avatar: "SN",
  },
  {
    id: "6",
    name: "Divya Singh",
    city: "Delhi NCR",
    role: "College Student",
    rating: 4,
    text: "Luxury Lipstick Collection ke shades Indian skin tones ke liye perfect hain. Matte Lipstick Vault gift set — mom ko birthday pe diya, she loved it!",
    product: "Luxury Lipstick Collection",
    date: "Mar 2026",
    avatar: "DS",
  },
];

export const reviewStats = {
  averageRating: 4.9,
  totalReviews: 12847,
  fiveStarPercent: 92,
  verifiedPercent: 98,
};

export const ratingBreakdown = [
  { stars: 5, percent: 92 },
  { stars: 4, percent: 6 },
  { stars: 3, percent: 1 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
];
