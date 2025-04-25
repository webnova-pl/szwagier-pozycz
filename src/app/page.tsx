import AboutUsSection from "@/ui/sections/AboutUsSection";
import EquipmentSection from "@/ui/sections/EquipmentSection";
import HeroSection from "@/ui/sections/HeroSection";
import IconsSection from "@/ui/sections/IconsSection";
import OfferSection from "@/ui/sections/OfferSection";

export default function Home() {
  return (
    <main className=" ">
      <HeroSection />
      <AboutUsSection />
      <EquipmentSection />
      <IconsSection/>
      <OfferSection />
    </main>

  );
}
