import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import StagesSection from "@/components/stages-section";
import Team from "@/components/meet-the-team-section";
import Footer from "@/components/footer";
import WhyUsSection from "@/components/why-us";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <Team />
      <StagesSection />
      <ServicesSection />
      <Footer />
    </main>
  );
}
