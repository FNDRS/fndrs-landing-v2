"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin } from "lucide-react";
import { footerText } from "@/constants/footer";
import { useLanguage } from "@/context/lang-context";
import { LanguageSwitcher } from "./ui/language-switcher";

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  const { language } = useLanguage();
  const t = footerText[language as keyof typeof footerText];

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
                <p className="text-xs text-white/70">{t.collaborationNote}</p>
              </div>
            </motion.div>
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 leading-normal">
                {t.consultationTitle}
              </h2>
            </motion.div>
            <motion.div className="mt-8" {...fadeInUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-700 rounded-full hover:bg-zinc-900 transition-colors"
              >
                <span>{t.cta}</span>
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
              <h3 className="text-zinc-400 mb-1">{t.contactEmail}</h3>
              <a href="mailto:contact@fndrs.com" className="text-sm">
                {t.contactLabel}
              </a>
              <LanguageSwitcher />
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
            <p className="text-lg mb-6 max-w-sm">{t.introParagraph}</p>
            <div>
              <h3 className="mb-4">{t.socialTitle}</h3>
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
                <Link
                  href="https://github.com/FNDRS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
                >
                  <Github size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-3 gap-8" {...fadeInUp}>
            <div>
              <h3 className="text-md text-zinc-500 font-medium mb-6">
                {t.navTitle}
              </h3>
              <ul className="space-y-4">
                {t.navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-zinc-300 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-md font-medium mb-6 text-zinc-500">
                {t.companyTitle}
              </h3>
              <ul className="space-y-4">
                {t.companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-zinc-300 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-md font-medium mb-6 text-zinc-500">
                {t.legalTitle}
              </h3>
              <ul className="space-y-4">
                {t.legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-zinc-300 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="p-6" {...fadeInUp}>
        <div className="container mx-auto">
          <p className="text-center text-sm text-zinc-500">
            {t.copyright(new Date().getFullYear())}
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
