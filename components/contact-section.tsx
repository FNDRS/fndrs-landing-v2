"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  return (
    <section
      id="contact"
      className="py-20 bg-black text-white rounded-tr-[3rem] rounded-tl-[3rem]"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Let&apos;s Create Together
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Ready to elevate your digital presence? Contact us to discuss how
            FNDRS can turn your ideas into visually captivating realities that
            drive results.
          </motion.p>

          <motion.form
            variants={containerVariants}
            className="bg-black border-white/20 border-2 p-8 rounded-3xl shadow-lg text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-gray-200 border-gray-600 focus:bg-none focus:outline-none text-black placeholder:text-gray-400 focus-within:outline-none focus:border-none"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Subject
              </label>
              <Input
                id="subject"
                placeholder="How can we help you?"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                rows={5}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <Button size="lg" className="w-full sm:w-auto px-8">
                Send Message
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
