import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const baseUrl = "https://www.thefndrs.com";
  const lang = (await params).lang ?? "es";
  const langPrefix = lang === "es" ? "" : `/${lang}`;

  return {
    title: "FNDRS - Make things with excellence",
    description:
      "FNDRS is a creative agency that transforms ideas into innovative solutions.",
    alternates: {
      canonical: `${baseUrl}${langPrefix}`,
      languages: {
        es: `${baseUrl}/`,
        en: `${baseUrl}/en`,
        ja: `${baseUrl}/ja`,
      },
    },
  };
}

export default function Layout({ children }: Props) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Navbar />
      <div />
      <main className="bg-white w-screen min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
