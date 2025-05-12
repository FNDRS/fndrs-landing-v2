"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionH2 = motion("h2");
const MotionDiv = motion.div;

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
  bgColor,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
  bgColor: string;
}) => {
  return (
    <motion.div className="flex flex-col" variants={itemVariants}>
      <div className={`rounded-2xl overflow-hidden mb-3 ${bgColor}`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={320}
          height={320}
          className="w-full h-auto object-cover aspect-square"
        />
      </div>
      <h3 className="text-md font-medium mb-1">{name}</h3>
      <p className="text-md mb-2">{role}</p>
      <p className="text-[#6c6c6c] text-sm leading-loose">{bio}</p>
    </motion.div>
  );
};

const Team = () => {
  const teamRef = useRef(null);
  const isInView = useInView(teamRef, { once: true, amount: 0.2 });

  const teamMembers = [
    {
      name: "Carlos Alberto",
      role: "Software Engineer & Cloud Architect",
      bio: "Backend specialist working on scalable architectures for startups. Expert in cloud infrastructure and API development.",
      image: "/placeholder.svg?height=400&width=400",
      bgColor: "bg-blue-100",
    },
    {
      name: "Jorge Torres",
      role: "Product Designer & Creative Director",
      bio: "Heads design at FNDRS, blending UX/UI strategy with visual storytelling to create impactful digital experiences.",
      image: "/placeholder.svg?height=400&width=400",
      bgColor: "bg-purple-100",
    },
    {
      name: "M Geovany Castro",
      role: "Software Engineer & Project Manager",
      bio: "Leads software delivery at FNDRS, former experience in fintech and startups like Savvly, developing web and mobile apps.",
      image: "/placeholder.svg?height=400&width=400",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <section id="team" className="px-4 py-20 bg-gray-50" ref={teamRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <MotionH2
            className="text-4xl md:text-5xl font-normal leading-tight max-w-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Meet the <span className="font-bold text-[#333]">Founding</span>{" "}
            team that makes it all happen
          </MotionH2>
          <MotionDiv
            className="flex items-center justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-md text-gray-500 max-w-sm leading-loose">
              We have spent years working on startups, building out digital
              experiences and working on tech companies.
            </p>
          </MotionDiv>
        </div>

        <motion.div
          className="flex flex-col md:flex-row gap-8 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
              bgColor={member.bgColor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
