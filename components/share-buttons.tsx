"use client";

import { useState, useEffect } from "react";
import { Share2, Linkedin, Twitter, Link, Mail, Check } from "lucide-react";
import { MotionDiv } from "./ui/motion-client";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  position?: "fixed" | "inline";
}

export default function ShareButtons({
  url,
  title,
  description = "",
  position = "fixed",
}: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    // For inline position, always show the buttons
    if (position === "inline") {
      setIsVisible(true);
      setHasAppeared(true);
      return;
    }

    // Fixed position logic (original)
    const handleScroll = () => {
      const articleElement = document.querySelector(".prose");
      const footerElement = document.querySelector("footer");

      if (!articleElement) return;

      const articleRect = articleElement.getBoundingClientRect();
      const footerRect = footerElement?.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Show buttons when article content is in view (with some margin)
      const articleInView =
        articleRect.top < windowHeight * 0.8 &&
        articleRect.bottom > windowHeight * 0.2;

      // Hide buttons when footer starts to appear (with margin)
      const footerInView = footerRect
        ? footerRect.top < windowHeight * 0.9
        : false;

      // Also check if we're past the article content
      const pastArticle = articleRect.bottom < windowHeight * 0.3;

      const shouldBeVisible = articleInView && !footerInView && !pastArticle;
      setIsVisible(shouldBeVisible);

      if (shouldBeVisible && !hasAppeared) {
        setHasAppeared(true);
      }

      // Close share menu when buttons become invisible
      if (!shouldBeVisible && isOpen) {
        setIsOpen(false);
      }
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledHandleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [position, hasAppeared, isOpen]);

  const shareData = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(`${description}\n\n${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleShare = (platform: string) => {
    if (platform === "copy") {
      copyToClipboard();
      return;
    }

    const shareUrl = shareData[platform as keyof typeof shareData];
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: position === "inline" ? 20 : 60,
      scale: position === "inline" ? 0.9 : 0.8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: position === "inline" ? 0.4 : hasAppeared ? 0.3 : 0.6,
        ease: "easeOut",
        staggerChildren:
          position === "inline" ? 0.08 : hasAppeared ? 0.05 : 0.1,
        delayChildren: position === "inline" ? 0.3 : hasAppeared ? 0 : 0.2,
        type: "spring",
        stiffness: position === "inline" ? 150 : 200,
        damping: 20,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      x: 20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  if (!isVisible) return null;

  const containerClasses =
    position === "inline"
      ? "absolute right-full top-32 mr-4 md:mr-8 z-40"
      : "fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-40";

  return (
    <div className={containerClasses}>
      <MotionDiv
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        className="flex flex-col gap-3"
      >
        {/* Main Share Button */}
        <MotionDiv
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            rotate: isOpen ? 45 : 0,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              position === "inline" ? "w-8 h-8 md:w-10 md:h-10" : "w-10 h-10"
            } bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-100`}
            aria-label="Share options"
          >
            <Share2
              className={`${
                position === "inline"
                  ? "w-3 h-3 md:w-4 md:h-4"
                  : "w-4 h-4 md:w-5 md:h-5"
              } text-gray-600`}
            />
          </button>
        </MotionDiv>

        {/* Share Options */}
        {isOpen && (
          <>
            <MotionDiv
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => handleShare("linkedin")}
                className={`${
                  position === "inline"
                    ? "w-8 h-8 md:w-10 md:h-10"
                    : "w-10 h-10"
                } bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-100`}
                aria-label="Share on LinkedIn"
              >
                <Linkedin
                  className={`${
                    position === "inline" ? "w-3 h-3 md:w-4 md:h-4" : "w-4 h-4"
                  } text-gray-800`}
                />
              </button>
            </MotionDiv>

            <MotionDiv
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => handleShare("twitter")}
                className={`${
                  position === "inline"
                    ? "w-8 h-8 md:w-10 md:h-10"
                    : "w-10 h-10"
                } bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-100`}
                aria-label="Share on X (Twitter)"
              >
                <Twitter
                  className={`${
                    position === "inline" ? "w-3 h-3 md:w-4 md:h-4" : "w-4 h-4"
                  } text-gray-800`}
                />
              </button>
            </MotionDiv>

            <MotionDiv
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => handleShare("email")}
                className={`${
                  position === "inline"
                    ? "w-8 h-8 md:w-10 md:h-10"
                    : "w-10 h-10"
                } bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-100`}
                aria-label="Share via email"
              >
                <Mail
                  className={`${
                    position === "inline" ? "w-3 h-3 md:w-4 md:h-4" : "w-4 h-4"
                  } text-gray-800`}
                />
              </button>
            </MotionDiv>

            <MotionDiv
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => handleShare("copy")}
                className={`${
                  position === "inline"
                    ? "w-8 h-8 md:w-10 md:h-10"
                    : "w-10 h-10"
                } shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                  copied ? "bg-green-500" : "bg-white"
                }`}
                aria-label="Copy link"
              >
                {copied ? (
                  <Check
                    className={`${
                      position === "inline"
                        ? "w-3 h-3 md:w-4 md:h-4"
                        : "w-4 h-4"
                    } text-white`}
                  />
                ) : (
                  <Link
                    className={`${
                      position === "inline"
                        ? "w-3 h-3 md:w-4 md:h-4"
                        : "w-4 h-4"
                    } text-gray-800`}
                  />
                )}
              </button>
            </MotionDiv>
          </>
        )}
      </MotionDiv>
    </div>
  );
}
