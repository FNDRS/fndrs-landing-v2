"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const SuccessSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="work" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center mb-4">
            Witness Our Success Stories
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Take a tour through our work that reflects our commitment to excellence and the many projects we've
            successfully delivered.
          </motion.p>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Dashboard application"
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise Dashboard</h3>
                  <p className="text-gray-600">
                    A comprehensive analytics dashboard that provides real-time insights for a Fortune 500 company.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-600 mb-8">
                Our portfolio showcases our versatility and expertise across industries - from banking solutions to
                healthcare applications.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative aspect-square">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Mobile app"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold">FinTech App</h4>
                    <p className="text-sm text-gray-600">Mobile banking solution</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative aspect-square">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="E-commerce platform"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold">E-commerce Platform</h4>
                    <p className="text-sm text-gray-600">Retail digital transformation</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative aspect-square">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Healthcare application"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold">Healthcare Portal</h4>
                    <p className="text-sm text-gray-600">Patient management system</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative aspect-square">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="IoT dashboard"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold">IoT Dashboard</h4>
                    <p className="text-sm text-gray-600">Industrial monitoring system</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default SuccessSection

