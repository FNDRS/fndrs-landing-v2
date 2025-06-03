// components/Team.tsx

"use client";

import Image from "next/image";
import { useRef } from "react";
import { teamText } from "@/constants/team-translations";
import { useLanguage } from "@/hooks/use-language";
import { MotionDiv, MotionH2 } from "./ui/motion-client";
import { useInViewObserver } from "@/hooks/use-motion-in-view";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const TeamMember = ({
  name,
  role,
  image,
  linkedin,
}: {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}) => {
  return (
    <MotionDiv
      className="flex flex-col md:w-1/3 items-center text-center"
      variants={itemVariants}
    >
      {/* Contenedor cuadrado y redondo */}
      <div className="w-64 h-64 rounded-full overflow-hidden mb-4">
        <Image
          src={image || "/assets/misc/placeholder.svg"}
          alt={name}
          width={256}
          height={256}
          sizes="256px"
          className="w-full h-full object-cover object-center object-[50%_30%]"
        />
      </div>

      {/* Bloque nombre+rol con altura mínima */}
      <div className="min-h-[4.5rem]">
        <h3 className="text-md font-medium">{name}</h3>
        <p className="text-sm mt-1 text-gray-500">{role}</p>
      </div>

      {linkedin && (
        <Link href={linkedin} className="mt-3 inline-block group">
          <span className="relative inline-block text-sm font-semibold text-blue-500 transition-colors duration-200 hover:text-blue-500">
            Learn More
            <span className="absolute left-0 -bottom-1 block h-[4px] w-full bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
          <ArrowUpRight
            className="ml-1 h-4 w-4 inline-block"
            color="#3b82f6"
            strokeWidth={3}
          />
        </Link>
      )}
    </MotionDiv>
  );
};

const Team = () => {
  const ref = useRef(null);
  const isInView = useInViewObserver(ref, { threshold: 0.3 });

  const { language } = useLanguage();
  const t = teamText[language as keyof typeof teamText];

  return (
    <section id="team" className="px-4 py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <MotionH2
            className="text-4xl font-bold md:text-6xl md:font-medium max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {language === "es" ? (
              <>
                Conoce al equipo{" "}
                <span className="font-bold text-[#333]">Fundador</span> que lo
                hace posible
              </>
            ) : (
              <>
                Meet the <span className="font-bold text-[#333]">Founding</span>{" "}
                team that makes it all happen
              </>
            )}
          </MotionH2>
          <MotionDiv
            className="flex items-center justify-end"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-md text-gray-500 max-w-sm leading-loose">
              {t.description}
            </p>
          </MotionDiv>
        </div>

        <MotionDiv
          className="flex flex-col w-full justify-center items-center md:flex-row gap-8 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <MotionDiv
            className="flex flex-col md:flex-row justify-center gap-8 md:gap-12 max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {t.members.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image ?? "/assets/misc/placeholder.svg"}
                linkedin={member.linkedin}
              />
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Team;
