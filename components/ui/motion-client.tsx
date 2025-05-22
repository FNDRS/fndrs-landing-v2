"use client";

import dynamic from "next/dynamic";
import type { MotionProps } from "framer-motion";
import React from "react";
import type { JSX } from "react";

const withSafeMotion = <T extends keyof JSX.IntrinsicElements>(tag: T) =>
  dynamic(
    () =>
      import("framer-motion").then((mod) => {
        const Component = (mod.motion as Record<string, any>)[tag];

        return (props: MotionProps & JSX.IntrinsicElements[T]) => {
          const safeProps = { ...props };

          // Eliminar callbacks inválidos
          ["onStart", "onUpdate", "onComplete"].forEach((key) => {
            const k = key as keyof MotionProps;
            if (typeof safeProps[k] !== "function") {
              delete safeProps[k];
            }
          });

          return <Component {...safeProps} />;
        };
      }),
    { ssr: false }
  );

export const MotionDiv = withSafeMotion("div");
export const MotionH2 = withSafeMotion("h2");
export const MotionP = withSafeMotion("p");
export const MotionSection = withSafeMotion("section");
export const MotionForm = withSafeMotion("form");
export const MotionHeader = withSafeMotion("header");

export const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);
