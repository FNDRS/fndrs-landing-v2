"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  // Duplicamos los servicios para crear un efecto infinito
  const allServices = [...services, ...services];

  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      // Obtenemos el ancho total del contenido
      setWidth(carouselRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div
      className={`${className} w-full overflow-hidden bg-black text-white py-4`}
    >
      <motion.div
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
      </motion.div>
    </div>
  );
};

export default ServiceCarousel;
