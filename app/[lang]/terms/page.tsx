// /app/[lang]/terms/page.tsx
import { termsText } from "@/constants/terms-translations";
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
  title: "Terms of Service | FNDRS",
  description: "Read the terms and conditions for using our services.",
};

export default function Terms({ params }: Props) {
  const t = termsText[params.lang as keyof typeof termsText];

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
