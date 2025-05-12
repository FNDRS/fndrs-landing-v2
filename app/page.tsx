import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import StagesSection from "@/components/stages-section";
import Team from "@/components/meet-the-team-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Team />
      <StagesSection />
      <ServicesSection />
      <Footer />
    </main>
  );
}
