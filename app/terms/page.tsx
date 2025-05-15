"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { termsText } from "@/constants/terms-translations";
import { useLanguage } from "@/context/lang-context";

export default function Terms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const t = termsText[language as keyof typeof termsText];

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
    <main
      ref={ref}
      className="max-w-3xl font-light mx-auto px-4 py-32 text-black space-y-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-light mb-4">
          {t.title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-sm text-gray-500 mb-4"
        >
          {t.intro}
        </motion.p>

        <motion.section variants={containerVariants} className="space-y-6">
          {t.sections.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h3 className="text-lg font-light mb-2">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.content}</p>
            </motion.div>
          ))}
        </motion.section>
      </motion.div>
    </main>
  );
}
