"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="services" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-light text-center mb-4 mx-auto max-w-md"
          >
            Tailored Solutions For Your Needs
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-black/40 text-center mb-16 max-w-lg mx-auto"
          >
            From sleek mobile app interfaces to user-friendly websites, our team
            of experts delivers functional.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="max-w-9xl mx-auto space-y-6 "
          >
            <motion.div
              variants={itemVariants}
              className="border-b border-gray-200 p-6 flex flex-row justify-between items-center"
            >
              <h3 className="text-4xl max-w-xl">
                Digital Strategy & Consulting
              </h3>
              <p className="text-black/40 mx-auto max-w-sm text-md">
                Our strategic consulting helps chart your digital transformation
                journey with clear roadmap and actionable insights.
              </p>
              <ArrowUpRight className="w-10 h-10" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="border-b border-gray-200 p-6 flex flex-row justify-between items-center"
            >
              <h3 className="text-4xl max-w-lg leading-relaxed">
                Website & Mobile Development
              </h3>
              <p className="text-black/40 mx-auto max-w-sm text-md">
                We create responsive websites and powerful mobile applications
                that engage users and drive conversions.
              </p>
              <ArrowUpRight className="w-10 h-10" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="border-b w-full border-gray-200 p-6 flex flex-row justify-between items-center"
            >
              <h3 className="text-4xl w-full max-w-lg min-w-lg leading-relaxed">
                UX/UI Design
              </h3>
              <p className="text-black/40 mx-auto max-w-sm text-md">
                Our user-centered design creates intuitive, engaging interfaces
                that enhance user satisfaction and business outcomes.
              </p>
              <ArrowUpRight className="w-10 h-10" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="border-b border-gray-200 p-6 flex flex-row justify-between items-center"
            >
              <h3 className="text-4xl max-w-lg leading-relaxed">
                Technology Implementation
              </h3>
              <p className="text-black/40 mx-auto max-w-sm text-md">
                We implement cutting-edge technologies that automate processes
                and drive efficiency across your organization.
              </p>
              <ArrowUpRight className="w-10 h-10" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="border-b border-gray-200 p-6 flex flex-row justify-between items-center"
            >
              <h3 className="text-4xl max-w-lg w-full leading-relaxed">
                Risk Mitigation & Security
              </h3>
              <p className="text-black/40 mx-auto max-w-sm text-md">
                We build robust security frameworks that protect your digital
                assets and ensure business continuity.
              </p>
              <ArrowUpRight className="w-10 h-10" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
