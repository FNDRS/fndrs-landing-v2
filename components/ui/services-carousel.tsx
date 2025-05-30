"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { MotionDiv } from "./motion-client";

interface ServiceCarouselProps {
  className?: string;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({
  className = "",
}) => {
  const services = [
    "Branding",
    "Development",
    "Agency",
    "Brand Guideline",
    "Website",
    "Mobile",
    "UX/UI Design",
    "Digital Strategy",
    "Consulting",
  ];

  const allServices = [...services, ...services];

  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div
      className={`${className} w-full overflow-hidden bg-black text-white py-8 select-none`}
    >
      <MotionDiv
        ref={carouselRef}
        className="flex items-center whitespace-nowrap"
        initial={{ x: 0 }}
        animate={{ x: -width }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {allServices.map((service, index) => (
          <div
            key={`${service}-${index}`}
            className="flex items-center opacity-90 hover:opacity-100 transition-opacity"
          >
            {index > 0 && (
              <span className="w-1 h-1 bg-white rounded-full opacity-50 mx-8"></span>
            )}
            <span className="text-lg font-normal">{service}</span>
          </div>
        ))}
      </MotionDiv>
    </div>
  );
};

export default ServiceCarousel;
