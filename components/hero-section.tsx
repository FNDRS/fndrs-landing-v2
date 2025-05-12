"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ServiceCarousel from "./services-carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white to-white">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold md:leading-[85px] mb-6">
              Building Your Future With Digital Solutions
            </h1>
            <p className="text-md text-gray-500 font-normal mb-8 max-w-lg">
              <strong className="font-bold">FNDRS </strong>
              is a 360 consulting agency. The focus of our work is help clients
              to found and build their future based on technology, mitigating
              risk and drive efficiency through people, process and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="font-medium bg-black text-white"
                variant="outline"
                onClick={() => router.push("#process")}
              >
                Get Started
                <ArrowUpRight className="ml-2" size={16} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium hover:bg-gray-100 hover:text-gray-800"
                onClick={() => router.push("#services")}
              >
                View Our Services
              </Button>
            </div>
          </motion.div>

          {/* Sección de "impresiones"/estadísticas adaptada a una agencia nueva */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              width={500}
              height={200}
              src="/hero-image.png"
              className="rounded-lg h-[450px] w-[300px] mx-auto"
              alt="Description of image"
              objectFit="cover"
            />
          </motion.div>
        </div>
      </div>
      {/* Carousel de servicios */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 md:mt-24 relative z-10"
      >
        <ServiceCarousel />
      </motion.div>
    </section>
  );
};

export default HeroSection;
