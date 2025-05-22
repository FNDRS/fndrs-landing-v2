"use client";
import dynamic from "next/dynamic";

import Navbar from "@/components/navbar";
import HomeSection from "@/components/home";

const WhyUs = dynamic(() => import("@/components/why-us"), { ssr: false });
const Team = dynamic(() => import("@/components/team"), { ssr: false });
const Stages = dynamic(() => import("@/components/stages"), { ssr: false });
const Services = dynamic(() => import("@/components/services"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer"), { ssr: false });

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
