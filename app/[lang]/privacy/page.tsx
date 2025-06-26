import { privacyText } from "@/constants/privacy-translations";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionSection,
} from "@/components/ui/motion-client";
import { Metadata } from "next";

type Props = {
  params: { lang: string };
};

export const metadata: Metadata = {
  title: "Privacy Policy | FNDRS",
  description: "Read our privacy policy to understand how we handle your data.",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Privacy({ params }: Props) {
  const t = privacyText[params.lang as keyof typeof privacyText];

  return (
    <MotionDiv
      className="max-w-2xl mx-auto px-4 py-32 text-black space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <MotionH2 variants={itemVariants} className="text-2xl font-normal mb-4">
        {t.title}
      </MotionH2>
      <MotionP
        variants={itemVariants}
        className="text-sm text-gray-90/70 leading-loose mb-4"
      >
        {t.intro}
      </MotionP>

      <MotionSection variants={containerVariants} className="space-y-6">
        {t.sections.map((section, idx) => (
          <MotionDiv key={idx} variants={itemVariants}>
            <h3 className="text-lg font-normal mb-2">{section.title}</h3>
            <p className="text-sm text-gray-900/70 leading-loose">
              {section.content}
            </p>
          </MotionDiv>
        ))}
      </MotionSection>
    </MotionDiv>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
