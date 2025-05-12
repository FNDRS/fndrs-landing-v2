"use client";

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

  return (
    <section id="about" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-normal text-center mb-4"
          >
            FNDRS&apos;s Solutions Surpass Expectations
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-center mb-16 text-lg"
          >
            We are your partner in crafting digital brilliance. Our expertise
            spans across multiple domains to deliver exceptional results.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-2xl font-normal mb-4">Passionate Creators</h3>
              <p className="text-gray-600">
                We are a team of visionary creators, strategists, and
                innovators. With a deep passion for design and technology.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-2xl font-normal mb-4">Innovators</h3>
              <p className="text-gray-600">
                We constantly push the boundaries of what's possible, bringing
                fresh ideas and innovative solutions to every project.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-2xl font-normal mb-4">Visionaries</h3>
              <p className="text-gray-600">
                We don't just solve today's problems – we anticipate tomorrow's
                challenges and prepare your business for the future.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
