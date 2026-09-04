import { HeroSection } from "@/components/sections/home/HeroSection";
import { SkillsSection } from "@/components/sections/home/SkillsSection";
import { FeaturedProjectsSection } from "@/components/sections/home/FeaturedProjectsSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { ContactSection } from "@/components/sections/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <ServicesSection />
      {/* <PricingPreviewSection /> */}
      <ContactSection />
    </>
  );
}
