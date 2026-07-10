import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ZonesSection } from "@/components/home/ZonesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyUsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ZonesSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
