import Hero from "@/components/Hero";
import PlotGallery from "@/components/PlotGallery";
import PropertyGrid from "@/components/PropertyGrid";
import StudioStats from "@/components/StudioStats";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import InfiniteTicker from "@/components/InfiniteTicker";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <InfiniteTicker />
      <PlotGallery />
      <PropertyGrid />
      <StudioStats />
      <Testimonials />
      <Footer />
    </main>
  );
}
