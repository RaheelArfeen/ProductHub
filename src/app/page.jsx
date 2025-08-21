import Banner from "@/Components/HomeComponents/Banner";
import FeaturesSection from "@/Components/HomeComponents/FeaturedSection";
import ProductHighlights from "@/Components/HomeComponents/FeaturedProducts";
import Testimonials from "@/Components/HomeComponents/Testomonials";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Banner></Banner>
      <FeaturesSection></FeaturesSection>
      <ProductHighlights></ProductHighlights>
      <Testimonials></Testimonials>
    </div>
  );
}
