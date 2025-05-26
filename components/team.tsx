"use client";

import Image from "next/image";
import { useRef } from "react";
import { teamText } from "@/constants/team-trasnlations";
import { useLanguage } from "@/hooks/use-language";
import { MotionDiv, MotionH2 } from "./ui/motion-client";
import { useInViewObserver } from "@/hooks/use-motion-in-view";

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
  bio,
  image,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
}) => {
  return (
    <MotionDiv className="flex flex-col md:w-1/3" variants={itemVariants}>
      <div className={`rounded-2xl overflow-hidden mb-3`}>
        <Image
          src={image || "/assets/misc/placeholder.svg"}
          alt={name}
          width={384}
          height={384}
          sizes="384px"
          className="w-full h-96 object-cover aspect-square"
        />
      </div>
      <h3 className="text-md font-medium mb-1">{name}</h3>
      <p className="text-md mb-2">{role}</p>
      <p className="text-[#6c6c6c] text-sm leading-loose">{bio}</p>
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
                bio={member.bio}
                image={member.image ?? "/assets/misc/placeholder.svg"}
              />
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Team;
