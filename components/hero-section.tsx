"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[65px] mb-6">
              Building Your Future With Digital Solutions
            </h1>
            <p className="text-lg text-[#333] font-light mb-8 max-w-lg">
              <strong className="font-bold">FNDRS </strong>
              is a 360 consulting agency. The focus of our work is help clients
              to found adn build their future based on technology, mitigating
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
          {/* Impress hero section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10 bg-gray-100 rounded-lg p-6 shadow-lg">
              <div className="text-5xl font-bold mb-2">250+</div>
              <p className="text-gray-600 text-sm">
                Successful projects delivered across industries
              </p>
            </div>

            <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/4 z-20 bg-white rounded-lg p-6 shadow-lg">
              <div className="text-5xl font-bold mb-2">180+</div>
              <p className="text-gray-600 text-sm">
                Satisfied clients worldwide
              </p>
            </div>

            <div className="absolute bottom-0 left-1/4 transform -translate-x-1/4 translate-y-1/4 z-30 bg-gray-800 text-white rounded-lg p-6 shadow-lg">
              <div className="text-5xl font-bold mb-2">95%</div>
              <p className="text-gray-300 text-sm">Client retention rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
