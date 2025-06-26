import type React from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { Metadata } from "next/types";

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FNDRS - Blog",
    description:
      "FNDRS is a creative agency that transforms ideas into innovative solutions.",
  };
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="bg-white min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
