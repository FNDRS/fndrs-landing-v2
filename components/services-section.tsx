"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { servicesText } from "@/constants/services-translations";
import { useLanguage } from "@/context/lang-context";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const t = servicesText[language as keyof typeof servicesText];

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
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-4 mx-auto max-w-md"
          >
            {t.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-500 text-base sm:text-md text-center mb-16 max-w-2xl mx-auto"
          >
            {t.description}
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="max-w-9xl mx-auto space-y-6"
          >
            {t.services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border-b border-gray-200 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6"
              >
                <h3 className="text-4xl md:text-4xl w-full max-w-lg min-w-lg">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-md max-w-sm">
                  {service.description}
                </p>
                <ArrowUpRight className="w-10 h-10" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
