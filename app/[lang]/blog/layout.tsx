import React from "react";
import { blogText } from "@/constants/blog-translations";
import { Metadata } from "next";

type Props = { children: React.ReactNode };

export function generateMetadata(): Metadata {
  const { meta } = blogText.en;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: "https://fndrs.com/blog",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function BlogLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="bg-white">{children}</main>
    </div>
  );
}
