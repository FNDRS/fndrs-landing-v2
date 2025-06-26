"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { blogText } from "@/constants/blog-translations";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const url = value.asset?.url;
      if (!url) return null;
      return (
        <div className="my-8">
          <Image
            src={url || "/placeholder.svg"}
            alt={value.alt || "Article image"}
            width={800}
            height={500}
            className="rounded-xl w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl mt-8 mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="leading-loose tracking-normal font-light text-lg mb-4 font-serif text-[#242424e2] break-words">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-gray-300 pl-6 my-8 font-light font-serif italic text-gray-600 text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic font-extralight">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc font-serif text-lg list-inside mb-6 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li
        className="pl-2"
        style={{ textIndent: "-1.5em", paddingLeft: "1.5em" }}
      >
        <span className="align-top">{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li
        className="pl-2"
        style={{ textIndent: "-1.5em", paddingLeft: "1.5em" }}
      >
        <span className="align-top">{children}</span>
      </li>
    ),
  },
};

interface Post {
  title: string;
  publishedAt: string;
  author: string;
  body: any[];
  excerpt?: string;
  readTime?: number;
  mainImage?: { asset: { url: string }; alt?: string };
}

export default function PostDetailClient({ post }: { post: Post }) {
  const { language } = useLanguage();
  const t = blogText[language as keyof typeof blogText] || blogText.en;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-white mt-32">
      <article className="container mx-auto px-4 pb-20 max-w-2xl">
        {/* Article Header */}
        <header className="text-center mb-12">
          <div className="mb-6">
            <span className="flex text-sm w-full text-left font-medium text-gray-500 uppercase tracking-wide">
              {t.articleLabel}
            </span>
          </div>

          <h1 className="text-4xl font-semibold text-left text-gray-900 leading-[1.1] max-w-4xl mx-auto">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg font-light text-gray-900/60 text-left mb-8 max-w-2xl leading-loose">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div
            className="
  flex flex-col sm:flex-row 
  justify-center items-center 
  gap-6 my-12 text-sm text-gray-900
"
          >
            <div
              className="
    flex flex-col items-center gap-2 
    w-full sm:w-auto 
    px-4 sm:px-10 
    border-gray-200
    sm:border-r sm:last:border-r-0
  "
            >
              <span className="uppercase tracking-wide text-xs">
                {t.dateLabel}
              </span>
              <span className="font-light">{formatDate(post.publishedAt)}</span>
            </div>

            <div
              className="flex flex-col items-center gap-2 w-full sm:w-auto px-4 sm:px-10 
    border-gray-200
    sm:border-r sm:last:border-r-0
  "
            >
              <span className="uppercase tracking-wide text-xs">
                {t.authorLabel}
              </span>
              <span className="font-light">{post.author}</span>
            </div>

            <div
              className="
    flex flex-col items-center gap-2 
    w-full sm:w-auto 
    px-4 sm:px-10 
    border-gray-200
    sm:last:border-r-0
  "
            >
              <span className="uppercase tracking-wide text-xs">
                {t.readLabel}
              </span>
              <span className="font-light">
                {post.readTime || t.defaultReadTime} {t.readUnit}
              </span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </article>
    </div>
  );
}
