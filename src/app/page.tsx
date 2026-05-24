import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import VarietySection from "@/components/sections/VarietySection";
import NewArrivals from "@/components/sections/NewArrivals";
import AllProductsShowcase from "@/components/sections/AllProductsShowcase";
import PromoBanner from "@/components/sections/PromoBanner";
import StatsSection from "@/components/sections/StatsSection";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <Categories />
      <FeaturedProducts />
      <NewArrivals />
      <VarietySection />
      <AllProductsShowcase />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
