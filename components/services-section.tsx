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
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Tailored Solutions For Your Needs
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-center mb-16 max-w-2xl mx-auto"
          >
            From sleek mobile applications to enterprise-level websites, we have
            the expertise needed to deliver.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="max-w-4xl mx-auto space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Digital Strategy & Consulting
                </h3>
                <p className="text-gray-600">
                  Our strategic consulting helps chart your digital
                  transformation journey with clear roadmaps and actionable
                  insights.
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-400" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Web & Mobile Development
                </h3>
                <p className="text-gray-600">
                  We create responsive websites and powerful mobile applications
                  that engage users and drive conversions.
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-400" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">UX/UI Design</h3>
                <p className="text-gray-600">
                  Our user-centered design creates intuitive, engaging
                  interfaces that enhance user satisfaction and business
                  outcomes.
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-400" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Technology Implementation
                </h3>
                <p className="text-gray-600">
                  We implement cutting-edge technologies that automate processes
                  and drive efficiency across your organization.
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-400" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Risk Mitigation & Security
                </h3>
                <p className="text-gray-600">
                  We build robust security frameworks that protect your digital
                  assets and ensure business continuity.
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
