import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { Metadata } from "next/types";

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata({}: {
  params: { lang: string };
}): Promise<Metadata> {
  return {
    title: "FNDRS - Blogs",
    description:
      "FNDRS is a creative agency that transforms ideas into innovative solutions.",
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
