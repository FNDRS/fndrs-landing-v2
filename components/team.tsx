"use client";

import Image from "next/image";
import { MotionDiv } from "@/components/ui/motion-client";
import Link from "next/link";
import { Linkedin, Instagram, Github, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { teamText } from "@/constants/team-translations";
import { BehanceIcon } from "./icons/behance-icon";

type SocialLinks = {
  linkedin?: string;
  instagram?: string;
  github?: string;
  behance?: string;
  website?: string;
};

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const TeamMember = ({
  name,
  role,
  bio,
  image,
  socialLinks,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: SocialLinks;
}) => {
  return (
    <MotionDiv
      className="flex flex-col items-center text-center mb-12"
      variants={fadeIn}
    >
      <div className="w-28 h-28 md:w-52 md:h-52 rounded-full overflow-hidden mb-4">
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="min-h-[6.5rem]">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm font-semibold mt-1 text-[#333]">{role}</p>
        <p className="text-sm text-gray-600 mt-2 max-w-xs leading-loose overflow-hidden line-clamp-3">
          {bio}
        </p>
      </div>

      <div className="flex space-x-3 mt-4">
        {socialLinks.linkedin && (
          <Link target="_blank" href={socialLinks.linkedin}>
            <Linkedin className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
        )}
        {socialLinks.instagram && (
          <Link target="_blank" href={socialLinks.instagram}>
            <Instagram className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
        )}
        {socialLinks.github && (
          <Link target="_blank" href={socialLinks.github}>
            <Github className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
        )}
        {socialLinks.behance && (
          <Link target="_blank" href={socialLinks.behance}>
            <BehanceIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
        )}
        {socialLinks.website && (
          <Link target="_blank" href={socialLinks.website}>
            <Globe className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </Link>
        )}
      </div>
    </MotionDiv>
  );
};

export default function TeamSection() {
  const { language } = useLanguage();
  const t = teamText[language as keyof typeof teamText] || teamText.en;
  const { heading, description, members, badge = "" } = t;

  return (
    <section id="team" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div className="mb-8 md:mb-0">
            <div className="inline-block px-4 py-1 bg-indigo-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              {badge}
            </div>
            <h2 className="text-4xl max-w-[48rem] md:text-5xl font-bold text-gray-900 mb-4">
              {heading}
            </h2>
            <p className="text-gray-600 max-w-2xl">{description}</p>
          </div>
        </MotionDiv>

        <MotionDiv
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {members.map((member, idx) => (
            <TeamMember
              key={idx}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
              socialLinks={member}
            />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
