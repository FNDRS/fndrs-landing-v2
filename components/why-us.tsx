"use client";

import { whyUsText } from "@/constants/why-us-translations";
import { useLanguage } from "@/context/lang-context";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Lightbulb,
  Brain,
  Handshake,
  Clock,
} from "lucide-react";

const WhyUsSection = () => {
  const { language } = useLanguage();
  const t = whyUsText[language as keyof typeof whyUsText];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const icons = [
    <Building2 className="w-8 h-8 text-gray-600" />,
    <Users className="w-8 h-8 text-gray-600" />,
    <Lightbulb className="w-8 h-8 text-gray-600" />,
    <Brain className="w-8 h-8 text-gray-600" />,
    <Handshake className="w-8 h-8 text-gray-600" />,
    <Clock className="w-8 h-8 text-gray-600" />,
  ];

  return (
    <section id="whyUs" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {t.heading}
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto mb-4">
            {t.description}
          </p>
          <p className="text-lg font-light text-gray-700 ">"{t.quote}"</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
              className="border border-gray-200 rounded-lg p-6 flex flex-col h-full relative"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-6xl font-thin text-gray-300">
                  {reason.number}
                </span>
                <div className="flex justify-end">{icons[index]}</div>
              </div>
              <h3 className="text-xl font-normal text-gray-800 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-500 text-sm flex-grow">
                {reason.description}
              </p>
            </motion.div>
          ))}

          {/*  <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            variants={fadeIn}
            className="bg-black rounded-lg p-8 flex flex-col justify-center items-center text-white md:col-span-2 lg:col-span-1 shadow-2xl"
          >
            <h3 className="text-2xl font-normal mb-4 text-center">
              {t.ctaTitle}
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              {t.ctaButton} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
