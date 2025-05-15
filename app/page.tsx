import Navbar from "@/components/navbar";
import HomeSection from "@/components/home";
import Services from "@/components/services";
import Stages from "@/components/stages";
import Team from "@/components/team";
import Footer from "@/components/footer";
import WhyUs from "@/components/why-us";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HomeSection />
      <WhyUs />
      <Team />
      <Stages />
      <Services />
      <Footer />
    </main>
  );
}
