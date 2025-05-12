import Link from "next/link";

const Stages = () => {
  const developmentStages = [
    {
      step: 1,
      title: "Discovery & Planning",
      description:
        "We begin with a thorough analysis of your business needs and objectives. Our team works closely with stakeholders to define project scope, gather requirements, and establish clear goals and timelines for successful delivery.",
    },
    {
      step: 2,
      title: "Design & Architecture",
      description:
        "Our design phase focuses on creating intuitive user experiences and robust system architecture. We develop wireframes, prototypes, and technical specifications that serve as the blueprint for your software solution.",
    },
    {
      step: 3,
      title: "Development",
      description:
        "Using agile methodologies, our development team builds your solution with clean, maintainable code. We work in iterative cycles, delivering functional components regularly and incorporating feedback throughout the process.",
    },
    {
      step: 4,
      title: "Testing & QA",
      description:
        "Quality is paramount in our process. We implement comprehensive testing strategies including automated testing, performance testing, and user acceptance testing to ensure your software meets the highest standards of reliability and performance.",
    },
    {
      step: 5,
      title: "Deployment",
      description:
        "We handle the seamless deployment of your solution to production environments, ensuring proper configuration, security measures, and monitoring systems are in place for optimal performance and stability.",
    },
    {
      step: 6,
      title: "Maintenance & Support",
      description:
        "Our relationship continues after launch with dedicated support and maintenance services. We provide regular updates, performance optimization, and responsive technical support to keep your software running smoothly.",
    },
  ];

  return (
    <section id="process" className="max-w-6xl mx-auto px-4 py-20">
      <div className="mb-8">
        <div className="uppercase text-sm tracking-wider text-gray-500 mb-4">
          PROCESS
        </div>
        <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug mb-8">
          We prioritize{" "}
          <span className="text-gray-400">close collaboration</span> with you at
          every step, ensuring personalized attention to your preferences,{" "}
          <span className="text-gray-400">eliminating any worries</span> about
          lack of involvement or disappointments.
        </p>
      </div>

      <div className="border-t border-gray-200">
        {developmentStages.map((stage, index) => (
          <div key={index} className="py-10 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-1">
                <div className="text-xs text-gray-400">step {stage.step}</div>
              </div>
              <div className="col-span-5">
                <h3 className="text-3xl md:text-4xl font-normal">
                  {stage.title}
                </h3>
              </div>
              <div className="col-span-6 flex justify-end">
                <p className="text-sm text-gray-600 max-w-[400px] leading-loose">
                  {stage.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-light mb-4">Start a project?</h2>
        <Link
          href="/contact"
          className="text-xs uppercase inline-flex items-center hover:underline"
        >
          CONTACT US
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Stages;
