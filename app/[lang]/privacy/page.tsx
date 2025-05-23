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

export default function Privacy({ params }: Props) {
  const t = privacyText[params.lang as keyof typeof privacyText];

  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-black space-y-6">
      <MotionH2 className="text-2xl font-light mb-4">{t.title}</MotionH2>
      <MotionP className="text-sm text-gray-500 mb-4">{t.intro}</MotionP>

      <MotionSection className="space-y-6">
        {t.sections.map((section, idx) => (
          <MotionDiv key={idx}>
            <h3 className="text-lg font-light mb-2">{section.title}</h3>
            <p className="text-sm text-gray-500">{section.content}</p>
          </MotionDiv>
        ))}
      </MotionSection>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}
