"use client";

import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-client";
import { ArrowUpRight } from "lucide-react";
import ServiceCarousel from "./ui/services-carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { heroText } from "@/constants/hero-section-translations";
import { useLanguage } from "@/hooks/use-language";
import { useAnalytics } from "@/hooks/use-posthog";

const Home = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const { trackButtonClick } = useAnalytics();
  const t = heroText[language as keyof typeof heroText];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white to-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.title}
            </h1>
            <p
              className="text- leading-loose text-gray-500 font-normal mb-8 max-w-lg"
              data-lcp
            >
              <strong className="font-bold">FNDRS </strong>
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="font-medium bg-black text-white"
                variant="outline"
                onClick={() => {
                  trackButtonClick("get_started", "hero_section");
                  router.push("#process");
                }}
              >
                {t.getStarted}
                <ArrowUpRight className="ml-2" size={16} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium hover:bg-gray-100 hover:text-gray-800"
                onClick={() => {
                  trackButtonClick("view_services", "hero_section");
                  router.push("#services");
                }}
              >
                {t.viewServices}
              </Button>
            </div>
          </MotionDiv>

          <MotionDiv
            className="relative flex flex-row gap-2 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-[60%] h-[450px]">
              <Image
                priority
                quality={80}
                src="/assets/branding/hero-1.webp"
                alt="Hero image"
                fill
                sizes="(min-width: 1600px) 391px,
                  (min-width: 1300px) calc(10.71vw + 222px),
                  (min-width: 780px) calc(3.4vw + 311px),
                  (min-width: 640px) calc(60vw - 24px),
                  329px"
                className="absolute inset-0 w-full h-full text-transparent rounded-xl shadow-lg object-cover grayscale"
              />
            </div>
            <div className="flex flex-col gap-2 w-[40%]">
              <div className="relative w-full h-[225px]">
                <Image
                  priority
                  quality={80}
                  src="/assets/branding/hero-2.webp"
                  className="absolute inset-0 w-full h-full text-transparent rounded-xl shadow-lg object-cover grayscale"
                  alt="Hero image 2"
                  fill
                  sizes="(min-width: 1480px) 261px,
                    (min-width: 1000px) 17.39vw,
                    (min-width: 780px) calc(4vw + 138px),
                    (min-width: 500px) calc(40vw - 16px),
                    calc(3.89vw + 157px)"
                />
              </div>
              <div className="relative w-full h-[225px]">
                <Image
                  priority
                  quality={80}
                  src="/assets/branding/hero-3.webp"
                  className="absolute inset-0 w-full h-full text-transparent rounded-xl shadow-lg object-cover grayscale"
                  alt="Hero image 3"
                  fill
                  sizes="(min-width: 1480px) 261px,
                    (min-width: 1000px) 17.39vw,
                    (min-width: 780px) calc(4vw + 138px),
                    (min-width: 500px) calc(40vw - 16px),
                    calc(3.89vw + 157px)"
                />
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 md:mt-24 relative z-10"
      >
        <ServiceCarousel />
      </MotionDiv>
    </section>
  );
};

export default Home;
