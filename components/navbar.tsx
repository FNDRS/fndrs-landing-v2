"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const navItems = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "Why Us" },
    { href: "/#process", label: "Our Process" },
    { href: "/#services", label: "Services" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/#home" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">FNDRS</span>
          <span className="pl-2 border-l border-black/40">Agency</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="group inline-block">
              <span
                className="
          relative inline-block text-sm font-semibold text-black/70
          transition-colors duration-200
          hover:text-black
        "
              >
                {label}
                <span
                  className="
            absolute left-0 -bottom-1 block h-[4px] w-full bg-black
            transform scale-x-0
            origin-left
            transition-transform duration-300 ease-out
            group-hover:scale-x-100
          "
                />
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="outline" onClick={() => router.push("/contact")}>
            Discuss a project
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
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
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-black transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Button className="w-full">Get Started</Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
