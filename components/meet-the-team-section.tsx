import Image from "next/image";

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
    <div className="flex flex-col">
      <div className={`rounded-2xl overflow-hidden mb-5 ${bgColor}`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="w-full h-auto object-cover aspect-square"
        />
      </div>
      <h3 className="text-md font-medium mb-1">{name}</h3>
      <p className="text-md mb-2">{role}</p>
      <p className="text-[#6c6c6c] text-sm leading-loose">{bio}</p>
    </div>
  );
};

const Team = () => {
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
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
          Meet the FOUNDER team that makes it all happen
        </h1>
        <div className="flex items-center justify-end">
          <p className="text-sm text-gray-600 max-w-[300px] leading-loose">
            We have spent years working on startups, building out digital
            experiences and working on tech companies.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-16">
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
      </div>
    </div>
  );
};

export default Team;
