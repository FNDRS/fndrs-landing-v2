"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { navbarText } from "@/constants/navbar-translations";
import { useLanguage } from "@/context/lang-context";
import Image from "next/image";
import { AnimatePresence, MotionDiv, MotionHeader } from "./ui/motion-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { language } = useLanguage();
  const t = navbarText[language as keyof typeof navbarText];

  return (
    <MotionHeader
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/#home" className="flex items-center space-x-2">
          <Image
            priority
            quality={100}
            src="/assets/branding/fndrs-logo.webp"
            alt="FNDRS logo"
            width={35}
            height={25}
            className="h-4 w-auto object-cover invert"
          />

          <span className="pl-2 border-l border-black/40">Agency</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {t.nav.map(({ href, label }) => (
            <Link key={href} href={href} className="group inline-block">
              <span className="relative inline-block text-sm font-semibold text-black/70 transition-colors duration-200 hover:text-black">
                {label}
                <span className="absolute left-0 -bottom-1 block h-[4px] w-full bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="outline" onClick={() => router.push("/contact")}>
            {t.cta}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={
            isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
          }
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            key="mobile-menu"
            className="absolute top-full left-0 w-full bg-white border-t border-zinc-200 shadow-2xl rounded-b-3xl md:hidden z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {t.nav.map(({ href, label }) => (
                  <MotionDiv
                    key={href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="block text-base font-medium text-black hover:text-zinc-600 transition-colors"
                    >
                      {label}
                    </Link>
                  </MotionDiv>
                ))}
              </div>

              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                <Button
                  className="w-full bg-black text-white"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/contact");
                  }}
                >
                  {t.mobileCTA}
                </Button>
              </MotionDiv>

              <MotionDiv
                className="flex gap-2 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href="https://www.instagram.com/the.fndrs/"
                  target="_blank"
                  aria-label="FNDRS's Instagram"
                  className="w-10 h-10 flex items-center justify-center border border-zinc-300 rounded-full hover:bg-zinc-100 transition-colors"
                >
                  <Instagram size={18} />
                </Link>

                <Link
                  href="https://github.com/FNDRS"
                  target="_blank"
                  aria-label="FNDRS's Github Organization"
                  className="w-10 h-10 flex items-center justify-center border border-zinc-300 rounded-full hover:bg-zinc-100 transition-colors"
                >
                  <Github size={18} />
                </Link>

                <Link
                  href="https://www.linkedin.com/company/the-fndrs/"
                  target="_blank"
                  aria-label="FNDRS's LinkedIn Profile"
                  className="w-10 h-10 flex items-center justify-center border border-zinc-300 rounded-full hover:bg-zinc-100 transition-colors"
                >
                  <Linkedin size={18} />
                </Link>
              </MotionDiv>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionHeader>
  );
};

export default Navbar;
