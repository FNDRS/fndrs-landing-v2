"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ServiceCarousel from "./services-carousel";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold md:leading-[65px] mb-6">
              Building Your Future With Digital Solutions
            </h1>
            <p className="text-lg text-[#a2a2a2] font-light mb-8 max-w-lg">
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
              >
                Get Started
                <ArrowUpRight className="ml-2" size={16} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium hover:bg-gray-100 hover:text-gray-800"
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
            {/* Primer recuadro */}
            <div className="relative z-10 bg-gray-100 rounded-lg p-6 shadow-lg">
              <div className="text-5xl font-bold mb-2">∞</div>
              <p className="text-gray-600 text-sm">
                Endless possibilities for new projects
              </p>
            </div>

            {/* Segundo recuadro */}
            <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/4 z-20 bg-white rounded-lg p-6 shadow-lg">
              <div className="text-5xl font-bold mb-2">0</div>
              <p className="text-gray-600 text-sm">
                We're just starting—let's build success stories together
              </p>
            </div>

            {/* Tercer recuadro */}
            <div className="absolute bottom-0 left-1/4 transform -translate-x-1/4 translate-y-1/4 z-30 bg-gray-800 text-white rounded-lg p-6 shadow-lg">
              <div className="text-5xl font-bold mb-2">1</div>
              <p className="text-gray-300 text-sm">
                Your project could be our first milestone
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Carousel de servicios */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 md:mt-24"
      >
        <ServiceCarousel />
      </motion.div>
    </section>
  );
};

export default HeroSection;
