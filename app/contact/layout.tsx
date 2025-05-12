import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
