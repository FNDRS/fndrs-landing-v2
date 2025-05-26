"use client";

import dynamic from "next/dynamic";
import HomeSection from "@/components/home";

import Team from "@/components/team";
import Services from "@/components/services";

const Stages = dynamic(() => import("@/components/stages"), { ssr: false });
const WhyUs = dynamic(() => import("@/components/why-us"), { ssr: false });

export default function Home() {
  return (
    <div>
      <HomeSection />
      <WhyUs />
      <Team />
      <Stages />
      <Services />
    </div>
  );
}
