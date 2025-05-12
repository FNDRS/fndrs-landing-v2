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
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-4 mx-auto max-w-md"
          >
            Services we Offer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-500 text-base sm:text-md text-center mb-16 max-w-2xl mx-auto"
          >
            FNDRS covers to a wide range of clients, from small business to
            large enterprises, ensuring each project is tailored to meet the
            specific needs and goals of the clients. From user-friendly websites
            to functional applications, our team of experts delivers functional
            solutions.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="max-w-9xl mx-auto space-y-6"
          >
            {[
              {
                title: "Digital Strategy & Consulting",
                description:
                  "Our strategic consulting helps chart your digital transformation journey with clear roadmap and actionable insights.",
              },
              {
                title: "Website & Mobile Development",
                description:
                  "We create responsive websites and powerful mobile applications that engage users and drive conversions.",
              },
              {
                title: "UX/UI Design",
                description:
                  "Our user-centered design creates intuitive, engaging interfaces that enhance user satisfaction and business outcomes.",
              },
              {
                title: "Technology Implementation",
                description:
                  "We implement cutting-edge technologies that automate processes and drive efficiency across your organization.",
              },
              {
                title: "Risk Mitigation & Security",
                description:
                  "We build robust security frameworks that protect your digital assets and ensure business continuity.",
              },
            ].map((service, idx) => (
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
