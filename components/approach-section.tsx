"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Users, LightbulbIcon, Clock, Sparkles } from "lucide-react"

const ApproachSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Client-Centric Approach</h3>
              <p className="text-gray-600">
                We put your needs first, ensuring solutions that align perfectly with your goals and vision.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <LightbulbIcon className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Strategic Thinking</h3>
              <p className="text-gray-600">
                We analyze every angle of your challenge to create solutions that drive long-term success.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Creative Excellence</h3>
              <p className="text-gray-600">
                We blend artistic vision with technical expertise to deliver stunning, functional designs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Timely Delivery</h3>
              <p className="text-gray-600">
                We respect your timelines and consistently deliver high-quality solutions on schedule.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Approach Makes the Difference</h2>
            <p className="text-lg text-gray-600 mb-8">
              At FNDRS, we combine innovative thinking with proven methodologies to create digital solutions that not
              only meet your current needs but prepare you for future challenges.
            </p>
            <p className="text-lg text-gray-600">
              We mitigate risk and drive efficiency through our unique blend of people, process, and technology
              expertise, ensuring your digital transformation journey is smooth and successful.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ApproachSection

