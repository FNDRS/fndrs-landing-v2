"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">FNDRS</span>
          <span className="  pl-2 border-l-[1px] border-gray-200">Agency</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#"
            className="  hover:text-black text-sm transition-colors font-semibold"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="  hover:text-black text-sm transition-colors font-semibold"
          >
            Why Us
          </Link>
          <Link
            href="#services"
            className="  hover:text-black text-sm transition-colors font-semibold"
          >
            Services
          </Link>
          <Link
            href="#work"
            className="  hover:text-black text-sm transition-colors font-semibold"
          >
            Our Work
          </Link>
          <Link
            href="#contact"
            className="  hover:text-black text-sm transition-colors font-semibold"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button variant="outline">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden  " onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="#"
              className="  hover:text-black transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="  hover:text-black transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Why Us
            </Link>
            <Link
              href="#services"
              className="  hover:text-black transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#work"
              className="  hover:text-black transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Our Work
            </Link>
            <Link
              href="#contact"
              className="  hover:text-black transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Button className="w-full">Get Started</Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
