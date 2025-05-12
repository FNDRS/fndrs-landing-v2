"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <footer id="footer" className="bg-black text-white overflow-hidden">
      <motion.div
        className="p-8 md:p-12 border-b border-zinc-800"
        {...fadeInUp}
      >
        <div className="container mx-auto grid md:grid-cols-[minmax(0,_600px)_1fr] gap-8">
          <div>
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 bg-white/80 rounded-full" />
                <p className="text-xs text-white/70">
                  Open for any collaboration
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-normal">
                Book a free consultation now to discover how we can help your
                business to thrive!
              </h2>
            </motion.div>
            <motion.div className="mt-8" {...fadeInUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors"
              >
                <span>Get started today</span>
                <span className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="flex flex-col justify-center md:items-end space-y-6"
            {...fadeInUp}
          >
            <div></div>
            <div>
              <h3 className="text-zinc-400 mb-1">Email address</h3>
              <a href="mailto:contact@fndrs.com" className="text-sm">
                contact@fndrs.com
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="p-8 md:p-12 border-b border-zinc-800"
        {...fadeInUp}
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <motion.div className="lg:col-span-1 w-full" {...fadeInUp}>
            <p className="text-lg mb-6 max-w-sm">
              Ready to elevate your digital presence? Contact us to discuss how
              FNDRS can turn your ideas into visually captivating realities that
              drive results.
            </p>
            <div>
              <h3 className="mb-4">Visit us on:</h3>
              <div className="flex gap-2">
                <Link
                  href="https://www.instagram.com/the.fndrs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/the-fndrs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-3 gap-8" {...fadeInUp}>
            <div>
              <h3 className="text-md text-zinc-500 font-medium mb-6">
                Navigation
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#home"
                    className="hover:text-zinc-300 transition-colors text-sm"
                  >
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-zinc-300 transition-colors text-sm"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#process"
                    className="hover:text-zinc-300 transition-colors text-sm"
                  >
                    Our Process
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-md font-medium mb-6 text-zinc-500">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#about"
                    className="hover:text-zinc-300 transition-colors text-sm"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#team"
                    className="hover:text-zinc-300 transition-colors text-sm"
                  >
                    Career
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-md font-medium mb-6 text-zinc-500">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="hover:text-zinc-300 transition-colors text-sm"
                  >
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-zinc-300 transition-colors text-sm"
                  >
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="p-6" {...fadeInUp}>
        <div className="container mx-auto">
          <p className="text-center text-sm text-zinc-500">
            Copyright © {new Date().getFullYear()} FNDRS. All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
