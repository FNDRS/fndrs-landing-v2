"use client";

import React, { useRef } from "react";
import { termsText } from "@/constants/terms-translations";
import { useLanguage } from "@/context/lang-context";
import { useInViewObserver } from "@/hooks/use-motion-in-view";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionSection,
} from "@/components/ui/motion-client";

export default function Terms() {
  const ref = useRef(null);
  const isInView = useInViewObserver(ref, { threshold: 0.3 });

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
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <MotionH2 variants={itemVariants} className="text-2xl font-light mb-4">
          {t.title}
        </MotionH2>

        <MotionP variants={itemVariants} className="text-sm text-gray-500 mb-4">
          {t.intro}
        </MotionP>

        <MotionSection variants={containerVariants} className="space-y-6">
          {t.sections.map((section, idx) => (
            <MotionDiv key={idx} variants={itemVariants}>
              <h3 className="text-lg font-light mb-2">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.content}</p>
            </MotionDiv>
          ))}
        </MotionSection>
      </MotionDiv>
    </main>
  );
}
