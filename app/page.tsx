import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import ApproachSection from "@/components/approach-section"
import SolutionsSection from "@/components/solutions-section"
import SuccessSection from "@/components/success-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ApproachSection />
      <ServicesSection />
      <SolutionsSection />
      <SuccessSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

