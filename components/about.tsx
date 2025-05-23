"use client";

import { aboutText } from "@/constants/about-translations";
import { useLanguage } from "@/context/lang-context";
import { useInViewObserver } from "@/hooks/use-motion-in-view";
import { useRef } from "react";
import { MotionDiv, MotionH2, MotionP } from "./ui/motion-client";

const About = () => {
  const ref = useRef(null);
  const isInView = useInViewObserver(ref, { threshold: 0.3 });

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

  const { language } = useLanguage();
  const t = aboutText[language as keyof typeof aboutText];

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <MotionH2
            variants={itemVariants}
            className="md:text-5xl text-3xl font-normal text-center mb-4"
          >
            {t.title}
          </MotionH2>

          <MotionP
            variants={itemVariants}
            className="text-gray-500 text-center mb-16 text-lg"
          >
            {t.description}
          </MotionP>

          <MotionDiv
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {t.cards.map((card, index) => (
              <MotionDiv
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <h3 className="text-2xl font-normal mb-4">{card.heading}</h3>
                <p className="text-gray-500">{card.text}</p>
              </MotionDiv>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default About;
