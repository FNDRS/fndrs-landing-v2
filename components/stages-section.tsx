"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stagesText } from "@/constants/stages.translations";

const Stages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const lang = "es";
  const t = stagesText[lang];

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="process" className="md:max-w-6xl mx-auto px-4 py-20" ref={ref}>
      <div className="mb-8">
        <div className="uppercase text-sm tracking-wider text-gray-500 mb-4">
          PROCESS
        </div>
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t.intro.split(" ").map((word, i) =>
            word === "close" ||
            word === "collaboration" ||
            word === "eliminating" ||
            word === "any" ||
            word === "worries" ||
            word === "colaboración" ||
            word === "cercana" ||
            word === "eliminando" ||
            word === "cualquier" ||
            word === "preocupación" ? (
              <span key={i} className="text-gray-400">
                {word}{" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </motion.p>
      </div>

      <motion.div
        className="border-t border-gray-200"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {t.stages.map((stage, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="py-10 border-b border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-1">
                <div className="text-xs text-gray-400">step {stage.step}</div>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-2xl md:text-3xl font-normal">
                  {stage.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-md text-gray-500 max-w-full leading-loose">
                  {stage.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl md:text-3xl font-light mb-4">{t.cta.title}</h3>
        <Link
          href="/contact"
          className="text-xs uppercase inline-flex items-center hover:underline"
        >
          {t.cta.link}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default Stages;
