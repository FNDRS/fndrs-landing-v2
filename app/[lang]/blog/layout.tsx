import React, { ReactNode } from "react";
import { blogText } from "@/constants/blog-translations";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

export function generateMetadata(): Metadata {
  const meta = blogText.en.meta;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.openGraph.url,
      siteName: meta.openGraph.siteName,
      images: meta.openGraph.images,
    },
    twitter: {
      card: meta.twitter.card as
        | "summary_large_image"
        | "summary"
        | "player"
        | "app",
      title: meta.title,
      description: meta.description,
      images: meta.twitter.images,
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
