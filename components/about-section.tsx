"use client";

import { aboutText } from "@/constants/about-translations";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const lang = "es";
  const t = aboutText[lang];

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="md:text-5xl text-3xl font-normal text-center mb-4"
          >
            {t.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-500 text-center mb-16 text-lg"
          >
            {t.description}
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {t.cards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <h3 className="text-2xl font-normal mb-4">{card.heading}</h3>
                <p className="text-gray-500">{card.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
