"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const SolutionsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">We Blend Beauty And Functionality Seamlessly</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our user-friendly design makes technology a breeze, transforming complex processes into elegant,
              intuitive, and usable solutions. We believe that great design should not only look good but also work
              flawlessly.
            </p>
            <Button className="font-medium">Get In Touch Now</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Digital solutions showcase"
              width={800}
              height={600}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">Digital Transformation</h3>
                <p className="text-sm text-gray-200">
                  See how we transformed a traditional business into a digital powerhouse
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection

